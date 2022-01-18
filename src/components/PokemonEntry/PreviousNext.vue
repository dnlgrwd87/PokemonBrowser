<template>
    <div class="is-mobile">
        <a
            v-if="previous"
            @click="routeTo({ name: previous.name, type: 'pokemon' })"
            class="previous level-item"
        >
            <span :style="{ color: typeColor }">
                <i class="fa fa-angle-double-left"></i>
            </span>
            <span>
                <span class="pokemon-id">#{{ previous.id }}</span>
                {{ previous.displayName }}
            </span>
        </a>

        <a
            v-if="next"
            @click="routeTo({ name: next.name, type: 'pokemon' })"
            class="next level-item"
        >
            <span>
                <span class="pokemon-id">#{{ next.id }}</span>
                {{ next.displayName }}
            </span>
            <span :style="{ color: typeColor }">
                <i class="fa fa-angle-double-right"></i>
            </span>
        </a>
    </div>
</template>

<script>
import routeTo from '@/mixins/routeTo';

export default {
    name: 'PreviousNext',
    props: ['typeColor', 'previous', 'next'],
    mixins: [routeTo],
};
</script>

<style scoped>
.previous,
.next {
    position: absolute;
    top: -10px;
    font-size: 0.9rem;
    color: black;
    text-shadow: 0.35px 0.35px 0.5px gray;
    padding-top: 10px;
}

.previous {
    left: 5px;
}

.next {
    right: 5px;
}

.pokemon-id {
    color: rgb(163, 161, 161);
    font-size: 0.8rem;
}

.fa-angle-double-left {
    margin-right: 7px;
}

.fa-angle-double-right {
    margin-left: 7px;
}

@media screen and (max-width: 1024px) {
    .previous,
    .next {
        font-size: 0.8rem;
    }

    .pokemon-id {
        font-size: 0.7rem;
    }
}
</style>
