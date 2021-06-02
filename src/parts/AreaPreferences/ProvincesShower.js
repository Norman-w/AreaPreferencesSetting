import React from 'react';
import styles from './ProvincesShower.module.css';
import chinaGeoJson from "./100000_full";
import antd from 'antd';
import withReactContent from 'sweetalert2-react-content'
import Swal2 from "sweetalert2";
import {Modal} from "antd";
import TreeSelect4Areas from "./TreeSelect4Areas/App";
import pub from "./pub";

const { confirm } = Modal;

const MySwal2 = withReactContent(Swal2)

const echarts = require('echarts');

class ProvincesShower extends React.Component {
  //region 数据
  mapOption = {
    // silent: true,
    roam: true,
    series:
      [
        {
          zoom: 1.6,
          center: [104.5, 35.71],
          clickable: false,
          map: '',
          type: 'map',
          selectedMode: 'multiple',
          itemStyle:
            {
              areaColor: '#f8f8f8',
              borderColor: '#dadada',
            },
          select:
            {
              itemStyle:
                {
                  areaColor: '#adfa33',
                  borderColor: '#adcaaa',
                  borderWidth: 1,
                  // borderType:[3,1]
                },
              label: {
                show: false
              },
            },
          data: [],
        },
      ],
    dataRange: {
      // x: '-10000',//图例横轴位置
      // y: '-10000',//图例纵轴位置
      // x:0,
      // y:0,
      bottom: 0,
      right: -1000,
      // splitList: [
      //     // {start:1, end:1, label: '这个名字无所谓了', color: '#cfc5de'},
      //     {start:1, end:10, color: '#1fc5de'},
      //     {start:11, end:20, color: '#81ebd1'},
      //     {start:21, end:30, color: '#f2ff2b'},
      //     {start:31, end:40,  color: '#e0ce34'},
      //     {start:41, end:50,  color: '#fde8cd'},
      //     {start:51, end:60,  color: '#34f1d7'},
      //     {start:61, end:70, color: '#2ffed7'},
      //     {start:71, end:80, color: '#e421d7'},
      //     {start:81, end:90,  color: '#34f1d7'},
      //     {start:91, end:100,  color: '#efaed7'},
      // ]
      max: 100,
      min: 0,
      color: ['#1f7c1a', '#b2d7b2']
    },
  };
  mapEchartsObj = {};
  mapId = '';
  provincesInfo:null;
  usingPreferenceAreasIDList=[];
  //endregion

  //region 构造函数等基础方法
  constructor(props) {
    super(props);
    this.provincesInfo = pub.provincesInfo;
      // this.selectedProvincesPercentInfoList = this.convert2ProvincesPercent(this.props.usingPreferenceAreasIDList);
      // let data = this.buildSelectedProvincesJson(props.selectedProvinces);
    this.usingPreferenceAreasIDList = this.props.usingPreferenceAreasIDList;
      let data = this.convert2ProvincesPercent(this.usingPreferenceAreasIDList);
      // console.log(selectedData)
      this.mapOption.series[0].data = data;
      this.mapId = 'map-content-' + this.props.mapId;
      this.mapOption.series[0].map = this.mapId;
  }

  componentDidMount() {
    this.mapEchartsObj = echarts.init(document.getElementById(this.mapId));
    echarts.registerMap(this.mapId, chinaGeoJson);
    this.mapEchartsObj.setOption(this.mapOption);

    let that = this;
    //region 注册鼠标点击事件,默认点击以后,会切换选择状态.使用函数注入,让props中指定的该显示的怎么点都显示,让props中没有指定的,怎么点都不显示
    let editFunc = this.onClickEditAreasBtn.bind(this);
    this.mapEchartsObj.on(
      'click', (params) => {
        //region 如果点的是标题
        if (params.componentType && params.componentType === 'title'
          && params.event && params.event.target
          && params.event.target
          && params.event.target.style
          && params.event.target.style.text
          && params.event.target.style.text === '编辑') {
          editFunc();
          return;
        }
        //endregion
        // console.log('点击了的:', params)
        let index = that.props.usingPreferenceAreasIDList.indexOf(params.name);
        // console.log('要显示的列表:', that.props.selectedProvinces,'点击了的:', params.name,'index:', index);
        if (index < 0) {
          that.mapEchartsObj.dispatchAction({
            type: 'unselect',
            name: params.name,
          })
        } else {
          that.mapEchartsObj.dispatchAction({
            type: 'select',
            name: params.name,
          })
        }
      }
    )
    //endregion
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps && nextProps.usingPreferenceAreasIDList && Array.isArray(nextProps.usingPreferenceAreasIDList)) {
      let data = this.convert2ProvincesPercent(nextProps.usingPreferenceAreasIDList);

      this.mapOption.series[0].data = data;
      this.mapEchartsObj.setOption(this.mapOption, true);
      // console.log('新数据', this.mapOption.series[0].data);
    }
  }


  //endregion


  //根据给定的地区编号id,判断所属的省份是否有被选中,半选,换成用于省份展示控件的控件展示的地区编码+所选百分比的数据
  convert2ProvincesPercent(areaIds)
  {
    if (!areaIds)
    {
      return null;
    }
    let ret = [];
    //某些省份并没有全选,被选中了市或区,记录这个省份所被选择的区域占比
    let provincesSelectedPercentInfo={
      '000000':0.00,
    };
    //region 每个偏好设置下面的省市区信息
    for (let j=0;j<areaIds.length;j++)
    {
      let areaId = areaIds[j];
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
        ret.push(provinceJson);
      }
    }
    // console.log('出来的ret是啥呀',ret);
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
      ret.push(
        {
          name:provinceName,
          value:Math.round(percent*100)
        }
      )
    }
    return ret;
    //endregion
    //endregion
    // console.log('展示信息:', ret);
  }

  //region 工具方法
  buildSelectedProvincesJson(data) {
    console.log('buildSelectedProvincesJson', data);
    let json = data;
    // let json = [];
    // for (let i=0;i<selectedProvincesName.length;i++)
    // {
    //     json.push(
    //         {
    //             name:selectedProvincesName[i],
    //             // selected:true,
    //         }
    //     )
    // }
    return json;
  }

  //endregion

  //region 用户交互
  onClickEditAreasBtn() {
    let that = this;
    confirm({
      title: '请选择该偏好所涉及的区域',
      // icon: <ExclamationCircleOutlined />,
      content: <TreeSelect4Areas
        selectedAreasIdList={that.usingPreferenceAreasIDList}
        onChange={(value)=>{
          this.usingPreferenceAreasIDList = value;
      }
      }/>,
      onOk() {
        let data = that.convert2ProvincesPercent(that.usingPreferenceAreasIDList);

        that.mapOption.series[0].data = data;
        that.mapEchartsObj.setOption(that.mapOption, true);
        if (that.props.onChangeSelectedAreas)
        {
          // console.log('ok,数据已经更新到视图,接下来调用外部event,更改preference的数据.但是preference控件不刷新state, 选择的是:', that.usingPreferenceAreasIDList);
          that.props.onChangeSelectedAreas(that.usingPreferenceAreasIDList);
        }
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  }

  onMouseEnter() {
    this.mapOption.title = {
      show: true,
      text: '该偏好所涉及区域',
      textStyle: {
        fontSize: 12,
      },
      // subtext: '可缩放&拖动'
      subtext: '编辑',
      subtextStyle:
        {
          color: '#d4a2cd'
        },
      triggerEvent: true,
    }
    // this.mapOption.series[0].select.label.show = true;
    this.mapEchartsObj.setOption(this.mapOption, true);
  }

  onMouseLeave() {
    // this.mapOption.series[0].select.label.show = false;
    this.mapOption.title = null;
    this.mapEchartsObj.setOption(this.mapOption, true);
  }

  //endregion

  //region 渲染
  render() {
    return <div className={styles.main} id={this.mapId}
                onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)}
    >
    </div>
  }

  //endregion
}

export default ProvincesShower;
