// pages/demo2/demo2.js

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    people:[],
    result:[],  //储存每个人的计算结果
    numlist:[], //四个人的全部记录数据    
    list1:[], //list是每个人的记录数据
    list2:[],
    list3:[],
    list4:[],
    mynum:[],  //第几局，相当于id
    calculateResult:[]//每个人计算金额的结果
  },
  /**
   * 记录数据
   * @param {*} res 
   */
  record(res){
    var getres = res
    console.log(getres)
    var that = this
    
    if (getres.detail.value[0]== '' || getres.detail.value[0] == undefined ||
        getres.detail.value[1]== '' || getres.detail.value[1] == undefined ||
        getres.detail.value[2]== '' || getres.detail.value[2] == undefined ||
        getres.detail.value[3]== '' || getres.detail.value[3] == undefined) {
      wx.showToast({
        title: '输入框不能为空',
        icon: 'none',
        duration: 2000
      })      
    }else if (!(/(^[/-9-9]*$)/.test(getres.detail.value[0])) ||
              !(/(^[/-9-9]*$)/.test(getres.detail.value[1]))||
              !(/(^[/-9-9]*$)/.test(getres.detail.value[2]))||
              !(/(^[/-9-9]*$)/.test(getres.detail.value[3]))) {
      wx.showToast({
        title: '输入框不是数字',
        icon: 'none',
        duration: 2000
      })
      
    }else{

      wx.showModal({
        title: '提示',
        content: '确定要记录吗(◠‿◠)',
        success: function (res) { 
          if (res.confirm) {//这里是点击了确定以后
            console.log('用户点击确定')
            console.log(getres)
            var people =getres.detail.value // 获取每个人输入框的数据           
            
            if(that.data.numlist.length>0){
              that.setData({
                list1: that.data.numlist[0].concat(people[0]),
                list2: that.data.numlist[1].concat(people[1]),
                list3: that.data.numlist[2].concat(people[2]),
                list4: that.data.numlist[3].concat(people[3])                                    
              })
              console.log("执行第一步")
            }else{
              that.setData({
                list1: that.data.list1.concat(people[0]),
                list2: that.data.list2.concat(people[1]),
                list3: that.data.list3.concat(people[2]),
                list4: that.data.list4.concat(people[3])                                    
              })
              console.log("执行第二步")
            }
                         
            that.setData({
              numlist:[that.data.list1,that.data.list2,that.data.list3,that.data.list4] 
            })
             
            var numlist = that.data.numlist//获取四个列表，也就是获取四个人的数据              
            var mynum = that.data.mynum //获取id，也就是第几局
            var mynumlist= mynum+'list'  //作为key           
            //储存记录数据在本地缓存
            wx.setStorage({
              data: numlist,
              key: mynumlist,
            })
                     
            /**
             * 这里循环遍历四个列表，四个列表分别代表每个人，然后再循环每个列表，每个列表的元素就是个人的数据
             */
            var result = [] //定义空的列表，来接收每个人的计算结果
            
            console.log(numlist)
            numlist.forEach(element=>{
              console.log(element)
              var sum = 0
              element.forEach(e=>{
               sum+=parseInt(e)
             })                                     
               result.push(sum)//这里只能用push，push才能改变原来的数组。不能用concat，concat改变不了原来的数组，要定义新的对象来接收返回值   
            })            
            that.setData({
              result:result
            })
            /**
             * 缓存计算结果
             */
            var mynumResult = mynum+'Result'
            wx.setStorage({
              data: that.data.result,
              key: mynumResult,
            })  
          } else {//这里是点击了取消以后 
            console.log('用户点击取消') 
          }
   
        }
   
      })

    }             
  },
  /**
   * 输入金额单位进行计算
   * @param {*} res 
   */
  calculate(res){
    var money= res.detail.value.money
    if(money==''||money==undefined){
      wx.showToast({
        title: '输入框不能为空',
        icon: 'none',
        duration: 2000
      }) 
    }else{
      console.log(res)
    
      var result = this.data.result
      var intResult = []
      result.forEach((e,index)=>{
        intResult.push(Math.round(e/10)*10)//取整
      })
      
      var calculateResult = [] //存储计算金额的结果
      for(var i = 0;i<intResult.length;i++){
        var sum = 0
        for(var j = 0;j<intResult.length;j++){
          sum+=(intResult[i]-intResult[j])
        }        
        calculateResult.push(-((sum*10000*money)/10000)+"元")//这里的10000是因为js计算有问题，所以乘以10000再除以10000，结果一样
        console.log(calculateResult+"计算结果")
      }
      
      this.setData({
        calculateResult:calculateResult
      })
      
      /**
       * 缓存计算金额结果
       */
      var mynum = this.data.mynum
      var calculateResult = mynum+'calculateResult'
      wx.setStorage({
        data: this.data.calculateResult,
        key: calculateResult,
      })

    }

  },

  again(){
    var that = this
    wx.showModal({
      title:'提示',
      content:'确定要再来一局吗？',
      success: function (res) { 
        if (res.confirm) {//这里是点击了确定以后         
          console.log('用户点击确定')
          var allnum = wx.getStorageSync('allnum')
          console.log(allnum+"所有的局数")
          var mynum = 1
          console.log("类型"+typeof(mynum))
          for (var i=0;i<100;i++){
            if(allnum.indexOf(mynum+i)==-1){
              mynum = mynum+i       
              break
            }
          }
          console.log(mynum+"不存在，可以用作ID")
          var people =that.data.people
          console.log(people+"所有的人")
          //将四个人的名字储存在本地缓存
          var mynumName = mynum+'Name'
          wx.setStorage({
            data: people,
            key: mynumName
          })
          //缓存所有的局数
          wx.setStorage({
            data: allnum.concat(mynum),
            key: 'allnum'
          })
          wx.redirectTo({
            url: '/pages/record/record?mynum='+mynum
          })                  
        }else{
          console.log('用户点击取消')
        }
      }
    })

    

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this //这个this代表app本身，将this复制给that，这样的话就可以调用这个app本身的函数setData()
    var mynum = options.mynum       
    this.setData({
      mynum:mynum
    })
    /**
     * 获取四个人的名字
     */
    var mynumName = mynum+'Name'
    wx.getStorage({
      key:mynumName,
      success(res){
        //不能在此用this的原因是：在此用this代表回调函数的本身，由于上面已经将app的本身复制给了that，那that就可以调用setData函数
        that.setData({
          people:res.data 
        })               
      }
    })
   
    
    
    
    /**
     * 获取第几局的记录数据
     */
    var mynumlist = mynum+'list' //mynum相当于第几局,mynumlist相当于这局所有人的记录数据
    wx.getStorage({
      key: mynumlist,
      success(res){
        
        that.setData({
          numlist:res.data
        })     
      }
    })
    
    /**
     * 获取计算结果
     */
    var mynumResult = mynum+'Result'
    wx.getStorage({
      key: mynumResult,
      success(res){
        console.log(res.data)
        that.setData({
          result:res.data
        })
      }
    })
    /**
     * 获取计算金额
     */
    var calculateResult = mynum+'calculateResult'
    wx.getStorage({
      key: calculateResult,
      success(res){
        console.log(res.data)
        that.setData({
          calculateResult:res.data
        })
      }
    })
   
  },
  history(){
    wx.redirectTo({
    
      url: '/pages/history/history',
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