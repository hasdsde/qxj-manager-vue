<template>
  <div class="q-pa-md main" style="height: 100vh;">
    <!--   背景图片   -->
    <!--    <BackgroundImg />-->
    <div class="column justify-center" style="height: 90vh;">
      <div class="col-auto row justify-center">
        <q-card class="col-auto shadow-10" style="background-color: rgb(255,255,255);padding: 50px;width: 400px">
          <q-card-section class="row justify-between">
            <strong>{{ pageTitle }}</strong>
            <q-btn icon="close" dense rounded flat to="/" />
          </q-card-section>

          <!--     用户名     -->
          <q-card-section>
            <q-input rounded ref="usernameRef" v-model="usernameR" label="用户名" :lazy-rules="true"
              :rules="[(val) => (val.length > 0) || '输入值为空']" />
          </q-card-section>

          <!--     密码     -->
          <q-card-section>
            <q-input rounded ref="passwordRef" v-model="passwordR" label="密码" lazy-rules
              :rules="[(val) => (val && val.length > 0) || '输入值为空']" type="password" />
          </q-card-section>

          <!--     确认密码     -->
          <q-slide-transition>
            <q-card-section v-if="registerR">
              <q-input rounded v-model="conformR" ref="passwordConformRef" label="确认密码" lazy-rules
                :rules="[(val) => (val && val === passwordR && val.length > 0) || '两次输入密码不一致']" type="password" />
            </q-card-section>
          </q-slide-transition>

          <q-card-section>
            <q-btn-group>
              <q-btn @click="handlerLogin" color="primary" style="width: 205px;" :label="second" />
              <q-btn @click="registerR = !registerR; switchLabel()" color="secondary" :label="first" />
            </q-btn-group>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
// import BackgroundImg from "../components/BackgroundImg"
import { ref } from 'vue'
import { api } from '../boot/axios'
import { CommonFail, CommonSuccess } from '../components/commonResults'
import { useRouter } from 'vue-router'


const $router = useRouter()

// 账号 密码 确认密码 三件套
const usernameRef = ref(null)
const passwordRef = ref(null)
const passwordConformRef = ref(null)

const nickname = ref('NTR');

const pageTitle = ref('登录')
const usernameR = ref('')
const passwordR = ref('')
const conformR = ref()
const registerR = ref(false)
const first = ref('注册')
const second = ref('登录')


// 登录和注册切换
function switchLabel() {
  const temp = first.value
  first.value = second.value
  second.value = temp
  passwordR.value = ''
  conformR.value = ''
}

// 重置输入框
function clearAll() {
  usernameR.value = ''
  passwordR.value = ''
  conformR.value = ''
}

// 点击右侧 登录/注册 按钮
function handlerLogin() {
  localStorage.clear()
  if (second.value === '登录' && loginRule()) { // 登录
    login()
  } else if (second.value === '注册' && regRule()) { // 注册
    register()
  }
}

// 注册
function register() {
  api.post('/user/register', {
    'username': usernameR.value,
    'password': passwordR.value
  }).then(res => {
    if (res.data.code === '200') {
      CommonSuccess('注册成功')
      login()
      clearAll()
    } else
      CommonFail('注册失败')
  })
}

//登录
async function login() {
  await api.get('/user/login', {
    params: {
      'username': usernameR.value,
      'password': passwordR.value
    }
  }).then(res => {

    if (res.data.code === '200') {
      localStorage.setItem('username', usernameR.value)
      localStorage.setItem('nickname', res.data.data.user.nickname)
      localStorage.setItem('userId', user.id)
      localStorage.setItem('jwt_token', res.data.data.token)

      CommonSuccess('登录成功')
      $router.push('/')

    } else {
      CommonFail('登录失败')
    }
  })
}

// 登录请求限制
function loginRule() {
  return !(usernameR.value === '' || passwordR.value === '')
}

// 注册请求限制
function regRule() {
  return (loginRule() && passwordR.value === conformR.value)
}


</script>


<style scoped>
.main {
  background-image: url('../assets/kiminame.png');
  background-size: auto 100%;
}
</style>
