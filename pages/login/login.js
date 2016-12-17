var util = require("../../utils/util.js");

Page({
                    sClick: function() {
                    wx.navigateTo({
                        url: '../wx_API/wx_API',
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
    data: {

    },
    onLoad: function(options) {

    },
    onReady: function() {

    },

    ToSubmit: function(e) {
        var username = e.detail.value.username;
        var password = e.detail.value.password;
        if (username.length < 1) {
            util.showModalCancel("警告", "请输入用户名", function() {
                console.log("print de")
            });
            return false;
        }
        if (password.length < 1) {
            util.showModal("警告", "请输入密码", "true", function() {
                console.log("Ld");
            });
            return false;
        }

        util.showModalCancel("提示", "返回首页", function() {
            wx.redirectTo({
                url: '../index/index'
            })
        });

    },
    register: function() {
        util.alertSuccess("注册成功！");
    },
})


