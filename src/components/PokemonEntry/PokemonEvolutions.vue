<template>
    <div class="pokemon-evolutions">
        <h2 class="has-text-centered">Evolution Chain</h2>

        <evolutions-desktop :allStages="allStages" />
        <evolutions-mobile :allStages="allStages" class="is-hidden-tablet" />
    </div>
</template>

<script>
import EvolutionsDesktop from '@/components/Evolutions/EvolutionsDesktop.vue';
import EvolutionsMobile from '@/components/Evolutions/EvolutionsMobile.vue';

export default {
    name: 'PokemonEvolutions',
    props: ['evolutions'],
    components: {
        EvolutionsDesktop,
        EvolutionsMobile,
    },
    computed: {
        stage1() {
            return this.evolutions.filter((evo) => evo.stage === 1);
        },
        stage2() {
            return this.evolutions.filter((evo) => evo.stage === 2);
        },
        stage3() {
            return this.evolutions.filter((evo) => evo.stage === 3);
        },
        allStages() {
            const stages = [this.stage1, this.stage2];
            if (this.stage3.length > 0) {
                stages.push(this.stage3);
            }
            return stages;
        },
    },
};
</script>

<style scoped>
h2 {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 25px;
}

@media screen and (max-width: 768px) {
    h2 {
        font-size: 1rem;
    }
}
</style>
