//这里的每一个字段的数据不应该是写在前段的,应该在初始化以后
import areaInfo from "./areaInfo";

class PUB
  {
    //region 测试数据:
    testData:{
      //region 假设这是从服务器获取来的用户说他可以使用并将要使用在系统内的模板的index的list
      useAbleTempsIndexList :[
        "EMS.QPERP.EMS京津冀",
      "ZTO.QPERP.中通传统",
      "YTO.QPERP.圆通传统",
      "STO.QPERP申通传统",
      "ZTO.TB.中通电子面单",
      "YTO.TB.圆通电子面单",
      "STO.PDD.快递一联单",
      "YTO.PDD.标准面单"
      ],
      //endregion
      //region 假设这是从服务器获取来的地区偏好数据
      preferences:[
        {
          "PreferenceAreasName": "北京 天津 河北省 ",
          "PreferenceAreasID": [
            110000,
            120000,
            130300,
            130400,
            130500,
            130600,
            130700,
            // 130800,
            // 130900,
            // 131000,
          ],
          "MateRuleMethod": [
            2,
            1,
            3
          ],
          "TemplateSequence": [
            "EMS.QPERP.EMS京津冀",
            "ZTO.QPERP.中通传统",
            "YTO.QPERP.圆通传统",
            "STO.QPERP申通传统",
            "ZTO.TB.中通电子面单",
            "YTO.TB.圆通电子面单",
            "STO.PDD.快递一联单",
            "YTO.PDD.标准面单"
          ],
          "SkipTags": [
            "村",
            "乡",
            "镇"
          ],
          "UseAutoTempTags": [
            "快递均可到",
            "快递均可",
            "未联系",
            "未确认"
          ],
          "MemoSkipTags": [
            "退款",
            "到货发",
            "不要"
          ]
        },
        {
          "PreferenceAreasName": "辽宁省 吉林省 黑龙江省 ",
          "PreferenceAreasID": [
            210000,
            220000,
            230000
          ],
          "MateRuleMethod": [
            2,
            1,
            3,
            4
          ],
          "TemplateSequence": [
            "申通传统",
            "中通传统",
            "圆通传统",
            "申通电子面单",
            "中通电子面单",
            "圆通电子面单"
          ],
          "SkipTags": [
            "村",
            "乡",
            "镇"
          ],
          "UseAutoTempTags": [
            "快递均可",
            "未联系",
            "未确认"
          ],
          "MemoSkipTags": [
            "退款",
            "到货发",
            "不要"
          ]
        },
        {
          "PreferenceAreasName": "上海 江苏省 浙江省 安徽省 ",
          "PreferenceAreasID": [
            310000,
            320000,
            330000,
            340000
          ],
          "MateRuleMethod": [
            2,
            1,
            3,
            4
          ],
          "TemplateSequence": [
            "圆通传统",
            "中通传统",
            "申通传统",
            "圆通电子面单",
            "中通电子面单",
            "申通电子面单"
          ],
          "SkipTags": [],
          "UseAutoTempTags": [
            "快递均可",
            "未联系",
            "未确认"
          ],
          "MemoSkipTags": [
            "退款",
            "到货发",
            "快递择优",
            "不要"
          ]
        },
        {
          "PreferenceAreasName": "西藏自治区 新疆维吾尔自治区 ",
          "PreferenceAreasID": [
            540000,
            650000
          ],
          "MateRuleMethod": [
            3,
            2,
            1
          ],
          "TemplateSequence": [
            "EMS传统江浙沪"
          ],
          "SkipTags": [],
          "UseAutoTempTags": [],
          "MemoSkipTags": [
            "退款",
            "到货发"
          ]
        },
        {
          "PreferenceAreasName": "福建省 江西省 山东省 河南省 湖北省 湖南省 贵州省 云南省 甘肃省 青海省 宁夏回族自治区 ",
          "PreferenceAreasID": [
            140000,
            350000,
            360000,
            370000,
            410000,
            420000,
            430000,
            520000,
            530000,
            620000,
            630000,
            640000
          ],
          "MateRuleMethod": [
            2,
            1,
            3
          ],
          "TemplateSequence": [
            "圆通传统",
            "申通传统",
            "中通传统",
            "圆通电子面单",
            "申通电子面单",
            "中通电子面单"
          ],
          "SkipTags": [
            "村",
            "乡",
            "镇"
          ],
          "UseAutoTempTags": [
            "快递均可到",
            "快递均可",
            "未联系",
            "未确认"
          ],
          "MemoSkipTags": [
            "退款",
            "到货发",
            "不要"
          ]
        },
        {
          "PreferenceAreasName": "内蒙古自治区 广东省 广西壮族自治区 海南省 重庆 四川省 陕西省 ",
          "PreferenceAreasID": [
            150000,
            440000,
            450000,
            460000,
            500000,
            510000,
            610000
          ],
          "MateRuleMethod": [
            2,
            1,
            3
          ],
          "TemplateSequence": [
            "申通传统",
            "圆通传统",
            "中通传统",
            "申通电子面单",
            "圆通电子面单",
            "中通电子面单"
          ],
          "SkipTags": [
            "村",
            "乡",
            "镇"
          ],
          "UseAutoTempTags": [
            "快递均可",
            "未联系",
            "未确认"
          ],
          "MemoSkipTags": [
            "退款",
            "到货发",
            "不要"
          ]
        }
      ]
      //endregion
    }
    //endregion
    //可选的偏好规则枚举,后续可以考虑使用从服务器获取
    mateRuleMethods = ['NONE', '买家留言', '卖家备注', '使用优先模板匹配', '地址过滤关键字',];
    useAbleTempsIndexList = this.testData.useAbleTempsIndexList;
    provincesInfo = null;

    constructor() {
      this.provincesInfo = this.buildProvinceInfoObj();
    }


    //region 获取该省份一共有多少个area
    buildProvinceInfoObj()
    {
      let info = {

      };
      for (let i=0;i<areaInfo.length;i++)
      {
        let proInfo = {};
        let pro = areaInfo[i];
        if (!pro.cities || pro.cities.length<1)
        {
          continue;
        }
        proInfo.cityCount=pro.cities.length;
        proInfo.areaCount = 0;
        proInfo.name = pro.Name;
        if (pro.cities && pro.cities.length>0)
        {
          for (let j=0;j<pro.cities.length;j++)
          {
            if (pro.cities[j].areas) {
              proInfo.areaCount += pro.cities[j].areas.length;
            }
          }
        }
        info[''+pro.Id] = proInfo;
      }
      // console.log('制作完成', info);
      return info;
    }
    //endregion
  };
const pub = new PUB();
export default pub;
