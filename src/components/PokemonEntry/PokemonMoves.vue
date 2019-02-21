<template>
    <div class="pokemon-moves">
        <h1 class="has-text-centered">Moves learned by {{ convertName($route.params.pokemon_name, true) }}</h1>

        <div v-if="levelUpMoves.length > 0">
            <h2 class="header-container" :style="{ background: typeColor }">Level up</h2>
            <moves-table :moves="levelUpMoves" :showLevel="true"/>
        </div>

        <div v-if="machineMoves.length > 0">
            <h2 class="header-container" :style="{ background: typeColor }">Machine</h2>
            <moves-table :moves="machineMoves"/>
        </div>

        <div v-if="tutorMoves.length > 0">
            <h2 class="header-container" :style="{ background: typeColor }">Tutor</h2>
            <moves-table :moves="tutorMoves"/>
        </div>

        <div v-if="eggMoves.length > 0">
            <h2 class="header-container" :style="{ background: typeColor }">Egg</h2>
            <moves-table :moves="eggMoves"/>
        </div>
    </div>
</template>

<script>
import typeColors from '@/mixins/typeColors';
import convertName from '@/mixins/convertName';
import MovesTable from '@/components/Reusable/MovesTable';

export default {
    name: 'PokemonMoves',
    mixins: [typeColors, convertName],
    props: ['typeColor', 'moves'],
    components: {
        MovesTable
    },
    computed: {
        levelUpMoves() {
            return this.moves
                .filter(move => {
                    return move.learnMethod.includes('level-up');
                })
                .sort((a, b) => a.learnLevel - b.learnLevel);
        },
        machineMoves() {
            return this.moves
                .filter(move => {
                    return move.learnMethod.includes('machine');
                })
                .sort((a, b) => a.name.localeCompare(b.name));
        },
        tutorMoves() {
            return this.moves
                .filter(move => {
                    return move.learnMethod.includes('tutor');
                })
                .sort((a, b) => a.name.localeCompare(b.name));
        },
        eggMoves() {
            return this.moves
                .filter(move => {
                    return move.learnMethod.includes('egg');
                })
                .sort((a, b) => a.name.localeCompare(b.name));
        }
    }
};
</script>

<style scoped>
h1 {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 30px;
}

h2 {
    font-weight: bold;
}

@media screen and (max-width: 768px) {
    h1 {
        font-size: 1rem;
    }
}
</style>