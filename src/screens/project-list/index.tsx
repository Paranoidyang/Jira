import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
// react脚手架自带qs：
// 1、qs.stringify()：将对象序列化为url查询参数，如：将{key1: value1, key2: value2}序列化为"key1:value1&key2=value2"的形式
// 2、qs.parse()：将url参数解析成对象
import * as qs from "qs";
console.log("qs.stringify('123')", qs.stringify("123"));

// 根据运行环境自动匹配接口域名
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 200);
  const [list, setList] = useState([]);

  // 监听一个防抖的参数，达到请求防抖的目的
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.clone().json());
      }
    });
  }, [debouncedParam]);

  // 类似类组件的componentDidMount
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.clone().json());
      }
    });
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
