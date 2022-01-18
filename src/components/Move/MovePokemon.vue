<template>
    <div class="move-pokemon-container">
        <div class="bottom-margin">
            <div class="can-learn-header">
                <h2 class="has-text-centered can-learn-header">
                    Pokémon that learn {{ convertName(move.name) }}
                </h2>
                <img
                    v-if="loading"
                    :src="require('../../assets/loading_spinner.gif')"
                    class="loading-spinner"
                />
            </div>

            <div v-if="learnByLevelUp.length > 0">
                <h2
                    class="has-text-centered-mobile header-container"
                    :style="{ background: getTypeColor(move.type) }"
                >
                    Level Up
                </h2>
                <pokemon-list
                    :pokemonList="learnByLevelUp"
                    :showLearnLevel="true"
                    class="is-hidden-mobile"
                />
                <pokemon-list-mobile
                    :pokemonList="learnByLevelUp"
                    :showLearnLevel="true"
                    class="is-hidden-tablet"
                />
            </div>

            <div v-if="learnByMachine.length > 0">
                <h2
                    class="has-text-centered-mobile header-container"
                    :style="{ background: getTypeColor(move.type) }"
                >
                    Machine
                </h2>
                <pokemon-list
                    :pokemonList="learnByMachine"
                    class="is-hidden-mobile"
                />
                <pokemon-list-mobile
                    :pokemonList="learnByMachine"
                    class="is-hidden-tablet"
                />
            </div>

            <div v-if="learnByTutor.length > 0">
                <h2
                    class="has-text-centered-mobile header-container"
                    :style="{ background: getTypeColor(move.type) }"
                >
                    Tutor
                </h2>
                <pokemon-list
                    :pokemonList="learnByTutor"
                    class="is-hidden-mobile"
                />
                <pokemon-list-mobile
                    :pokemonList="learnByTutor"
                    class="is-hidden-tablet"
                />
            </div>

            <div v-if="learnByEgg.length > 0">
                <h2
                    class="has-text-centered-mobile header-container"
                    :style="{ background: getTypeColor(move.type) }"
                >
                    Egg
                </h2>
                <pokemon-list
                    :pokemonList="learnByEgg"
                    class="is-hidden-mobile"
                />
                <pokemon-list-mobile
                    :pokemonList="learnByEgg"
                    class="is-hidden-tablet"
                />
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init';
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import typeColors from '@/mixins/typeColors';
import convertName from '@/mixins/convertName';

import PokemonList from '@/components/Reusable/PokemonList.vue';
import PokemonListMobile from '@/components/Reusable/PokemonListMobile.vue';

export default {
    name: 'MovePokemon',
    props: ['move'],
    mixins: [typeColors, convertName],
    components: {
        PokemonList,
        PokemonListMobile,
    },
    data() {
        return {
            movePokemon: [],
            loading: false,
            loading1: false,
            loading2: false,
        };
    },
    methods: {
        ...mapActions(['addMovePokemonToStore']),
        async loadMovePokemon() {
            if (!this.storedMovePokemon[this.move.name]) {
                await this.fetchMovePokemon();
            }

            this.movePokemon = Object.values(
                this.storedMovePokemon[this.move.name]
            );
        },
        async fetchMovePokemon() {
            this.loading = true;

            const movePokemonList1 = db
                .collection('movesPokemon1')
                .doc(this.move.id.toString())
                .get();

            const movePokemonList2 = db
                .collection('movesPokemon2')
                .doc(this.move.id.toString())
                .get();

            const allMovePokemon = await Promise.all([
                movePokemonList1,
                movePokemonList2,
            ]);

            const movePokemonData = {
                ...allMovePokemon[0].data(),
                ...allMovePokemon[1].data(),
            };

            this.addMovePokemonToStore({
                name: this.$route.params.move_name,
                data: movePokemonData,
            });

            this.loading = false;
        },
    },
    computed: {
        ...mapState(['storedMovePokemon']),
        learnByLevelUp() {
            return this.movePokemon.filter((pokemon) => {
                return pokemon.learnMethod.includes('level-up');
            });
        },
        learnByMachine() {
            return this.movePokemon.filter((pokemon) => {
                return pokemon.learnMethod.includes('machine');
            });
        },
        learnByTutor() {
            return this.movePokemon.filter((pokemon) => {
                return pokemon.learnMethod.includes('tutor');
            });
        },
        learnByEgg() {
            return this.movePokemon.filter((pokemon) => {
                return pokemon.learnMethod.includes('egg');
            });
        },
    },
    watch: {
        '$route.params'() {
            this.movePokemon = [];
            this.loadMovePokemon();
        },
    },
    created() {
        this.loadMovePokemon();
    },
};
</script>

<style scoped>
.can-learn-header {
    position: relative;
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 30px;
}

.loading-spinner {
    width: 25px;
    border: none;
    position: absolute;
    top: 18px;
    left: 50%;
    transform: translate(-50%, 50%);
}

@media screen and (max-width: 950px) {
    .tabs li {
        font-size: 0.7rem;
        font-weight: bold;
        width: 30%;
    }

    .loading-spinner {
        width: 20px;
        top: 22px;
    }
}

@media screen and (max-width: 768px) {
    .can-learn-header {
        font-size: 1rem;
    }

    .loading-spinner {
        top: 15px;
    }
}
</style>
