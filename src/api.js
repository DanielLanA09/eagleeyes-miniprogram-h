import store from "@/store.js"

// const base = 'http://192.168.31.252:30080';

const base = "http://192.168.31.13:8091" //local
// const base = "http://192.168.31.13:9000" //local

const host = base;
// const host = base+'/EagleEyeWx';


function request(method, url, data, callback, complete) {
    wx.request({
        method: method,
        url: host + url,
        data: data,
        header: { 'content-type': 'application/json' },
        success(res) {
            console.log('-------------------REQUEST SECCESS!---------------------');
            if (!callback) {
                return;
            }
            callback({ success: true, data: res.data });
        },
        fail(res) {
            console.log('-------------------ERROR HAPPEND!!-------------------', res);
            if (!callback) {
                return;
            }
            callback({ success: false, data: res });
        },
        complete(res) {
            if (complete) {
                complete(res)
            }
        }
    })
}

export default {
    BASE_HOST: base + '/EagleEyeSM/api/file/downloadFile/',
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
                callback({ success: true, data: res.userInfo })
            },
            fail(res) {
                console.log("---------USER INFO GETING FAILED!!---------", res);
                if (!callback) {
                    return
                }
                callback({ success: false, data: res })
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
    findCover(id, callback) {
        console.log('FINDING COVER BY ID...');
        request("GET", "/post/findbyid/" + id, null, callback)
    },
    findCoversByTitle(title, callback) {
        console.log('FINDING COVER BY TITLE...');
        request('GET', '/post/findbytitle/' + title, null, callback)
    },
    findByDistrictAndPriceAndTag(data, callback) {
        console.log('FINDING COVERS BY DISTRICT,PRICE AND TAGS...');
        request('GET', '/post/findbydistrictandpriceandtag', data, callback)
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
        request("GET", "/post/findmodulebyname/" + cid, { devname: devName }, callback)
    },
    findArround(latitude, longitude, callback) {
        console.log('FINDING ARROND PROJECTS BY CURRENT PROJECT LATITUDE AND LONGITUDE...');
        request("GET", "/post/findarround", { latitude: latitude, longitude: longitude }, callback);
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
                callback({ success: true, data: res })
            },
            fail(res) {
                callback({ success: false, data: res })
            }
        })
    },
    upload(filePath, callback) {
        wx.uploadFile({
            url: host + "/api/file/uploadFile",
            filePath: filePath,
            name: "file",
            success(res) {
                callback({ success: true, data: res })
            },
            fail(error) {
                callback({ success: false, data: error })
            }
        })
    },
    login(data,callback) {
        console.log('START LOGIN...');
        request("POST", "/user/login", data, callback);
    },
    simLogin(callback){
        wx.getUserInfo({
            withCredentials: true,
            lang: "zh_CN",
            success(res) {
                console.log('USER INFO IS:', res.userInfo);
                let data = res.userInfo;
                wx.login({
                    success(logRes){
                        data.code = logRes.code;
                        request("POST", "/user/login", data, callback);
                    }
                })
            },
            fail(res) {
                console.log("---------USER INFO GETING FAILED!!---------", res);

            }
        })
    },
    addFavorite(data,callback){
        request("POST","/user/collect",data,callback);
    },
    removeFavorite(data,callback){
        request("POST",'/user/deletecollect',data,callback);
    },
    isFavorite(data,callback){
        request("GET","/user/iscollected",data,callback);
    }
}

