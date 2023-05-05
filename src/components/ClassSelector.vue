<template>
    <q-field stack-label label="班级">
        <template v-slot:append>
            <q-btn round dense flat icon="add" @click="dialog=true"/>
        </template>
        <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0" v-if="class_id!=null">
                {{ college.name + '-' + grade.name + '-级' + major.name + classe.name }}
            </div>
        </template>
    </q-field>

    <q-dialog v-model="dialog">
        <q-card style="width: 300px">
            <q-card-section>
                <div class="text-h6">班级选择器</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-select class="q-mt-md" filled v-model="college" :options="colleges" label="学院"
                          @update:model-value="onCollegeUpdate"/>
                <q-select class="q-mt-md" filled v-model="grade" :options="grades" label="年级"/>
                <q-select class="q-mt-md" filled v-model="major" :options="majors" label="专业"
                          @update:model-value="onClassUpdate"/>
                <q-select class="q-mt-md" filled v-model="classe" :options="classes" label="班级"/>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="确定" color="primary" v-close-popup @click="handleOK"/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script lang="ts" setup>

import {ref} from "vue";
import {api} from "boot/axios";

const class_id = ref()
const dialog = ref(false)
const colleges = ref([])
const college: any = ref()
const grades = ref([])
const grade: any = ref([])
const majors = ref([])
const major = ref()
const classes = ref([])
const classe = ref()
getColleges()

// 用不着了草
// const emit = defineEmits(['func'])
// emit('func', 'haha')

// 向父级传值
function handleOK() {
    class_id.value = classe.value.id
}

function getColleges() {
    api.get('/class/college').then((res: any) => {
        res.data.forEach((item: any) => {
            item.label = item.name
        })
        colleges.value = res.data
    })
}

// 修改学院时触发
function onCollegeUpdate() {
    getMajorId()
    getGradeId()
    major.value = null
    grade.value = null
    classe.value = null
}

function getMajorId() {
    api.get('/class/major?collegeId=' + college.value.id).then((res: any) => {
        res.data.forEach((item: any) => {
            item.label = item.name
        })
        majors.value = res.data
    })
}

function getGradeId() {
    api.get('/class/grade?collegeId=' + college.value.id).then((res: any) => {
        res.data.forEach((item: any) => {
            item.label = item.name
        })
        grades.value = res.data
    })
}

function onClassUpdate() {
    api.get('/class', {
        params: {
            'majorId': major.value.id,
            'gradeId': grade.value.id
        }
    }).then((res: any) => {
        res.data.forEach((item: any) => {
            item.label = item.name
        })
        console.log(res.data)
        classes.value = res.data
    })
}
</script>
