import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
    key: 'vuex',
    storage: window.localStorage
});

export default new Vuex.Store({
    plugins: [vuexLocalStorage.plugin],
    scrict: true,
    state: {
        storedPokemonShort: {},
        storedMoves: {},
        storedPokemon: {},
        storedMovePokemon: {},
        storedAbilities: {},
        storedTypes: {}
    },
    mutations: {
        storePokemonShort: (state, payload) => {
            state.storedPokemonShort = payload;
        },
        storeMoves: (state, payload) => {
            state.storedMoves = payload;
        },
        addPokemonToStore: (state, payload) => {
            state.storedPokemon[payload.info.name] = payload;
        },
        addMovePokemonToStore: (state, payload) => {
            const moves = Object.assign({}, state.storedMovePokemon[payload.name], payload.data);
            state.storedMovePokemon[payload.name] = moves;
            if (Object.keys(state.storedMovePokemon).length > 10) {
                state.storedMovePokemon = {};
            }
        },
        storeAbility: (state, payload) => {
            state.storedAbilities[payload.name] = payload.effect;
        },
        storeTypes: (state, payload) => {
            state.storedTypes = payload;
        }
    },
    actions: {
        storePokemonShort: (context, payload) => {
            context.commit('storePokemonShort', payload);
        },
        storeMoves: (context, payload) => {
            context.commit('storeMoves', payload);
        },
        addPokemonToStore: (context, payload) => {
            context.commit('addPokemonToStore', payload);
        },
        addMovePokemonToStore: (context, payload) => {
            context.commit('addMovePokemonToStore', payload);
        },
        storeAbility: (context, payload) => {
            context.commit('storeAbility', payload);
        },
        storeTypes: (context, payload) => {
            context.commit('storeTypes', payload);
        }
    }
});
