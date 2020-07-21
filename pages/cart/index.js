// pages/cart/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Price: 0.00,
    data: []
  },
  // 确定是否要购买
  bindAgreeChange(e) {
    let index = e.currentTarget.dataset.index;
    let {data} = this.data;
    let isAgree = data[index].isAgree;
    isAgree = !isAgree;
    data[index].isAgree = isAgree;
    this.setData({
      data
    })
    this.getPrice();
  },
  // 添加当前数量
  add(e) {
    let index = e.currentTarget.dataset.index;
    let data = this.data.data;
    let SaleStock = data[index].SaleStock;
    let num = data[index].num;
    ++num;
    if (num > SaleStock) {
      wx.showToast({
        title: '超过最大库存！',
        icon: 'none',
        duration: 1000
      })
      return
    }
    data[index].SaleStock = SaleStock;
    data[index].num = num;
    this.getPrice();
    this.setData({
      data
    })
  },
  // 当前数量减少
  move(e) {
    let index = e.currentTarget.dataset.index;
    let data = this.data.data;
    let num = data[index].num
    num = num - 1;
    if (num < 1) return;
    data[index].num = num;
    this.getPrice();
    this.setData({
      data
    })
  },
  // 计算总价
  getPrice() {
    let data = this.data.data;
    let Price = 0;
    for(let i of data) {
      if (i.isAgree)
      Price += (i.Price * i.num) //.toFixed(2)
    }
    wx.setStorage({
      key:"cart",
      data
    })
    this.setData({
      Price
    })
  },
  // 提交订单拉起微信支付
  toast() {
    // 伪操作
    let data = this.data.data;
    let goodsList = app.globalData.goodsList;
    if (this.data.Price <= 0) {
      wx.showToast({
        title: '没有选中商品',
        icon: "none"
      })
      return;
    }
    for (let i of goodsList) {
      // 没有定义ID暂时对比名字
      for (let [index, il] of data.entries()) {
        if (il.isAgree) {
          i.SaleStock = i.SaleStock - il.num;
          console.log(il)
          this.addPalyList(il, 2);
          data.splice(index, 1);
        }
      }
    }
    wx.setStorage({
      key:"cart",
      data
    })
    app.globalData.goodsList = goodsList;
    this.setData({
      data
    })
    wx.showToast({
      title: '支付是不可能支付的',
      icon: "none"
    });
  },
  // 购买列表添加
  addPalyList(data, state) {
    let palyList = wx.getStorageSync('palyList') || [];
    data.order = this.randomString();
    data.palyState = state;
    data.toast = this.data.Price;
    palyList.push(data);
    wx.setStorage({
      key: "palyList",
      data: palyList
    });
  },
  /* 
   * 随机数 
   * 默认7位
  */
  randomString(len = 7) {
    // 默认去掉了容易混淆的字符oOLl,gq,Vv,Uu,I
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
    let order = '';
    for (var i = 0; i < len; i++) {
      order += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return order;
  },
  // 获取购物车内容
  onShow (options) {
    let data = wx.getStorageSync('cart');
    this.setData({
      data
    })
    // 重新获取总价
    this.getPrice();
  }
})