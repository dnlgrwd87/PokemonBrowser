<template>
    <div class="pokemon-training">
        <h3 class="has-text-weight-bold">Training</h3>

        <table class="table">
            <tr>
                <td>
                    <p>EV Yield</p>
                </td>
                <td>
                    <span
                        v-for="(ev, index) in Object.keys(info.evYield)"
                        :key="index"
                    >
                        {{ info.evYield[ev] }} {{ convertName(ev) }}
                        <br v-if="index != Object.keys(info.evYield).length - 1" />
                    </span>
                </td>
            </tr>
            <tr>
                <td>Catch Rate</td>
                <td>{{ info.captureRate }}</td>
            </tr>
            <tr>
                <td>Base Happiness</td>
                <td>{{ info.baseHappiness }}</td>
            </tr>
            <tr>
                <td>Base Exp</td>
                <td>{{ info.baseExp }}</td>
            </tr>
            <tr>
                <td>Growth Rate</td>
                <td>{{ convertName(info.growthRate) }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import convertName from '@/mixins/convertName';

export default {
    name: 'PokemonTraining',
    props: ['info'],
    mixins: [convertName],
};
</script>

<style scoped>
h3 {
    margin-bottom: 17px;
}

.table td {
    vertical-align: middle;
    padding-bottom: 7px;
}

tr td:first-child {
    text-align: right;
    color: gray;
    font-weight: bold;
}

tr:last-child td {
    border: none;
}
</style>
