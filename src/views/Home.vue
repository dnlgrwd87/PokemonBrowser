<template>
    <div>
        <div class="main-container">
            <div class="field is-grouped is-grouped-centered">
                <div class="control">
                    <div class="tabs is-toggle is-centered">
                        <ul>
                            <li :class="{ 'is-active': selected === 'pokemon' }">
                                <a @click="selected = 'pokemon'">
                                    <span>Pokemon</span>
                                </a>
                            </li>
                            <li :class="{ 'is-active': selected === 'moves' }">
                                <a @click="selected = 'moves'">
                                    <span>Moves</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="search-bar">
                        <input
                            @input="searchInput = $event.target.value"
                            @keyup.enter="$event.target.blur()"
                            :value="searchInput"
                            class="input"
                            type="text"
                            placeholder="Search"
                        />
                        <span
                            v-if="searchInput.length"
                            @click="searchInput = ''"
                            class="clear-input"
                        >
                            <i class="fas fa-times"></i>
                        </span>
                    </div>
                </div>
            </div>

            <div v-show="searchInput.length === 0" class="inputEmpty">
                <h2 class="has-text-centered is-size-4 is-size-6-mobile">
                    Search for Pokémon or moves
                </h2>
                <img
                    :src="require('../assets/pokeball.png')"
                    class="pokeball-img"
                />
            </div>

            <div v-if="searchInput.length > 0">
                <div class="bottom-margin" v-show="selected === 'pokemon'">
                    <pokemon-list
                        :pokemonList="orderedPokemon"
                        class="is-hidden-mobile is-hidden-tablet-only"
                    />
                    <pokemon-list-mobile
                        :pokemonList="orderedPokemon"
                        class="is-hidden-desktop"
                    />
                </div>
                <div
                    class="bottom-margin"
                    v-show="selected === 'moves' && searchedMoves.length > 0"
                >
                    <moves-table :moves="searchedMoves" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PokemonList from '@/components/Reusable/PokemonList.vue';
import PokemonListMobile from '@/components/Reusable/PokemonListMobile.vue';
import MovesTable from '@/components/Reusable/MovesTable.vue';
import convertName from '@/mixins/convertName';
import { mapState } from 'vuex';

export default {
    name: 'home',
    mixins: [convertName],
    components: {
        PokemonListMobile,
        PokemonList,
        MovesTable,
    },
    data() {
        return {
            searchInput: '',
            selected: 'pokemon',
        };
    },
    methods: {
        getFilteredResults(searchTerm) {
            return (
                searchTerm
                    .toLowerCase()
                    .startsWith(this.searchInput.toLowerCase()) ||
                searchTerm
                    .toLowerCase()
                    .startsWith(
                        ' ' + this.searchInput.toLowerCase(),
                        searchTerm.indexOf(' ')
                    )
            );
        },
    },
    computed: {
        ...mapState(['storedPokemonShort', 'storedMoves']),
        searchedPokemon() {
            return Object.values(this.storedPokemonShort).filter((pokemon) =>
                this.getFilteredResults(pokemon.displayName)
            );
        },
        orderedPokemon() {
            return this.searchedPokemon.sort((p1, p2) => {
                return (p1.alternateId || p1.id) - (p2.alternateId || p2.id);
            });
        },
        searchedMoves() {
            return Object.values(this.storedMoves).filter((move) =>
                this.getFilteredResults(this.convertName(move.name))
            );
        },
    },
};
</script>

<style scoped>
.main-container {
    margin-bottom: 0px;
    padding-bottom: 0px;
}

.tabs li {
    font-size: 0.8rem;
    font-weight: bold;
    width: 20%;
}

.tabs.is-toggle li.is-active a {
    background: rgb(179, 179, 179);
    border: 1px solid rgb(179, 179, 179);
}

.search-bar {
    position: relative;
}

.clear-input {
    cursor: pointer;
}

.fa-times {
    position: absolute;
    right: 12px;
    top: 50%;
    font-size: 0.9rem;
    transform: translateY(-50%);
}

.fa-times:hover {
    cursor: pointer;
}

.control {
    width: 75%;
    margin-top: 50px;
    margin-bottom: 25px;
}

.inputEmpty {
    margin-top: 100px;
}

.pokeball-img {
    max-width: 25%;
    min-width: 200px;
    margin: 0 auto;
    display: block;
}

@media screen and (max-width: 950px) {
    .control {
        font-size: 0.6rem;
        width: 80%;
    }
    .input {
        font-size: 0.8rem;
    }

    .tabs li {
        font-size: 0.7rem;
        font-weight: bold;
        width: 30%;
    }
}

@media screen and (max-width: 768px) {
    .inputEmpty {
        margin-top: 50px;
    }

    .pokeball-img {
        min-width: 150px;
    }
}
</style>
