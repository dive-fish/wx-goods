// pages/set/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setList: [
      {
        title: "意见反馈",
        icon: true,
        text: "",
        tip: false,
        func: "navOpinion"
      },
      {
        title: "清除缓存",
        icon: false,
        text: "",
        tip: true,
        func: "clearStorage"
      },
      {
        title: "版本号",
        icon: false,
        text: "V1.0.0",
        tip: true
      }
    ]
  },
  getStorageInfo() {
    wx.getStorageInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          'setList[1].text': `${res.currentSize}KB`
        })
      }
    })
  },
  clearStorage() {
    wx.showModal({
      title: '提示',
      content: '清除缓存',
      success(res) {
        if (res.confirm) {
          wx.showToast({
            title: '清除成功',
            icon:'none'
          })
          wx.clearStorage()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  navOpinion() {
    wx.navigateTo({
      url: '../opinion/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStorageInfo()
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