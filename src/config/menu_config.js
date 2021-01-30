import {
  HomeOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  ToolOutlined,
  PieChartOutlined,
  LineChartOutlined,
  BarChartOutlined,
  TableOutlined,
  UserOutlined,
  PartitionOutlined
} from '@ant-design/icons';
const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: 'home', // 对应的 key
    icon: <HomeOutlined/>, // 图标名称
    path:'/admin/home'//对应的path
  },
  {
    title: '商品',
    key: 'prod_about',
    icon: <AppstoreOutlined/>,
    children: [ // 子菜单列表
      {
        title: '分类管理',
        key: 'category',
        icon: <UnorderedListOutlined/>,
        path:'/admin/prod_about/category'
      },
      {
        title: '商品管理',
        key: 'product',
        icon: <ToolOutlined/>,
        path:'/admin/prod_about/product'
      },
    ]
  },
  {
    title: '用户管理', // 菜单标题名称
    key: 'user', // 对应的 key
    icon: <UserOutlined />, // 图标名称
    path:'/admin/user'
  },
  {
    title: '角色管理', // 菜单标题名称
    key: 'role', // 对应的 key
    icon: <PartitionOutlined />, // 图标名称
    path:'/admin/role'
  },
  {
    title: '图形图表',
    key: 'charts',
    icon: <TableOutlined />,
    children: [ // 子菜单列表
      {
        title: '柱状图',
        key: 'bar',
        icon: <BarChartOutlined />,
        path:'/admin/charts/bar'
      },
      {
        title: '折线图',
        key: 'line',
        icon: <LineChartOutlined />,
        path:'/admin/charts/line'
      },
      {
        title: '饼状图',
        key: 'pie',
        icon: <PieChartOutlined/>,
        path:'/admin/charts/pie'
      },
    ]
  },
]
export default menuList