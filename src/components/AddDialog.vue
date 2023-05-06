<template>
    <q-card class="dialog-width">
        <q-card-section>
            <div class="text-h6">{{ info.title }}</div>
        </q-card-section>

        <div v-for="item in column">
            <!--     主键       -->
            <q-card-section class="q-pa-md" v-if="item.type=='primary-key' && info.mode =='update'">
                <q-input v-model="item.value" :label="item.label" readonly/>
            </q-card-section>
            <!--      一般表单      -->
            <q-card-section class="q-pa-md" v-if="item.type=='input'">
                <q-input v-model="item.value" :label="item.label"/>
            </q-card-section>
            <!--      只能填数字      -->
            <q-card-section class="q-pa-md" v-if="item.type=='number'">
                <q-input type="number" :rules="[val => val > 0 && val < 20229999999 || '数字非法']" v-model="item.value"
                         :label="item.label"/>
            </q-card-section>
            <!--      开关表单，值仅限为01      -->
            <q-card-section class="q-pa-md" v-if="item.type=='bool'&&item.new">
                <q-toggle left-label :label="item.label" color="primary" :true-value="1" :false-value="0"
                          v-model="item.value"/>
            </q-card-section>
            <!--      班级选择器      -->
            <q-card-section class="q-pa-md" v-if="item.type=='class_id'">
                <ClassSelector @func="getClassId"/>
            </q-card-section>
        </div>

        <!--    提交按钮    -->
        <q-card-section class="text-primary">

            <div class="row justify-between">
                <div class="col">
                    <q-btn color="primary" class="text-left" label="取消" v-close-popup @click="handleCancel"/>
                </div>
                <div class="col text-right">
                    <q-btn flat color="red" label="重置" @click="handleReset"/>
                    <q-btn color="primary" label="提交" v-close-popup @click="handleSubmit"/>
                </div>
            </div>
        </q-card-section>
    </q-card>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import ClassSelector from "components/ClassSelector.vue";
import {api} from "boot/axios";
import {CommonSuccess} from "components/commonResults";
import {useRouter} from "vue-router";


const props = defineProps(['info', 'column'])
const column = ref(props.column)
const info = ref(props.info)
const classId = ref('')
const rt = useRouter()

// 重置
function handleReset() {
    column.value.forEach((item: any) => {
        item.value = null;
    })
}

// 提交表单
function handleSubmit() {
    const params = handleParam();
    if (info.value.mode == 'new') {
        api.post(info.value.link, params).then((res: any) => {
            if (res.code == '200') {
                //向父级发送
                CommonSuccess('操作成功')
            }
        })
    }
    if (info.value.mode == 'update') {
        api.put(info.value.link, params).then((res: any) => {
            if (res.code == '200') {
                //向父级发送
                CommonSuccess('操作成功')
            }
        })
    }
    handleReset()
}

//获取班级id
function getClassId(value: any) {
    classId.value = value;
}

//修改参数
function handleParam() {
    let params: any = {}
    // 新增
    if (info.value.mode == 'new') {
        column.value.forEach((item: any) => {
            if (item.type != 'primary-key' && item.value != null && item.value != "") {
                if (item.new) {
                    params[item.name] = item.value
                }
            }
        })
        if (classId.value != "") {
            params['classId'] = classId.value;
        }
    }
    if (info.value.mode == 'update') {
        column.value.forEach((item: any) => {
            if (item.update && item.value != null && item.value != "") {
                params[item.name] = item.value
            }
        })
        column.value.filter((item: any) => {
            return item != null;
        })
        if (classId.value != "") {
            params['classId'] = classId.value;
        }
    }
    return params;
}

// 取消
function handleCancel() {
    handleReset()
}


</script>


