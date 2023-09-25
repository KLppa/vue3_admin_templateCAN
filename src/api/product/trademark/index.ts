// 书写品牌管理模块的接口
import request from '@/utils/request'
import type { TradeMark, TradeMarkResponseData } from './type'
// 品牌管理模块接口地址
enum API {
  // 获取已有接口地址 get
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 新增一个品牌 post
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改一个品牌 put
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除一个品牌 delete
  DELETE_URL = '/admin/product/baseTrademark/remove/',
}

// 获取已有接口品牌的方法
// page:获取第几页，limit:获取几个已有品牌数据
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
// 新增商品, 修改商品 传入品牌名称和品牌logo即可
export const reqAddOrUpdatrTrademark = (data: TradeMark) => {
  // 修改已有品牌的数据
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

export const reqDeleteTrademark = (id: number) =>
  request.delete<any, any>(API.DELETE_URL + id)
