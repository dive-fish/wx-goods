//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: null,
    goodsList: [{
      Title: "瓜子 100g",
      Price: "0.01",
      PicUrl: "s4.png",
      SaleStock: "3",
      IsFault: "0",
      HasFreeAct: false
    }, {
      Title: "芹菜 半斤",
      Price: "0.01",
      PicUrl: "s5.png",
      SaleStock: "2",
      IsFault: "0",
      HasFreeAct: true
    }, {
      Title: "素米 375g",
      Price: "0.01",
      PicUrl: "s6.png",
      SaleStock: "5",
      IsFault: "0",
      HasFreeAct: false
    }, {
      Title: "香梨 半斤",
      Price: "0.01",
      PicUrl: "c2.png",
      SaleStock: "2",
      IsFault: "0",
      HasFreeAct: false
    }, {
      Title: "枸杞 400g",
      Price: "0.01",
      PicUrl: "c3.png",
      SaleStock: "10",
      IsFault: "0",
      HasFreeAct: false
    }, {
      Title: "猕猴桃 半斤",
      Price: "0.01",
      PicUrl: "c4.png",
      SaleStock: "0",
      IsFault: "2",
      HasFreeAct: true
    }]
  }
})