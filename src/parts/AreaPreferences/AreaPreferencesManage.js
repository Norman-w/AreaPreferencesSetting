import React from 'react';
// import ProvincesShower from "./ProvincesShower";
// import SelectedProvincesShower from "./SelectedProvincesShower";
import styles from './AreaPreferencesManage.module.css';
import chinaGeoJson from "./100000_full";
import Preference from "./Preference";
import areas from "../../areas";
import {Button} from "antd";
import {
    SaveTwoTone, FileAddOutlined,
} from '@ant-design/icons';

class AreaPreferencesManage extends React.Component
{
    state=
        {
            preferences: pub.testData.preferences
        };
    constructor(props) {
        super(props);

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


  //region 当偏好发生了变化
  onPreferenceChanged(index)
  {

  }
  //endregion

  //region 点击添加偏好
  onClickAddPreferenceBtn()
  {
    let data = this.state.preferences;
    data.push({});
    this.setState({preferences:data});
  }
  //endregion

  //region 点击保存
  onClickSavePreferencesBtn()
  {
    console.log(this.state.preferences[0]);
  }
  //endregion
    render() {
        let preferencesDOM = [];
        for (let i=0;i<this.state.preferences.length;i++)
        {
          //region 每一个偏好设置
            let preference = this.state.preferences[i];

            preferencesDOM.push(
                <Preference preference={preference} key={i} onChanged={()=>{this.onPreferenceChanged.bind(this)(i)}}/>
            )
          //endregion
        }
        let DOM = <center><div className={styles.areaPreferencesManage}>
            {preferencesDOM}
            <div className={styles.btnLine}>
              <Button icon={<FileAddOutlined/>}
                      onClick={this.onClickAddPreferenceBtn.bind(this)}
              >新的偏好</Button>
              <Button type={'primary'}
                      icon={<SaveTwoTone twoToneColor="#cccccc" />}
                      style={{marginLeft:30}}
                      onClick={this.onClickSavePreferencesBtn.bind(this)}
              >保存</Button>
            </div>
        </div></center>
        return DOM;
    }
}

export default AreaPreferencesManage;
