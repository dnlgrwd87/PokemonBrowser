<template>
    <div>
        <div class="evolution-container columns is-centered is-vcentered" :class="{ 'is-mobile': allStages.length == 2, 'is-hidden-mobile': allStages.length > 2 }">
            <div v-for="(stage, index) in allStages" :key="index" class="column has-text-centered evo-column">
                <div v-for="(evo, evoIndex) in stage" :key="evo.name" class="current-evo columns is-centered is-vcentered">
                    <pokemon-grid-item :pokemon="storedPokemonShort[evo.name]" class="grid-item has-text-centered column"/>
                    <evolution-arrows :chainLength="allStages.length" :evo="evo" :stage="stage" :evoIndex="evoIndex" class="desktop-arrows is-hidden-mobile"/>
                    <evolution-arrows v-if="allStages.length == 2" :chainLength="allStages.length" :mobile="true" :evo="evo" :stage="stage" :evoIndex="evoIndex" class="two-stage-mobile is-hidden-tablet"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script scoped>
import PokemonGridItem from '@/components/Reusable/PokemonGridItem.vue';
import EvolutionArrows from '@/components/Evolutions/EvolutionArrows.vue';
import { mapState } from 'vuex';

export default {
    name: 'EvolutionsDesktop',
    props: ['allStages'],
    components: {
        PokemonGridItem,
        EvolutionArrows
    },
    methods: {
        isWurmpleEvolution(evo) {
            return (
                evo.name == 'beautifly' ||
                evo.name == 'dustox' ||
                evo.name == 'silcoon' ||
                evo.name == 'cascoon'
            );
        }
    },
    computed: {
        ...mapState(['storedPokemonShort'])
    }
};
</script>

<style scoped>
.evolution-container {
    margin-top: 10px;
    margin-bottom: 10px;
}

.current-evo {
    position: relative;
}

.two-stage-mobile {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}

.desktop-arrows {
    position: absolute;
    left: 0;
    transform: translateX(-50%);
}

.grid-item {
    font-weight: bold;
    cursor: pointer;
}
</style>