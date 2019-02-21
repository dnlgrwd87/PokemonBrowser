<template>
    <div class="banner">
        <section class="hero" :style="{ background: typeColor }">
            <div class="hero-body has-text-centered">
                <div v-if="info">
                    <h1 v-if="info.alternateForms" class="title has-text-white">{{ convertName(info.name, true) }}</h1>
                    <h1 v-if="!info.alternateForms" class="title has-text-white">{{ convertName(info.name) }}</h1>
                    <h2 class="subtitle has-text-white">#{{ info.alternateId || info.id }}</h2>
                </div>
                <div v-if="otherInfo">
                    <h1 class="title has-text-white">{{ convertName(otherInfo) }}</h1>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import convertName from '@/mixins/convertName';

export default {
    name: 'Banner',
    props: ['typeColor', 'info', 'otherInfo'],
    mixins: [convertName]
};
</script>

<style scoped>
.hero {
    box-shadow: 0 0 5px rgb(194, 194, 194);
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.hero-body {
    padding: 2.5rem 1rem;
    text-shadow: 1.5px 1.5px 3px rgb(77, 77, 77);
}

@media screen and (max-width: 768px) {
    .hero-body {
        padding: 25px;
    }

    .title {
        font-size: 1.4rem;
    }

    .subtitle {
        font-size: 1rem;
    }
}
</style>
