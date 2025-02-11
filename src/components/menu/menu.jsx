/**
 * Author: Meng
 * Date: 2023-09-14
 * Modify: 2023-09-14
 * Desc:
 */
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import "./menu.css";

function Menu(props) {
  let navigate = useNavigate();
  const [curIndex, setCurIndex] = useState(0);

  const items = [
    { text: "工作台", path: "/" },
    { text: "健康报告", path: "/report" },
    { text: "设备管理", path: "/device" },
    { text: "费用管理", path: "/cost" },
    { text: "用户管理", path: "/customer" },
    { text: "健康模型", path: "/model" },
  ];

  useEffect(() => {

  }, []);


  function onChange(index) {
    setCurIndex(index);
    navigate(items[index].path);
  }


  function itemView(item, index) {
    const clsName = curIndex == index ? 'v-menu-view active':'v-menu-view';
    return (
      <div className={clsName} key={item.path} onClick={() => onChange(index)}>
        <span>{item.text}</span>
      </div>
    );
  }

  return (
    <div className="v-menu-layout">
      {items.map(itemView)}
    </div>
  );
}

export default React.memo(Menu);
