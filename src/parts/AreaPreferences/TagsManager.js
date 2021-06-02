import React, { Component } from "react";
import '../../global.css'
import styles from './TagsManager.module.css'
import swal from "sweetalert";



const grid = 3;

const getListStyle = () => ({
    // background: '#eff5ef',
    padding: grid,
    width: 130,
});



export default class TagsManager extends Component {
  state = {
    items: ['村', '乡', '镇'],
    selectedItemIndex: -1,
    showAddBtn:false,
      listTitle:null,
  }
  constructor(props) {
      super(props);
      this.state.items=this.props.items? this.props.items:[];
      this.state.listTitle = this.props.title? this.props.title:'请传入标题名称';
  }

  onSelected(item, index) {
    // console.log(item);
    let newValue = index;
    if (this.state.selectedItemIndex === index) {
      newValue = -1;
    }
    this.setState({selectedItemIndex: newValue})
  }
  onClickRemoveBtn(index)
  {
      if (index <0)
      {
          return;
      }
      let tag = this.state.items[index];
      let newData = this.state.items;
      let that = this;
      swal({
          title: tag,
          text: "将要删除关键字["+tag+"]吗?",
          icon: "warning",
          // buttons: true,
          dangerMode: true,
          buttons:
              {
                  cancel:'取消',
                  confirm:'删除!',
              }
      })
          .then((willDelete) => {
              if (willDelete) {
                  newData.splice(index,1);
                  console.log('新的数据集合是:',newData, '要删除的index:', index);
                  this.setState({items:newData},
                    ()=>
                  {
                    swal("该关键字已删除", {
                      icon: "success",
                    });
                    let timout = setTimeout(()=>{swal.close();clearTimeout(timout)}, 2000);
                    //region  通知外部已经修改
                    if(that.onTagsChanged)
                    {
                      that.onTagsChanged(newData);
                    }
                    //endregion
                  }
                  );
              } else {
                  // swal("Your imaginary file is safe!");
              }
          });
  }
    onclickAddBtn()
    {
      let that = this;
        swal({
            text: '添加关键字...',
            content: "input",
            button: {
                text: "添加",
                closeModal: true,
            },
        })
            .then(tag => {
                if (tag === null)
                    return;
                if (!tag)
                {
                    swal('',"请输入有效的关键字", "error");
                    return;
                }
                let items = this.state.items;
                items.push(tag);
                this.setState({items:items},
                  ()=>
                  {
                    swal("已添加", {
                      icon: "success",
                    });
                    let timout = setTimeout(()=>{swal.close();clearTimeout(timout)}, 2000)
                    //region  通知外部已经修改
                    if(that.onTagsChanged)
                    {
                      that.onTagsChanged(items);
                    }
                    //endregion
                  }
                )
            })
    }


  render() {
    return (

      <div name={'总容器'} style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        minHeight: '220px',
        // backgroundColor:'#f2f2f6',
        boxShadow: '0 0 2px 2px #f2f2f6',
        fontSize: 12,
        marginLeft: 15,
        // width:'100%',
        // border:'1px solid red'
      }}>

        <div
          style={getListStyle()}
          onMouseEnter={()=>{this.setState({showAddBtn:true})}}
          onMouseLeave={()=>{this.setState({showAddBtn:false})}}
        >
          <div className={styles.title}>{this.state.listTitle}</div>
          {this.state.items.map((item, index) => {
            let selected = this.state.selectedItemIndex === index;
            return <div key={index} className={selected?styles.selected:styles.normal}
                        // style={{border:'1px solid red'}}
                        onClick={(e) => {
                          this.onSelected(item, index)
                        }}
            >
              {item}
              {selected && <div className={styles.deleteBtn} onClick={()=>{this.onClickRemoveBtn(index)}}>-</div>}
            </div>
          }
          )}
          {this.state.showAddBtn&&<div className={styles.addBtn} onClick={this.onclickAddBtn.bind(this)}>+</div>}
        </div>
      </div>
    );
  }
}
