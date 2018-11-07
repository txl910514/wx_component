Component({
    options: {
        multipleSlots: true
    },
    properties: {
        title: {
            type: String,
            value: '标题'
        },
        content: {
            type: String,
            value: '弹窗内容'
        },
        cancelText: {
            type: String,
            value: '取消'
        },
        confirmText: {
            type: String,
            value: '确定'
        }
    },
    data: {
        isShow: false
    },
    methods: {
        //隐藏弹框
        hideDialog() {
            this.setData({
                isShow: !this.data.isShow
            })
        },
        //展示弹框
        showDialog() {
            this.setData({
                isShow: !this.data.isShow
            })
        },
        _cancelEvent(){
            //触发取消回调
            this.triggerEvent("cancelEvent")
          },
          _confirmEvent(){
            //触发成功回调
            this.triggerEvent("confirmEvent");
          }
    }
})