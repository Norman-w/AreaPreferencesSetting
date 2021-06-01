import React from 'react';
import { TreeSelect } from 'antd';
import treeData from "./treeData";

const { SHOW_PARENT } = TreeSelect;

class TreeSelect4Areas extends React.Component {
  state = {
    //默认选择的内容(key集合)
    // value: ['0-0-0'],
    value:[],
  };
  componentDidMount() {
    this.setState({value:this.props.selectedAreasIdList});
  }


  onChange = value => {
    if(value && this.props.onChange)
    {
      this.props.onChange(value);
    }
    // console.log('onChange ', value);
    this.setState({ value });
  };

  render() {
    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      placeholder: '请选择',
      style: {
        width: '100%',
      },
    };
    return <TreeSelect {...tProps} />;
  }
}
export default TreeSelect4Areas;
