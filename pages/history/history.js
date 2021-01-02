// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allnum:[],
    result:[],  //储存每个人的计算结果
    calculateResult:[],//每个人计算金额的结果
    allresult:[],
    everyResult:[] ,  //每一局的计算结果
    everyName:[], //每一局的四个人的名字
    everyCalculateResult:[],//每一局的计算金额
    allsum:[], //一键计算的所有牌数总和
    allCalculateMoney:[] //一键计算的所有金额

  },
  /**
   * 进入此局
   * @param {} res 
   */
  enter(res){
    console.log(res.currentTarget.dataset.num)
    var mynum = res.currentTarget.dataset.num
    
    wx.redirectTo({
      url: '/pages/record/record?mynum='+mynum,
    })
  },
  /**
   * 删除局数
   * @param {} res 
   */
  delete(res){
    var that =this
    var mynum = res.currentTarget.dataset.num
    var allnum = this.data.allnum
    var mynumlist = mynum+'list' //mynum相当于第几局,mynumlist相当于这局所有人的记录数据
    var mynumResult = mynum+'Result'  //这是这局的记录计算结果
    var calculateResult = mynum+'calculateResult' //这是这局的记录的计算金额
    var index = allnum.indexOf(mynum)
    console.log(allnum+"未删除前")
    console.log(index+"索引")

    wx.removeStorageSync(mynumlist) //移除这局所有人记录数据的缓存
    wx.removeStorageSync(mynumResult) //移除这局记录的计算结果
    wx.removeStorageSync(calculateResult) //移除这局的记录的计算金额

    wx.showModal({
      title:'提示',
      content:'删除后此局数据无法恢复，确定删除吗？',
      success: function (res) { 
        if (res.confirm) {//这里是点击了确定以后         
          console.log('用户点击确定')
          allnum.splice(index,1)
          console.log(allnum+"删除后")
          that.setData({
            allnum:allnum
          })
          wx.setStorage({
            data: allnum,
            key: 'allnum',
          })

                  
        }else{
          console.log('用户点击取消')
        }
      }
    })
    
  },
  /**
   * 一键计算
   * @param {*} res 
   */
  allCalculate(res){
    var unitMoney= res.detail.value.unitMoney
    var everyResult = this.data.everyResult
    console.log("所有的局数："+everyResult.length)
    var allsum = []
    var sum0 = 0
    var sum1 = 0
    var sum2 = 0
    var sum3 = 0
    everyResult.forEach(element=>{
      console.log("每一局的计算结果"+element)
      if(element.indexOf("")==-1){
        element.forEach((e,index)=>{
          switch(index){
            case 0 :
              sum0+=(Math.round(e/10)*10);
              break;
            case 1 :
              sum1+=(Math.round(e/10)*10);
              break;
            case 2 :
              sum2+=(Math.round(e/10)*10);
              break;
            case 3 :
              sum3+=(Math.round(e/10)*10);
              break;  
          }
          console.log("取整："+Math.round(e/10)*10)
        })
      }      
      
    })    
    allsum = [sum0,sum1,sum2,sum3]
    var allCalculateMoney =[]
    for(var i = 0;i<allsum.length;i++){
      var sum = 0
      for(var j = 0;j<allsum.length;j++){
        sum+=(allsum[i]-allsum[j])
      }      
      allCalculateMoney.push(-((sum*10000*unitMoney)/10000)+"元")//这里的10000是因为js计算有问题，所以乘以10000再除以10000，结果一样
      
    }    
    console.log("所有和："+allsum)
    console.log("计算金额结果："+allCalculateMoney)
    this.setData({
      allsum:allsum,
      allCalculateMoney:allCalculateMoney
    })
  },
  /**
   * 清除所有的记录
   * @param {} res 
   */
  clearHistory(res){   
    var that =this
    wx.showModal({
      title:'提示',
      content:'历史记录清除将无法恢复，确定清除吗？',
      success: function (res) { 
        if (res.confirm) {//这里是点击了确定以后
          console.log('用户点击确定')         
          wx.clearStorage()
          that.setData({
            allnum:[]
          })
          
        }else{
          console.log('用户点击取消')
        }
      }
    })
  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    
    var allnum = wx.getStorageSync('allnum')
    var everyResult =[]
    var everyName =[]
    var everyCalculateResult = []
    allnum.forEach(e=>{
      var mynumResult = e+'Result'
      var mynumName = e+'Name'
      var calculateResult = e+'calculateResult'
      var r = wx.getStorageSync(mynumResult)
      var n = wx.getStorageSync(mynumName)
      var c = wx.getStorageSync(calculateResult)
         
      everyResult.push(r)
      everyName.push(n)
      everyCalculateResult.push(c)
    }) 
    
    this.setData({
      everyResult:everyResult
    })
    
    this.setData({
      everyName:everyName
    })
    this.setData({
      everyCalculateResult:everyCalculateResult
    })
        
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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