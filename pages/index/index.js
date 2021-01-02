// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allnum:[]//储存所有的局数
  },
  people(res){
    var mynum = parseInt(res.detail.value.mynum) //相当于id，第几局
    
    if(res.detail.value.people1== '' || res.detail.value.people1 == undefined ||
        res.detail.value.people2== '' || res.detail.value.people2 == undefined ||
        res.detail.value.people3== '' || res.detail.value.people3 == undefined ||
        res.detail.value.people4== '' || res.detail.value.people4 == undefined ||
        res.detail.value.mynum== '' || res.detail.value.mynum == undefined)
        {

        wx.showToast({
          title: '输入框不能为空',
          icon: 'none',
          duration: 2000
        })
    }else if(!(/(^[0-9]*$)/.test(res.detail.value.mynum))){

        wx.showToast({
                  title: '第五个输入框不是数字',
                  icon: 'none',
                  duration: 2000
                })
                
    }else if(this.data.allnum.indexOf(mynum)!= -1){
          wx.showToast({
            title: '此局在历史记录已经存在,请在第五个输入框重新输入',
            icon: 'none',
            duration: 3000
          })
    }else{
          //四个人的名字
          var people = [res.detail.value.people1,res.detail.value.people2,res.detail.value.people3,res.detail.value.people4]
          console.log(res)
          //缓存所有的局数
          wx.setStorage({
            data: this.data.allnum.concat(mynum),
            key: 'allnum'
          })
          console.log(this.data.allnum)
          //将四个人的名字储存在本地缓存
          var mynumName = mynum+'Name'
          wx.setStorage({
            data: people,
            key: mynumName
          })
        wx.redirectTo({
          url: '/pages/record/record?mynum='+mynum
        })
          
    }

  },
  history(){
    wx.redirectTo({
      url: '/pages/history/history',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'allnum',
      success(res){
        that.setData({
          allnum:res.data
        })
        
      }
    })
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