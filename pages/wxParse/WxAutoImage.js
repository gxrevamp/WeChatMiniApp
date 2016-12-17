
function wxAutoImageCal(originalWidth,originalHeight){
    var windowWidth = 0,windowHeight = 0;
    var autoWidth = 0,autoHeight = 0;
    var results= {};
    wx.getSystemInfo({
      success: function(res) {
        console.dir(res);
        windowWidth = res.windowWidth;
        windowHeight = res.windowHeight;
        console.log("windowWidth"+windowWidth);
        if(originalWidth > windowWidth){
          autoWidth = windowWidth;
          console.log("autoWidth"+autoWidth);
          autoHeight = (autoWidth*originalHeight)/originalWidth;
          console.log("autoHeight"+autoHeight);
          results.imageWidth = autoWidth;
          results.imageheight = autoHeight;
        }else{
          results.imageWidth = originalWidth;
          results.imageheight = originalHeight;
        }
      }
    })

    return results;

  }

module.exports = {
  wxAutoImageCal: wxAutoImageCal
}