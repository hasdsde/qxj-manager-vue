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
                    <q-input filled dense v-model="searchName" label="姓名" class="inline-block q-mr-sm"
                             @keydown.enter="loadPage"/>
                    <q-input filled dense v-model="searchNumber" label="学号" class="inline-block q-mr-sm"
                             @keydown.enter="loadPage"/>
                    <!--                    <q-input filled dense v-model="searchClass" label="专业班级" class="inline-block q-mr-sm"-->
                    <!--                             @keydown.enter="loadPage"/>-->
                    <q-btn color="red" class="inline vertical-top q-mr-sm" label="重置" icon="restart_alt"
                           @click="resetSearch"/>
                    <q-btn color="primary" class="inline vertical-top" label="搜索" icon="search" @click="loadPage"/>
                </div>
            </div>
        </div>
        <!-- 表格 -->
        <div>
            <q-table title="请假审核"
                     :rows="holidayList"
                     :columns="holidayColumns"
                     row-key="name"
                     :pagination="{rowsNumber:page.pageSize}"
                     selection="multiple"
                     v-model:selected="selected"
                     hide-pagination>
                <template v-slot:body-cell-fromTime="props:any">
                    <q-td :props="props">
                        {{ getHumanDate(props.row.fromTime) }}
                    </q-td>
                </template>
                <template v-slot:body-cell-toTime="props:any">
                    <q-td :props="props">
                        {{ getHumanDate(props.row.toTime) }}
                    </q-td>
                </template>
                <template v-slot:body-cell-createTime="props:any">
                    <q-td :props="props">
                        {{ getHumanDate(props.row.createTime) }}
                    </q-td>
                </template>
                <template v-slot:body-cell-reasonType="props:any">
                    <q-td :props="props">
                        <q-badge :color="getColorFromId(props,'reasonType')"
                                 :label="getLabelFromId(props,'reasonType')"/>
                    </q-td>
                </template>
                <template v-slot:body-cell-healthy="props">
                    <q-td :props="props">
                        <q-badge :color="getColorFromId(props,'healthy')"
                                 :label="getLabelFromId(props,'healthy')"/>
                    </q-td>
                </template>
                <template v-slot:body-cell-status="props">
                    <q-td :props="props">
                        <q-badge :color="getColorFromId(props,'status')"
                                 :label="getLabelFromId(props,'status')"/>
                    </q-td>
                </template>
                <template v-slot:body-cell-imgUrl="props">
                    <q-td :props="props">
                        <q-btn label="查看" size="sm"/>
                    </q-td>
                </template>
                <template v-slot:body-cell-handle="props">
                    <q-td :props="props">
                        <q-btn label="编辑" class="q-mr-md" color="primary" size="sm" @click="handleUpdate(props.row)"/>
                        <q-btn color="orange" label="修改状态" size="sm">
                            <q-menu>
                                <q-list>
                                    <q-item clickable v-close-popup v-for="option in statusOptions">
                                        <q-item-section :class="'text-'+option.color"
                                                        @click="handleStatus(props.row,option.value)">{{
                                            option.label
                                            }}
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </q-btn>
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
import {holidayColumns} from "components/columns";
import {commonCheckResponse, getColorFromId, getHumanDate, getLabelFromId, getUserInfo} from "components/utils";

const $q = useQuasar()
//分页管理

const page = ref(new Page(1, 20, 21,))

//加载表格
const holidayList = ref([])
const selected = ref([])
const searchName = ref('')
const searchNumber = ref('')
const searchClass = ref([])
const userInfo = getUserInfo()
loadPage()


function loadPage() {
    CommonLoading($q)
    api.post("/admin/leave/select", {
        id: userInfo.id,
        role: userInfo.role
    }, {
        params: {
            'currentPage': page.value.currentPage,
            'pageSize': page.value.pageSize,
            'name': searchName.value,
            'number': searchNumber.value,
            // 'className': searchClass.value
        }
    }).then((res: any) => {
        holidayList.value = res.data
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
//对studentColumns进行二次修改
let dialogColumns: any = ref([])
holidayColumns.forEach((item: any) => {
    dialogColumns.value.push(item)
})

//新增
function handleNew() {
    addDialog.value = true;
    info.value.title = '新增'
    info.value.mode = 'new'
    info.value.link = '/user/commit'
}


//修改
function handleUpdate(rows: any) {
    addDialog.value = true;
    //将既定的命运交给需要之人   ,
    dialogColumns.value.forEach((dialogColumn: any) => {
        dialogColumn.value = rows[dialogColumn.name]
    })
    info.value.title = '修改'
    info.value.mode = 'update'
    info.value.link = '/user/updates'
}


//删除
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
            api.delete('/admin/leave/delete?id=' + item.id).then((res: any) => {
                if (res.code == '200') {
                    CommonSuccess('操作成功')
                    loadPage();
                }
            })
        })
        loadPage()
    })
}

//状态
const statusOptions = [
    {label: '已删除', value: 0, color: 'red'},
    {label: '审核中', value: 1, color: 'orange'},
    {label: '审核已通过', value: 2, color: 'primary'},
    {label: '审核拒绝', value: 3, color: 'red'},
    {label: '待销假', value: 4, color: 'orange'},
    {label: '销假未通过', value: 5, color: 'red'},
    {label: '销假超时', value: 6, color: 'red'},
    {label: '已销假', value: 7, color: 'green'},
    {label: '审核超时', value: 8, color: 'red'},
    {label: '已取消', value: 9, color: 'red'},
]

//修改状态
function handleStatus(row: any, status: any) {
    api.post("/admin/leave/approval/" + status + "?id=" + row.id,).then((res: any) => {
        commonCheckResponse(res)
        loadPage()
    })

}
</script>
