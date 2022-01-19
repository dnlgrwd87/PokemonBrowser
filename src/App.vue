<template>
    <div class="app">
        <navbar class="navigation" />
        <router-view class="router-view container" />
        <back-to-top
            class="is-hidden-tablet"
            bottom="40px"
            right="40px"
            visibleoffset="500"
            visibleoffsetbottom="250"
        >
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
        BackToTop,
    },
    methods: {
        ...mapActions(['storePokemonShort', 'storeMoves', 'storeTypes']),
        async loadPokemonShort() {
            let pokemonShort = this.getFromPersistedVuex('storedPokemonShort');

            if (!pokemonShort) {
                pokemonShort = {};
                const snapshot = await db
                    .collection('pokemonShort')
                    .orderBy('id')
                    .get();
                snapshot.forEach(
                    (doc) => (pokemonShort[doc.data().name] = doc.data())
                );
            }

            this.storePokemonShort(pokemonShort);
        },
        async loadMoves() {
            let moves = this.getFromPersistedVuex('storedMoves');

            if (!moves) {
                moves = {};

                const snapshot = await db.collection('moves').get();
                snapshot.forEach(
                    (doc) => (moves[doc.data().name] = doc.data())
                );
            }

            this.storeMoves(moves);
        },
        async loadTypes() {
            let types = this.getFromPersistedVuex('storedTypes');

            if (!types) {
                types = {};

                const snapshot = await db.collection('types').get();
                snapshot.forEach(
                    (doc) => (types[doc.data().name] = doc.data())
                );
            }

            this.storeTypes(types);
        },
        getFromPersistedVuex(itemKey) {
            const vuexStorageJson = localStorage.getItem('vuex');
            const parsedStorage = JSON.parse(vuexStorageJson);
            return parsedStorage ? parsedStorage[itemKey] : null;
        },
    },
    created() {
        this.loadPokemonShort();
        this.loadMoves();
        this.loadTypes();
    },
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
    box-shadow: 0 0 5px #c2c2c2;
    height: 100%;
    min-height: calc(100vh - 52px);
    padding-bottom: 10px;
}

.main-container {
    width: 80%;
    margin: 0 auto;
}

.table {
    background: #fbfbfb;
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
    text-shadow: 0.5px 0.5px 2px #2c2c2c;
    font-weight: bold;
    font-size: 0.9rem;
}

.bottom-margin {
    margin-bottom: 50px;
}

.btn-to-top {
    position: relative;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 100px;
    background: #a1a1a1;
    border: 1px solid #94979c;
    box-shadow: 0px 0px 2px #585757;
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
