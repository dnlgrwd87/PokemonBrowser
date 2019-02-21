<template>
    <div class="app">
        <navbar class="navigation"/>
        <router-view class="router-view container"/>
        <back-to-top class="is-hidden-tablet" bottom="50px" right="50px" visibleoffset="500" visibleoffsetbottom="250">
            <button type="button" class="btn btn-info btn-to-top">
                <i class="fa fa-chevron-up"></i>
            </button>
        </back-to-top>
    </div>
</template>

<script>
import Navbar from '@/components/Layout/Navbar';
import Banner from '@/components/Layout/Banner';
import BackToTop from 'vue-backtotop';
import db from '@/firebase/init';
import { mapActions } from 'vuex';

export default {
    components: {
        Navbar,
        Banner,
        BackToTop
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

.btn-to-top {
    position: relative;
    cursor: pointer;
    /* bottom: 30px; */
    /* right: 30px; */
    width: 50px;
    height: 50px;
    border-radius: 100px;
    background: rgb(148, 151, 156);
    border: 2px solid rgb(148, 151, 156);
    box-shadow: 0px 0px 2px rgb(88, 87, 87);
}

.fa-chevron-up {
    position: absolute;
    font-size: 18px;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -55%);
    color: white;
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
