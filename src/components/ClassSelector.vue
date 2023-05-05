<template>
    <q-input bottom-slots v-model="class_id" label="选择班级" counter readonly
             :rules="[ val => val && val.length > 0 || '班级不能为空']">
        <template v-slot:append>
            <q-btn round dense flat icon="add" @click="dialog=true"/>
        </template>
    </q-input>

    <q-dialog v-model="dialog">
        <q-card>
            <q-card-section>
                <div class="text-h6">班级选择器</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas
                eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus
                minima, porro labore.
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="确定" color="primary" v-close-popup/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script lang="ts" setup>

import {ref} from "vue";

const class_id = ref()
const dialog = ref(false)
</script>
