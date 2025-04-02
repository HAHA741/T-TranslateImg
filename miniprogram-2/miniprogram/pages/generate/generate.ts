// pages/generate/generate.ts
import * as utils from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarHeight:0,
    imgUrl:"",
    translateUrl:"",
    description:"",
    isLoading:true,

  },

  previewImg(e){
    let {url} = e.currentTarget.dataset;
    console.log('预览',url)
    wx.previewImage({
      current:url,
      urls:[url]
    })
  },
  goBack(){
    wx.navigateBack({
      delta:1
    })
  },
  saveImg(){
    wx.getImageInfo({
      src: this.data.translateUrl,
      success (res) {
        let path = res.path;
        wx.saveImageToPhotosAlbum({
          filePath:path,
          success(){
            console.log(res,'保存成功')
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          
          }
        })
        console.log(res.width)
        console.log(res.height)
      }
    })

  },
  translateImg(){
    let that =this;
        wx.request({
        url:"https://api.coze.cn/v1/workflow/run",
        header:{
          Authorization: "Bearer pat_XdZhO4EBIfE6ml2ehxMJbNi5bbtHK0lMsxQ96VjuyyaYf3d6TXnZBNbOzNDrvZ3Q"
        },
        data:{
          workflow_id:"7469985624058150964",
          parameters:{
            url:this.data.imgUrl,
            input:that.data.description
          },
        },
        method:"POST",
        success(res){
          let translateStr = res.data.data;
          let translateUrl = JSON.parse(translateStr).output
          that.setData({translateUrl})
          console.log(res,'图片地址')
        },
        complete(){
          that.setData({isLoading:false})
          wx.hideLoading()
        }
      })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    wx.showLoading({
      title: '图片绘制中',
    })
    const res = wx.getSystemInfoSync();
    const statusBarHeight = res.statusBarHeight;  // 获取状态栏高度
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect(); // 获取菜单按钮（右上角小图标）信息
    const navbarHeight = menuButtonInfo.top + menuButtonInfo.height + 10;  // 自定义导航栏的高度
    const imgUrl = utils.apiUrl+e.imgPath
    let description = e.description||"修改为漫画风格"
    console.log(imgUrl,'图片路径')
    this.setData({ navbarHeight,imgUrl:imgUrl,description });
    this.translateImg(imgUrl)
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