//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '欢迎',
    userInfo: {}
  },
   sClick: function() {
                    wx.navigateTo({
                        url: '../user/user',
                        success: function(res){
                        // success
                        },
                        fail: function() {
                        // fail
                        },
                        complete: function() {
                        // complete
                        }
                    })
                    },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
