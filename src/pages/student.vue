<template>
    <div class="q-pa-md">
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
                    <q-input filled dense v-model="searchName" label="姓名" class="inline-block q-mr-sm"/>
                    <q-input filled dense v-model="searchNumber" label="学号" class="inline-block q-mr-sm"/>
                    <q-input filled dense v-model="searchClass" label="专业班级" class="inline-block q-mr-sm"/>
                    <q-btn color="red" class="inline vertical-top q-mr-sm" label="重置" icon="restart_alt"
                           @click="resetSearch"/>
                    <q-btn color="primary" class="inline vertical-top" label="搜索" icon="search" @click="loadPage"/>
                </div>
            </div>
        </div>
        <!-- 表格 -->
        <div>
            <q-table title="学生管理"
                     :rows="studentList"
                     :columns="studentColumns"
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
                                 :label="props.row.enable==1?'可用':'已删除'"/>
                    </q-td>
                </template>
                <template v-slot:body-cell-handle="props">
                    <q-td :props="props">
                        <q-btn label="编辑" color="primary" size="sm" @click="handleUpdate(props.row)"/>
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
        <q-dialog v-model="addDialog" position="right" full-height persistent @hide="loadPage">
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
import {studentColumns} from "components/columns";

const $q = useQuasar()
//分页管理

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
    api.get("/admin/user", {
        params: {
            'currentPage': page.value.currentPage,
            'pageSize': page.value.pageSize,
            'username': searchName.value,
            'number': searchNumber.value,
            'className': searchClass.value
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

//重置
function resetSearch() {
    searchName.value = ''
    searchNumber.value = ''
    searchClass.value = []
    page.value.currentPage = 1
    loadPage()
}

//弹窗
const addDialog = ref(false)
const info = ref({title: '', mode: '', link: '', update: ''})
let times = 0
//对studentColumns进行二次修改
let dialogColumns: any = ref([])
studentColumns.forEach((item: any) => {
    dialogColumns.value.push(item)
})

//新增
function handleNew() {
    addDialog.value = true;
    info.value.title = '新增'
    info.value.mode = 'new'
    info.value.link = '/admin/user'
    //添加密码列，自带的方法不能用啊
    if (times == 0) {
        times = times + 1
        dialogColumns.value.push({
            name: 'password',
            align: 'center',
            label: '密码',
            type: 'number',
            new: true
        });
        dialogColumns.value.push({
            name: 'class_id',
            align: 'center',
            label: '班级id',
            type: 'class_id',
            new: true
        })
    }

}


//修改
function handleUpdate(rows: any) {
    addDialog.value = true;
    //将既定的命运交给需要之人
    dialogColumns.value.forEach((dialogColumn: any) => {
        dialogColumn.value = rows[dialogColumn.name]
    })
    console.log(dialogColumns)
    //此乃，命运
    info.value.title = '修改'
    info.value.mode = 'update'
    info.value.link = '/admin/user'

    if (times == 0) {
        times = times + 1
        dialogColumns.value.push({
            name: 'password',
            align: 'center',
            label: '密码',
            type: 'number',
            update: true
        });
        dialogColumns.value.push({
            name: 'class_id',
            align: 'center',
            label: '班级id',
            type: 'class_id',
            update: true
        })
    }
}


//删除
function handleDelete() {
    if (selected.value.length == 0) {
        CommonWarn('请选择数据');
        return
    }
    $q.dialog({
        title: '删除用户',
        message: '你确定要删除' + selected.value.length + '条数据吗?',
        cancel: true
    }).onOk(() => {
        selected.value.forEach((item: any) => {
            console.log(item.studentId)
            api.delete('/admin/user?userId=' + item.studentId + '&enable=0').then((res: any) => {
                if (res.code == '200') {
                    CommonSuccess('操作成功')
                    loadPage();
                }
            })
        })
        loadPage()
    })
}


</script>
