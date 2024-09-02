/**
 * Author: Meng
 * Date: 2024-09-02
 * Modify: 2024-09-02
 * Desc: 
 * https://www.mobx.org.cn/README.html
 * https://www.mobx.org.cn/react-integration.html
 * mobx-react` 是 `mobx-react-lite` 的大兄弟，它里面也引用了 `mobx-react-lite` 包。它提供了很多在新项目中不再需要的特性
 */
import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";


function AppComponent(props) {
  useEffect(() => {
    if (props.store.onMount) {
      props.store.onMount();
    }

    return () => {
      if (props.store.onDistory) {
        props.store.onDistory();
      }
    };
  }, []);
  const PageView = observer(({ store }) => props.render(store));
  return <PageView store={props.store} />;
}

export default AppComponent;