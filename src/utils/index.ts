import { useEffect, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? true : !!value);

/**
 * 清除对象的空属性，如
 * @param {*} object
 * @returns
 */
export const cleanObject = (object: Object) => {
  // 在一个函数里，改变传入的对象本身是不好的，所以这里使用深拷贝
  // 以下代码类似于：Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore 暂时忽略ts错误
    const value = result[key];
    if (!isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

/**
 * 模拟类组件的componentDidMount，不用老是写后面的空数组
 * @param {*} callback
 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

/**
 * 参数防抖，控制变化的频率
 * @param {*} value
 * @param {*} delay 要么不传，要传就传number
 * @returns
 */
export const useDebounce = (value: any, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
