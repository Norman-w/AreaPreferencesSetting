import React from 'react';
// import ProvincesShower from "./ProvincesShower";
// import SelectedProvincesShower from "./SelectedProvincesShower";
import styles from './AreaPreferencesManage.module.css';
import chinaGeoJson from "./100000_full";
import Preference from "./Preference";
import areas from "../../areas";
import areaInfo from "./areaInfo";

class AreaPreferencesManage extends React.Component
{
    //mateRuleMethods:{ NONE = 0, 买家留言 = 1, 卖家备注 = 2, 使用优选模板匹配 = 3, 地址过滤关键字 = 4 }
    mateRuleMethods = ['NONE','买家留言','卖家备注','使用优先模板匹配,','地址过滤关键字',];
    provincesInfo={
      '110000':{
        name:'北京',
        cityCount:10,
        areaCount:100,
      }
    };
    state=
        {
            preferences: [
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
        };
    constructor(props) {
        super(props);
        this.provincesInfo = this.buildProvinceInfoObj();
    }
    componentDidMount() {
        // this.buildChinaAreasInfo();
    }
    //region 构建中国数据 2021年05月25日18:01:26  已经用完了  创建了中国数据的结构化数据,上海,天津,重庆,北京,台湾,已经重命名了.
    buildChinaAreasInfo()
    {
        //region 构建中国数据
        let china = [];
        for (let i=0;i<areas.length;i++)
        {
            let area = areas[i];
            if (area.Type!==2)
            {
                continue;
            }
            if(area.Id===110000)
            {
                area.Name='北京市';
            }
            if(area.Id===500000)
            {
                area.Name='重庆市';
            }
            if(area.Id===310000)
            {
                area.Name='上海市';
            }
            if(area.Id===120000)
            {
                area.Name='天津市';
            }
            if(area.Id===710000)
            {
                area.Name='台湾省';
            }
            china.push(area);
            area.cities=[];
        }
        // console.log('全国省份:', china);
        for (let i=0;i<china.length;i++)
        {
            let pro = china[i];
            for (let j=0;j<areas.length;j++)
            {
                let city = areas[j];
                if (city.Type===3)
                {
                    if (city.ParentId === pro.Id)
                    {
                        city.areas=[];
                        pro.cities.push(city);
                    }
                }
            }
        }
        // console.log('全国省份2', china);
        for (let i=0;i<china.length;i++)
        {
            let pro = china[i];
            for (let j=0;j<pro.cities.length;j++)
            {
                let city = pro.cities[j];
                for (let k=0; k<areas.length;k++)
                {
                    let area = areas[k];
                    if (area.Type===4)
                    {
                        if (area.ParentId === city.Id)
                        {
                            city.areas.push(area);
                        }
                    }
                }
            }
        }
        console.log('全国省份3', china);
        let chinaJson = JSON.stringify(china);
        console.log(chinaJson);
        //endregion
    }
    //endregion
    componentWillReceiveProps(nextProps, nextContext) {
    }

    //region 根据chinaGeoJson,生成省份id和名字的字典
    buildProvincesIdNameDic()
    {
        let dic = {};
        if (chinaGeoJson && chinaGeoJson.features && chinaGeoJson.features.length>0)
        {
            for (let i=0;i<chinaGeoJson.features.length;i++)
            {
                dic[chinaGeoJson.features[i].properties.adcode] = chinaGeoJson.features[i].properties.name;
            }
        }
        return dic;
    }
    //endregion

  //region 获取该城市/地区 在省份中的占比
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
  //endregion
    render() {
        let preferencesDOM = [];
        for (let i=0;i<this.state.preferences.length;i++)
        {
          //region 每一个偏好设置
            let preference = this.state.preferences[i];

            preferencesDOM.push(
                <Preference preference={preference} provincesInfo={this.provincesInfo} key={i}/>
            )
          //endregion
        }
        let DOM = <div className={styles.areaPreferencesManage}>
            {preferencesDOM}
        </div>
        return DOM;
    }
}

export default AreaPreferencesManage;
