<template>
    <div class="q-pa-md">
        <!--按钮-->
        <!--按钮-->
        <div class="col q-mb-md">
            <div class="row justify-between">
                <div class="col">
                    <q-btn color="primary" class="q-mr-md" label="刷新" icon="refresh"
                           @click="refresh"/>
                    <q-btn color="secondary" class="q-mr-md" label="新增" icon="add" @click="addDialog=true"/>
                    <q-btn color="red" class="q-mr-md" label="删除" icon="delete" @click="handleDelete"/>
                </div>
                <div class="col text-right">
                    <q-input filled dense v-model="searchName" label="姓名" class="inline-block q-mr-sm"/>
                    <q-input filled dense v-model="searchNumber" label="学号" class="inline-block q-mr-sm"/>
                    <q-input filled dense v-model="searchClass" label="学院" class="inline-block q-mr-sm"/>
                    <q-btn color="red" class="inline vertical-top q-mr-sm" label="重置" icon="restart_alt"
                           @click="resetSearch"/>
                    <q-btn color="primary" class="inline vertical-top" label="搜索" icon="search" @click="loadPage"/>
                </div>
            </div>
        </div>
        <!-- 表格 -->
        <div>
            <q-table title="导员管理"
                     :rows="studentList"
                     :columns="teacherColumns"
                     row-key="name"
                     :pagination="{rowsNumber:page.pageSize}"
                     selection="multiple"
                     v-model:selected="selected"
                     hide-pagination>
                <template v-slot:body-cell-status="props:any">
                    <q-td :props="props">
                        <q-badge :color="props.row.status==1?'secondary':'red'"
                                 :label="props.row.status==1?'正常':'异常'"/>
                    </q-td>
                </template>
                <template v-slot:body-cell-enable="props">
                    <q-td :props="props">
                        <q-badge :color="props.row.enable==1?'primary':'red'"
                                 :label="props.row.enable==1?'可用':'不可用'"/>
                    </q-td>
                </template>
                <template v-slot:body-cell-handle="props">
                    <q-td :props="props">
                        <q-btn label="编辑" color="primary" size="sm"/>
                    </q-td>
                </template>
            </q-table>
            <div class="q-pa-lg flex flex-center">
                <q-pagination
                        v-model="page.currentPage"
                        :max="page.totalPage"
                        @update:model-value="loadPage"
                        direction-links
                />
            </div>
        </div>
        <!--    新增窗口    -->
        <q-dialog v-model="addDialog" position="right" full-height>
            <AddDialog :info="info" :column="teacherColumns"/>
        </q-dialog>
    </div>
</template>
<script setup lang="ts">

import {api} from 'src/boot/axios';
import {ref} from 'vue';
import {Page} from "components/entity";
import {CommonLoading, CommonSuccess, LoadingFinish} from "components/commonResults";
import {useQuasar} from "quasar";
import AddDialog from "components/AddDialog.vue";

const $q = useQuasar()
//分页管理
const teacherColumns: any = [
    {name: 'id', align: 'center', label: 'id', 'field': 'id', 'type': 'input'},
    {name: 'name', align: 'center', label: '姓名', 'field': 'name', 'type': 'input'},
    {name: 'number', align: 'center', label: '工号', 'field': 'number', 'type': 'number'},
    {name: 'collegeId', align: 'center', label: '学院', 'field': 'collegeId', 'type': 'number'},
    {name: 'role', align: 'center', label: '角色', 'field': 'role', 'type': 'number'},
    {name: 'enable', align: 'center', label: '账号状态', 'field': 'enable', 'type': 'bool'},
    {name: 'handle', align: 'center', label: '操作', 'field': 'handle'},
]
const page = ref(new Page(1, 20, 21,))

//加载表格
const studentList = ref([])
const selected = ref([])
const searchName = ref('')
const searchNumber = ref('')
const searchClass = ref([])

loadPage()

function loadPage() {
    CommonLoading($q)
    api.get("/admin", {
        params: {
            'currentPage': page.value.currentPage,
            'pageSize': page.value.pageSize,
            'username': searchName.value,
            'number': searchNumber.value,
            'classId': searchClass.value
        }
    }).then(res => {
        studentList.value = res.data
        LoadingFinish($q)
    })
}

//刷新表格
function refresh() {
    loadPage()
    CommonSuccess('刷新完成')
}

//重置搜索
function resetSearch() {
    searchName.value = ''
    searchNumber.value = ''
    searchClass.value = []
    page.value.currentPage = 1
    loadPage()
}

//新增用户
const addDialog = ref(false)
const info = ref({title: '新增用户'})
// const data = ref('aaa')

//删除用户
function handleDelete() {
    $q.dialog({
        title: '删除用户',
        message: '你确定要删除吗?',
        cancel: true
    }).onOk(() => {
        selected.value.forEach((item: any) => {
            console.log(item.studentId)
        })
        loadPage()
    })
}


</script>
