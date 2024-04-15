/**
 * Author: Meng
 * Date: 2023-09-14
 * Modify: 2023-09-14
 * Desc: 启动页-可做成骨架屏
 */

import Loading from "../../components/loading/index";
import "./launch.css";

function LaunchPage() {
  return (
    <div className="launch">
      <Loading type='circle' size={64}/>
      <span className="launch-load">启动中...</span>
    </div>
  );
}

export default LaunchPage;
