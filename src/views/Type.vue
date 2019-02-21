<template>
    <div>
        <banner :typeColor="getTypeColor(type)" :otherInfo="type + ' Type'"/>
        <div class="main-container">
            <type-damage :typeName="type" class="type-component"/>

            <div class="tabs is-toggle is-centered type-tabs">
                <ul>
                    <li :class="{ 'is-active': selected == 'pokemon'}">
                        <a @click="selected = 'pokemon'">
                            <span>Pokémon</span>
                        </a>
                    </li>
                    <li :class="{ 'is-active': selected == 'moves'}">
                        <a @click="selected = 'moves'">
                            <span>Moves</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div v-show="selected == 'pokemon'" class="bottom-margin is-capitalized">
                <div class="type-component">
                    <h2 class="header-container" :style="{ background: getTypeColor(type) }">Pure {{ type }} Pokémon</h2>
                    <pokemon-list :pokemonList="pure" class="is-hidden-mobile is-hidden-tablet-only"/>
                    <pokemon-list-mobile :pokemonList="pure" class="is-hidden-desktop"/>
                </div>

                <div class="type-component">
                    <h2 class="header-container" :style="{ background: getTypeColor(type) }">Primary {{ type }} Pokémon</h2>
                    <pokemon-list :pokemonList="primary" class="is-hidden-mobile is-hidden-tablet-only"/>
                    <pokemon-list-mobile :pokemonList="primary" class="is-hidden-desktop"/>
                </div>

                <div class="type-component">
                    <h2 class="header-container" :style="{ background: getTypeColor(type) }">Secondary {{ type }} Pokémon</h2>
                    <pokemon-list :pokemonList="secondary" class="is-hidden-mobile is-hidden-tablet-only"/>
                    <pokemon-list-mobile :pokemonList="secondary" class="is-hidden-desktop"/>
                </div>
            </div>

            <div class="bottom-margin" v-show="selected == 'moves'">
                <moves-table :moves="typeMoves" :showLevel="false"/>
            </div>
        </div>
    </div>
</template>

<script>
import typeColors from '@/mixins/typeColors';
import Banner from '@/components/Layout/Banner.vue';
import TypeDamage from '@/components/Type/TypeDamage.vue';
import PokemonList from '@/components/Reusable/PokemonList.vue';
import PokemonListMobile from '@/components/Reusable/PokemonListMobile.vue';
import MovesTable from '@/components/Reusable/MovesTable';

import { mapState } from 'vuex';

export default {
    name: 'PokemonType',
    mixins: [typeColors],
    components: {
        Banner,
        TypeDamage,
        PokemonList,
        PokemonListMobile,
        MovesTable
    },
    data() {
        return {
            typePokemon: [],
            typeMoves: [],
            selected: 'pokemon',
            type: this.$route.params.type_name
        };
    },
    methods: {
        getTypePokemon() {
            Object.values(this.storedPokemonShort).forEach(pokemon => {
                if (pokemon.types.all.includes(this.type)) {
                    this.typePokemon.push(pokemon);
                }
            });
        },
        getTypeMoves() {
            Object.values(this.storedMoves).forEach(move => {
                if (move.type == this.type) {
                    this.typeMoves.push(move);
                }
            });
        }
    },
    computed: {
        ...mapState(['storedPokemonShort', 'storedMoves']),
        pure() {
            return this.typePokemon.filter(pokemon => {
                const types = pokemon.types.all;
                if (types.length == 1) {
                    return pokemon;
                }
            });
        },
        primary() {
            return this.typePokemon.filter(pokemon => {
                const types = pokemon.types.all;
                if (types.length == 2 && types[0] == this.type) {
                    return pokemon;
                }
            });
        },
        secondary() {
            return this.typePokemon.filter(pokemon => {
                const types = pokemon.types.all;
                if (types.length == 2 && types[1] == this.type) {
                    return pokemon;
                }
            });
        }
    },
    created() {
        this.getTypePokemon();
        this.getTypeMoves();
    },
    watch: {
        '$route.params'() {
            this.type = this.$route.params.type_name;
            this.typePokemon = [];
            this.typeMoves = [];
            this.getTypePokemon();
            this.getTypeMoves();
        }
    }
};
</script>

<style scoped>
.type-component {
    margin-bottom: 30px;
}

.type-tabs {
    margin-bottom: 30px;
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

@media screen and (max-width: 950px) {
    .tabs li {
        font-size: 0.7rem;
        font-weight: bold;
        width: 30%;
    }
}
</style>