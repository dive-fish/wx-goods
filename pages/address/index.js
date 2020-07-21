// pages/my/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 地址容器
    address: []
  },
  // 设置默认地址
  bindAgreeChange(e) {
    let index = e.currentTarget.dataset.index;
    let address = this.data.address;
    let state = address[index].default;
    state = !state;
    if (state) {
      // 全都设置false
      for (let i of address) {
        i.default = false;
      }
      // 自己true
      state = true;
    }
    address[index].default =  state;
    // 改变数据
    this.setData({
      address
    })
    // 缓存替换
    wx.setStorageSync('address', address);
  },
  // 删除地址
  removeAddress(e) {
    let index = e.currentTarget.dataset.index;
    let address = this.data.address;
   wx.showModal({
     content: '是否删除此地址',
     success: res => {
      if (res.confirm) {
        address.splice(index, 1);
        this.setData({
          address
        });
        wx.setStorageSync('address', address);
      }
     },
     title: '提示',
   })
  },
  // 跳转到地址修改&添加
  navedit(e) {
    let {index, state} = e.currentTarget.dataset;
    let data = index < 0 ? "" : JSON.stringify(this.data.address[index]);
    wx.navigateTo({
      url: `../edit/index?index=${index}&isTitle=${state}&data=${data}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.setData({
      address: wx.getStorageSync('address') || []
    })
  },
})