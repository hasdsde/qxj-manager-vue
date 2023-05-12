<template>
    <div class="q-pa-md">
        <!--按钮-->
        <!--按钮-->
        <div class="col q-mb-md">
            <div class="row justify-between">
                <div class="col-5">
                    <q-btn color="primary" class="q-mr-md" label="刷新" icon="refresh"
                           @click="refresh"/>
                    <q-btn color="secondary" class="q-mr-md" label="新增" icon="add" @click="handleNew"/>
                    <q-btn color="red" class="q-mr-md" label="删除" icon="delete" @click="handleDelete"/>
                </div>
                <div class="col text-right">
                    <q-input filled dense v-model="searchName" label="姓名" class="inline-block q-mr-sm"
                             @keydown.enter="loadPage"/>
                    <q-input filled dense v-model="searchNumber" label="工号" class="inline-block q-mr-sm"
                             @keydown.enter="loadPage"/>
                    <q-input filled dense v-model="searchCollege" label="学院" class="inline-block q-mr-sm"
                             @keydown.enter="loadPage"/>
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
                        <q-badge :color="getColorFromId(props,'enable')"
                                 :label="getLabelFromId(props,'enable')"/>
                    </q-td>
                </template>
                <template v-slot:body-cell-handle="props">
                    <q-td :props="props">
                        <q-btn class="q-mr-md" label="编辑班级" color="secondary" size="sm"
                               @click="handleClassUpdate(props.row)"/>
                        <q-btn label="编辑信息" color="primary" size="sm"
                               @click="handleInfoUpdate(props.row)"/>
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
        <q-dialog v-model="addDialog" position="right" full-height @hide="loadPage">
            <AddDialog :info="info" :column="dialogColumns"/>
        </q-dialog>
    </div>
</template>
<script setup lang="ts">

import {api} from 'src/boot/axios';
import {ref} from 'vue';
import {Page} from "components/entity";
import {CommonLoading, CommonSuccess, CommonWarn, LoadingFinish} from "components/commonResults";
import {useQuasar} from "quasar";
import AddDialog from "components/AddDialog.vue";
import {teacherColumns} from "components/columns";
import {getColorFromId, getLabelFromId} from "components/utils";
// TODO:新增教师添加班级信息
// TODO:查看班级
const $q = useQuasar()
//分页管理

const page = ref(new Page(1, 20, 1,))

//加载表格
const studentList = ref([])
const selected = ref([])
const searchName = ref('')
const searchNumber = ref('')
const searchCollege = ref([])

loadPage()

function loadPage() {
    CommonLoading($q)
    api.get("/admin", {
        params: {
            'currentPage': page.value.currentPage,
            'pageSize': page.value.pageSize,
            'name': searchName.value,
            'number': searchNumber.value,
            'college': searchCollege.value
        }
    }).then((res: any) => {
        studentList.value = res.data
        page.value.total = res.total
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
    searchCollege.value = []
    page.value.currentPage = 1
    loadPage()
}

const addDialog = ref(false)
const info = ref({title: '', mode: '', link: '', update: ''})
info.value.link = '/admin'
let times = 0
//对studentColumns进行二次修改
let dialogColumns: any = ref([])
teacherColumns.forEach((item: any) => {
    dialogColumns.value.push(item)
})

//新增
function handleNew() {
    addDialog.value = true;
    info.value.title = '新增'
    info.value.mode = 'new'
    //添加密码列，自带的方法不能用啊
    if (times == 0) {
        times = times + 1
        dialogColumns.value.push({
            name: 'password',
            align: 'center',
            label: '密码',
            type: 'number',
            new: true,
            update: true
        });
    }
}


//修改
function handleInfoUpdate(rows: any) {
    console.log(dialogColumns)
    addDialog.value = true;
    info.value.title = '修改'
    info.value.mode = 'update'
    //将既定的命运交给需要之人
    dialogColumns.value.forEach((dialogColumn: any) => {
        dialogColumn.value = rows[dialogColumn.name]
    })
    if (times == 0) {
        times = times + 1
        dialogColumns.value.push({
            name: 'password',
            align: 'center',
            label: '密码',
            type: 'number',
            new: true,
            update: true
        });
    }
}

//删除用户
function handleDelete() {
    if (selected.value.length == 0) {
        CommonWarn('请选择数据');
        return
    }
    $q.dialog({
        title: '删除',
        message: '你确定要删除' + selected.value.length + '条数据吗?',
        cancel: true
    }).onOk(() => {
        selected.value.forEach((item: any) => {
            console.log(item)
            api.delete('/admin?adminId=' + item.id + '&enable=0').then((res: any) => {
                if (res.code == '200') {
                    CommonSuccess('操作成功');
                }
                loadPage()
            })
        })
        loadPage()
    })
}


</script>
