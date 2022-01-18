<template>
    <div
        @click="routeTo({ name: type, type: 'type' })"
        class="type has-text-centered"
        :style="{ background: getTypeColor(type) }"
    >
        <span>{{ type.toUpperCase() }}</span>
    </div>
</template>

<script>
import typeColors from '@/mixins/typeColors';
import routeTo from '@/mixins/routeTo';

export default {
    name: 'TypeBox',
    props: ['type'],
    mixins: [typeColors, routeTo],
};
</script>

<style scoped>
.type {
    display: inline-block;
    font-size: 0.7rem;
    width: 70px;
    margin: 0 auto;
    padding: 0;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    color: white;
    font-weight: bold;
    box-shadow: 0.5px 0.5px 2px gray;
    vertical-align: middle;
    cursor: pointer;
}

.type:hover {
    opacity: 0.7;
}
</style>
