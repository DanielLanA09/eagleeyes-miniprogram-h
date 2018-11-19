import store from "@/store.js"

// const base = 'http://192.168.31.252:30080';
// const base = "http://localhost:8091"
const base = "https://www.eagleshing.com"

const host = base + '/eagleeyes-mini-3.0';
// const host = base;

function request(method, url, data, callback, complete) {
  wx.request({
    method: method,
    url: host + url,
    data: data,
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      console.log('-------------------REQUEST SECCESS!---------------------', res);
      if (!callback) {
        return;
      }
      callback({
        success: true,
        data: res.data
      });
    },
    fail(res) {
      console.log('-------------------ERROR HAPPEND!!-------------------', res);
      if (!callback) {
        return;
      }
      callback({
        success: false,
        data: res
      });
    },
    complete(res) {
      if (complete) {
        complete(res)
      }
    }
  })
}

export default {
  BASE_HOST: "http://image.eagleshing.com" + '/eagleeyes-mini-3.0/api/file/downloadFile/',
  getUserInfo(callback) {
    console.log("GETTING USER INFO...");
    wx.getUserInfo({
      withCredentials: true,
      lang: "zh_CN",
      success(res) {
        console.log('USER INFO IS:', res.userInfo);
        if (!callback) {
          return
        }
        callback({
          success: true,
          data: res.userInfo
        })
      },
      fail(res) {
        console.log("---------USER INFO GETING FAILED!!---------", res);
        if (!callback) {
          return
        }
        callback({
          success: false,
          data: res
        })
      }
    })
  },
  homeList(data, callback) {
    console.log('FINDING CARDS BY DEVISION, MARK AND DISTRICT...');
    request("GET", "/post/filterbycondition", data, callback)
  },
  saveAccessHistory(data, callback) {
    console.log('SAVING USER ACCESS HISTORY...');
    request("GET", '/post/saveaccess', data, callback)
  },
  findCover(id, callback, complete) {
    console.log('FINDING COVER BY ID...');
    request("GET", "/post/findbyid/" + id, null, callback, complete)
  },
  findCoversByTitle(title, callback) {
    console.log('FINDING COVER BY TITLE...');
    request('GET', '/post/findbytitle/' + title, null, callback)
  },
  findByDistrictAndPriceAndTag(data, callback) {
    console.log('FINDING COVERS BY DISTRICT,PRICE AND TAGS...');
    request('GET', '/post/findbydistrictandpriceandtag', data, callback)
  },
  findByDistrictAndPriceAndTitle(data, callback) {
    console.log("FINDING COVERS BY TITLE, PRICE AND DISTRICT...")
    request("GET", "/post/findbydistrictandprice", data, callback)
  },
  findDevisionAndParams(id, type, callback) {
    console.log('FINDING DEVISION PARAMS BY COVER ID AND DEVISION TYPE...');
    request("GET", "/post/finddevisionparams/" + id + '/' + type, null, callback)
  },
  findAllDev(id, callback) {
    console.log('FINDING ALL DEVISIONS BY COVER ID...');
    request('GET', '/post/findalldevisions/' + id, null, callback)
  },
  findDevisionModules(cid, devName, callback) {
    console.log('FINDING MODULES BY COVER ID AND DEVISION NAME...');
    request("GET", "/post/findmodulebyname/" + cid, {
      devname: devName
    }, callback)
  },
  findArround(latitude, longitude, callback) {
    console.log('FINDING ARROND PROJECTS BY CURRENT PROJECT LATITUDE AND LONGITUDE...');
    request("GET", "/post/findarround", {
      latitude: latitude,
      longitude: longitude
    }, callback);
  },
  findParams(devId, callback) {
    console.log('FINDING PARAMS BY DEVISION ID...');
    request("GET", "/post/findparams/" + devId, null, callback);
  },
  findQuestions(callback) {
    request("GET", "/post/findquestions", null, callback);
  },
  chooseImg(callback) {
    wx.chooseImage({
      count: 5,
      sizeType: ['compressed', 'original'],
      sourceType: ['album', 'camera'],
      success(res) {
        callback({
          success: true,
          data: res
        })
      },
      fail(res) {
        callback({
          success: false,
          data: res
        })
      }
    })
  },
  upload(filePath, callback) {
    wx.uploadFile({
      url: host + "/api/file/uploadFile",
      filePath: filePath,
      name: "file",
      success(res) {
        callback({
          success: true,
          data: res
        })
      },
      fail(error) {
        callback({
          success: false,
          data: error
        })
      }
    })
  },
  login(data, callback) {
    console.log('START LOGIN...');
    request("POST", "/user/login", data, callback);
  },
  simLogin(callback,finalcall) {
    wx.getUserInfo({
      withCredentials: true,
      lang: "zh_CN",
      success(res) {
        let data = res.userInfo;
        wx.login({
          success(logRes) {
            if(!logRes.code){
              callback({success:false,data:logRes.errMsg})
              return;
            }
            data.code = logRes.code;
            request("POST", "/user/login", data, loginRes => {
              if (loginRes.success) {
                store.commit("SET_USER", loginRes.data);
                if (callback) {
                  callback({success: true,data: loginRes.data})
                }
              }
            });
          },
          complete(res){
            if(finalcall){
              finalcall({data:res})
            }
          }
        })
      },
      fail(res) {
        console.log("---------USER INFO GETING FAILED!!---------", res);
        callback({success:false,data:res.errMsg})
      }
    })
  },
  addFavorite(data, callback) {
    request("POST", "/user/collect", data, callback);
  },
  removeFavorite(data, callback) {
    request("POST", '/user/deletecollect', data, callback);
  },
  removeFavorites(data, callback) {
    request("POST", '/user/deletecollections', data, callback);
  },
  isFavorite(data, callback) {
    request("GET", "/user/iscollected", data, callback);
  },
  findFavorite(openId, callback) {
    request("GET", "/user/findcollection", {
      openId: openId
    }, callback);
  },
  addViewPoint(coverId, callback) {
    request("GET", '/post/addviewpoint/' + coverId, callback);
  },
  getVacabulary(title, callback) {
    request("GET", '/post/getvacabulary', {
      title: title
    }, callback);
  },
  getBus(station, callback) {
    request("GET", '/post/findbus', {
      station: station
    }, callback);
  },
  saveAdvice(data, callback) {
    request("POST", "/post/advice", data, callback);
  },
  getHomeBlocks(callback) {
    request("GET", "/post/homeblocks", null, callback)
  },
  getHomeBlockByType(type,callback){
    request("GET","/post/findblock",{blockType:type},callback);
  },
  getHomeBlockByTypeAndTitle(type,title,callback){
    request("GET","/post/findblockbytypeandtype",{blockType:type,title:title},callback);
  },
  getHomeCovers(page, size, callback) {
    request("GET", "/post/homecovers", {
      page: page,
      size: size
    }, callback)
  },
  addLinkView(id,callback){
    request("GET","/post/articlelinkviewadd",{id:id},callback);
  },
  findCoverByPrice(price,page,size,callback){
    request('GET',"/post/findCoverByPrice",{price:price,page:page,size:size},callback)
  }
}
