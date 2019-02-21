<template>
    <div class="navigation">
        <nav class="navbar is-dark">
            <div class="container">
                <div class="navbar-brand">
                    <router-link to="/" class="navbar-item">
                        <img src="https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG">
                        <p class="brand-text is-info">Pokémon Browser</p>
                    </router-link>
                    <a v-if="$route.name != 'home'" role="button" class="navbar-burger" @click="isActive = !isActive" :class="{ 'is-active': isActive }">
                        <div v-show="!isActive">
                            <i class="fa fa-search"></i>
                        </div>
                        <div v-show="isActive">
                            <i class="fa fa-times"></i>
                        </div>
                    </a>
                </div>

                <div class="navbar-menu has-background-dark" :class="{ 'is-active': isActive }">
                    <div class="navbar-end">
                        <!-- <router-link to="/" class="navbar-item has-text-white">About</router-link> -->
                        <div class="search-bar navbar-item">
                            <ul>
                                <div v-if="$route.name != 'home'" class="control has-icons-left">
                                    <input @focus="hasFocus = true" @blur="hasFocus = false" class="input is-small search-input" :value="searchInput" @input="searchInput = $event.target.value">
                                    <span class="icon is-left">
                                        <i class="fas fa-search"></i>
                                    </span>
                                </div>
                                <div v-if="hasFocus && searchInput.length" class="search-results">
                                    <li v-for="result in allSearchResults" :key="result.name" @mousedown="goTo(result)">
                                        {{ displayName(result) }}
                                        <span v-if="result.type == 'pokemon'" class="is-pulled-right is-size-7">Pokémon</span>
                                        <span v-if="result.type == 'move'" class="is-pulled-right is-size-7">Move</span>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import routeTo from '@/mixins/routeTo';
import convertName from '@/mixins/convertName';

export default {
    name: 'Navbar',
    mixins: [routeTo, convertName],
    data() {
        return {
            isActive: false,
            searchInput: '',
            searchResults: [],
            hasFocus: false,
            searchbarActive: false
        };
    },
    methods: {
        goTo(result) {
            this.searchInput = '';
            this.isActive = false;
            this.routeTo(result);
        },
        clearStorage() {
            localStorage.clear();
        },
        displayName(result) {
            if (result.type == 'pokemon') {
                return this.storedPokemonShort[result.name].displayName;
            } else {
                return this.convertName(result.name);
            }
        }
    },
    computed: {
        ...mapState(['storedPokemonShort', 'storedMoves']),
        searchedPokemon() {
            return Object.values(this.storedPokemonShort)
                .filter(pokemon => {
                    return (
                        pokemon.displayName
                            .toLowerCase()
                            .startsWith(this.searchInput.toLowerCase()) ||
                        pokemon.displayName
                            .toLowerCase()
                            .startsWith(
                                ' ' + this.searchInput.toLowerCase(),
                                pokemon.displayName.indexOf(' ')
                            )
                    );
                })
                .sort((p1, p2) => {
                    return (
                        (p1.alternateId || p1.id) - (p2.alternateId || p2.id)
                    );
                });
        },
        searchedMoves() {
            return Object.values(this.storedMoves).filter(move => {
                let moveName = this.convertName(move.name);
                if (this.searchInput.length) {
                    return (
                        moveName
                            .toLowerCase()
                            .startsWith(this.searchInput.toLowerCase()) ||
                        moveName
                            .toLowerCase()
                            .startsWith(
                                ' ' + this.searchInput.toLowerCase(),
                                moveName.indexOf(' ')
                            )
                    );
                }
            });
        },
        allSearchResults() {
            let pokemon = this.searchedPokemon;
            let moves = this.searchedMoves;
            let allResults = [];
            pokemon.forEach(poke => {
                if (allResults.length <= 12) {
                    allResults.push({ name: poke.name, type: 'pokemon' });
                }
            });
            moves.forEach(move => {
                if (allResults.length <= 12) {
                    allResults.push({ name: move.name, type: 'move' });
                }
            });
            return allResults;
        }
    },
    watch: {
        '$route.params'() {
            this.searchInput = '';
        }
    }
};
</script>

<style scoped>
.navbar {
    box-shadow: 0 0 5px rgb(45, 45, 45);
    max-height: 10px;
}

.navbar.is-dark .navbar-brand > a.navbar-item:hover,
.navbar-burger:hover {
    background: #363636;
}

.control.has-icons-left .input {
    padding-left: 35px;
}

a .fa-search,
a .fa-times {
    color: white;
    font-size: 1rem;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
}

.control.has-icons-left .icon.is-left {
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
}

.search-input {
    background: rgb(179, 177, 177);
    border: 1px solid rgb(179, 177, 177);
    width: 400px;
}

.search-bar {
    position: relative;
    padding: 0;
}

.search-bar li {
    padding: 5px 15px;
    font-size: 0.8rem;
}

.search-bar li:not(:last-child) {
    border-bottom: 1px solid rgb(83, 83, 83);
}

.search-results {
    position: absolute;
    background: #363636;
    cursor: pointer;
    left: 0px;
    color: white;
    width: 100%;
}

.search-results li:hover {
    background: rgb(163, 163, 163);
}

.brand-text {
    margin-left: 15px;
}

.navbar-burger span {
    color: white;
}

a.navbar-item:hover {
    background: #333333;
}

.navbar-brand {
    padding-left: 1em;
}

.navbar-end {
    padding-right: 1em;
}

@media screen and (max-width: 1088px) {
    .navbar-brand {
        padding-left: 0;
    }

    .navbar-end {
        padding-right: 0;
    }

    .control {
        width: 97%;
        margin: 0 auto;
    }

    .search-input {
        width: 100%;
    }

    .search-results {
        left: 50%;
        width: 97%;
        transform: translateX(-50%);
    }
}

@media screen and (max-width: 768px) {
    .navbar {
        font-size: 0.8rem;
    }
}
</style>


