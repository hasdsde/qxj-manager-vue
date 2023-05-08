<template>
    <div class="q-pa-md q-gutter-sm">
        <div class="q-pb-md">
            <q-btn color="primary" class="q-mr-md" label="新增" icon="add"/>
            <q-btn color="secondary" class="q-mr-md" label="修改" icon="update"/>
            <q-btn color="red" class="q-mr-md" label="删除" icon="delete"/>
        </div>
        <q-tree
                v-model:ticked="selected"
                tick-strategy="strict"
                :nodes="lazy"
                default-expand-all
                node-key="label"
                @lazy-load="onLazyLoad">
            <template v-slot:default-header="prop">
                <div class="row items-center">
                    <q-icon :name="prop.node.icon || 'sort'" color="primary" size="28px" class="q-mr-sm"/>
                    <div class="text-weight-bold " style="font-size: large">{{ prop.node.label }}</div>
                </div>
            </template>
        </q-tree>
    </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {api} from "boot/axios";

let nodes: any = ref([])
const lazy = ref(nodes)
const selected = ref([])

//@ts-ignore
function onLazyLoad({node, key, done, fail}) {

    //点击的是班级
    if (node.children.length > 0) {
        done([])
        return
    }
    //点击的是学院
    if (node.type == 'college') {
        getMajorId(node.id).then((res: any) => {
            res.data.forEach((item: any) => {
                item.label = item.name
                item.children = []
                item.lazy = true
                item.icon = 'biotech'
                item.type = 'major';
            })
            done(res.data)
        })
    }
    //点击的是专业
    if (node.type == 'major') {
        console.log(node)
        getGradeId(node.id, node.collegeId).then((res: any) => {
            res.data.forEach((item: any) => {
                item.label = item.name
                item.children = []
                item.lazy = true
                item.icon = 'sell'
                item.type = 'grade';
            })
            done(res.data)
        })
    }

    //点击的是年级
    if (node.type == 'grade') {
        getClass(node.id, node.collegeId,).then((res: any) => {
            res.data.forEach((item: any) => {
                item.label = item.name
                item.icon = 'school'
                item.type = 'class';
            })
            done(res.data)
        })
    }

}

loadPage()

function loadPage() {
    getColleges()
    console.log(nodes.value)
}


//获取全部学院信息
function getColleges() {
    api.get('/class/college').then((res: any) => {
        res.data.forEach((item: any) => {
            item.label = item.name
            item.type = 'college';
            item.lazy = true;
            item.children = []
            item.icon = 'apartment'
        })
        nodes.value = res.data
    })
}

//根据学院获取专业
async function getMajorId(collegeId: number): Promise<any> {
    return api.get('/class/major?collegeId=' + collegeId)
}

//根据学院获取年级
async function getGradeId(majorId: number, collegeId: number) {
    return api.get('/class/grade2?majorId=' + majorId + '&collegeId=' + collegeId)
}

//根据专业和年级获取班级
async function getClass(majorId: number, gradeId: number) {
    return api.get('/class', {
        params: {
            'majorId': majorId,
            'gradeId': gradeId
        }
    })
}
</script>

<style scoped>

</style>

