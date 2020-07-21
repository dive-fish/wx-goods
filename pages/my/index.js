// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    userInfo:{},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    headerList: [
      {
        icon: "iconicon-test",
        title: "待付款",
        Count: 0,
        Status: 1
      },
      {
        icon: "iconicon-test1",
        title: "出货中",
        Count: 0,
        Status: 2
      },
      {
        icon: "iconsvg",
        title: "已完成",
        Count: 0,
        Status: 3
      },
      {
        icon: "iconwanchengdingdan",
        title: "已关闭",
        Count: 0,
        Status: 4
      }
    ],
    myList: [
      {
        icon: "icondianhua",
        title: "联系我们",
        path: "./contact",
        func: "goPayList"
      },
      {
        icon: "iconshezhi",
        title: "设置",
        path: "./set",
        func: "binSet"
      }
    ]
  },
  tabClick(e) {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `../payList/index?index=${index+1}`
    })
  },
  binSet() {
    wx.navigateTo({
      url: '../set/index'
    })
  },
  bindGetUserInfo (e) {
    this.setData({
      userInfo: e.detail.rawData
    })
  },
  onLoad: function (options) {
    wx.getSetting({
      success:(res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: (res)=> {
              this.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  address() {
    wx.navigateTo({
      url: '../address/index',
    })
  },
  partner() {
    wx.navigateTo({
      url: '../partner/index',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let data = wx.getStorageSync('palyList');
    let headerList = this.data.headerList;
    for(let i of data) {
      for (let k of headerList) {
        if (i.palyState === k.Status) {
          k.Count += 1
        }
      }
    }
    this.setData({
      headerList
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})