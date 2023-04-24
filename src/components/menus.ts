//侧栏菜单
import { ref } from "vue";

export let menu = ref([
  {
    icon: 'home', label: '主页', id: 1, isopen: true, children: [
      { link: 'CheckInfo', icon: 'donut_large', desc: '实时监控', id: 5 },
    ]
  },
  {
    icon: 'settings', label: '审核管理', id: 3, isopen: false, children: [
      { link: 'UserSetting', icon: 'schedule', desc: '请假审核', id: 8 },
      { link: 'About', icon: 'how_to_reg', desc: '注册审核', id: 9 },
    ]
  },
  {
    icon: 'perm_identity', label: '人员管理', isopen: false, id: 2, children: [
      { link: 'UserManager', icon: 'face', desc: '学生管理', id: 6 },
      { link: 'ItemManager', icon: 'people_alt', desc: '教师管理', id: 7 },
    ]
  },
  {
    icon: 'category', label: '系统设置', isopen: false, id: 10, children: [
      { link: 'UserManager', icon: 'settings', desc: '设置', id: 11 },
      { link: 'ItemManager', icon: 'info', desc: '关于', id: 12 },
    ]
  }
])
