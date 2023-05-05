<template>
    <q-card class="dialog-width">
        <q-card-section>
            <div class="text-h6">{{ info.title }}</div>
        </q-card-section>

        <div v-for="item in column">
            <!--     主键       -->
            <q-card-section class="q-pa-md" v-if="item.type=='primary-key' && info.mode =='update'">
                <q-input v-model="item.value" :label="item.label" readonly/>
            </q-card-section>
            <!--      一般表单      -->
            <q-card-section class="q-pa-md" v-if="item.type=='input'">
                <q-input v-model="item.value" :label="item.label"/>
            </q-card-section>
            <!--      只能填数字      -->
            <q-card-section class="q-pa-md" v-if="item.type=='number'">
                <q-input type="number" :rules="[val => val > 0 && val < 20229999999 || '数字非法']" v-model="item.value"
                         :label="item.label"/>
            </q-card-section>
            <!--      开关表单，值仅限为01      -->
            <q-card-section class="q-pa-md" v-if="item.type=='bool'">
                {{ item.value }}
                <q-toggle left-label :label="item.label" color="primary" :true-value="1" :false-value="0"
                          v-model="item.value"/>
            </q-card-section>
        </div>

        <q-card-section class="text-primary">

            <div class="row justify-between">
                <div class="col">
                    <q-btn color="primary" class="text-left" label="取消" v-close-popup @click="handleCancel"/>
                </div>
                <div class="col text-right">
                    <q-btn flat color="red" label="重置" @click="handleReset"/>
                    <q-btn color="primary" label="提交" v-close-popup @click="handleSubmit"/>
                </div>
            </div>
        </q-card-section>
    </q-card>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const props = defineProps(['info', 'column'])
const column = ref(props.column)
const info = ref(props.info)

function handleReset() {
    column.value.forEach((item: any) => {
        item.value = null;
    })
}

function handleSubmit() {
    column.value.forEach((item: any) => {
        console.log(item.value)
    })
}

function handleCancel() {
    column.value.forEach((item: any) => {
        console.log(item.value)
    })
}
</script>


