<template>
    <div>
        <banner :typeColor="'lightgray'" :otherInfo="ability" />
        <div class="main-container bottom-margin">
            <div class="ability-info">
                <h1>
                    <strong>Description:</strong>
                </h1>
                <p>{{ abilityInfo }}</p>
            </div>

            <div v-if="normalAbilityPokemon.length > 0">
                <h2 class="header-container">
                    Pokémon with {{ convertName(ability) }}
                </h2>

                <pokemon-list
                    :pokemonList="normalAbilityPokemon"
                    class="is-hidden-mobile is-hidden-tablet-only"
                />
                <pokemon-list-mobile
                    :pokemonList="normalAbilityPokemon"
                    class="is-hidden-desktop"
                />
            </div>

            <div v-if="hiddenAbilityPokemon.length > 0">
                <h2 class="header-container">
                    {{ convertName(ability) }} as a hidden ability
                </h2>
                <pokemon-list
                    :pokemonList="hiddenAbilityPokemon"
                    class="is-hidden-mobile is-hidden-tablet-only"
                />
                <pokemon-list-mobile
                    :pokemonList="hiddenAbilityPokemon"
                    class="is-hidden-desktop"
                />
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init';
import convertName from '@/mixins/convertName';
import Banner from '@/components/Layout/Banner.vue';
import PokemonList from '@/components/Reusable/PokemonList.vue';
import PokemonListMobile from '@/components/Reusable/PokemonListMobile.vue';

import { mapState } from 'vuex';
import { mapActions } from 'vuex';

export default {
    name: 'PokemonAbility',
    mixins: [convertName],
    components: {
        Banner,
        PokemonList,
        PokemonListMobile,
    },
    data() {
        return {
            abilityInfo: '',
            normalAbilityPokemon: [],
            hiddenAbilityPokemon: [],
            ability: this.$route.params.ability_name,
        };
    },
    methods: {
        async getAbilityInfo() {
            const abilityInfo = await db
                .collection('abilities')
                .doc(this.ability)
                .get();

            this.abilityInfo = abilityInfo.data().effect;
        },
        getAbilityPokemon() {
            Object.values(this.storedPokemonShort).forEach((pokemon) => {
                if (pokemon.abilities.normal.includes(this.ability)) {
                    this.normalAbilityPokemon.push(pokemon);
                }
                if (pokemon.abilities.hidden.includes(this.ability)) {
                    this.hiddenAbilityPokemon.push(pokemon);
                }
            });
        },
    },
    computed: {
        ...mapState(['storedPokemonShort']),
    },
    created() {
        this.getAbilityInfo();
        this.getAbilityPokemon();
    },
    watch: {
        '$route.params.ability_name'() {
            this.ability = this.$route.params.ability_name;
            this.normalAbilityPokemon = [];
            this.hiddenAbilityPokemon = [];
            this.getAbilityInfo();
            this.getAbilityPokemon();
        },
    },
};
</script>

<style scoped>
.header-container {
    background: rgb(167, 165, 165);
}

.ability-info {
    margin-top: 45px;
    margin-bottom: 30px;
    font-size: 0.9rem;
}

@media screen and (max-width: 950px) {
    .ability-info {
        font-size: 0.8rem;
        margin: 45px auto 25px;
    }
}
</style>
