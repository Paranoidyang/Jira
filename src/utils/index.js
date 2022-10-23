import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !!value);

/**
 * 清除对象的空属性，如
 * @param {*} object
 * @returns
 */
export const cleanObject = (object) => {
  // 在一个函数里，改变传入的对象本身是不好的，所以这里使用深拷贝
  // 以下代码类似于：Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // 0
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

/**
 * 模拟类组件的componentDidMount，不用老是写后面的空数组
 * @param {*} callback
 */
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

/**
 * 参数防抖，控制变化的频率
 * @param {*} value
 * @param {*} delay
 * @returns
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
