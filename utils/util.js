function formatDate(date, flag) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var divider = flag ? "-" : "";
  return [year, month, day].map(formatNumber).join(divider);
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function dateForeword(date, num, flag) {
  var time = date.getTime() + 3600 * 1000 * 24 * num;
  date.setTime(time);
  return formatDate(date, flag);
}



  //app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})


//成功 消息提示框
function alertSuccess(title = "成功", duration = 2000) {
    wx.showToast({
        title: title,
        icon: 'success',
        duration: duration
    })
}

//loading 
function alertLoading(title = "载入中", duration = 5000) {
    wx.showToast({
        title: title,
        icon: 'loading',
        duration: duration
    })
}
//hide
function hideToast() {
    setTimeout(function() {
        wx.hideToast()
    }, 2000)
}

//showModal

function showModal(title = "提示", content = "这是一个模态弹窗", showCancel = "true", call) {
    wx.showModal({
        title: title,
        content: content,
        showCancel: showCancel,
        success: function(res) {
            if (res.confirm) {
                call();
            }
        }
    })
}

//showModal cancel 
function showModalCancel(title = "提示", content = "花田里犯的错", call) {
    showModal(title, content, false, call);
}



module.exports = {
  formatDate: formatDate,
    alertSuccess: alertSuccess,
    alertLoading: alertLoading,
    hideToast: hideToast,
    showModal: showModal,
    showModalCancel: showModalCancel,
  dateForeword: dateForeword
}

// --------------------------------------
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

//成功 消息提示框
function alertSuccess(title = "成功", duration = 2000) {
    wx.showToast({
        title: title,
        icon: 'success',
        duration: duration
    })
}

//loading 
function alertLoading(title = "载入中", duration = 5000) {
    wx.showToast({
        title: title,
        icon: 'loading',
        duration: duration
    })
}
//hide
function hideToast() {
    setTimeout(function() {
        wx.hideToast()
    }, 2000)
}
