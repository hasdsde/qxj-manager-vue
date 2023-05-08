<template>
    <div class="q-pa-md main" style="height: 100vh;">
        <!--   背景图片   -->
        <!--    <BackgroundImg />-->
        <div class="column justify-center" style="height: 90vh;">
            <div class="col-auto row justify-center">
                <q-card class="col-auto shadow-10"
                        style="background-color: rgb(255,255,255);padding: 50px;width: 400px">
                    <q-card-section class="row justify-between">
                        <strong>登录</strong>
                        <q-btn icon="close" dense rounded flat to="/"/>
                    </q-card-section>

                    <!--     学号     -->
                    <q-card-section>
                        <q-input rounded ref="usernameRef" v-model="number" label="学号/工号" :lazy-rules="true"
                                 :rules="[(val) => (val.length > 0) || '输入值为空']"/>
                    </q-card-section>

                    <!--     密码     -->
                    <q-card-section>
                        <q-input rounded ref="passwordRef" v-model="password" label="密码" lazy-rules
                                 :rules="[(val) => (val && val.length > 0) || '输入值为空']" type="password"/>
                    </q-card-section>

                    <q-card-section>
                        <q-btn-group>
                            <q-btn @click="handleLogin" color="primary" style="width: 205px;" label="登录"/>
                            <q-btn @click="handleRegister" color="secondary" label="注册"/>
                        </q-btn-group>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {api} from 'boot/axios'
import {CommonFail, CommonSuccess} from 'components/commonResults'
import {useRouter} from 'vue-router'


const $router = useRouter()

// 账号 密码 确认密码 三件套
const usernameRef = ref(null)
const passwordRef = ref(null)
const passwordConformRef = ref(null)


const number = ref('')
const password = ref('')
const registerMode = ref(false)


// 重置输入框
function clearAll() {
    number.value = ''
    password.value = ''

}


// 注册
function handleRegister() {
    api.post('/admin/login', {
        'number': number.value,
        'password': password.value
    }).then(res => {
        if (res.data.code === '200') {
            CommonSuccess('注册成功')
            handleLogin()
            clearAll()
        } else
            CommonFail('注册失败')
    })
}

//登录
async function handleLogin() {
    await api.post('/admin/login', {
        'number': number.value,
        'password': password.value
    }).then((res: any) => {
        if (res.code == '200') {
            localStorage.setItem('userInfo', JSON.stringify(res.data))
            CommonSuccess('登录成功')
            $router.push('/')
        } else {
            CommonFail('登录失败')
        }
    })
}

// 登录请求限制
function loginRule() {
    return !(number.value === '' || password.value === '')
}


</script>


<style scoped>
.main {
    background-image: url('../assets/bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}
</style>
