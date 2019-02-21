<template>
    <div class="move-info">
        <table class="table">
            <tr>
                <td>
                    <p>Description</p>
                </td>
                <td>{{ move.flavorText }}</td>
            </tr>
            <tr>
                <td>
                    <p>Effect</p>
                </td>
                <td>{{ move.shortEffectInfo }}</td>
            </tr>
            <tr>
                <td>
                    <p>Type</p>
                </td>
                <td>
                    <span class="type">
                        <type-box :type="move.type"/>
                    </span>
                </td>
            </tr>
            <tr>
                <td>
                    <p>Category</p>
                </td>
                <td>{{ convertName(move.category) }}</td>
            </tr>
            <tr>
                <td>
                    <p>Power</p>
                </td>
                <td>{{ move.power || '&#8212;' }}</td>
            </tr>
            <tr>
                <td>
                    <p>Accuracy</p>
                </td>
                <td>{{ move.accracy || '&#8212;' }}</td>
            </tr>
            <tr>
                <td>
                    <p>PP</p>
                </td>
                <td>{{ move.pp }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import convertName from '@/mixins/convertName';
import TypeBox from '@/components/Reusable/TypeBox.vue';

export default {
    name: 'MoveInfo',
    mixins: [convertName],
    props: ['move'],
    components: {
        TypeBox
    }
};
</script>

<style scoped>
.move-info {
    font-size: 0.9rem;
}

li {
    list-style: none;
}

.table td {
    vertical-align: middle;
    padding-bottom: 7px;
}

tr td:first-child {
    text-align: right;
    color: gray;
    font-weight: bold;
}

tr:last-child td {
    border: none;
}

@media screen and (max-width: 768px) {
    .move-info {
        font-size: 0.8rem;
    }
}
</style>