//index.js
//获取应用实例
var bmap = require('../../utils/bmap-wx.min.js');
console.log(bmap);
const app = getApp()
var wxMarkerData = [];
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: {},
    address:''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  showToast: function () {
    this.toast.showToast('我是传过来的toast内容', 2000);
  },

  showDialog() {
    this.dialog.showDialog();
  },
  clickBluetooth () {
    wx.navigateTo({
      url: '../bluetooth/bluetooth'
    })
  },
  //取消事件
  _cancelEvent() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //确认事件
  _confirmEvent() {
    console.log('你点击了确定');
    this.dialog.hideDialog();
  },
  onReady: function () {
    //获得toastedit组件
    this.toast = this.selectComponent("#toast");

    this.dialog = this.selectComponent("#dialog");

  },
  onLoad: function () {
    var that = this;
    var BMap = new bmap.BMapWX({
        ak: 'DPNsfGiwIMeYkM6kh6dtr8VtA7GOQAST'
    });
    var fail = function(data) {
        console.log(data)
    };
    var success = function(data) {
        wxMarkerData = data.wxMarkerData;
        console.log(wxMarkerData);
        that.setData({
          address: wxMarkerData[0].address
        });
        that.setData({
            markers: wxMarkerData
        });
        that.setData({
            latitude: wxMarkerData[0].latitude
        });
        that.setData({
            longitude: wxMarkerData[0].longitude
        });
    }
    BMap.regeocoding({
        fail: fail,
        success: success
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e.detail.userInfo.avatarUrl)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
