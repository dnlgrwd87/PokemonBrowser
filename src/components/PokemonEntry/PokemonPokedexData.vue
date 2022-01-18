<template>
    <div class="pokemon-general is-capitalized">
        <h3 class="has-text-weight-bold">Pokédex Data</h3>

        <table class="table">
            <tr>
                <td>
                    <p>National №</p>
                </td>
                <td>{{ info.alternateId || info.id }}</td>
            </tr>
            <tr>
                <td>Type</td>
                <td>
                    <span
                        v-for="(type, index) in info.types"
                        :key="index"
                        class="type"
                    >
                        <type-box :type="type" />
                    </span>
                </td>
            </tr>
            <tr>
                <td>Species</td>
                <td>{{ info.species }} Pokémon</td>
            </tr>
            <tr>
                <td>Height</td>
                <td>{{ info.height }}</td>
            </tr>
            <tr>
                <td>Weight</td>
                <td>{{ info.weight }}</td>
            </tr>
            <tr>
                <td>Abilities</td>
                <td>
                    <li
                        v-for="ability in info.abilities.normal"
                        :key="ability"
                        @click="routeToAbility(ability)"
                        class="abilities"
                    >
                        {{ ability }}
                    </li>
                    <li
                        v-for="ability in info.abilities.hidden"
                        :key="ability"
                        @click="routeToAbility(ability)"
                        class="abilities"
                    >
                        {{ ability }}
                        <span class="has-text-grey">(hidden)</span>
                    </li>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import routeTo from '@/mixins/routeTo';
import TypeBox from '@/components/Reusable/TypeBox.vue';

export default {
    name: 'PokemonPokedexData',
    props: ['info'],
    mixins: [routeTo],
    components: {
        TypeBox,
    },
    methods: {
        routeToAbility(ability) {
            this.routeTo({
                name: ability.replace(' ', '-'),
                type: 'ability',
            });
        },
    },
};
</script>

<style scoped>
li {
    list-style: none;
}

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

.type:first-child {
    margin-right: 5px;
}

.abilities {
    cursor: pointer;
    font-weight: 500;
    color: rgb(25, 125, 225);
}

.abilities:hover {
    font-weight: bold;
}
</style>
