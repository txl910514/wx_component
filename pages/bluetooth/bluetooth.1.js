const app = getApp()

function inArray(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i;
    }
  }
  return -1;
}

// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    devices: [],
    connected: false,
    chs: [],
  },

  Search: function () {
    var that = this;
    wx.openBluetoothAdapter({//调用微信小程序api 打开蓝牙适配器接口
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '初始化成功',
          icon: 'success',
          duration: 800
        })
        that.getBluetoothAdapterState();//2.0
      },
      fail: function (res) {//如果手机上的蓝牙没有打开，可以提醒用户
        console.log(res);
        wx.showToast({
          title: '请开启蓝牙',
          icon: 'fails',
          duration: 1000
        })
      }
    })
  },
  getBluetoothAdapterState () {
     var that = this; 
    //  that.toastTitle = '检查蓝牙状态'
     wx.getBluetoothAdapterState({
         success: function(res) {
            console.log(res);
            if (res.available) {
                that.startBluetoothDevicesDiscovery()
            }
            // startBluetoothDevicesDiscovery()
         },
         fail(res) {
             console.log(res)
         }
     })
  },
  startBluetoothDevicesDiscovery () {
      var that = this;
    wx.startBluetoothDevicesDiscovery({
        success: function(res) {
            console.log(res);
            /* 获取蓝牙设备列表 */
            setInterval(function () {
              that.getBluetoothDevices();
            }, 10 * 1000)
        },
        fail(res) {
        }
    })
  },
  getBluetoothDevices() {
    var that = this;
    console.log(111);
    // wx.onBluetoothDeviceFound(function(devices) {
    //     console.log('new device list has founded')
    //     console.dir(devices);
    // })
    wx.getBluetoothDevices({
        services: [],
        allowDuplicatesKey: false,
        interval: 1000,
        success: function(res) {
            console.log(res);
            if (res.devices.length > 0) {
                console.log(res);
                // if (JSON.stringify(res.devices).indexOf(that.deviceName) !== -1) {
                //     for (let i = 0; i < res.devices.length; i++) {
                //         if (that.deviceName === res.devices[i].name) {
                //             /* 根据指定的蓝牙设备名称匹配到deviceId */
                //             that.deviceId = that.devices[i].deviceId;
                //             // that.connectTO();
                //         };
                //     };
                // } else {
                // }
            } else {
            }
        },
        fail(res) {
            console.log(res, '获取蓝牙设备列表失败=====')
        }
    })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.Search();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})