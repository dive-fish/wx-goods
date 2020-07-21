// pages/my/opinion/opinion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    value: '',
    textarea: '',
  },
  chooseWxImage (type) {
    let contrast = ['gif', 'png', 'jpg', 'jpeg']
    let data = this.data.files
    wx.chooseImage({
      count: 6 - data.length, // 要上传的图片
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: (res) => {
        let tempFilePaths = res.tempFilePaths
        if (data.length + tempFilePaths.length > 6) {
          wx.showToast({
            title: '错误,只能上传6张',
            icon: 'none',
            duration: 2000
          })
          return false
        }
        for (let [e, i] of tempFilePaths.entries()) {
          data.push(i)
        }
        this.setData({
          files: data
        })
      }
    })
  },
  chooseImage () {
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      success: (res) => {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            this.chooseWxImage('camera')
          }
        }
      }
    })
  },
  delimage (e) {
    let i = e.currentTarget.dataset.index
    let data = this.data.files
    data.splice(i, 1)
    this.setData({
      files: data
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      value: e.detail.value
    })
  },
  inputAction: function (e) {
    this.setData({ textarea: e.detail.value })
  },
  upLoad() {
    let { files, value, textarea} = this.data;
    if (String(value).length < 1) {
      wx.showToast({
        title: '请输入联系电话!',
        icon: "none"
      })
      return;
    }
    if (textarea.length < 1) {
      wx.showToast({
        title: '请输入问题内容!',
        icon: "none"
      })
      return;
    }
    if (files.length < 1) {
      wx.showToast({
        title: '至少上传一张图片!',
        icon: "none"
      })
      return;
    }
    wx.showLoading({
      title: '提交中',
    })
    setTimeout(() => {
      wx.showToast({
        title: '提交成功',
        icon: "success"
      })
    }, 1500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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