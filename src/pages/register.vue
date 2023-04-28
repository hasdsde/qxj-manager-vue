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
                     :columns="registerColumns"
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
import {registerColumns} from "components/columns";
import {Page} from "components/entity";

//测试


//加载表格
const studentList = ref([])
const selected = ref([])
loadPage()

function loadPage() {
    api.post("/admin/registry/select?pageSize=10&currentPage=1", {
        "id": 1,
        "role": 1
    }).then(res => {
        console.log(res.data)
        studentList.value = res.data
    })
}


const page = ref(new Page(1, 20, 1, 1))
// const page = {}

//搜索
const searchName = ref('')
const searchNumber = ref('')
const searchClass = ref([])
</script>
