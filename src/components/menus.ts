//侧栏菜单
import {ref} from "vue";

export let menu = ref([
    {
        icon: 'home', label: '主页', id: 1, isopen: true, children: [
            {link: 'home', icon: 'donut_large', desc: '首页', id: 5},
        ]
    },
    {
        icon: 'settings', label: '审核管理', id: 3, isopen: false, children: [
            {link: 'holiday', icon: 'schedule', desc: '请假审核', id: 8},
            {link: 'register', icon: 'how_to_reg', desc: '注册审核', id: 9},
        ]
    },
    {
        icon: 'perm_identity', label: '人员管理', isopen: false, id: 2, children: [
            {link: 'student', icon: 'face', desc: '学生管理', id: 6},
            {link: 'teacher', icon: 'people_alt', desc: '教师管理', id: 7},
        ]
    },
    {
        icon: 'category', label: '系统设置', isopen: false, id: 10, children: [
            {link: 'setting', icon: 'settings', desc: '表格设置', id: 11},
            {link: 'about', icon: 'info', desc: '关于', id: 12},
        ]
    }
])
