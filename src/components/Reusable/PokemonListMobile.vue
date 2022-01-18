<template>
    <div class="search-results">
        <div class="columns is-mobile is-multiline pokemon-container">
            <pokemon-grid-item
                v-for="pokemon in pokemonList"
                :key="pokemon.id"
                :pokemon="pokemon"
                :showLearnLevel="showLearnLevel"
                class="column is-6-mobile is-4-tablet is-3-desktop is-one-fifth-widescreen"
            />
        </div>
    </div>
</template>

<script>
import PokemonGridItem from '@/components/Reusable/PokemonGridItem.vue';

export default {
    name: 'PokemonListMobile',
    props: ['pokemonList', 'showLearnLevel'],
    components: {
        PokemonGridItem,
    },
};
</script>

<style scoped>
.columns {
    text-align: center;
    font-weight: bold;
}

.pokemon-container .column {
    margin-bottom: 20px;
    margin-top: 20px;
    line-height: 20px;
    cursor: pointer;
    border-radius: 5px;
}

.columns:last-child {
    margin-bottom: 0;
}
</style>
