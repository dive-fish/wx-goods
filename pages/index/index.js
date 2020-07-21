//index.js
const app = getApp()
Page({
  data: {
    // 轮播图设置
    swiper: [
      "../../images/list1.png",
      "../../images/c1.png",
      "../../images/s3.png"
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    // 商品
    pikUrl: "",
    // 商品列表
    goodsList: app.globalData.goodsList,
    // 位置相关
    addressInfo: {
      latitude: "",
      longitude: "",
      address: "未定位"
    }
  },
  onLoad() {
    let addressInfo =  wx.getStorageSync('addressInfo');
    if (addressInfo !== "" && addressInfo.latitude !== "" && addressInfo.longitude !== "") {
      wx.showModal({
        title: '提示',
        content: '是否使用上次地理位置',
        success: res => {
          if (res.confirm) {
            this.setData({
              addressInfo
            })
          }
        }
      });
    } else {
      this.address();
    }
  },
  //  获取地理位置
  address(e){
    wx.chooseLocation({
      success: res => {
        let addressInfo =  {
          latitude: res.latitude,
          longitude: res.longitude,
          address: res.address
        }
        this.setData({
          addressInfo
        })
        // 缓存地理位置
        wx.setStorage({
          key:"addressInfo",
          data: addressInfo
        })
      },
      fail: err => {
        wx.showToast({
          title: '获取地理位置失败,请从新授权',
          icon: "none"
        })
      }
    })
  },
  // 购买商品
  getPay(e) {
    let { data, index } = e.currentTarget.dataset;
    // 获取X,Y轴
    let { addressInfo: { latitude, longitude }} = this.data;
     // 数量不足或者商品停止售卖
     if (data.SaleStock < 1 && data.IsFault == 2) {
      wx.showModal({
        title: '提示',
        content: '抱歉，商品已经售罄',
        showCancel: false
      })
      return
    }
    if (latitude === "" && longitude === "") {
      this.address();
      return
    }
    wx.navigateTo({
      url: `../pay/index?data=${JSON.stringify(data)}`,
    })
  }
})
