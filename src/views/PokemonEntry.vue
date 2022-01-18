<template>
    <div v-if="pokemon.info">
        <banner
            v-if="pokemon.info.types != undefined"
            :typeColor="typeColor"
            :info="pokemon.info"
        />
        <div class="entry-container">
            <previous-next
                :typeColor="typeColor"
                :previous="pokemon.previous"
                :next="pokemon.next"
            />

            <div v-if="pokemon.previous">
                <img
                    v-show="false"
                    :src="
                        require('../assets/pokemon-large/' +
                            pokemon.previous.sprite)
                    "
                />
            </div>

            <div v-if="pokemon.next">
                <img
                    v-show="false"
                    :src="
                        require('../assets/pokemon-large/' +
                            pokemon.next.sprite)
                    "
                />
            </div>

            <div v-if="true" class="main-sprite">
                <img
                    :src="
                        require('../assets/pokemon-large/' +
                            pokemon.info.sprite)
                    "
                />
            </div>

            <div class="tabs is-toggle is-centered">
                <ul>
                    <li
                        v-for="form in pokemon.forms"
                        :key="form.name"
                        @click="
                            $router.push({
                                name: 'pokemon',
                                params: { pokemon_name: form.name },
                            })
                        "
                        :class="{ 'is-active': form.name == pokemon.info.name }"
                    >
                        <img
                            v-show="false"
                            :src="
                                require('../assets/pokemon-large/' +
                                    form.sprite)
                            "
                        />
                        <a class="is-hidden-tablet">{{
                            convertAltDisplayName(form.displayName)
                        }}</a>
                        <a class="is-hidden-mobile">{{ form.displayName }}</a>
                    </li>
                </ul>
            </div>

            <div class="description entry-component">
                <strong>Description:</strong>
                <p>{{ pokemon.info.flavorText }}</p>
            </div>

            <div class="columns is-multiline">
                <pokemon-pokedex-data
                    :info="pokemon.info"
                    class="pokedex-data entry-component column"
                />
                <pokemon-training
                    :info="pokemon.info"
                    class="training entry-component column"
                />
            </div>

            <div class="columns is-multiline">
                <pokemon-stats
                    :info="pokemon.info"
                    class="stats entry-component column"
                    id="stats"
                />
                <pokemon-breeding
                    :info="pokemon.info"
                    class="breeding entry-component column"
                />
            </div>

            <pokemon-evolutions
                v-if="pokemon.evolutions.length"
                class="entry-component"
                id="evolutions"
                :evolutions="pokemon.evolutions"
            />
            <pokemon-moves
                id="moves"
                class="bottom-margin"
                :typeColor="typeColor"
                :moves="pokemon.moves"
            />
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init';
import typeColors from '@/mixins/typeColors';
import convertName from '@/mixins/convertName';

import Banner from '@/components/Layout/Banner.vue';
import PreviousNext from '@/components/PokemonEntry/PreviousNext.vue';
import PokemonPokedexData from '@/components/PokemonEntry/PokemonPokedexData.vue';
import PokemonTraining from '@/components/PokemonEntry/PokemonTraining.vue';
import PokemonBreeding from '@/components/PokemonEntry/PokemonBreeding.vue';
import PokemonStats from '@/components/PokemonEntry/PokemonStats.vue';
import PokemonEvolutions from '@/components/PokemonEntry/PokemonEvolutions.vue';
import PokemonMoves from '@/components/PokemonEntry/PokemonMoves.vue';

import { mapActions } from 'vuex';
import { mapState } from 'vuex';

export default {
    name: 'PokemonEntry',
    mixins: [typeColors, convertName],
    components: {
        Banner,
        PreviousNext,
        PokemonPokedexData,
        PokemonTraining,
        PokemonBreeding,
        PokemonStats,
        PokemonEvolutions,
        PokemonMoves,
    },
    data() {
        return {
            pokemon: {
                info: null,
                moves: [],
                evolutions: [],
                forms: [],
                previous: null,
                next: null,
            },
        };
    },
    methods: {
        ...mapActions(['addPokemonToStore']),
        loadPokemon() {
            const name = this.$route.params.pokemon_name;
            if (!this.storedPokemon[name]) {
                this.fetchPokemon();
            } else {
                this.pokemon = this.storedPokemon[name];
            }
        },
        fetchPokemon() {
            const name = this.$route.params.pokemon_name;
            const baseInfo = this.storedPokemonShort[name];
            const id = baseInfo.id;
            const altId = baseInfo.alternateId || baseInfo.id;
            const evoId = baseInfo.evolutionId || 0;

            let previousName = baseInfo.previous;
            let nextName = baseInfo.next;

            // Temp is stored to store the current pokemon
            // This way, when the page transitions there is no flicker
            const temp = {
                info: null,
                moves: [],
                evolutions: [],
                forms: [],
                previous: this.storedPokemonShort[previousName],
                next: this.storedPokemonShort[nextName],
            };

            db.collection('pokemon')
                .doc(id.toString())
                .get()
                .then((doc) => {
                    this.pokemon.info = doc.data();
                    temp.info = doc.data();
                    if (!this.pokemon.info.alternateForms) {
                        this.pokemon.forms = [];
                    }
                    this.pokemon.previous =
                        this.storedPokemonShort[previousName];
                    this.pokemon.next = this.storedPokemonShort[nextName];
                    db.collection('pokemonMoves')
                        .doc(id.toString())
                        .get()
                        .then((doc) => {
                            this.pokemon.moves = Object.values(doc.data());
                            temp.moves = Object.values(doc.data());
                            this.addPokemonToStore(temp);
                        });
                    db.collection('evolutions')
                        .doc(evoId.toString())
                        .get()
                        .then((doc) => {
                            if (doc.exists) {
                                const evos = [];
                                const values = Object.values(doc.data());
                                values.forEach((value) => {
                                    if (value.stage == 1) {
                                        evos.unshift(value);
                                    } else {
                                        evos.push(value);
                                    }
                                    this.pokemon.evolutions = evos;
                                    temp.evolutions = evos;
                                });
                            }
                            this.addPokemonToStore(temp);
                        });
                });

            if (baseInfo.alternateForms) {
                db.collection('alternateForms')
                    .doc(altId.toString())
                    .get()
                    .then((doc) => {
                        this.pokemon.forms = Object.values(doc.data());
                        temp.forms = Object.values(doc.data());
                        this.addPokemonToStore(temp);
                    });
            }
        },
    },
    created() {
        this.loadPokemon();
    },
    computed: {
        ...mapState(['storedPokemon', 'storedPokemonShort']),
        typeColor() {
            if (this.pokemon.info.types) {
                return this.getTypeColor(this.pokemon.info.types[0]);
            }
        },
    },
    watch: {
        '$route.params.pokemon_name'() {
            this.loadPokemon();
        },
    },
};
</script>

<style scoped>
.entry-container {
    width: 80%;
    margin: 15px auto;
    position: relative;
}

.entry-navigation ul {
    margin-top: 55px;
    border-bottom-style: none;
}

.main-sprite {
    margin: 0 auto;
    max-width: 17%;
    min-width: 125px;
    display: block;
}

.main-sprite img {
    margin-top: 60px;
    margin-bottom: 25px;
}

.forms-tabs {
    max-width: 100%;
    margin: 0 auto;
    margin-top: 75px;
}

.tabs.is-toggle li.is-active a {
    background: rgb(179, 179, 179);
    border: 1px solid rgb(179, 179, 179);
}

.tabs.is-toggle li {
    font-size: 0.8rem;
    font-weight: bold;
    width: 20%;
}

.columns {
    margin: 0;
}

.column:first-child {
    margin-right: 15px;
}

.column:last-child {
    margin-left: 15px;
}

.entry-component {
    background: rgb(251, 251, 251);
    margin-bottom: 30px;
    padding: 22px;
    box-shadow: 1px 1px 5px rgb(219, 219, 219);
    border-radius: 5px;
    font-size: 0.9rem;
    overflow: hidden;
}

@media screen and (max-width: 950px) {
    .entry-container {
        width: 90%;
    }

    .entry-component {
        font-size: 0.8rem;
    }

    .tabs.is-toggle li {
        font-size: 0.7rem;
        font-weight: bold;
        width: 30%;
    }

    #moves {
        margin-top: 30px;
    }
}

@media screen and (max-width: 768px) {
    .entry-component {
        margin-bottom: 25px;
    }

    .column:first-child {
        margin-right: 0;
    }

    .column:last-child {
        margin-left: 0;
    }
}

@media screen and (max-width: 450px) {
    .entry-container {
        width: 95%;
    }

    .entry-component {
        margin-bottom: 15px;
    }

    #evolutions {
        padding: 10px 0;
    }
}
</style>
