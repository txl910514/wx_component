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
    address: '',
    img: ''
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
  clickBluetooth() {
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
    this.setData({
      img: 'https://www.qizhaokeji.cn/0d6c2776-7a09-4785-bd78-1127c2d1ae7b.jpg'
    })
  },
  onLoad: function () {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'DPNsfGiwIMeYkM6kh6dtr8VtA7GOQAST'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
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
      // that.setData({
      //   img: 'https://www.qizhaokeji.cn/0d6c2776-7a09-4785-bd78-1127c2d1ae7b.jpg'
      // })
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
    console.log(e)
    console.log(e.detail.userInfo.avatarUrl)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  clickPlayAudio: function () {
    console.log(1111);
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    // wx.setInnerAudioOption(
    //   {
    //     obeyMuteSwitch: false
    //   }
    // );
    backgroundAudioManager.src = 'https://www.qizhaokeji.cn/b6a96965-8464-4e8d-8856-968aea48febc%E7%8E%8B%E8%B6%85%E7%BE%A4%20-%20%E9%82%A3%E5%B0%B1%E8%BF%99%E6%A0%B7%E5%90%A7.mp3';
    backgroundAudioManager.title = '测试';
    backgroundAudioManager.onPlay(() => {
      console.log('开始播放')
    })
    backgroundAudioManager.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  }
})
