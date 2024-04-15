/**
 * Author: Meng
 * Date: 2023-11-16
 * Modify: 2023-11-16
 * Desc: 
 */
import * as ReactDOM from "react-dom";

// 移植自rc-util: https://github.com/react-component/util/blob/master/src/React/render.ts

// Let compiler not to search module usage
const fullClone = {
  ...ReactDOM,
};

const { version, render: reactRender, unmountComponentAtNode } = fullClone;

let createRoot;
try {
  const mainVersion = Number((version || "").split(".")[0]);
  if (mainVersion >= 18 && fullClone.createRoot) {
    createRoot = fullClone.createRoot;
  }
} catch (e) {
  // Do nothing;
}

function toggleWarning(skip) {
  const { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } = fullClone;

  if (
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED &&
    typeof __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === "object"
  ) {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint =
      skip;
  }
}

const MARK = "__bnq_mobile_root__";

// ========================== Render ==========================

function legacyRender(node, container) {
  reactRender(node, container);
}

function concurrentRender(node, container) {
  toggleWarning(true);
  const root = container[MARK] || createRoot(container);
  toggleWarning(false);
  root.render(node);
  container[MARK] = root;
}

export function render(node, container) {
  if (createRoot) {
    concurrentRender(node, container);
    return;
  }
  legacyRender(node, container);
}

// ========================== Unmount =========================
function legacyUnmount(container) {
  return unmountComponentAtNode(container);
}

async function concurrentUnmount(container) {
  // Delay to unmount to avoid React 18 sync warning
  return Promise.resolve().then(() => {
    container[MARK]?.unmount();
    delete container[MARK];
  });
}

export function unmount(container) {
  if (createRoot) {
    return concurrentUnmount(container);
  }

  return legacyUnmount(container);
}
