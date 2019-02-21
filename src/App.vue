<template>
    <div class="app">
        <navbar class="navigation"/>
        <router-view class="router-view container"/>
        <back-to-top-button class="is-hidden-tablet" bottom="50px" right="50px" visibleoffset="500" visibleoffsetbottom="250"/>
    </div>
</template>

<script>
import Navbar from '@/components/Layout/Navbar';
import Banner from '@/components/Layout/Banner';
import BackToTopButton from '@/components/Reusable/BackToTopButton.vue';
import db from '@/firebase/init';
import { mapActions } from 'vuex';

export default {
    components: {
        Navbar,
        Banner,
        BackToTopButton
    },
    methods: {
        ...mapActions(['storePokemonShort', 'storeMoves', 'storeTypes']),
        loadPokemonShort() {
            let pokemonShort = {};
            db.collection('pokemonShort')
                .orderBy('id')
                .get()
                .then(snap => {
                    snap.forEach(doc => {
                        pokemonShort[doc.data().name] = doc.data();
                    });
                    this.storePokemonShort(pokemonShort);
                });
        },
        loadMoves() {
            let moves = {};
            db.collection('moves')
                .get()
                .then(snap => {
                    snap.forEach(doc => {
                        moves[doc.data().name] = doc.data();
                    });
                    this.storeMoves(moves);
                });
        },
        loadTypes() {
            let types = {};
            db.collection('types')
                .get()
                .then(snap => {
                    snap.forEach(doc => {
                        types[doc.data().name] = doc.data();
                    });
                    this.storeTypes(types);
                });
        }
    },
    created() {
        this.loadPokemonShort();
        this.loadMoves();
        this.loadTypes();
    }
};
</script>

<style>
@import '../node_modules/bulma/css/bulma.css';
@import url('https://fonts.googleapis.com/css?family=Montserrat');

.app {
    font-family: 'Poppins', sans-serif;
    max-width: 100%;
    height: 100%;
}

.router-view {
    background: white;
    box-shadow: 0 0 5px rgb(194, 194, 194);
    height: 100%;
    min-height: calc(100vh - 52px);
}

.main-container {
    width: 80%;
    margin: 0 auto;
}

.table {
    background: rgb(251, 251, 251);
}

.tabs.is-toggle a {
    padding: 2px;
}

.header-container {
    padding: 3px;
    padding-left: 10px;
    color: white;
    margin-bottom: 20px;
    margin-top: 20px;
    text-shadow: 0.5px 0.5px 2px rgb(44, 44, 44);
    font-weight: bold;
    font-size: 0.9rem;
}

.bottom-margin {
    margin-bottom: 50px;
}

@media screen and (max-width: 950px) {
    .main-container {
        width: 90%;
    }

    .header-container {
        text-align: center;
    }

    .bottom-margin {
        margin-bottom: 30px;
    }
}

@media screen and (max-width: 450px) {
    .main-container {
        width: 95%;
        padding-left: 10px;
        padding-right: 10px;
    }

    .bottom-margin {
        margin-bottom: 20px;
    }
}
</style>
