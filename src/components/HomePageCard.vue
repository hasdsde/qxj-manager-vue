<template>
    <q-card class="my-card q-ma-md  text-white" :class="'bg-'+props.color" style="min-width: 300px;min-height: 200px">
        <q-card-section>
            <div class="text-h6 text-center">{{ props.title }}</div>
        </q-card-section>

        <q-separator dark/>

        <q-card-section class="text-center text-h4 text-bold">
            {{ props.data }}
        </q-card-section>

        <q-separator dark/>
        <q-card-actions class="text-center justify-around">
            <q-btn flat class="full-width" :to="props.link">前往</q-btn>
        </q-card-actions>
    </q-card>
</template>

<script lang="ts" setup>
const props = defineProps(['title', 'color', 'data', 'link'])
</script>


