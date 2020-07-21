// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = JSON.parse(options.data);
    data.num = 1;
    this.setData({
      data
    })
  },
  add() {
    let data = this.data.data;
    let num = data.num;
    if (data.HasFreeAct) {
      wx.showToast({
        title: '免单商品限购一份',
        icon: 'none',
        duration: 1000
      })
      return
    }
    num = num + 1;
    if (data.num >= data.SaleStock) {
      wx.showToast({
        title: '超过最大库存！',
        icon: 'none',
        duration: 1000
      })
      return
    }
    data.num = num;
    this.setData({
      data
    })
  },
  move() {
    let data = this.data.data;
    let num = data.num;
    num = num - 1;
    if (data.num <= 1) return;
    data.num = num;
    this.setData({
      data
    })
  },
  addCart() {
    let cart = wx.getStorageSync('cart') || [];
    let {data} = this.data;
    data.isAgree = false;
    switch (cart.length) {
      case 1:
        for (let i of cart) {
          if (i.Title === data.Title) {
            let num = i.num + data.num;
            if (num > i.SaleStock) {
              wx.showToast({
                title: '不能超过最大库存！',
                icon: "none"
              })
              return;
            }
            i.num = num
          } else {
            cart.push(data);
          }
        }
        break;
      default:
        cart.push(data);
        console.log(cart)
        break;
    }
    wx.setStorage({
      key:"cart",
      data: cart
    })
    wx.switchTab({
      url: `../cart/index`
    })
  },
})