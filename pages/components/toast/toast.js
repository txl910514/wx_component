Component({
    options: {
        multipleSlots: true
    },
    properties: {
        toastText: {  
            type: String,  
            value: '内容'  
          }
    },
    data: {  
        toastShow:false,  
      }, 
        methods: {  
            showToast(text,time) {  
              this.setData({  
                toastShow: !this.data.toastShow,  
                toastText: text  
              })  
          
              var that = this  
          
              if (!time){  
                time = 8000  
              }  
          
              setTimeout(function(){  
                that.setData({  
                  toastShow: !that.data.toastShow  
                })  
              }, time)  
            }  
          }
})