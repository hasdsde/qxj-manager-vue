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
                <q-select class="q-mt-md" filled v-model="major" :options="majors" label="专业"
                          @update:model-value="onMajorUpdate"
                />
                <q-select class="q-mt-md" filled v-model="grade" :options="grades" label="年级"
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
//学院
const colleges = ref([])
const college: any = ref()
//年级
const grades = ref([])
const grade: any = ref([])
//专业
const majors = ref([])
const major = ref()
//班级
const classes = ref([])
const classe = ref()
getColleges()

// 用不着了草
const emit = defineEmits(['func'])


// 向父级传值
function handleOK() {
    class_id.value = classe.value.id
    emit('func', class_id.value)
}

//获取全部学院信息
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
    major.value = null
    grade.value = null
    classe.value = null
}

// 修改专业时触发
function onMajorUpdate() {
    getGradeId()
}

//根据学院获取专业
function getMajorId() {
    api.get('/class/major?collegeId=' + college.value.id).then((res: any) => {
        res.data.forEach((item: any) => {
            item.label = item.name
        })
        majors.value = res.data
    })
}

//根据学院获取年级
function getGradeId() {
    api.get('/class/grade2?collegeId=' + college.value.id + '&majorId=' + major.value.id).then((res: any) => {
        console.log(res)
        res.data.forEach((item: any) => {
            item.label = item.name
        })
        grades.value = res.data
    })
}

//根据专业和年级获取班级
function onClassUpdate() {
    api.get('/class', {
        params: {
            'majorId': major.value.id,
            'gradeId': grade.value.id
        }
    }).then((res: any) => {
        res.data.forEach((item: any) => {
            item.label = item.name + "(" + item.adminName + ")"
        })
        classes.value = res.data
    })
}
</script>
