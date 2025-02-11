import React, { useEffect} from "react";

import Redio from "../../components/redio";
import Pagination from "../../components/pagination";
import DragUpload from "../../components/drag-upload";
import Loading from "../../components/modal/loading";
import Toast from "../../components/modal/toast";

function TestPage(props) {
  const list = [
    { id: "1", value: "woman", label: "女" },
    { id: "2", value: "man", label: "男" },
  ];

  useEffect(() => {
    Loading.show();
    setTimeout(() => {
      Loading.hide();
      Toast.show("加载成功");
      Toast.show("加载成功");
      Toast.show("加载成功");
    }, 3000);
  },[]);

  return (
    <div className="page test">
      <h1>Test</h1>

      <Redio data={list} value="man" />
      <Pagination value={1} pageCount={10} mode="simple" />
      <DragUpload />
    </div>
  );
}

export default TestPage;
