
/**
 * debounce
 * 防抖
 */
export function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * 节流
 */
export function throttle(fn, delay) {
  let flag = true;
  return function(...args) {
    if (!flag) return false;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args)
      // page销毁不会重置状态
      // 可以把状态改变移到前面。。。。。。。
      flag = true
    }, delay)
  }
}