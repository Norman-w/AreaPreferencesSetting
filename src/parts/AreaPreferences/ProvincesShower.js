import React from 'react';
import styles from './ProvincesShower.module.css';
import chinaGeoJson from "./100000_full";


const echarts = require('echarts');

class ProvincesShower extends React.Component
{
    mapOption={
        // silent: true,
        roam:true,
        series:
            [
                {
                    zoom:1.6,
                    center: [104.5, 35.71],
                    clickable:false,
                    map: '',
                    type: 'map',
                    selectedMode:'multiple',
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
                                    borderWidth:1,
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
            bottom:0,
            right:-1000,
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
            max:100,
            min:0,
            color:['#1f7c1a', '#b2d7b2']
        },
    };
    mapEchartsObj= {};
    mapId='';


    constructor(props) {
        super(props);
        if (props.selectedProvinces && Array.isArray(props.selectedProvinces))
        {
            let data = this.buildSelectedProvincesJson(props.selectedProvinces);
            // console.log(selectedData)
            this.mapOption.series[0].data = data;
            this.mapId ='map-content-'+ this.props.mapId;
            this.mapOption.series[0].map=this.mapId;
        }
    }
    componentDidMount() {
        this.mapEchartsObj = echarts.init(document.getElementById(this.mapId));
        echarts.registerMap(this.mapId, chinaGeoJson);
        this.mapEchartsObj.setOption(this.mapOption);

        let that = this;
        //region 注册鼠标点击事件,默认点击以后,会切换选择状态.使用函数注入,让props中指定的该显示的怎么点都显示,让props中没有指定的,怎么点都不显示
        let editFunc = this.onClickEditAreasBtn.bind(this);
        this.mapEchartsObj.on(
            'click',(params)=>
            {
                //region 如果点的是标题
                if (params.componentType && params.componentType === 'title'
                && params.event && params.event.target
                && params.event.target
                && params.event.target.style
                && params.event.target.style.text
                && params.event.target.style.text === '编辑')
                {
                    editFunc();
                    return;
                }
                //endregion
                // console.log('点击了的:', params)
                let index = that.props.selectedProvinces.indexOf(params.name);
                // console.log('要显示的列表:', that.props.selectedProvinces,'点击了的:', params.name,'index:', index);
                if (index<0)
                {
                    that.mapEchartsObj.dispatchAction({
                        type:'unselect',
                        name:params.name,
                    })
                }
                else {
                    that.mapEchartsObj.dispatchAction({
                        type:'select',
                        name:params.name,
                    })
                }
            }
        )
        //endregion
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps && nextProps.selectedProvinces && Array.isArray(nextProps.selectedProvinces))
        {
            let selectedData = this.buildSelectedProvincesJson(nextProps.selectedProvinces);

            this.mapOption.series[0].data = selectedData;
            this.mapEchartsObj.setOption(this.mapOption,true);
            console.log('新数据',this.mapOption.series[0].data);
        }
    }
    onClickEditAreasBtn()
    {
        console.log('点击了编辑偏好区域按钮');
    }
    buildSelectedProvincesJson(data)
    {
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


    onMouseEnter()
    {
        this.mapOption.title= {
            show: true,
            text:'该偏好所涉及区域',
            textStyle:{
                fontSize:12,
            },
            // subtext: '可缩放&拖动'
            subtext:'编辑',
            subtextStyle:
                {
                    color: '#d4a2cd'
                },
            triggerEvent:true,
        }
        // this.mapOption.series[0].select.label.show = true;
        this.mapEchartsObj.setOption(this.mapOption,true);
    }
    onMouseLeave()
    {
        // this.mapOption.series[0].select.label.show = false;
        this.mapOption.title= null;
        this.mapEchartsObj.setOption(this.mapOption,true);
    }
    render ()
    {
        return <div className={styles.main} id={this.mapId}
                    onMouseEnter={this.onMouseEnter.bind(this)}
                    onMouseLeave={this.onMouseLeave.bind(this)}
        >
        </div>
    }
}

export default ProvincesShower;