//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    totalPrice: 0.0,
    index: 0
  },
  
  onShow: function () {
    var shoppingCart = []
    var totalPrice = 0.0
    console.log(app.globalData.shoppingCart)
    for (var item in app.globalData.shoppingCart) {
      shoppingCart.push(app.globalData.shoppingCart[item])
      totalPrice += app.globalData.shoppingCart[item].price *
        app.globalData.shoppingCart[item].amount
    }

    this.setData({
      shoppingCart: shoppingCart,
      totalPrice: totalPrice
    })
  },

  settleAccounts: function () {
    wx.navigateTo({
      url: '../order/order',
    })
  },

  //点击减少按钮
  minusButtonClick: function (e){
    if (app.globalData.shoppingCart[e.target.dataset.item.food_id].amount == 1){
      var index = e.target.dataset.item.food_id;
      var temp = {};
      for (var item in app.globalData.shoppingCart) {
        if (app.globalData.shoppingCart[item].food_id != index) {
          temp[app.globalData.shoppingCart[item].food_id] = app.globalData.shoppingCart[item]
        }
      }
      app.globalData.shoppingCart = temp;
      //console.log(temp);
      
    }
    else{
      app.globalData.shoppingCart[e.target.dataset.item.food_id].amount--;
    }

    //更新数据
    this.onShow()
  },

  //点击增加按钮
  addButtonClick:function (e){
    app.globalData.shoppingCart[e.target.dataset.item.food_id].amount++;
    //console.log(e.target.dataset.item.food_id)

    //更新数据
    this.onShow();
  }
})