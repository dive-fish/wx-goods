// pages/my/partner/partner.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input: [{
      title: '手机号',
      placeholder: '请输入手机号',
      value: '',
      type: 'number',
      max: 11
    }, {
      title: '验证码',
      placeholder: '请输入验证码',
      value: '',
      func: 'obtain',
      type: 'number',
      max: 8
    }, {
      title: '邮箱',
      placeholder: '请输入邮箱',
      value: '',
      type: 'stying',
      max: 20
    }],
    time: 60,
    timeTitle: '获取验证码',
    getCode: true
  },
  inputValue(e) {
    let value = e.detail.value;
    let index = e.currentTarget.dataset.input;
    let input = this.data.input;
    input[index].value = value;
    this.setData({
      input
    })
  },
  obtain() {
    let {
      time,
      getCode
    } = this.data;
    if (this.data.input[0].value.length < 1) {
      wx.showToast({
        title: '请先输入手机号',
        icon: 'none'
      })
      return
    }
    this.setData({
      getCode: false
    })
    if (!getCode) return;
    let out = setInterval(() => {
      this.setData({
        timeTitle: --time
      });
      if (time < 1) {
        clearInterval(out);
        this.setData({
          getCode: true,
          time: 60,
          timeTitle: '获取验证码'
        })
      }
    }, 1000)
  },
  upLoad() {
    let input = this.data.input;
    if (input[0].value.length < 1) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    }
    if (input[1].value.length < 1) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
      return
    }
    if (input[2].value.length < 1) {
      wx.showToast({
        title: '请输入邮箱地址',
        icon: 'none'
      })
      return
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
  onLoad: function(options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})