<template>
    <div v-if="move">
        <banner :typeColor="getTypeColor(move.type)" :otherInfo="$route.params.move_name"/>
        <div class="main-container">
            <move-info :move="move" class="move-component"/>
            <move-pokemon :move="move"/>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init';
import typeColors from '@/mixins/typeColors';
import routeTo from '@/mixins/routeTo';

import TypeBox from '@/components/Reusable/TypeBox.vue';
import Banner from '@/components/Layout/Banner.vue';
import MovePokemon from '@/components/Move/MovePokemon.vue';
import MoveInfo from '@/components/Move/MoveInfo.vue';

import { mapActions } from 'vuex';
import { mapState } from 'vuex';

export default {
    name: 'Move',
    mixins: [typeColors, routeTo],
    components: {
        Banner,
        MovePokemon,
        MoveInfo,
        TypeBox
    },
    data() {
        return {
            move: null
        };
    },
    methods: {
        ...mapActions(['storeNewMove']),
        loadMove() {
            this.move = this.storedMoves[this.$route.params.move_name];
        }
    },
    computed: {
        ...mapState(['storedMoves'])
    },
    watch: {
        '$route.params.move_name'() {
            this.loadMove();
        }
    },
    created() {
        this.loadMove();
    }
};
</script>

<style scoped>
.move-container {
    width: 80%;
    margin: 0 auto;
    font-size: 0.9rem;
}

.move-component {
    padding: 22px;
    box-shadow: 1px 1px 5px rgb(175, 175, 175);
    background: rgb(251, 251, 251);
    border-radius: 5px;
}

.move-info {
    margin: 50px auto 30px;
}

@media screen and (max-width: 950px) {
    .move-container {
        width: 90%;
    }
}

@media screen and (max-width: 450px) {
    .move-container {
        width: 95%;
        padding-left: 10px;
        padding-right: 10px;
    }
}
</style>