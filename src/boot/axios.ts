import {boot} from 'quasar/wrappers';
import axios, {AxiosInstance} from 'axios';
import {CommonFail} from 'src/components/commonResults';
import {allNull} from "components/utils";

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance;
    }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({baseURL: 'http://localhost:8080'});

export default boot(({app}) => {
    // for use inside Vue files (Options API) through this.$axios and this.$api

    app.config.globalProperties.$axios = axios;
    // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
    //       so you won't necessarily have to import axios in each vue file

    app.config.globalProperties.$api = api;
    // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
    //       so you can easily perform requests against your app's API


    // 请求拦截器
    api.interceptors.request.use((config) => {
        if (localStorage.getItem('token') == null) {
            window.location.href = "/#/login"
        } else {
            config.headers['token'] = localStorage.getItem('token')
        }
        return config;
    })

    api.interceptors.response.use(res => {
        if (res.data.code == "499") {
            window.location.href = "/#/login"
        }
        //啥也不返回情况
        if (allNull(res.data)) {
            CommonFail('未知错误');
        } else {
            //返回带信息
            if (res.data.code != "200") {
                CommonFail("错误:" + res.data.code + " " + res.data.msg);
            }
        }
        return res.data
    }, err => {
        console.log(err)
        CommonFail(err.message)
    });
});

export {api};
