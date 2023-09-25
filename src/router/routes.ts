// 常量配置

export default [
  // login路由
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', //命名路由
    meta: {
      title: '登录', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏
      icon: 'Promotion', //菜单左侧图标支持element-plus全部图标
    },
  },

  // layout大路由
  {
    // 登陆成功展示数据
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout', //命名路由
    meta: {
      hidden: true, //代表路由标题在菜单中是否隐藏
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页', //菜单标题
          hidden: false, //代表路由标题在菜单中是否隐藏
          icon: 'HomeFilled',
        },
      },
    ],
  },

  // 404路由
  {
    // 404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404', //命名import { path } from 'path';
    meta: {
      title: '404', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏
      icon: 'Open',
    },
  },

  // 数据大屏
  {
    // 数据大屏
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen', //命名import { path } from 'path';
    meta: {
      title: '数据大屏', //菜单标题
      hidden: false, //代表路由标题在菜单中是否隐藏
      icon: 'Platform',
    },
  },

  // 权限管理
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock',
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'Acl',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/premission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Monitor',
        },
      },
    ],
  },

  // 商品管理
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods',
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          hidden: false,
          icon: 'Calendar',
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'Sku管理',
          hidden: false,
          icon: 'Orange',
        },
      },
    ],
  },

  // 未匹配到
  {
    // 当上面的路径都不匹配的时候就会执行这里，重定向返回404
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏
      icon: 'Grid',
    },
  },
]
