<template>
    <div class="pokemon-moves">
        <div class="tables">
            <table class="table">
                <tr class="headers">
                    <td v-if="showLevel" class="lvl">Lvl</td>
                    <td>Name</td>
                    <td class="has-text-centered">Type</td>
                    <td class="category has-text-centered">Category</td>
                    <td class="power has-text-centered">Power</td>
                    <td class="accuracy has-text-centered">Acc.</td>
                    <td class="pp is-hidden-mobile has-text-centered">PP</td>
                    <td class="effect is-hidden-mobile is-hidden-tablet-only">
                        Effect
                    </td>
                </tr>

                <tr v-for="move in moves" :key="move.id">
                    <td class="lvl" v-if="showLevel && move.learnLevel > 1">
                        {{ move.learnLevel }}
                    </td>
                    <td class="lvl" v-if="showLevel && move.learnLevel <= 1">
                        &#8212;
                    </td>
                    <td
                        @click="routeTo({ name: move.name, type: 'move' })"
                        class="name"
                    >
                        {{ convertName(move.name) }}
                    </td>
                    <td class="has-text-centered">
                        <type-box :type="move.type" />
                    </td>
                    <td class="category has-text-centered">
                        {{ convertName(move.category) }}
                    </td>
                    <td class="power has-text-centered" v-if="move.power">
                        {{ move.power }}
                    </td>
                    <td class="power has-text-centered" v-else>&#8212;</td>
                    <td class="accuracy has-text-centered" v-if="move.accuracy">
                        {{ move.accuracy }}
                    </td>
                    <td class="accuracy has-text-centered" v-else>&#8212;</td>
                    <td class="pp is-hidden-mobile has-text-centered">
                        {{ move.pp }}
                    </td>
                    <td class="effect is-hidden-mobile is-hidden-tablet-only">
                        {{
                            move.shortEffectInfo.replace('$effect_chance', '10')
                        }}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import routeTo from '@/mixins/routeTo';
import convertName from '@/mixins/convertName';
import TypeBox from '@/components/Reusable/TypeBox.vue';

export default {
    name: 'PokemonMoves',
    mixins: [routeTo, convertName],
    props: ['moves', 'showLevel'],
    components: {
        TypeBox,
    },
};
</script>

<style scoped>
.table {
    font-size: 0.8rem;
    background: white;
}

td {
    width: 10%;
}

.headers td {
    font-weight: bold;
}

.power,
.accuracy,
.pp {
    width: 8%;
}

.lvl {
    width: 2%;
}

.effect {
    width: 30%;
}

.name {
    max-width: 60px;
    color: rgb(25, 125, 225);
    cursor: pointer;
}

.name:hover {
    font-weight: bold;
}

.pokemon-moves .tables td,
.pokemon-moves .tables th {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 0;
    vertical-align: middle;
}

@media screen and (max-width: 950px) {
    .table {
        font-size: 0.8rem;
    }
}

@media screen and (max-width: 520px) {
    .accuracy {
        display: none;
    }
}

@media screen and (max-width: 475px) {
    .power {
        display: none;
    }
}
</style>
