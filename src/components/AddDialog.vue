<template>
    <q-card class="dialog-width">
        <q-card-section>
            <div class="text-h6">{{ props.info.title }}</div>
        </q-card-section>

        <div v-for="item in column">
            <q-card-section class="q-pa-md" v-if="item.type=='primary-key'">
                <q-input v-model="item.value" :label="item.label" readonly/>
            </q-card-section>
            <q-card-section class="q-pa-md" v-if="item.type=='input'">
                <q-input v-model="item.value" :label="item.label"/>
            </q-card-section>
            <q-card-section class="q-pa-md" v-if="item.type=='number'">
                <q-input type="number" :rules="[val => val > 0 && val < 20229999999 || '数字非法']" v-model="item.value"
                         :label="item.label"/>
            </q-card-section>
            <q-card-section class="q-pa-md" v-if="item.type=='bool'">
                <q-toggle left-label :label="item.label" color="primary" v-model="item.value"/>
            </q-card-section>
        </div>

        <q-card-section class="text-primary">

            <div class="row justify-between">
                <div class="col">
                    <q-btn color="primary" class="text-left" label="取消" v-close-popup/>
                </div>
                <div class="col text-right">
                    <q-btn flat color="red" label="重置" v-close-popup/>
                    <q-btn color="primary" label="提交" v-close-popup/>
                </div>
            </div>
        </q-card-section>
    </q-card>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const props = defineProps(['info', 'column'])
const column = ref(props.column)
</script>


