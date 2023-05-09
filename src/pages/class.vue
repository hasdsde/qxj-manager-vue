<template>
    <div class="q-pa-md q-gutter-sm">
        <div class="q-pb-md">
            <q-btn color="primary" class="q-mr-md" label="新增" icon="add" @click="newItem"/>
            <q-btn color="primary" class="q-mr-md" label="新增学院" icon="apartment" @click="newCollege"/>
            <q-btn color="secondary" class="q-mr-md" label="修改" icon="update" @click="updateItem"/>
            <q-btn color="red" class="q-mr-md" label="删除" icon="delete" @click="deleteItem"/>
        </div>
        <q-tree
                :nodes="lazy"
                default-expand-all
                node-key="label"
                @lazy-load="onLazyLoad">
            <template v-slot:default-header="prop">
                <div class="row items-center">
                    <q-checkbox v-model="prop.node.selected" @update:model-value="getSelect"
                                @click="defineCheck(prop.node)"/>
                    <q-icon :name="prop.node.icon || 'sort'" color="primary" size="28px" class="q-mr-sm"/>
                    <div class="text-weight-bold " style="font-size: large">{{ prop.node.label }}</div>
                </div>
            </template>
        </q-tree>
    </div>

  <!-- 新增班级 -->
    <q-dialog v-model="dialog">
        <q-card style="min-width: 20%;">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">新建班级</div>
                <q-space/>
                <q-btn icon="close" flat round dense v-close-popup/>
            </q-card-section>
            <q-card-section>
                <q-form class="q-gutter-md">
                    <q-input class="q-pa-sm" filled v-model="className" label="班级名称"/>
                    <q-select class="q-pa-sm" filled v-model="adminId" :options="adminInfo" label="管理员"/>
                </q-form>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn flat label="确定" type="reset" color="primary" @click="newClass"/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {api} from "boot/axios";
import {CommonWarn} from "components/commonResults";
import {commonCheckResponse, getClass, getGradeId, getMajorId} from "components/utils";
import {useQuasar} from "quasar";
// TODO:刷新有很大问题
let nodes: any = ref([])
const lazy = ref(nodes)
const selected: any = ref([])
const $q = useQuasar()
const check = ref(false)
loadPage()

function loadPage() {//方法有问题
    getColleges()
    getAllAdmin()
}

//获取选择项
function getSelect(value: any, evt: any) {
    check.value = value
}

//自定义勾选方法
function defineCheck(value: any) {
    if (check.value == true) {
        selected.value.push(value);
    } else {
        const array: any = []
        selected.value.forEach((item: any) => {
            if (item != value) {
                array.push(item)
            }
        })
        selected.value = array
    }
}


//新增
function newItem() {
    //确保单选
    if (selected.value.length != 1) {
        CommonWarn('请选择一项')
        return
    }

    //不优雅
    //新增专业
    if (selected.value[0].type == 'college') {
        $q.dialog({
            title: '新增专业',
            message: '专业名称:',
            prompt: {
                model: '',
                type: 'text' // optional
            },
            cancel: true,
            persistent: true
        }).onOk(data => {
            api.post("/class/major?name=" + data + '&collegeId=' + selected.value[0].id).then((res: any) => {
                commonCheckResponse(res);
            })
        });
    }


    //新增年级
    if (selected.value[0].type == 'major') {

        $q.dialog({
            title: '新增年级',
            message: '年级名称:',
            prompt: {
                model: '',
                type: 'text' // optional
            },
            cancel: true,
            persistent: true
        }).onOk(data => {
            api.post("/class/grade", {}, {
                params: {
                    'collegeId': selected.value[0].collegeId,
                    'majorId': selected.value[0].id,
                    'name': data
                }
            }).then((res: any) => {
                commonCheckResponse(res);
            })
        });
    }

    //新增班级
    if (selected.value[0].type == 'grade') {
        dialog.value = true
    }
    if (selected.value[0].type == 'class') {
        dialog.value = true
    }

}

//修改
function updateItem() {
    //确保单选
    if (selected.value.length != 1) {
        CommonWarn('请选择一项')
        return
    }

    const params = {
        name: '', id: selected.value[0].id
    }
    //优雅
    $q.dialog({
        title: '修改"' + selected.value[0].label + '"',
        message: '新名称:',
        prompt: {
            model: '',
            type: 'text'
        },
        cancel: true,
        persistent: true
    }).onOk(data => {
        params.name = data
        api.put("/class/" + selected.value[0].type, {}, {params}).then((res: any) => {
            commonCheckResponse(res);
        })
    });

}

//删除
function deleteItem() {

    //确保单选
    if (selected.value.length != 1) {
        CommonWarn('请选择一项')
        return
    }
    const params = {
        id: selected.value[0].id
    }
    //哈哈，优雅
    $q.dialog({
        title: '确认删除',
        message: '确定要删除"' + selected.value[0].label + '"吗',
        cancel: true,
    }).onOk(() => {
        api.delete("/class/" + selected.value[0].type, {params}).then((res: any) => {
            commonCheckResponse(res)
        })
    })
}

const dialog = ref(false)
const adminInfo = ref([])
const adminId = ref()
const className = ref()

//获取全部管理员信息
function getAllAdmin() {
    api.get("/admin/getAllAdmin").then((res: any) => {
        commonCheckResponse(res)
        res.data.forEach((item: any) => {
            item.label = item.name
            item.value = item.id
        })
        adminInfo.value = res.data
    })
}

//新建班级
function newClass() {
    dialog.value = false
    api.post("/class/class", {}, {
        params: {
            'gradeId': selected.value[0].id,
            'majorId': selected.value[0].majorId,
            'adminId': adminId.value.id,
            'name': className.value
        }
    }).then((res: any) => {
        commonCheckResponse(res);
    })
}

//新建学院
function newCollege() {
    $q.dialog({
        title: '新增学院',
        message: '学院名称:',
        prompt: {
            model: '',
            type: 'text' // optional
        },
        cancel: true,
        persistent: true
    }).onOk(data => {
        api.post("/class/college?collegeName=" + data).then((res: any) => {
            commonCheckResponse(res);
        })
    });
}

//@ts-ignore 懒加载
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
                item.selected = false
            })
            done(res.data)
        })
    }
    //点击的是专业
    if (node.type == 'major') {
        getGradeId(node.id, node.collegeId).then((res: any) => {
            res.data.forEach((item: any) => {
                item.label = item.name
                item.children = []
                item.lazy = true
                item.icon = 'sell'
                item.type = 'grade';
                item.selected = false
            })
            done(res.data)
        })
    }
    //点击的是年级
    if (node.type == 'grade') {
        getClass(node.majorId, node.id).then((res: any) => {
            res.data.forEach((item: any) => {
                item.label = item.name
                item.icon = 'school'
                item.type = 'class';
                item.selected = false
            })
            done(res.data)
        })
    }
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
            item.selected = false
            item.selected = false
        })
        nodes.value = res.data
    })
}


</script>

<style scoped>

</style>

