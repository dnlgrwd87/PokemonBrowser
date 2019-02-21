<template>
    <div @click="routeTo({ name: pokemon.name, type: 'pokemon' })" class="pokemon-list-item columns is-vcentered has-text-weight-bold">
        <div class="column is-1">
            <img :src="require('../../assets/pokemon-large/' + pokemon.sprite)" class="sprite">
        </div>
        <div class="name-id column has-text-left">
            <span>{{ storedPokemonShort[pokemon.name].displayName }}</span>
            <br>
            <span class="pokemon-id">#{{ pokemon.alternateId || pokemon.id }}</span>
            <span v-if="showLearnLevel" class="learn-level">
                <br>
                <em>Lvl {{ pokemon.learnLevel }}</em>
            </span>
        </div>
        <div class="column types">
            <div v-for="(type, index) in types" :key="index" @click.stop="routeTo( { name: type, type: 'type' })" :class="{ 'second-type': index == 1}">
                <type-box :type="type"/>
            </div>
        </div>
        <div class="column">
            <span v-for="(ability, index) in pokemon.abilities.normal" @click.stop="routeTo({ name: ability.replace(' ', '-'), type: 'ability' })" :key="index" class="abilities">
                {{ convertName(ability) }}
                <br>
            </span>
        </div>
        <div class="column abilities">
            <span v-if="pokemon.abilities.hidden" v-for="(ability, index) in pokemon.abilities.hidden" @click.stop="routeTo({ name: ability.replace(' ', '-'), type: 'ability' })" :key="index" class="abilities">
                <em>{{ convertName(ability) }}</em>
                <br>
            </span>
            <span v-if="pokemon.abilities.hidden.length == 0" class="unclickable">&#8212;</span>
        </div>
        <div class="column is-4 stats">
            <div class="columns stat-cols">
                <div class="column">
                    <span class="stat-name">HP</span>
                    <br>
                    <span>{{ pokemon.baseStats.hp }}</span>
                </div>
                <div class="column">
                    <span class="stat-name">Atk</span>
                    <br>
                    <span>{{ pokemon.baseStats.attack }}</span>
                </div>
                <div class="column">
                    <span class="stat-name">Def</span>
                    <br>
                    <span>{{ pokemon.baseStats.defense }}</span>
                </div>
                <div class="column">
                    <span class="stat-name">SpA</span>
                    <br>
                    <span>{{ pokemon.baseStats.specialAttack }}</span>
                </div>
                <div class="column">
                    <span class="stat-name">SpD</span>
                    <br>
                    <span>{{ pokemon.baseStats.specialDefense }}</span>
                </div>
                <div class="column">
                    <span class="stat-name">Spd</span>
                    <br>
                    <span>{{ pokemon.baseStats.speed }}</span>
                </div>
                <div class="column">
                    <span class="stat-name">BST</span>
                    <br>
                    <span>{{ pokemon.baseStats.total }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import typeColors from '@/mixins/typeColors';
import convertName from '@/mixins/convertName';
import routeTo from '@/mixins/routeTo';
import TypeBox from '@/components/Reusable/TypeBox.vue';
import { mapState } from 'vuex';

export default {
    name: 'PokemonListItem',
    props: ['pokemon', 'showLearnLevel'],
    mixins: [typeColors, convertName, routeTo],
    components: {
        TypeBox
    },
    computed: {
        ...mapState(['storedPokemonShort']),
        types() {
            return this.pokemon.types.all || this.pokemon.types;
        }
    }
};
</script>
 
<style scoped>
.pokemon-list-item {
    padding: 0px 15px 0px 5px;
    margin-bottom: 25px;
    text-align: center;
    border-top: 1px solid rgb(238, 238, 238);
    border-left: 1px solid rgb(238, 238, 238);
    transition: all 0.2s ease-out;
    font-size: 0.8em;
    background: rgb(251, 251, 251);
    box-shadow: 1px 1px 4px rgb(195, 195, 195);
}

.pokemon-list-item:hover {
    box-shadow: 2px 2px 7px rgb(124, 124, 124);
}

.columns {
    margin: 0 auto;
}

.pokemon-list-item {
    margin: 0 auto;
    margin-bottom: 15px;
    cursor: pointer;
}

.sprite {
    min-width: 35px;
}

.name-id {
    max-width: 12%;
}

.abilities {
    cursor: pointer;
    font-weight: 500;
    color: rgb(0, 128, 255);
}

.abilities:hover {
    font-weight: bold;
}

.pokemon-id,
.learn-level {
    font-size: 0.7rem;
}

.pokemon-id {
    color: rgb(141, 141, 141);
}

.second-type {
    margin-top: 5px;
}

.unclickable {
    color: black;
}

.stat-cols .column {
    min-width: 14%;
}

.stat-name {
    color: rgb(169, 168, 168);
}
</style>
