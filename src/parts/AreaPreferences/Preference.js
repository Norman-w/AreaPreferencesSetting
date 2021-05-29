import React from 'react';
import ProvincesShower from "./ProvincesShower";
// import SelectedProvincesShower from "./SelectedProvincesShower";
import styles from './Preference.module.css';
import MateRuleMethods from "./MateRuleMethods";
import TemplateSequence from "./TemplateSequence";
import TagsManager from "./TagsManager";

class Preference extends React.Component
{
    guid = null;
    state=
        {

        };
    selectedProvinces=[];
    provincesInfo=null;
    constructor(props) {
        super(props);
        this.guid = this.getGuid();
        // console.log('guid is', this.guid);

        this.provincesInfo = this.props.provincesInfo;
        let preference = this.props.preference;
        if(!preference) return;
        let selectedProvinces = this.selectedProvinces;

        //某些省份并没有全选,被选中了市或区,记录这个省份所被选择的区域占比
        let provincesSelectedPercentInfo={
            '000000':0.00,
        };
        //region 每个偏好设置下面的省市区信息
        for (let j=0;j<preference.PreferenceAreasID.length;j++)
        {
            let areaId = preference.PreferenceAreasID[j];
            let provinceJson = {};
            let areaIdStr = ''+areaId;
            //region 如果是城市 或者是地区
            let areaIdProvinceStr = areaIdStr.substr(0,2);
            // let areaIdProvinceNum = parseInt(areaIdProvinceStr);
            let areaIdCityStr = areaIdStr.substr(2,2);
            let areaIdCityNum = parseInt(areaIdCityStr);
            let areaIdAreaStr = areaIdStr.substr(4,2);
            let areaIdAreaNum = parseInt(areaIdAreaStr);

            //省份的真实代码:
            let provinceIdStrReal = areaIdProvinceStr + '0000';

            if (areaIdCityNum>0 && areaIdAreaNum === 0)
            {
                // console.log('属于城市:', areaIdCityNum)
                //属于城市
                let oldPercentObj = provincesSelectedPercentInfo[provinceIdStrReal];
                let oldPercent = 0;
                if (oldPercentObj!==undefined && oldPercentObj!==null)
                {
                    //已经存在这个省份的数据了,在原来数据的基础上往上加
                    oldPercent = oldPercentObj;
                }
                //一个城市或者地区的占比
                let oneCityPercent = parseFloat(''+1)/parseFloat(this.provincesInfo[provinceIdStrReal].cityCount);
                // console.log('一个城市占比:', oneCityPercent,'城市数量:', this.provincesInfo[provinceIdStrReal].cityCount);
                provincesSelectedPercentInfo[provinceIdStrReal]= oldPercent + oneCityPercent;
            }
            else if(areaIdAreaNum>0)
            {
                // console.log('属于地区:', areaId)
                //属于地区
                let oldPercentObj = provincesSelectedPercentInfo[provinceIdStrReal];
                let oldPercent = 0;
                if (oldPercentObj!==undefined && oldPercentObj!==null)
                {
                    //已经存在这个省份的数据了,在原来数据的基础上往上加
                    oldPercent = oldPercentObj;
                }
                //一个城市或者地区的占比
                let oneAreaPercent = parseFloat(''+1)/parseFloat(this.provincesInfo[provinceIdStrReal].areaCount);
                provincesSelectedPercentInfo[provinceIdStrReal]= oldPercent + oneAreaPercent;
            }
            else
            {
                //属于整个省份

                provinceJson.name=this.provincesInfo[provinceIdStrReal].name;
                provinceJson.value=100;
                selectedProvinces.push(provinceJson);
            }
        }
        //region 把不完整被选择的省份的数据加入到要给地图展示器展示的信息中
        let provincesUnFullSelectedKeys = Object.keys(provincesSelectedPercentInfo);
        // if (provincesUnFullSelectedKeys && provincesUnFullSelectedKeys.length>0)
        // {
        //   console.log('省份信息:',this.provincesInfo, '索引:', provincesSelectedPercentInfo);
        // }
        for (let j=0;j<provincesUnFullSelectedKeys.length;j++)
        {
            let provinceIdStr = provincesUnFullSelectedKeys[j];
            if (provinceIdStr === '000000')
                continue;
            let percent = provincesSelectedPercentInfo[provinceIdStr];
            let provinceName = this.provincesInfo[provinceIdStr].name;
            selectedProvinces.push(
                {
                    name:provinceName,
                    value:Math.round(percent*100)
                }
            )
        }
        //endregion
        //endregion
        // console.log('展示信息:', selectedProvinces);


    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps, nextContext) {
    }

    getGuid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
    }
    render() {
        // console.log('当前显示的:',this.props.selectedProvinces)
        let DOM =
            <div className={styles.main}>
            <ProvincesShower
                // selectedProvinces={[{'黑龙江省':50},{'吉林省':90},{'辽宁省':100}]}
                // selectedProvinces={[
                //     {
                //         name:'黑龙江省',
                //         value:1
                //     },
                //     {
                //         name:'吉林省',
                //         value:30
                //     },
                //     {
                //         name:'广东省',
                //         value:80
                //     },
                //     {
                //         name:'云南省',
                //         value:100
                //     },
                //     {
                //         name:'河南省',
                //         value:50
                //     },
                // ]}
                selectedProvinces={this.selectedProvinces}
                mapId={this.guid}
            />
            {/*<div>这个地区偏好设置{this.guid}</div>*/}
            <MateRuleMethods methods={this.props.preference.MateRuleMethod}/>
                <TemplateSequence temps={this.props.preference.TemplateSequence}/>
            <TagsManager title={'如买家或卖家没有备注指定的快递,且地址中包含如下关键字时,不匹配'} items={this.props.preference.SkipTags}/>
                <TagsManager title={'卖家备注或买家留言包含如下关键字时,强制不匹配'} items={this.props.preference.MemoSkipTags}/>
                <TagsManager title={'卖家备注或买家留言包含如下关键字时,强制使用优先模板顺序匹配'} items={this.props.preference.UseAutoTempTags}/>

        </div>
        return DOM;
    }
}

export default Preference;
