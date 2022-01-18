<template>
    <div class="pokemon-breeding">
        <h3 class="has-text-weight-bold">Breeding</h3>

        <table class="table">
            <tr>
                <td>
                    <p>Egg Groups</p>
                </td>
                <td>
                    <span
                        v-for="(group, index) in Object.keys(info.eggGroups)"
                        :key="index"
                        class="is-capitalized"
                    >
                        <span v-if="index > 0">,</span>
                        {{ group }}
                    </span>
                </td>
            </tr>
            <tr>
                <td>Gender</td>
                <td v-if="info.genderRatio != 'genderless'">
                    <span>{{ info.genderRatio.male }}% male,</span>
                    <span>{{ info.genderRatio.female }}% female</span>
                </td>
                <td v-else>Genderless</td>
            </tr>
            <tr>
                <td>Egg cycles</td>
                <td>
                    {{ info.eggCycles }}
                    <span class="has-text-grey"
                        >({{ calculatedEggCycles }} steps)</span
                    >
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'PokemonBreeding',
    props: ['info'],
    computed: {
        calculatedEggCycles() {
            return (this.info.eggCycles * 256).toLocaleString();
        },
    },
};
</script>

<style scoped>
h3 {
    margin-bottom: 17px;
}

.table td {
    vertical-align: middle;
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
