import { Link } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";
export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        {/*projects/:projectId/kanban*/}
        <Route path={"/kanban"} element={<KanbanScreen />} />
        {/*projects/:projectId/epic*/}
        <Route path={"/epic"} element={<EpicScreen />} />
        {/*访问/projects/:projectId时重定向*/}
        <Route
          path="/"
          element={
            <Navigate
              to={window.location.pathname + "/kanban"}
              // 重定向默认是push，点击项目详情时，路由为：projects/6，不匹配上面任何一个路由，就会进行重定向至projects/6/kanban，返回时又回到projects/6，又不匹配进行重定向，导致返回无效，所以这里改为replace
              replace={true}
            />
          }
        />
      </Routes>
    </div>
  );
};
