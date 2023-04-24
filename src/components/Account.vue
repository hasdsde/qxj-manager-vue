<template>
  <q-avatar class="q-mr-sm">
    <!-- <img src="https://cdn.quasar.dev/img/avatar.png"> -->
  </q-avatar>
  <div class="q-mr-sm">{{ '用户： ' + userName }}</div>
  <q-btn color="secondary" size="sm" label="选项">
    <q-menu>
      <q-list style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section @click="updatePassword">修改密码</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section @click="logout">退出</q-item-section>
        </q-item>
        <q-separator />
      </q-list>
    </q-menu>
  </q-btn>

  <!-- 修改密码对话框 -->
  <q-dialog v-model="dialog">
    <q-card style="min-width: 20%;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">修改密码</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input class="q-pa-sm" filled v-model="old_pwd" :rules="[val => val && val.length > 0 || '必填']" label="旧密码" />
          <q-input class="q-pa-sm" filled v-model="new_pwd" :rules="[value => value && value.length > 0 || '必填']"
            label="新密码" />
          <q-input class="q-pa-sm" filled v-model="confirm_pwd"
            :rules="[val => val && val.length > 0 || '必填', value => value === new_pwd || '旧密码与新密码不一致']" label="确认密码" />
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="重置" type="reset" color="primary" @click="onReset" />
        <q-btn flat label="提交" type="submit" color="red" @click="onSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { CommonFail, CommonSuccess, CommonWarn } from 'src/components/commonResults'
import { useQuasar } from 'quasar';
import { ref, watch } from 'vue';
import { useRouter } from "vue-router";
import { api } from 'src/boot/axios';

const $q = useQuasar()
let rt = useRouter()
let dialog = ref(false)

// 获取用户名
const userName = ref('未登录')
getUsername()
function getUsername() {
  return localStorage.getItem("nickname") || localStorage.getItem("username");
}

// 登出
function logout() {
  $q.dialog({
    title: '登出',
    message: '你确定要登出吗？',
    cancel: true,
    persistent: true
  }).onOk(() => {
    window.location.href = '/#/login'
    localStorage.clear()
  })
}

// 修改密码
let old_pwd = ref('');
let new_pwd = ref('');
let confirm_pwd = ref('');

function onSubmit() {
  if (!old_pwd.value || !new_pwd.value || !confirm_pwd.value) {
    CommonWarn("提示：请输入正确的信息");
    return;
  } else if (new_pwd.value !== confirm_pwd.value) {
    CommonWarn('两次信息不一致');
    return;
  } else {
    api.put('/user/password', null, {
      params: {
        oldPassword: old_pwd.value,
        newPassword: new_pwd.value
      }
    }).then(res => {
      CommonSuccess();
    }).catch(res => {
      CommonFail();
    })
    dialog.value = false
    onReset()
  }
}

function onReset() {
  old_pwd.value = '';
  new_pwd.value = '';
  confirm_pwd.value = '';
}

//修改密码弹窗
function updatePassword() {
  dialog.value = true
}



</script>
