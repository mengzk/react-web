/**
 * Author: Meng
 * Date: 2025-02-27
 * Modify: 2025-02-27
 * Desc:
 */
import React, { Suspense } from "react";

import PageLoading from "../fallback";  

//
 function LazyPage({ lazy }) {
  const Component = lazy ? lazy : () => <></>;
  return (
    <Suspense fallback={<PageLoading />}>
      <Component />
    </Suspense>
  );
}



export default LazyPage;