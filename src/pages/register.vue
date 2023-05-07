<template>
    <div class="q-pa-md">
        <!--按钮-->
        <div class="col q-mb-md">
            <div class="row justify-between">
                <div class="col-5">
                    <q-btn color="primary" class="q-mr-md" label="刷新" icon="refresh" @click="loadPage"/>
                    <!--                    <q-btn color="secondary" class="q-mr-md" label="新增" icon="add" @click="handleNew"/>-->
                    <!--                    <q-btn color="red" class="q-mr-md" label="删除" icon="delete" @click="handleDelete"/>-->
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
                        <!--* 审批中：0-->
                        <!--* 可用：1-->
                        <!--* 已删除：2-->
                        <!--* 审批拒绝：-1-->
                        <q-badge v-if="props.row.enable==0" color="purple" label="待审核"/>
                        <q-badge v-if="props.row.enable==1" color="primary" label="通过"/>
                        <q-badge v-if="props.row.enable==-1" color="red" label="已拒绝"/>
                    </q-td>
                </template>
                <template v-slot:body-cell-handle="props">
                    <q-td :props="props">
                        <q-btn label="详情" size="sm" class="q-mr-sm" color="secondary"
                               @click="handleDetails(props.row)"/>
                        <q-btn-dropdown label="处理" color="primary" :disable="props.row.enable!=0" size="sm">
                            <q-list>
                                <q-item clickable v-close-popup>
                                    <q-item-section>
                                        <q-item-label @click="handleCheckAccept(props.row)">通过</q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-item clickable v-close-popup>
                                    <q-item-section>
                                        <q-item-label @click="handleCheckReject(props.row)">拒绝</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
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
  <!--    新增窗口    -->
    <q-dialog v-model="addDialog" position="right" full-height>
        <AddDialog :info="info" :column="studentColumns"/>
    </q-dialog>
    <q-dialog v-model="detailsDialog">
        <q-card>
            <q-card-section>
                <q-table
                        style="width: 80vw"
                        title="注册详情"
                        :rows="userDetails"
                        :columns="studentColumns"
                        row-key="name"
                        :filter="filter"
                        hide-pagination
                />
            </q-card-section>
        </q-card>

    </q-dialog>
</template>
<script setup lang="ts">
import {api} from 'src/boot/axios';
import {ref} from 'vue';
import {registerColumns, studentColumns} from "components/columns";
import {Page} from "components/entity";
import AddDialog from "components/AddDialog.vue";
import {useQuasar} from "quasar";
import {CommonLoading, CommonSuccess, CommonWarn, LoadingFinish, Success} from "components/commonResults";

const $q = useQuasar()

//加载表格
const page = ref(new Page(1, 20, 1))
const studentList = ref([])
const selected = ref([])
const searchName = ref('')
const searchNumber = ref('')
const searchClass = ref([])
loadPage()

function loadPage() {
    CommonLoading($q)
    api.post("/admin/registry/select",
        {
            "id": 1,
            "role": 1
        }, {
            params: {
                'currentPage': page.value.currentPage,
                'pageSize': page.value.pageSize,
                'name': searchName.value,
                'number': searchNumber.value,
                'classId': searchClass.value,
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


const addDialog = ref(false)
const info = ref({title: '', mode: ''})

//新增
function handleNew() {
    addDialog.value = true;
    info.value.title = '新增'
    info.value.mode = 'new'
}


//修改
function handleUpdate() {
    addDialog.value = true;
    info.value.title = '修改'
    info.value.mode = 'new'
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
        })
        loadPage()
    })
}

//处理


function handleCheckAccept(row: any) {
    api.post("/admin/registry/audit/1", {
        "id": row.id
    }).then((res: any) => {
        if (res.code == '200') {
            Success()
        }
        loadPage()
    })
}

function handleCheckReject(row: any) {
    api.post("/admin/registry/audit/-1", {
        "id": row.id
    }).then((res: any) => {
        if (res.code == '200') {
            Success()
        }
        loadPage()
    })
}

const detailsDialog = ref(false)
const userDetails: any = ref([])

// 查看细节
function handleDetails(row: any) {
    api.post('/admin/registry/show', {id: row.id}).then((res: any) => {
        userDetails.value = []
        userDetails.value.push(res.data)
    })
    detailsDialog.value = true
}
</script>
