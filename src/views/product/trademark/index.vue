<template>
  <div>
    <!-- 
        table
          --border可以设置表格是否纵向有图标
        table-column
          --label设置标题 align设置对齐方式
      -->
    <el-card class="box_card">
      <el-button
        @click="addTrademark"
        class="addProd"
        type="primary"
        icon="Plus"
        size="default"
      >
        添加商品
      </el-button>

      <el-table :data="trademarkArr" style="width: 100%; margin: 15px 0" border>
        <el-table-column
          type="index"
          label="序号"
          width="80px"
          align="center"
        />
        <!-- table-column: 默认展示数据为div -->
        <el-table-column prop="tmName" label="品牌名称">
          <template #="{ row, $index }">
            <pre style="color: skyblue">{{ row.tmName }}</pre>
          </template>
        </el-table-column>

        <el-table-column prop="logoUrl" label="品牌LOGO">
          <template #="{ row, $index }">
            <el-image
              v-if="row.isEffectImg"
              style="width: 100px; height: 100px"
              fit="cover"
              lazy:true
              :src="row.logoUrl"
            ></el-image>

            <el-image
              v-else
              style="width: 100px; height: 100px"
              fit="cover"
              lazy:true
              src="../../../../public//avatar.jpg"
            ></el-image>
          </template>
        </el-table-column>

        <!-- 品牌操作 -->
        <el-table-column label="品牌操作">
          <template #="{ row, $index }">
            <el-button
              class="Buttonconrol"
              type="primary"
              size="large"
              icon="Edit"
              @click="editTrademark(row)"
            ></el-button>

            <el-popconfirm
              width="250"
              confirm-button-text="OK"
              cancel-button-text="No, Thanks"
              icon-color="#626AEF"
              :title="`Are
              you
              sure
              to
              delete
              ${row.tmName}?`"
              @confirm="confirmDelete(row.id)"
            >
              <template #reference>
                <el-button
                  class="Buttonconrol"
                  type="primary"
                  size="large"
                  icon="Delete"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 
          v-model:current-page:设置当前分页器样式
          v-model:page-size:设置每页展示多少条数据
          page-sizes:用于设置下拉菜单的数据
          :background: 按钮背景颜色
          :disabled:是否禁用分页
          layout:最下边组件的结构
    -->
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper ,->,sizes,total"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-card>

    <!-- 对话框组件, 在添加组件与修改已有品牌的业务的时候使用 -->
    <!-- v-mode是控制对话框显示与隐藏的 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <el-form
        style="width: 80%"
        :rules="rules"
        :model="trademarkParams"
        ref="formRef"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            v-model="trademarkParams.tmName"
            placeholder="请您输入品牌名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="logoUrl" label="品牌LOGO" label-width="100px">
          <!-- uploda组件属性：action图片上传路径书写/api，代理服务器不会发送这次请求 -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <!-- 具名插槽：footer -->
      <template #footer>
        <el-button
          class="ButtonconrolDialog Buttonconrol"
          type="primary"
          size="default"
          @click="cancel"
        >
          取消
        </el-button>
        <el-button
          class="ButtonconrolDialog Buttonconrol"
          type="primary"
          size="default"
          @click="confirm"
        >
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup="setup">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { ElMessage, UploadProps } from 'element-plus'
import {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
import {
  reqHasTrademark,
  reqAddOrUpdatrTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
// 当前页面
let pageNo = ref<number>(1)
// 每页展示多少条数据
let limit = ref<number>(3)
// 存储已有品牌的数据的总数
let total = ref<number>(0)
// 存储已有品牌的数据, 是一个Records数据的数组
let trademarkArr = ref<Records>([])
// 对话框的显示与隐藏
let dialogFormVisible = ref<boolean>(false)
// 品牌增加内容
const trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
// 获取el-form组件实例
let formRef = ref()

// 品牌校验自定义规则的方法
const validatorTmName = (rule: any, value: any, callBack: any) => {
  // 自定义校验规则
  // 当表单元素触发blur时候，会触发次方法
  // 如果callback() 函数他不传递值，默认是通过 ，反之不是
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('品牌名称大于等于两位'))
  }
}
// 品牌logo校验规则的方法
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  if (!value) {
    callBack(new Error('logo图片必须上传'))
  }
  callBack()
}

// 表单校验的规则对象
const rules = {
  tmName: [
    {
      // required必须要校验。表单项出现五角星
      // trigger - blur change
      required: true,
      trigger: 'blur',
      validator: validatorTmName,
    },
  ],
  logoUrl: [
    {
      required: true,
      validator: validatorLogoUrl,
    },
  ],
}
// 获取已有品牌的接口封装为一个函数：在任何情况下获取数据调用即可
const getHasTrademakr = async (page = 1) => {
  pageNo.value = page
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  getTrademarkData(result)
}

// 当页数发生变化触发事件回传了数据当前的页码
const handleCurrentChange = async (val: number) => {
  pageNo.value = val
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  getTrademarkData(result)
}

// 当下拉页发生变化时出发
const handleSizeChange = async (val: number) => {
  // 当前每一页的数据量发生变化的时候，当前页码归1
  pageNo.value = 1
  limit.value = val
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  getTrademarkData(result)
}

// 获得品牌的重复函数
const getTrademarkData = (result: TradeMarkResponseData) => {
  if (result.code === 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
    for (const item of result.data.records) {
      item.isEffectImg = item.logoUrl.charAt(0) === 'h'
    }
  }
}

// 增加品牌
const addTrademark = async () => {
  dialogFormVisible.value = true
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  trademarkParams.id = 0
  // 首先要搞清楚这里，当你第一次点击的时候表单组件还没渲染出来，因为点击和渲染肯定是先执行点击函数里面的代码，等你执行完之后再去渲染出来，那么点了第一次就不会出现这问题，因为你第一次已经渲染成了。所以为了解决这个可以用TS的? 来解决 <- 方法1
  // formRef.value?.clearValidate()

  // 第二种写法
  nextTick(() => {
    formRef.value.clearValidate()
  })
}

// 修改品牌 update
const editTrademark = (row: any) => {
  dialogFormVisible.value = true
  // ES6语法合并对象
  Object.assign(trademarkParams, row)
  nextTick(() => {
    formRef.value.clearValidate()
  })
}
// 删除品牌 delete
const confirmDelete = async (id: number) => {
  let result = await reqDeleteTrademark(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功!',
    })
    getHasTrademakr(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
// 对话框的取消和确认按钮
const cancel = () => {
  dialogFormVisible.value = false
}
const confirm = async () => {
  // 在你点确认之前会对整个表单进行校验
  // 校验这个方法进行表单项目的校验 只要当你成功之后才会执行下面的代码，await
  try {
    await formRef.value.validate()
    dialogFormVisible.value = false
    let result: any = await reqAddOrUpdatrTrademark(trademarkParams)
    if (result.code === 200) {
      dialogFormVisible.value = false
      ElMessage({
        type: 'success',
        message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
      })
      getHasTrademakr(trademarkParams.id ? pageNo.value : 1)
    } else {
      // 添加失败
      dialogFormVisible.value = false
      ElMessage({
        type: 'error',
        message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
      })
    }
  } catch (error) {
    console.log(error)
  }
}

// 上传图片组件之前的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 钩子可以再上传文件之前约束文件的格式和大小
  // 要求上传的格式必须是 png | jpg | gif  4M
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件必须小于4M',
      })
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件必须是PNG | JPG | JPEG',
    })
    return false
  }
}

// 图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  if (response.code == 200) {
    trademarkParams.logoUrl = response.data
    // 清楚对应的logo上传不成功的提示信息
    formRef.value.clearValidate('logoUrl')
  }
}
// 上来先加载
onMounted(() => {
  getHasTrademakr()
})
</script>

<style lang="scss" scoped>
.box_card {
  .addProd {
    padding: 0 10px;
  }
}
/* //p品牌操作的样式  */
.Buttonconrol {
  width: 75px;
  font-size: 20px;
  color: #fff;
}
.ButtonconrolDialog {
  background-color: skyblue;
  font-size: 14px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
