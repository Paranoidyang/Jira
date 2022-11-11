import { useEffect, useState, useRef } from "react";

// unknown是严格版本的any，在想要使用any的地方可以考虑使用unknown
export const isFalsy = (value: unknown) => (value === 0 ? true : !!value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// let a: object
// a = {name: 'jack'}
// a = () => {
// }
// a = new RegExp('')
//
// let b: { [key: string]: unknown }
// b = {name: 'Jack'}
// b = () => {}
/**
 * 清除对象的空属性，如
 * @param {*} object 限定只能是键值对类型
 * @returns
 */
export const cleanObject = (object: { [key: string]: unknown }) => {
  // 在一个函数里，改变传入的对象本身是不好的，所以这里使用深拷贝
  // 以下代码类似于：Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
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
    // TODO 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

/**
 * 参数防抖，控制变化的频率
 * @param {*} value
 * @param {*} delay 要么不传，要传就传number
 * @returns
 */
// 用泛型<>来规范类型，传入啥类型，返回啥类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * 操作数组的方法
 * @param initialArr 数组
 * @returns
 */
export const useArray = <T>(initialArr: T[]) => {
  const [value, setValue] = useState(initialArr);
  return {
    value,
    setValue,
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
    clear: () => {
      setValue([]);
    },
    add: (item: T) => {
      setValue([...value, item]);
    },
  };
};

/**
 * 修改网页标题
 * @param title 标题
 * @param keepOnUnmount 是否卸载时保持当前标题
 */
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  // useRef返回的ref对象，在组件的整个声明周期内保持不变，可以用来持久化数据，此处用来保存原来的标题
  const oldTitle = useRef(document.title).current;

  // 页面加载时: 旧title
  // 加载后：新title

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 如果不指定依赖，利用闭包的原理，读到的就是旧title，但是不直观
        // 所以改用useRef持久化oldTitle，更为直观
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

/**
 * 重置路由
 * @returns
 */
export const resetRoute = () => (window.location.href = window.location.origin);
