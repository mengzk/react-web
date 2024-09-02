/**
 * Author: Meng
 * Date: 2024-09-02
 * Modify: 2024-09-02
 * Desc: 
 */
import React from "react";

type Distory = {
  onMount?: () => void;
  onDistory?: () => void;
};

interface PageProps<Store> {
  store: Store & Distory;
  render: (store: Store) => React.DetailedHTMLProps<any, any>;
}

declare function AppComponent<Store>(props: Readonly<PageProps<Store>>) {}

// function AppComponent<Store>(props: Readonly<PageProps<Store>>) {
//   useEffect(() => {
//     if (props.store.onMount) {
//       props.store.onMount();
//     }
//     return () => {
//       if (props.store.onDistory) {
//         props.store.onDistory();
//       }
//     };
//   }, []);
//   const PageView = observer(({ store }: any) => props.render(store));
//   return <PageView store={props.store} />;
// }

export default AppComponent;