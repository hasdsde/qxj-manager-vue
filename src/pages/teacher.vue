<template>
    <div class="q-pa-md">
        <!--按钮-->
        <div class="col q-mb-md">
            <div class="row justify-between">
                <div class="col">
                    <q-btn color="primary" class="q-mr-md" label="刷新" icon="refresh"/>
                    <q-btn color="secondary" class="q-mr-md" label="新增" icon="add"/>
                    <q-btn color="red" class="q-mr-md" label="删除" icon="delete"/>
                </div>
                <div class="col text-right">
                    <q-input filled dense v-model="searchName" label="姓名" class="inline-block q-mr-sm"/>
                    <q-input filled dense v-model="searchNumber" label="工号" class="inline-block q-mr-sm"/>
                    <q-input filled dense v-model="searchClass" label="学院" class="inline-block q-mr-sm"/>
                    <q-btn color="primary" class="inline vertical-top" label="搜索" icon="search"/>
                </div>
            </div>
        </div>
        <!-- 表格 -->
        <div>
            <q-table title="导员管理"
                     :rows="studentList"
                     :columns="columns"
                     row-key="name"
                     :pagination="{rowsNumber:pageSize}"
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
                        v-model="currentPage"
                        :max="totalPage"
                        direction-links
                />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {api} from 'src/boot/axios';
import {ref} from 'vue';


//加载表格
const studentList = ref([])
const selected = ref([])
loadPage()

function loadPage() {
    api.get("/admin?currentPage=1&pageSize=10").then(res => {
        studentList.value = res.data
    })
}

//分页管理
const currentPage = ref(1)
const pageSize = ref(20)
const totalPage = ref(5)
const columns: any = [
    {name: 'id', align: 'center', label: '学生id', 'field': 'id'},
    {name: 'name', align: 'center', label: '姓名', 'field': 'name'},
    {name: 'number', align: 'center', label: '学号', 'field': 'number'},
    {name: 'collegeId', align: 'center', label: '学院id', 'field': 'collegeId'},
    {name: 'role', align: 'center', label: '角色', 'field': 'role'},
    {name: 'enable', align: 'center', label: '账号状态', 'field': 'enable'},
    {name: 'handle', align: 'center', label: '操作', 'field': 'handle'},
]

//搜索
const searchName = ref('')
const searchNumber = ref('')
const searchClass = ref([])
</script>
