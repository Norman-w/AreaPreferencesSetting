import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from './MateRuleMethods.module.css';
import '../../global.css'
import Swal2 from 'sweetalert2';

//region 全局数据
//region 可以使用的规则list
const mateRuleMethods = ['NONE','买家留言','卖家备注','使用优先模板匹配','地址过滤关键字',];
//endregion

//region 样式,一个单位的占位宽度基础是多少.根据这个数值可以设置页面的外边框等边距样式
const grid = 3;
//endregion
//endregion



//region 全局方法

//region 获取guid
const getGuid = ()=>{
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
}
//endregion


//region 初始化数据
const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        // id: `item-${k + 1}`,
        id:getGuid(),
        content: `this is content ${k + 1}`
    }));
const getItems2 = ()=>
{
    let ret = [];
    for (let i=1;i<mateRuleMethods.length;i++)
    {
        ret.push(
            {
                // id:'item-'+i,
                id:getGuid(),
                content:mateRuleMethods[i],
            }
        )
    }
    return ret;
}
const getItems3=(MateRuleMethodsArr)=>
{
//     "MateRuleMethod": [
//     2,
//     1,
//     3
// ],
    if (!MateRuleMethodsArr)
        return null;
    let ret = [];
    for (let i = 0;i<MateRuleMethodsArr.length;i++)
    {
        let current = MateRuleMethodsArr[i];
        ret.push(
            {
                // id:'rule-'+i,
                id:getGuid(),
                content:mateRuleMethods[current],
            }
        )
    }
    return ret;
}
//endregion

//region 方法:重新记录数组顺序
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    //删除并记录 删除元素
    const [removed] = result.splice(startIndex, 1);
    //将原来的元素添加进数组
    result.splice(endIndex, 0, removed);
    return result;
};
//endregion

//region  设置样式:获取给定参数的list内的元素的样式
const getItemStyle = (that,item, isDragging, draggableStyle) => {
    // console.log('获取样式:选择了吗?',item, '当前的选中的id是:', that.state)
    // console.log('是否一样?',item.id === that.state.selectedItemId)
    let isSelected = item.id === that.state.selectedItemId;
    let normal = {
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',


        // styles we need to apply on draggables
        ...draggableStyle
    }
    let draggingInfo = {
        background: isDragging ? "#ccd795" : "#edf6f3",
    }
    let selectedInfo = null;
    if(isSelected)
    {selectedInfo = {
        border: '1px dashed #888666',
        borderRadius:'5px',
    }}
    else
    {
        selectedInfo = {
            border: '1px solid #ffffff',
            borderRadius:'0px',
        }
    }

    // let sss = styles.selected;
    // console.log(sss);

    let ret = {
        ...normal,
        ...draggingInfo,
        ...selectedInfo,
        // 拖拽的时候背景变化
    }
        return ret;
};
//endregion

//region 获取list外框的样式
const getListStyle = () => ({
    // background: '#eff5ef',
    padding: grid,
    width: 200
});
//endregion

//endregion




//region 控件定义的主体
export default class MateRuleMethods extends Component {
    //组件的数据
    state= {
        items:[],
        selectedItemId:null,
        showAddBtn:false,
    }
    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            // items: getItems(4)
            // items:getItems2()
            items :getItems3(this.props.methods)
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    //region 响应事件集


    //当用户拖拽结束
    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        // console.log(result);

        //region 找出之前被选中的那个的id
        let oldSelectedItem = null;
        if (this.state.selectedItemId)
        {
            oldSelectedItem = this.state.items.find((item)=>{return item.id === this.state.selectedItemId})
        }
        //endregion
        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items
        }
        ,
            //region 设置完了新的排序数据以后,找到原来被选中的那个元素(如果有),然后让他的新位置设置为"当前被选择元素的位置"
            // ()=>
            // {
            //     if (oldSelectedItem)
            //     {
            //         let oldSelectedItemId = oldSelectedItem.id;
            //         for (let i=0;i<this.state.items.length;i++)
            //         {
            //             if (this.state.items[i].id === oldSelectedItemId)
            //             {
            //                 this.setState({selectedItemIndex:i})
            //                 break;
            //             }
            //         }
            //     }
            // }
            //endregion
        );
    }


    //当用户选择元素
    onSelected(item)
    {
        // console.log('点了选择', item.id)
        if (!item)
            return;
        // console.log(item);
        // let newValue = index;
        // if (this.state.selectedItemId === item.id)
        // {
        //     newValue = -1;
        // }
        if (this.state.selectedItemId === item.id)
        {
            this.setState({selectedItemId:null})
        }
        else {
            this.setState({selectedItemId: item.id})
        }
    }

    //当删除元素
  onClickRemoveBtn(index)
  {
    let data = this.state.items;
    data.splice(index,1);
    this.setState({items:data,showAddBtn:true});
  }
    //endregion


    //region 当用户点了添加按钮
    async onClickAddBtn()
    {
        //region 已经在使用的就不让选了.
        let canSelectItems = [];
        for (let i=1;i<mateRuleMethods.length;i++)
        {
            let havenItem = this.state.items.find((item)=>
            {
                return item.content === mateRuleMethods[i];
            })
            if(havenItem)
            {
                continue;
            }
            // let currentRadioItem = {};
            // //为空结构currentRadioItem 设置key和name相等(直接会添加键值对)
            // currentRadioItem[mateRuleMethods[i]] = mateRuleMethods[i];
            // canSelectItems.push(currentRadioItem);
            canSelectItems.push(mateRuleMethods[i]);
        }

        // console.log('已经有的:', this.state.items);
        //endregion

        //region 如果没有可以选的,退出,通常不会这样的,因为列表中如果已经包含了所有已经选择的,添加按钮就不显示了.
        if (!canSelectItems || canSelectItems.length ===0)
        {
            return;
        }
        //endregion
        //region 如果只有一项的话,直接添加这一项进来就可以了.

        if (canSelectItems.length === 1)
        {
            let data = this.state.items;
            data.push(
                {
                    // id:'item-'+data.length,
                    id:getGuid(),
                    content:canSelectItems[0],
                }
            )
            this.setState({items:data,showAddBtn:false});
            return;
        }

        //endregion



        //region 使用sweetalert2进行展示选择
        const { value: selectedIndex } = await Swal2.fire({
            title: '请选择要添加的物流匹配规则',
            input: 'select',
            inputOptions: canSelectItems,
            inputPlaceholder: '',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    // if (value === 'oranges') {
                        resolve()
                    // } else {
                    //     resolve('You need to select oranges :)')
                    // }
                })
            }
        })
        if (selectedIndex>=0)
        {
            //选择有效的值,进行添加
            let selectedItem = canSelectItems[selectedIndex];
            if (selectedItem)
            {
                let newData = this.state.items;
                newData.push(
                    {
                        // id:'item-'+newData.length,
                        id:getGuid(),
                        content:canSelectItems[selectedIndex],
                    }
                )
            }
        }
        // if (selectedIndex>=0) {
        //     // Swal2.fire(`You selected: ${fruit}`)
        //     Swal2.fire(`You selected: ${canSelectItems[selectedIndex]}`)
        // }
        //endregion
    }
    //endregion


    //region 渲染
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div name={'总容器'} style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'flex-start',
                    minHeight:220,
                    // backgroundColor:'#f2f2f6',
                    boxShadow: '0 0 2px 2px #f2f2f6'
                    // width:'100%',
                    // border:'1px solid red'
                }}>

                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                //provided.droppableProps应用的相同元素.
                                {...provided.droppableProps}
                                // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
                                ref={provided.innerRef}
                                style={getListStyle(snapshot)}
                                onMouseEnter={()=>{this.setState({showAddBtn:this.state.items.length < 4})}}
                                onMouseLeave={()=>{this.setState({showAddBtn:false})}}
                            >
                                <div className={styles.titleStyle}>规则使用顺序,拖拽排序,点击编辑</div>
                                {this.state.items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(this,
                                                    item,
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                                onClick={(e)=>{this.onSelected(item)}}
                                            >
                                                {item.content}
                                              {<div hidden={!(this.state.selectedItemId === item.id)} className={styles.deleteBtn} onClick={()=>{this.onClickRemoveBtn(index)}}>-</div>}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {/* 占位符号 */}
                                {provided.placeholder}
                                {this.state.showAddBtn && <div className={styles.addBtn} onClick={this.onClickAddBtn.bind(this)}>＋</div>}
                            </div>
                        )}
                    </Droppable>
                    {/*<div name={'左边一条箭头走向的'}  className={'swiper-animate'}>↓</div>*/}
                </div>

            </DragDropContext>
        );
    }
    //endregion
}
//endregion
