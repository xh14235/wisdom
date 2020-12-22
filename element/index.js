// 导入自己需要的组件
import { Select, Cascader, Calendar, Option } from 'element-ui'
const element = {
  install(Vue) {
    Vue.use(Select)
    Vue.use(Cascader)
    Vue.use(Calendar)
    Vue.use(Option)
  }
}
export default element