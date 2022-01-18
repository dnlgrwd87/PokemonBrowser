<template>
    <div class="search-results">
        <div class="pokemon-list-container">
            <pokemon-list-item
                v-for="(pokemon, index) in pokemonList"
                :key="index"
                :pokemon="pokemon"
                :showLearnLevel="showLearnLevel"
            />
        </div>
    </div>
</template>

<script>
import PokemonListItem from '@/components/Reusable/PokemonListItem.vue';

export default {
    name: 'PokemonList',
    props: ['pokemonList', 'showLearnLevel'],
    components: {
        PokemonListItem,
    },
};
</script>

<style scoped>
.pokemon-list-container {
    margin: 0 auto;
    margin-top: 10px;
}
</style>
