const app = getApp();
import {
  hex_md5
} from "./md5.js";

/**
 * post请求
 * @param {String} url [请求地址]
 * @param {Object | any} params [请求所带参数]
 */
export function request(url, params) {
  wx.showToast({
    title: '加载中...',
    icon: 'loading',
    mask: true,
    duration: 10100
  })
  let data = getInfo(params);
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      data: {
        json: JSON.stringify(data)
      },
      method: "POST",
      header: {
        // 以formData的数据形式传输
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success: res => success(res, resolve, reject),
      fail: err => fail(err, reject)
    })
  })
}

/**
 * 上传
 * @param {String} url [请求地址]
 * @param { String } tempFilePaths [上传文件路径]
 * @param {Object | any} params [请求所带参数]
 */
export function upData(url, tempFilePaths, params) {
  wx.showToast({
    title: '上传中...',
    icon: 'loading',
    mask: true,
    duration: 10100
  })
  let data = getInfo(params);
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: baseURL + url,
      filePath: tempFilePaths,
      name: 'file',
      formData: {
        json: JSON.stringify(data)
      },
      success: res => success(res, resolve, reject),
      fail: err => fail(err, reject)
    })
  })
}

/**
 * 成功 & 失败
 */
function success(res, resolve, reject) {
  // wx.hideToast写到complete会秒关...
  console.log(res);
  wx.hideToast();
  if (res.data.returncode !== 200200) {
    wx.showModal({
      title: '提示',
      content: res.data.returnmessage ? res.data.returnmessage : "网络连接失败，请检查网络！",
      showCancel: false
    })
    reject(res.data);
    return;
  }
  resolve(res.data);
}

function fail(err, reject) {
  wx.hideToast();
  reject(err.data);
  if (err.errMsg) {
    wx.showToast({
      title: "请求超时，请稍后再试！",
      icon: "none"
    })
    return
  }
  wx.showModal({
    title: '提示',
    content: err.data.returnmessage ? err.data.returnmessage : "网络连接失败，请检查网络！",
    showCancel: false
  })
}