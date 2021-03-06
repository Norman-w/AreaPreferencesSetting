import React from 'react';
import styles from './SelectedProvincesShower.module.css';
import chinaGeoJson from "./parts/AreaPreferences/100000_full";


const echarts = require('echarts');

class SelectedProvincesShower extends React.Component
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
            ]
    };
    mapEchartsObj= {};
    mapId='';


    constructor(props) {
        super(props);
        if (props.selectedProvinces && Array.isArray(props.selectedProvinces))
        {
            let selectedData = this.buildSelectedProvincesJson(props.selectedProvinces);
            // console.log(selectedData)
            this.mapOption.series[0].data = selectedData;
            this.mapId ='map-content-'+ this.props.mapId;
            this.mapOption.series[0].map=this.mapId;
        }
    }
    componentDidMount() {
        this.mapEchartsObj = echarts.init(document.getElementById(this.mapId));
        echarts.registerMap(this.mapId, chinaGeoJson);
        this.mapEchartsObj.setOption(this.mapOption);

        let that = this;
        //region ????????????????????????,??????????????????,?????????????????????.??????????????????,???props??????????????????????????????????????????,???props??????????????????,?????????????????????
        this.mapEchartsObj.on(
            'click',(params)=>
            {
                // console.log('????????????:', params)
                let index = that.props.selectedProvinces.indexOf(params.name);
                // console.log('??????????????????:', that.props.selectedProvinces,'????????????:', params.name,'index:', index);
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
            console.log('?????????',this.mapOption.series[0].data);
        }
    }
    buildSelectedProvincesJson(selectedProvincesName)
    {
        let json = [];
        for (let i=0;i<selectedProvincesName.length;i++)
        {
            json.push(
                {
                    name:selectedProvincesName[i],
                    selected:true,
                }
            )
        }
        return json;
    }


    onMouseEnter()
    {
        this.mapOption.title= {
            show: true,
            // text:'4?????????????????????3???????????????????????????,???',
            // textStyle:{
            //     fontSize:12,
            // },
            subtext: '?????????&??????'
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

export default SelectedProvincesShower;