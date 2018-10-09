// let serverURI = "https://www.eagleshing.com/eagleEye/assessment-web"
// let serverHost = "http://image.eagleshing.com"

let serverURI = "http://localhost:8090"
let serverHost = "http://localhost:8090"

// let serverURI = "http://192.168.31.252:10022/eagleEye/assessment-web"
// let serverHost = "http://192.168.31.252:10022"

const router = {
    posts: {
        list: "posts/getpublic2",
        search: "posts/search",
        getcover: "posts/get",
        getdetail: "posts/getDetail",

        getByDistrict: "filter/getByDistrict",
        filterGroup: "filter/filterGroup",
        projectAround: "posts/getAround",

        getProjects: "posts/getProjects",
        getGroupInfo: "posts/getGroupInfo",
        getlSubtab: "posts/getlSubtab",
        tagFilter: "posts/tagFilter",
        tagfilter2:"posts/tagfilter2",
        bus: "posts/bus",
        forwardcount: "posts/forwardcount/"
    },
    wx: {
        auth: "wx/miniopenid",
        accessHistory: "wx/saveaccesshistory"
    },
    ExpainDic: {
        getall: "ExpainDic/getall",
        get: "ExpainDic/getByTitle"
    },
    map: {
        trans: "map/bus",
    }
}

let getURL = function (url) {
    url = url.replace(/^\//, "");
    const [path, subPath] = url.match(/\w+/g);
    return serverURI + "/" + router[path][subPath];
}

let request = function (url, data, success, fail, method) {
    if (method == undefined) {
        method = "GET"
    }
    wx.request({
        url: url,
        data: data,
        method: method,
        header: { 'content-type': 'application/json' },
        success: function (res) {
            return success(res);
        },
        fail: function (res) {
            fail(res)
        }
    })
}

export default {
    host: serverURI,
    serverHost: serverHost,
    getURL: (url) => {
        url = url.replace(/^\//, "");
        const [path, subPath] = url.match(/\w+/g);
        return serverURI + "/" + router[path][subPath];
    },
    wxAuthVerify: function (code, callback) {
        request(getURL("wx/auth"), { code: code },
            (res) => {
                console.log(res)
                callback({ success: true, data: res.data, msg: "" })
            },
            (res) => {
                console.log(res)
                callback({ success: false, data: null, msg: res.errmsg });
            })
    },
    getUserInfo(callback) {
        wx.getUserInfo({
            withCredentials: true,
            lang: "zh_CN",
            success(res) {
                callback({ success: true, data: res, msg: "" })
            },
            fail(res) {
                callback({ success: false, data: res, msg: "" })
            }
        })
    },
    saveAccessHistory(userInfo, moduleName, moduleCode,project) {
        request(getURL("wx/accessHistory"), {
            nickName: userInfo.nickName,
            gender: userInfo.gender,
            avatarUrl: userInfo.avatarUrl,
            province: userInfo.province,
            city: userInfo.city,
            moduleCode: moduleCode,
            moduleName: moduleName,
            project:project
        }, () => {
            // callback({ success: true, data: success.data, msg: "" })
        }, () => {
            // callback({ success: false, data: fail, msg: "调用出错！" })
        }, "POST")
    },
    homeIndex(request, callback) {
        request(getURL("posts/list"), request,
            (success) => {
                callback({success:true,data:success.data.data.content})
            }, (fail) => {
                callback({success:false,data:null,msg:fail})
            })
    },
    tagFilter(params,callback){
        request(getURL("posts/tagfilter2"),params,res=>{
            callback({success:true,data:res.data.data})
        },fail=>{
            callback({success:false,data:null,msg:fail})
        })
    }
};