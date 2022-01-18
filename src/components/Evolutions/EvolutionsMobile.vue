<template>
    <div>
        <div
            class="evolution-container columns is-centered is-vcentered"
            :class="{ 'is-hidden-mobile': allStages.length === 2 }"
        >
            <div
                v-for="(stage, index) in allStages"
                :key="index"
                class="column stage-column has-text-centered"
            >
                <div
                    v-for="(evo, evoIndex) in stage"
                    :key="evo.name"
                    class="current-evo columns is-inline-block is-centered is-vcentered"
                    :class="{ 'is-marginless': index === allStages.length - 1 }"
                >
                    <pokemon-grid-item
                        :pokemon="storedPokemonShort[evo.name]"
                        class="grid-item has-text-centered column"
                        :class="{
                            'is-marginless': index === allStages.length - 1,
                        }"
                    />
                    <evolution-arrows
                        :chainLength="allStages.length"
                        :mobile="true"
                        :evo="evo"
                        :stage="stage"
                        :evoIndex="evoIndex"
                        class="evo-arrows has-text-centered"
                    />
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
    name: 'EvolutionsMobile',
    props: ['allStages'],
    components: {
        PokemonGridItem,
        EvolutionArrows,
    },
    computed: {
        ...mapState(['storedPokemonShort']),
    },
};
</script>

<style scoped>
.evolution-container {
    margin: 10px 0;
}

.current-evo {
    position: relative;
    margin-bottom: 25px;
    width: 50%;
}

.evo-arrows {
    position: absolute;
    top: -45px;
    left: 50%;
    transform: translate(-50%, -50%);
}

.grid-item {
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 50px;
}
</style>
