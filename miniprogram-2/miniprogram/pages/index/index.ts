// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
import * as utils from "../../utils/util"
import {md5} from "../../utils/mdX"
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
console.log(utils,'utils')
Component({
  data: {
    navbarHeight:0,
    style:{
      text:"漫画风",
      description:"修改为漫画风格",
      checked:true
    },
    selectedImg:"",
    imgPath:"",

  },
  methods: {
    goTranslateStyle(){
      wx.navigateTo({
        url:`/pages/translateStyle/translateStyle?text=${this.data.style.text}`
      })

    },
    // 事件处理函数
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs',
      })
    },

    translateImg(){
      console.log(this.data.imgPath,'this.data.imgPath')
      
      if(!this.data.imgPath){
        wx.showToast({title:"请上传图片",icon:"error"})
        return
      }
      wx.navigateTo({
        url:`/pages/generate/generate?imgPath=${this.data.imgPath}&description=${this.data.style.description}`
      })
    },
    chooseImg(){
      let that = this;
      wx.chooseMedia({
        count:1,
        mediaType:['image'],
        success(res){
          console.log('选择图片',res)
          let path :string = res.tempFiles[0].tempFilePath;
          that.setData({
            selectedImg:path
          })
          console.log(path,'文件路径')
          wx.uploadFile({
            url:utils.apiUrl+"/api/file/uploadFile",
            filePath:path,
            header:{
              'Authorization': wx.getStorageSync('token')
            },
            name:'file',
            success(res){
              console.log('上传成功',res.data)
              that.data.imgPath = JSON.parse(res.data).data
            }
          })
        }
      })

    },
    onChooseAvatar(e: any) {
      const { avatarUrl } = e.detail
      const { nickName } = this.data.userInfo
      this.setData({
        "userInfo.avatarUrl": avatarUrl,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    onInputChange(e: any) {
      const nickName = e.detail.value
      const { avatarUrl } = this.data.userInfo
      this.setData({
        "userInfo.nickName": nickName,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    getUserProfile() {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    },
  },
  attached() {
    // const plaintext = "admin";
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect(); // 获取菜单按钮（右上角小图标）信息
    const navbarHeight = menuButtonInfo.top + menuButtonInfo.height + 10;  // 自定义导航栏的高度
    let password = md5("admin")
    console.log(password,'password')
   wx.request({
      url:utils.apiUrl+"/api/user/login",
      // header:{
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // },
      method:'POST',
      data:{
        username:'root',
        password:'123456'
      },
      success(res:any){
        console.log(res,'登录')
        wx.setStorageSync('token',res.data.data.token)
      },
      fail(res:any){
        console.log(res,'登录失败')
      }

    })
    this.setData({ navbarHeight });
    console.log('组件已经被加载');
    // 类似于 onLoad，可以在这里初始化数据等
  },

})
