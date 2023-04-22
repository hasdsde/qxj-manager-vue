//侧栏菜单
import { ref } from "vue";

export let menus = ref([
  {
    icon: 'home', label: '主页', id: 1, isopen: true, children: [
      { link: 'Dashboard', icon: 'donut_large', desc: '仪表盘', id: 4, },
      { link: 'CheckInfo', icon: 'notifications_active', desc: '实时监控', id: 5 },
    ]
  },
  {
    icon: 'perm_identity', label: '管理', isopen: false, id: 2, children: [
      { link: 'UserManager', icon: 'people_alt', desc: '用户管理', id: 6 },
      { link: 'ItemManager', icon: 'shopping_bag', desc: '物品管理', id: 7 },
    ]
  },
  {
    icon: 'settings', label: '设置', id: 3, isopen: false, children: [
      { link: 'UserSetting', icon: 'admin_panel_settings', desc: '用户设置', id: 8 },
      { link: 'About', icon: 'info', desc: '关于', id: 9 },
    ]
  }
])
