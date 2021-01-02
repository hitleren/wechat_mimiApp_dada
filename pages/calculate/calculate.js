//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:[]
  },
  mysubmit(res){
    console.log(res.detail.value.one)
    var one = Math.round(res.detail.value.one/10)*10
    var two = Math.round(res.detail.value.two/10)*10
    var three = Math.round(res.detail.value.three/10)*10
    var four = Math.round(res.detail.value.four/10)*10
    var money= res.detail.value.money
    
    var r_one = (-((one-two)+(one-three)+(one-four))*money)+"元"
    var r_two = (-((two-one)+(two-three)+(two-four))*money)+"元"
    var r_three = (-((three-one)+(three-two)+(three-four))*money)+"元"
    var r_four = (-((four-one)+(four-two)+(four-three))*money)+"元"
    this.setData({
      result:[r_one,r_two,r_three,r_four]
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
