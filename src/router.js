import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import PokemonEntry from './views/PokemonEntry.vue';
import Move from './views/Move.vue';
import Type from './views/Type.vue';
import Ability from './views/Ability.vue';
import store from './store';
import db from '@/firebase/init';

Vue.use(Router);

export default new Router({
    mode: 'history',
    scrollBehavior(to) {
        if (!to.hash) {
            return {
                x: 0,
                y: 0,
            };
        }
    },
    routes: [
        {
            path: '*',
            redirect: '/',
        },
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/pokemon/:pokemon_name',
            name: 'pokemon',
            component: PokemonEntry,
            beforeEnter: (to, from, next) => {
                if (!store.state.storedPokemonShort[to.params.pokemon_name]) {
                    next({ name: 'home' });
                } else {
                    next();
                }
            },
        },
        {
            path: '/move/:move_name',
            name: 'pokemon-move',
            component: Move,
            beforeEnter: (to, from, next) => {
                if (!store.state.storedMoves[to.params.move_name]) {
                    next({ name: 'home' });
                } else {
                    next();
                }
            },
        },
        {
            path: '/type/:type_name',
            name: 'pokemon-type',
            component: Type,
            beforeEnter: (to, from, next) => {
                if (!store.state.storedTypes[to.params.type_name]) {
                    next({ name: 'home' });
                } else {
                    next();
                }
            },
        },
        {
            path: '/ability/:ability_name',
            name: 'pokemon-ability',
            component: Ability,
        },
    ],
});
