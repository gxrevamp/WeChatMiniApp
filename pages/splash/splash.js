Page({

    sClick: function() {
      wx.navigateTo({
        url: '../login/login',
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
    }
})