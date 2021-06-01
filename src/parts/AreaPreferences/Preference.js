import React from 'react';
import ProvincesShower from "./ProvincesShower";
import styles from './Preference.module.css';
import MateRuleMethods from "./MateRullMethods";
import TemplateSequence from "./TemplateSequence";
import TagsManager from "./TagsManager";
import swal from "sweetalert";
import {Spin} from "antd";

class Preference extends React.Component
{
    //region 数据
    guid = null;
    state=
        {
          preference:null,
        };

    //endregion

    //region 构造函数和参数接收参数
    constructor(props) {
        super(props);
        this.guid = this.getGuid();

        // console.log('guid is', this.guid);

        // console.log('构建出来的选择了的城市:', this.props.preference['PreferenceAreasID']);
    }

    componentDidMount() {
      this.setState({preference:this.props.preference});
    }

    //endregion
    //region 获取guid
    getGuid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
    }
    //endregion

  //region 当该偏好的地区被更改了选择
  onChangeSelectedAreas(areasIdList)
  {
    let data = this.props.preference;
    data.PreferenceAreasID = areasIdList;
    //this.setState({preference:data})
  }
  //endregion
  //region 当修改了偏好规则使用顺序
  onMateRuleMethodsChanged(rules)
  {
    //当前台修改了排列顺序以后,偏好的数据被修改,但是没有使用setstate,所以不会更新掉mate rule的选择状态,但是如果编辑地图等
    //修改了preference数据的话,改地图那个是setstate了.所以会重新渲染
    this.state.preference.MateRuleMethod = rules;
        // let data = this.state.preference;
        // data.MateRuleMethod = rules;
        // this.setState({preference:data});
  }
  //endregion
  //region 当修改了所要使用的物流模板
  onTempsChanged(tempsIndexList)
  {
    this.state.preference.TemplateSequence = tempsIndexList;
    console.log('Preference接收到模板修改,参数是:', tempsIndexList)
  }
  //endregion
    //region 渲染函数
    render() {

      if (!this.state.preference)
      {
        return <Spin tip={'loading...'}></Spin>
      }
        let DOM =
          <div className={styles.main}>
            <ProvincesShower
              onChangeSelectedAreas={this.onChangeSelectedAreas.bind(this)}
              usingPreferenceAreasIDList={this.state.preference.PreferenceAreasID}
              mapId={this.guid}
            />
            {/*<div>这个地区偏好设置{this.guid}</div>*/}
            <MateRuleMethods methods={this.state.preference.MateRuleMethod}
                             onMateRuleMethodsChanged={this.onMateRuleMethodsChanged.bind(this)}
            />
            <TemplateSequence temps={this.state.preference.TemplateSequence}
                              onTempsChanged={this.onTempsChanged.bind(this)}
            />
            <TagsManager title={'如买家或卖家没有备注指定的快递,且地址中包含如下关键字时,不匹配'} items={this.props.preference.SkipTags}/>
            <TagsManager title={'卖家备注或买家留言包含如下关键字时,强制不匹配'} items={this.props.preference.MemoSkipTags}/>
            <TagsManager title={'卖家备注或买家留言包含如下关键字时,强制使用优先模板顺序匹配'} items={this.props.preference.UseAutoTempTags}/>

          </div>
        return DOM;
    }
    //endregion
}

export default Preference;
