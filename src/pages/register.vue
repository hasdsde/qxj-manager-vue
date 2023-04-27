<template>
    <div class="q-pa-md">
        <!--按钮-->
        <div class="col q-mb-md">
            <div class="row justify-between">
                <div class="col">
                    <q-btn color="primary" class="q-mr-md" label="刷新" icon="refresh" @click="loadPage"/>
                    <q-btn color="secondary" class="q-mr-md" label="新增" icon="add"/>
                    <q-btn color="red" class="q-mr-md" label="删除" icon="delete"/>
                </div>
                <div class="col text-right">
                    <q-input filled dense v-model="searchName" label="姓名" class="inline-block q-mr-sm"/>
                    <q-input filled dense v-model="searchNumber" label="学号" class="inline-block q-mr-sm"/>
                    <q-input filled dense v-model="searchClass" label="专业班级" class="inline-block q-mr-sm"/>
                    <q-btn color="primary" class="inline vertical-top" label="搜索" icon="search"/>
                </div>
            </div>
        </div>
        <!-- 表格 -->
        <div>
            <q-table title="注册信息管理"
                     :rows="studentList"
                     :columns="columns"
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
                        direction-links
                />
            </div>
        </div>
    </div>
  <!--  弹窗  -->
    <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px">
            <q-card-section>
                <div class="text-h6">Your address</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <!--                <q-input dense v-model="address" autofocus @keyup.enter="prompt = false"/>-->
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup/>
                <q-btn flat label="Add address" v-close-popup/>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import {api} from 'src/boot/axios';
import {ref} from 'vue';

//测试


//加载表格
const studentList = ref([])
const selected = ref([])
loadPage()

function loadPage() {
    api.get("/admin/registry/select?pageSize=1&currentPage=10").then(res => {
        studentList.value = res.data
    })
}

//分页管理
const columns: any = [
    {name: 'studentId', align: 'center', label: '学生id', 'field': 'studentId'},
    {name: 'name', align: 'center', label: '姓名', 'field': 'name'},
    {name: 'number', align: 'center', label: '学号', 'field': 'number'},
    {name: 'className', align: 'center', label: '班级', 'field': 'className'},
    {name: 'major', align: 'center', label: '专业', 'field': 'major'},
    {name: 'grade', align: 'center', label: '年级', 'field': 'grade'},
    {name: 'college', align: 'center', label: '学院', 'field': 'college'},
    {name: 'phone', align: 'center', label: '电话', 'field': 'phone'},
    {name: 'emergencyPhone', align: 'center', label: '紧急电话', 'field': 'emergencyPhone'},
    {name: 'createTime', align: 'center', label: '创建时间', 'field': 'createTime'},
    {name: 'status', align: 'center', label: '学生状态', 'field': 'status'},
    {name: 'enable', align: 'center', label: '账号状态', 'field': 'enable'},
    {name: 'handle', align: 'center', label: '操作', 'field': 'handle'},
]
// const page = ref(new PageEntity(1, 20, 1, 1))
const page = {}

//搜索
const searchName = ref('')
const searchNumber = ref('')
const searchClass = ref([])
</script>
