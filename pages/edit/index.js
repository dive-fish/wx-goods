// pages/my/address/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modify: [{
      title: '姓名',
      placeholder: '请输入姓名',
      type: "input",
      max: 10,
      value: ''
    }, {
      title: '手机号码',
      placeholder: '请输入手机号码',
      type: "number",
      max: 11,
      value: ''
    }, {
      title: '邮政编码',
      placeholder: '请输入邮政编码',
      type: "number",
      max: 6,
      value: ''
    }, {
      title: '所在区域',
      value: '请选择区域',
      type: 'select'
    }, {
      title: '详细地址',
      placeholder: '请输入详细地址',
      type: "text",
      max: 100,
      value: ''
    }],
    region: ['广东省', '广州市', '海珠区'],
    isAgree: false,
    btnTitle: "确认修改",
    index: null
  },
  // 地理位置选择
  bindRegionChange (e) {
    this.setData({
      'modify[3].value': e.detail.value
    })
  },
  inputAddress(e) {
    let index = e.currentTarget.dataset.index;
    let data = this.data.modify;
    data[index].value = e.detail.value;
    this.setData({
      data
    })
  },
  // 默认地址
  bindAgreeChange(e) {
    this.setData({
      isAgree: !this.data.isAgree
    });
  },
  //保存地址
  btn() {
    let index = this.data.index;
    let modify = this.data.modify;
    let address = wx.getStorageSync('address') || [];
    let data = {
      address: modify[3].value,
      content:  modify[4].value,
      phone:  modify[1].value,
      default: address.length > 0 ? this.data.isAgree : true,
      name:  modify[0].value,
      postcode: modify[2].value
    }
    if (data.default) {
      for (let i of address) {
        i.default = false;
      }
    }
    if (index < 0) {
      address.push(data)
    } else {
      address[index] = data
    }
    wx.setStorageSync('address', address);
    wx.redirectTo({
      url: '../address/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let btnTitle = "确定添加",
    title = "添加收货人",
    modifyInfo = {
      default: false
    },
    modify = this.data.modify;
    if (options.isTitle > -1) {
      btnTitle = "确认修改"
      title = "编辑收货人"
      modifyInfo = JSON.parse(options.data)
      modify[0].value = modifyInfo.name
      modify[1].value = modifyInfo.phone
      modify[2].value = modifyInfo.postcode
      modify[3].value = modifyInfo.address
      modify[4].value = modifyInfo.content
    }
    wx.setNavigationBarTitle({
      title 
    })
    this.setData({
      btnTitle,
      modify,
      isAgree: modifyInfo.default,
      index: Number(options.index)
    });
  }
})