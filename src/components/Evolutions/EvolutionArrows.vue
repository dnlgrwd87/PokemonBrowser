<template>
    <div v-if="evo.stage > 1">
        <div v-if="evo.name != 'beautifly' && evo.name != 'dustox'">
            <!-- TWO STAGES -->
            <span v-if="chainLength == 2">
                <!-- RIGHT ARROW - ONLY ONE POKEMON OR MULTIPLE EVOS AND NOT FIRST OR LAST POKEMON -->
                <i v-if="(stage.length == 1 || (evoIndex != 0 && evoIndex != stage.length - 1))" class="fa fa-long-arrow-alt-right"></i>
                <!-- DIAGONAL UP - MULTIPLE EVOS AND FIRST POKEMON -->
                <i v-if="(stage.length > 1 && evoIndex == 0)" class="fa fa-long-arrow-alt-right" data-fa-transform="rotate--45"></i>
                <!-- DIAGONAL DOWN - MULTIPLE EVOS AND LAST POKEMON -->
                <i v-if="(stage.length > 1 && evoIndex == stage.length - 1)" class="fa fa-long-arrow-alt-right" data-fa-transform="rotate-45"></i>
            </span>

            <!-- THREE STAGES -->
            <span v-if="chainLength == 3">
                <!-- RIGHT / DOWN FOR DESKTOP / MOBILE, ONLY ONE EVO OR NOT FIRST OR LAST EVO -->
                <span v-if="(stage.length == 1 || (evoIndex != 0 && evoIndex != stage.length - 1))">
                    <i v-if="!mobile" class="fa fa-long-arrow-alt-right"></i>
                    <i v-if="mobile" class="fa fa-long-arrow-alt-down"></i>
                </span>
                <!-- DIAGONAL UP / DIAGONAL DOWN-LEFT FOR DESKTOP / MOBILE, MULTIPLE EVOS AND FIRST POKEMON -->
                <span v-if="stage.length > 1 && evoIndex == 0">
                    <i v-if="!mobile" class="fa fa-long-arrow-alt-right" data-fa-transform="rotate--45"></i>
                    <i v-if="mobile" class="fa fa-long-arrow-alt-down" data-fa-transform="rotate-45"></i>
                </span>
                <!-- DIAGONAL DOWN / DIAGONAL DOWN-RIGHT FOR DESKTOP / MOBILE, MULTIPLE EVOS AND LAST POKEMON -->
                <span v-if="stage.length > 1 && evoIndex == stage.length - 1">
                    <i v-if="!mobile" class="fa fa-long-arrow-alt-right" data-fa-transform="rotate-45"></i>
                    <i v-if="mobile" class="fa fa-long-arrow-alt-down" data-fa-transform="rotate--45"></i>
                </span>
            </span>
        </div>

        <div v-if="evo.name == 'beautifly' || evo.name == 'dustox'">
            <span>
                <i v-if="!mobile" class="fa fa-long-arrow-alt-right"></i>
                <i v-if="mobile" class="fa fa-long-arrow-alt-down"></i>
            </span>
        </div>

        <span v-if="!mobile" class="evo-info has-text-weight-light has-text-centered" v-html="getEvoText(evo)"></span>
        <span v-if="mobile" class="evo-info has-text-weight-light has-text-centered" v-html="getEvoText(evo, true)"></span>
    </div>
</template>

<script>
import convertName from '@/mixins/convertName';
import evoInfo from '@/mixins/evoInfo';

export default {
    name: 'EvolutionArrows',
    props: ['chainLength', 'mobile', 'evo', 'stage', 'evoIndex'],
    mixins: [convertName, evoInfo]
};
</script>

<style scoped>
span {
    font-size: 1.3rem;
}

.evo-info {
    font-size: 0.7rem;
}

@media screen and (max-width: 768px) {
    span {
        margin: 20px 0px;
        font-size: 1.1rem;
    }
}

@media screen and (max-width: 468px) {
    span {
        margin: 10px 0px;
        font-size: 0.9rem;
    }

    .evo-info {
        font-size: 0.65rem;
    }
}
</style>
