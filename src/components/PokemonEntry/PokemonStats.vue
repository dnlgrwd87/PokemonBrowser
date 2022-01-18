<template>
    <div class="pokemon-stats">
        <div>
            <h3 class="stats-header has-text-weight-bold">
                Stats:
                <span class="tabs is-small is-toggle">
                    <ul>
                        <li
                            @click="changeStats('base')"
                            :class="{ 'is-active': activeStat === 'base' }"
                        >
                            <a>Base</a>
                        </li>
                        <li
                            @click="changeStats('min')"
                            :class="{ 'is-active': activeStat === 'min' }"
                        >
                            <a>Min</a>
                        </li>
                        <li
                            @click="changeStats('max')"
                            :class="{ 'is-active': activeStat === 'max' }"
                        >
                            <a>Max</a>
                        </li>
                    </ul>
                </span>
            </h3>

            <table class="table">
                <tbody>
                    <tr>
                        <td class="has-text-right">HP</td>
                        <td>{{ stats.hp }}</td>
                        <td>
                            <div
                                class="stat-bar"
                                :style="{
                                    width:
                                        (stats.hp / highestStat) * 170 + 'px',
                                    background: typeColor,
                                }"
                            ></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="has-text-right">Attack</td>
                        <td>{{ stats.attack }}</td>
                        <td>
                            <div
                                class="stat-bar"
                                :style="{
                                    width:
                                        (stats.attack / highestStat) * 170 +
                                        'px',
                                    background: typeColor,
                                }"
                            ></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="has-text-right">Defense</td>
                        <td>{{ stats.defense }}</td>
                        <td>
                            <div
                                class="stat-bar"
                                :style="{
                                    width:
                                        (stats.defense / highestStat) * 170 +
                                        'px',
                                    background: typeColor,
                                }"
                            ></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="has-text-right">Sp. Atk</td>
                        <td>{{ stats.specialAttack }}</td>
                        <td>
                            <div
                                class="stat-bar"
                                :style="{
                                    width:
                                        (stats.specialAttack / highestStat) *
                                            170 +
                                        'px',
                                    background: typeColor,
                                }"
                            ></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="has-text-right">Sp. Def</td>
                        <td>{{ stats.specialDefense }}</td>
                        <td>
                            <div
                                class="stat-bar"
                                :style="{
                                    width:
                                        (stats.specialDefense / highestStat) *
                                            170 +
                                        'px',
                                    background: typeColor,
                                }"
                            ></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="has-text-right">Speed</td>
                        <td>{{ stats.speed }}</td>
                        <td>
                            <div
                                class="stat-bar"
                                :style="{
                                    width:
                                        (stats.speed / highestStat) * 170 +
                                        'px',
                                    background: typeColor,
                                }"
                            ></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="has-text-right">
                            <strong>Total</strong>
                        </td>
                        <td>
                            <strong>{{ statsTotal }}</strong>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import statCalculator from '@/mixins/statCalculator';
import typeColors from '@/mixins/typeColors';

export default {
    name: 'PokemonStats',
    props: ['info'],
    mixins: [statCalculator, typeColors],
    data() {
        return {
            stats: {
                hp: '',
                attack: '',
                defense: '',
                specialAttack: '',
                specialDefense: '',
                speed: '',
            },
            activeStat: 'base',
        };
    },
    methods: {
        getStats() {
            this.stats.hp = this.info.baseStats.hp;
            this.stats.attack = this.info.baseStats.attack;
            this.stats.defense = this.info.baseStats.defense;
            this.stats.specialAttack = this.info.baseStats.specialAttack;
            this.stats.specialDefense = this.info.baseStats.specialDefense;
            this.stats.speed = this.info.baseStats.speed;
        },
        changeStats(stat) {
            this.activeStat = stat;
            if (stat === 'base') this.stats = this.baseStats;
            if (stat === 'min') this.stats = this.minStats;
            if (stat === 'max') this.stats = this.maxStats;
            if (this.info.name === 'shedinja') this.stats.hp = 1;
        },
    },
    computed: {
        typeColor() {
            return this.getTypeColor(this.info.types[0]);
        },
        highestStat() {
            return Math.max(...Object.values(this.stats));
        },
        statsTotal() {
            return Object.values(this.stats).reduce((acc, val) => acc + val);
        },
        baseStats() {
            return {
                hp: this.info.baseStats.hp,
                attack: this.info.baseStats.attack,
                defense: this.info.baseStats.defense,
                specialAttack: this.info.baseStats.specialAttack,
                specialDefense: this.info.baseStats.specialDefense,
                speed: this.info.baseStats.speed,
            };
        },
        minStats() {
            return {
                hp: this.minHp(this.info.baseStats.hp),
                attack: this.minStat(this.info.baseStats.attack),
                defense: this.minStat(this.info.baseStats.defense),
                specialAttack: this.minStat(this.info.baseStats.specialAttack),
                specialDefense: this.minStat(
                    this.info.baseStats.specialDefense
                ),
                speed: this.minStat(this.info.baseStats.speed),
            };
        },
        maxStats() {
            return {
                hp: this.maxHp(this.info.baseStats.hp),
                attack: this.maxStat(this.info.baseStats.attack),
                defense: this.maxStat(this.info.baseStats.defense),
                specialAttack: this.maxStat(this.info.baseStats.specialAttack),
                specialDefense: this.maxStat(
                    this.info.baseStats.specialDefense
                ),
                speed: this.maxStat(this.info.baseStats.speed),
            };
        },
    },
    created() {
        this.getStats();
    },
    watch: {
        info() {
            this.getStats();
            this.activeStat = 'base';
        },
    },
};
</script>

<style scoped>
.stats-header {
    position: relative;
    margin-bottom: 20px;
}

.tabs.is-toggle {
    font-size: 0.7rem;
    position: absolute;
    top: 0;
    left: 50px;
}

.tabs.is-toggle li.is-active a {
    background: rgb(179, 179, 179);
    border: 1px solid rgb(179, 179, 179);
}

.tabs.is-toggle li a {
    padding: 1px 12px;
    background: white;
}

.table td {
    vertical-align: middle;
    padding-bottom: 7px;
}

tr td:first-child {
    text-align: right;
    color: gray;
}

.stat-bar {
    height: 12px;
    margin-top: 3px;
    border-radius: 2px;
    box-shadow: 1px 1px 2px gray;
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
