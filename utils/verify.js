/**
 * 更新人[liu]
 * 用于form表单自定义验证
 */
export default {
  phone(value) {
    if (!/^[1][0-9]{10}$/.test(value)) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none'
      })
      return false;
    } else {
      return true;
    }
  },
  /**
   * 判断是否是特殊字符
   * return Boolean
   */
  firsIsChar(value, title = "姓名只能输入中文！") {
    if (/^[\u4e00-\u9fa5]*$/g.test(value)) {
      return true;
    } else {
      wx.showToast({
        title,
        icon: 'none'
      })
      return false;
    }
  }
}