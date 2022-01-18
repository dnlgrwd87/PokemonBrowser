<template>
    <div v-if="pokemon">
        <div
            @click="routeTo({ name: pokemon.name, type: 'pokemon' })"
            class="grid-item"
        >
            <img
                :src="require('../../assets/pokemon-large/' + pokemon.sprite)"
                class="sprite"
            />
            <div>
                <span class="pokemon-id">
                    #{{ pokemon.alternateId || pokemon.id }}
                </span>
                <span class="pokemon-name">
                    {{ storedPokemonShort[pokemon.name].displayName }}
                </span>
                <br />
                <span
                    v-for="(type, index) in types"
                    :key="index"
                    :style="{ color: getTypeColor(type) }"
                    class="type-text"
                >
                    <span v-if="index > 0" class="type-seperator-dot"
                        >&#183;</span
                    >
                    <span
                        class="type-clickable"
                        @click="routeTo({ name: type, type: 'type' })"
                        >{{ type.toUpperCase() }}</span
                    >
                </span>
                <span v-if="showLearnLevel" class="learn-level">
                    <br />
                    <em>Lvl {{ pokemon.learnLevel }}</em>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import typeColors from '@/mixins/typeColors';
import routeTo from '@/mixins/routeTo';
import { mapState } from 'vuex';

export default {
    name: 'PokemonGridItem',
    props: ['pokemon', 'showLearnLevel'],
    mixins: [typeColors, routeTo],
    computed: {
        ...mapState(['storedPokemonShort']),
        types() {
            return this.pokemon.types.all || this.pokemon.types;
        },
    },
};
</script>

<style scoped>
.sprite {
    max-width: 75px;
}

.grid-item {
    font-size: 0.8rem;
    border-radius: 5px;
}

.pokemon-id {
    color: rgb(141, 141, 141);
    font-size: 0.7rem;
    margin-right: 3px;
}

.type-text {
    font-size: 0.7rem;
}

.type-clickable:hover {
    opacity: 0.65;
}

.type-seperator-dot {
    color: black;
    padding-left: 3px;
    padding-right: 3px;
}

@media screen and (max-width: 768px) {
    .grid-item {
        font-size: 0.8rem;
    }

    .pokemon-id,
    .learn-level {
        font-size: 0.7rem;
    }

    .sprite {
        max-width: 70px;
    }
}

@media screen and (max-width: 450px) {
    .grid-item {
        font-size: 0.7rem;
    }

    .sprite {
        max-width: 60px;
    }

    .type-text {
        font-size: 0.6rem;
    }

    .pokemon-id,
    .learn-level {
        font-size: 0.6rem;
    }
}
</style>
