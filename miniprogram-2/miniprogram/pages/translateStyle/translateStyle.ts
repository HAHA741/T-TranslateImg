// pages/translateStyle/translateStyle.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        text:"漫画风",
        description:"修改为漫画风格",
        checked:true
      },
      {
        text:"水墨风",
        description:"修改为水墨风格",
        checked:false
      },{
        text:"卡通风",
        description:"修改为卡通风格",
        checked:false
      },{
        text:"涂鸦风",
        description:"修改为涂鸦风格",
        checked:false
      }
    ],
    
  
    navbarHeight:0,

  },

    changeStyle(e:any){
      console.log(e,'e')
      let {index,item} = e.currentTarget.dataset;
      if(item.checked){
        return 
      }
      let _list = this.data.list.map((item,_index)=>{
        if(_index==index){
          item.checked = true
        }else{
          item.checked = false;
        }
        return item
      })
      // let checked = !item.che
      this.setData({list:_list})
  
    },
    translateImg(){
      const pages = getCurrentPages();
      const previousPage = pages[pages.length - 2];
      let _style = this.data.list.find(({checked})=>checked);
      previousPage.setData({style:_style})
      wx.navigateBack({
        delta:1
      })
      // wx.navigateBack
    },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    const res = wx.getSystemInfoSync();
    const statusBarHeight = res.statusBarHeight;  // 获取状态栏高度
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect(); // 获取菜单按钮（右上角小图标）信息
    const navbarHeight = menuButtonInfo.top + menuButtonInfo.height + 10;  // 自定义导航栏的高度
    
    let _list = this.data.list.map((item,_index)=>{
      if(item.text==e.text){
        item.checked = true
      }else{
        item.checked = false;
      }
      return item
    })
    this.setData({ navbarHeight,list:_list });
    console.log(e,'e')

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})