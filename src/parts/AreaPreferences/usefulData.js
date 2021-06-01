//这里的每一个字段的数据不应该是写在前段的,应该在初始化以后
const usefulData =
  {
    //可选的偏好规则枚举
    mateRuleMethods : ['NONE', '买家留言', '卖家备注', '使用优先模板匹配', '地址过滤关键字',],
    useAbleTempsIndexList:[
      "EMS.QPERP.EMS京津冀",
      "ZTO.QPERP.中通传统",
      "YTO.QPERP.圆通传统",
      "STO.QPERP申通传统",
      "ZTO.TB.中通电子面单",
      "YTO.TB.圆通电子面单",
      "STO.PDD.快递一联单",
      "YTO.PDD.标准面单"
    ],
  };
export default usefulData;
