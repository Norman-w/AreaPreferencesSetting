import React from 'react';
import styles from './App.module.css';
import chinaGeoJson from "./parts/AreaPreferences/100000_full";
const echarts = require('echarts')
class App extends React.Component
{
  componentDidMount() {
    let myMapEchartsObj = echarts.init(document.getElementById('map-content'));

    // fetch('https://geo.datav.aliyun.com/areas_v2/bound/100000_full.json', {
    //   method: "GET",
    //   mode: "no-cors",
    //
    //   headers: {
    //     "Content-Type": "application/json",
    //     'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    //     'Accept-Encoding':'gzip, deflate, br',
    //     'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
    //   }
    // }).then(
    //     (response)=>
    //     {
    //       console.log('response:', response)
    //       return response.json();
    //     }
    // ).then((res)=>
    // {
    //   console.log('获取json结果:', res)
    // let opt = {
    //
    //   visualMap :{
    //     min: 0,
    //         max: jsonObj.maxRange,
    //         text:['高','低'],
    //         realtime: false,
    //         calculable: true,
    //         inRange: {
    //       color: ['lightskyblue','yellow', 'orangered']
    //     }
    //   },
    //   series:[{
    //     name: '通州区各镇xxx统计图',
    //     type: 'map',
    //     map: '北京', // 自定义扩展图表类型
    //     aspectScale: 1.0, //长宽比 default: 0.75
    //     zoom: 1.1,
    //     roam: true,
    //     itemStyle:{
    //       normal:{label:{show:true}},
    //       emphasis:{label:{show:true}}
    //     },
    //     data: jsonObj.data //json对象中的data, data为JSONArray
    //   }
    //   ]
    // }
    // for (let i=0;i<chinaGeoJson.features.length;i++)
    // {
    //   chinaGeoJson.features[i].properties.name =      chinaGeoJson.features[i].properties.name.replace("省","");
    // }
      echarts.registerMap('china',chinaGeoJson);
    let  option = {

      silent:true,
      series : [
        {
          nameProperty:'name',
          name: '随机数据',
          type: 'map',
          map: 'china',
          selectedMode : 'multiple',
          label:{show:false},
          nameMap:{
            '河北省':'您的位置'
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
            }
          },
          //默认的各个区块的样式属性
          itemStyle:{
            // normal:{
            //
            // },
            borderWidth:1,//省份的边框宽度
            borderColor:'skyblue',//省份的边框颜色
            // areaStyle:{color:'#f60'},//设置地图颜色
            areaColor: 'lightgray',
            borderType:'dashed',
          },
          //强调,在鼠标路过的时候的参数
          emphasis:{
            label:{show:true,color:'red'},
            itemStyle:
                {
                  borderWidth: 3,
                  areaColor:'skyblue',
                }
            },
          select:
              {
                itemStyle: {
                  areaColor:'#de9633',
                }
              },
          data:[
            {name: '北京市', selected:false,value:1,color:'#ff0000'},
            {name: '天津市', selected:false,value:2},
            {name: '上海市', selected:false,value:3},
            {name: '重庆市', selected:true,value:4},
            {name: '河北省', selected:false,value:5},
            {name: '河南省', selected:true,value:6},
            {name: '云南省', selected:true,value:7},
            {name: '辽宁省', selected:true,value:8},
            {name: '黑龙江省', selected:false,value:9,
              // label:{show:true,color:'red'},
              // itemStyle:
              //     {
              //       borderWidth: 3,
              //       areaColor:'skyblue',
              //     }
            },
            {name: '湖南省', selected:false,value:10},
            {name: '安徽省', selected:false,value:11},
            {name: '山东省', selected:false,value:12},
            {name: '新疆维吾尔自治区', selected:false,value:13},
            {name: '江苏省', selected:false,value:14},
            {name: '浙江省', selected:false,value:15},
            {name: '江西省', selected:false,value:16},
            {name: '湖北省', selected:false,value:17},
            {name: '广西壮族自治区', selected:false,value:18},
            {name: '甘肃省', selected:false,value:19},
            {name: '山西省', selected:false,value:20},
            {name: '内蒙古自治区', selected:false,value:21},
            {name: '陕西省', selected:false,value:22},
            {name: '吉林省', selected:false,value:23},
            {name: '福建省', selected:false,value:24},
            {name: '贵州省', selected:false,value:25},
            {name: '广东省', selected:false,value:26},
            {name: '青海省', selected:false,value:27},
            {name: '西藏自治区', selected:false,value:28},
            {name: '四川省', selected:false,value:29},
            {name: '宁夏', selected:false,value:30},
            {name: '海南省', selected:false,value:31},
            {name: '台湾省', selected:false,value:32},
            {name: '香港特别行政区', selected:false,value:33},
            {name: '澳门特别行政区', selected:false,value:34}
          ]//各省地图颜色数据依赖value
        },

      ],
      // visualMap: {
      //   min: 0,
      //   max: 34,
      //   text:['高','低'],
      //   realtime: false,
      //   calculable: true,
      //   inRange: {
      //     color: ['lightskyblue','yellow', 'orangered']
      //   }
      // },
      dataRange: {
        x: '-10000',//图例横轴位置
        y: '-10000',//图例纵轴位置
        splitList: [
          // {start:1, end:1, label: '这个名字无所谓了', color: '#cfc5de'},
          {start:1, end:1, label: '北京市', color: '#cfc5de'},
          {start:2, end:2, label: '天津市', color: '#f1ebd1'},
          {start:3, end:3, label: '上海市', color: '#feffdb'},
          {start:4, end:4, label: '重庆市', color: '#e0cee4'},
          {start:5, end:5, label: '河北省', color: '#fde8cd'},
          {start:6, end:6, label: '河南省', color: '#e4f1d7'},
          {start:7, end:7, label: '云南省', color: '#fffed7'},
          {start:8, end:8, label: '辽宁省', color: '#e4f1d7'},
          {start:9, end:9, label: '黑龙江省', color: '#e4f1d7'},
          {start:10, end:10, label: '湖南省', color: '#fffed7'},
          {start:11, end:11, label: '安徽省', color: '#fffed8'},
          {start:12, end:12, label: '山东省', color: '#dccee7'},
          {start:13, end:13, label: '新疆维吾尔自治区', color: '#fffed7'},
          {start:14, end:14, label: '江苏省', color: '#fce8cd'},
          {start:15, end:15, label: '浙江省', color: '#ddceeb'},
          {start:16, end:16, label: '江西省', color: '#e4f1d3'},
          {start:17, end:17, label: '湖北省', color: '#fde8cd'},
          {start:18, end:18, label: '广西', color: '#fde8cd'},
          {start:19, end:19, label: '甘肃省', color: '#fde8cd'},
          {start:20, end:20, label: '山西省', color: '#fffdd6'},
          {start:21, end:21, label: '内蒙古自治区', color: '#ddcfe6'},
          {start:22, end:22, label: '陕西省', color: '#fad8e9'},
          {start:23, end:23, label: '吉林省', color: '#fce8cd'},
          {start:24, end:24, label: '福建省', color: '#fad8e8'},
          {start:25, end:25, label: '贵州省', color: '#fad8e8'},
          {start:26, end:26, label: '广东省', color: '#ddcfe8'},
          {start:27, end:27, label: '青海省', color: '#fad8e9'},
          {start:28, end:28, label: '西藏自治区', color: '#ddcfe6'},
          {start:29, end:29, label: '四川省', color: '#e4f1d5'},
          {start:30, end:30, label: '宁夏', color: '#fefcd5'},
          {start:31, end:31, label: '海南省', color: '#fad8e9'},
          {start:32, end:32, label: '台湾省', color: '#fce8cd'},
          {start:33, end:33, label: '香港特别行政区', color: '#dc9bbb'},
          {start:34, end:34, label: '澳门特别行政区', color: '#e0f7cc'},

        ]
      },

    };

    myMapEchartsObj.setOption(option);
    // myMapEchartsObj.dispatchAction({
    //   type: 'highlight', // 高亮指定的数据图形。通过seriesName或者seriesIndex指定系列。如果要再指定某个数据可以再指定dataIndex或者name。
    //   name: '北京'
    // })
    // })

  }

  render ()
  {
    let DOM = <div className={styles.mainContent}>
      <div className={styles.mapContent} id={'map-content'}>
      </div>
    </div>

    return DOM;
  }
}

export default App;