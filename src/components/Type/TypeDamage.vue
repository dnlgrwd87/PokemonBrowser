<template>
    <div v-if="typeData" class="type-damage">
        <div class="columns">
            <div class="column offense-info">
                <h1 class="has-text-weight-bold">Offense</h1>
                <p v-if="typeData.doubleDamageTo.length">
                    <span class="is-capitalized">
                        <em>{{ typeName }}</em>
                    </span> moves are super-effective against:
                </p>
                <type-box v-for="type in typeData.doubleDamageTo" :key="type.name" :type="type" class="type-box"/>

                <p v-if="typeData.halfDamageTo">
                    <span class="is-capitalized">
                        <em>{{ typeName }}</em>
                    </span> moves are not very effect against:
                </p>
                <type-box v-for="type in typeData.halfDamageTo" :key="type.name" :type="type" class="type-box"/>

                <p v-if="typeData.noDamageTo.length">
                    <span class="is-capitalized">
                        <em>{{ typeName }}</em>
                    </span> moves have no effect on:
                </p>
                <type-box v-for="type in typeData.noDamageTo" :key="type.name" :type="type" class="type-box"/>
            </div>

            <div class="column defense-info">
                <h1 class="has-text-weight-bold">Defense</h1>
                <p v-if="typeData.doubleDamageFrom.length">
                    <span class="is-capitalized">
                        <em>{{ typeName }}</em>
                    </span> types are weak against:
                </p>
                <type-box v-for="type in typeData.doubleDamageFrom" :key="type.name" :type="type" class="type-box"/>

                <p v-if="typeData.halfDamageFrom.length">
                    <span class="is-capitalized">
                        <em>{{ typeName }}</em>
                    </span> types are resistant to:
                </p>
                <type-box v-for="type in typeData.halfDamageFrom" :key="type.name" :type="type" class="type-box"/>

                <p v-if="typeData.noDamageFrom.length">
                    <span class="is-capitalized">
                        <em>{{ typeName }}</em>
                    </span> types are immune to:
                </p>
                <type-box v-for="type in typeData.noDamageFrom" :key="type.name" :type="type" class="type-box"/>
            </div>
        </div>
    </div>
</template>

<script>
import TypeBox from '@/components/Reusable/TypeBox.vue';
import { mapState } from 'vuex';

export default {
    name: 'TypeDamage',
    props: ['typeName'],
    components: {
        TypeBox
    },
    data() {
        return {
            typeData: null
        };
    },
    methods: {
        loadTypeData() {
            this.typeData = this.storedTypes[this.typeName];
        }
    },
    computed: {
        ...mapState(['storedTypes'])
    },
    created() {
        this.loadTypeData();
    },
    watch: {
        '$route.params.type_name'() {
            this.loadTypeData();
        }
    }
};
</script>

<style scoped>
.type-damage {
    margin-bottom: 45px;
    font-size: 0.9rem;
}

.type-damage .columns {
    margin-top: 30px;
    margin-bottom: 20px;
}

p {
    margin-top: 15px;
}

.offense-info,
.defense-info {
    padding: 22px;
    box-shadow: 1px 1px 5px rgb(175, 175, 175);
    background: rgb(251, 251, 251);
    border-radius: 5px;
    margin-right: 10px;
    margin-left: 10px;
}

.type-box {
    margin-right: 5px;
    margin-bottom: 5px;
    margin-top: 5px;
}

@media screen and (max-width: 768px) {
    .offense-info {
        margin-bottom: 15px;
    }

    .type-damage {
        font-size: 0.8rem;
    }
}
</style>
