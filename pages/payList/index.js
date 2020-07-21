// pages/payList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      title: "全部"
    }, {
      title: "待付款"
    }, {
      title: "待发货"
    }, {
      title: "已完成"
    }, {
      title: "已取消"
    }],
    activeIndex: 0,
    sliderOffset: 0,
    goodsList: [],
    data: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.viewModl(options.index)
    this.setData({
      activeIndex: options.index,
      sliderOffset: options.index * 75,
      goodsList: wx.getStorageSync('palyList'),
      data: wx.getStorageSync('palyList')
    })
  },
  tabClick(e) {
    let {id, offsetLeft} = e.currentTarget
    this.setData({
      activeIndex: id,
      sliderOffset: offsetLeft
    })
    this.viewModl(id)
  },
  viewModl(id) {
    let goodsList = [];
    let { data } = this.data;
    for (let i of data) {
      if (i.palyState == id) {
        goodsList.push(i)
      }
    }
    this.setData({
      goodsList: id == 0 ? data : goodsList
    })
  },
  noPaly(e) {
    let index = e.currentTarget.dataset.index;
    let goodsList = this.data.goodsList;
    wx.showModal({
      title: '提示',
      content: '取消该订单',
      success: res => {
        if (res.confirm) {
          goodsList[index].palyState = 4;
          this.setData({
            goodsList
          })
        }
      }
    });
  },
  goPaly(e) {
    let index = e.currentTarget.dataset.index;
    let goodsList = this.data.goodsList;
    wx.showToast({
      title: '支付中...'
    })
    setTimeout(() => {
      wx.showToast({
        title: '支付成功',
        icon: "success"
      })
      goodsList[index].palyState = 2;
      this.setData({
        goodsList
      });
    }, 1500)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
})