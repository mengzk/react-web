/**
 * Author: Meng
 * Date: 2023-09-14
 * Modify: 2023-09-14
 * Desc:
 */
import React, { useEffect } from "react";
import "./index.css";

function Pagination(props) {
  const { value = 1, pageCount = 1, prevText, nextText, mode } = props;

  useEffect(() => {
    select(props.value);
  }, [props.value]);

  const isSimple = mode === "simple";

  const onSelect = (value) => () => select(value, true);

  const select = (page, emitChange) => {
    if (page < 1 || page > pageCount) {
      return;
    }
    if (props.value !== page) {
      if (emitChange) {
        props.onChange && props.onChange(page);
      }
    }
  };

  const renderPrev = () => {
    if (isSimple) return;
    return (
      <button size="small" color="default" disabled={value === 1}>
        上一页
      </button>
    );
  };

  const renderNext = () => {
    if (isSimple) return;
    return (
      <button size="small" color="default" disabled={value === pageCount}>
        下一页
      </button>
    );
  };

  const renderPage = () => {
    return (
      <>
        <div
          className={`bnq-pagination-item ${
            value === 1 ? "bnq-pagination-item-disabled" : ""
          }`}
          onClick={onSelect(value - 1)}
        >
          {prevText || renderPrev()}
        </div>
        <div className="bnq-pagination-text-content">
          <span className="bnq-pagination-current-page">{value}</span>
          <span className="bnq-pagination-split">/</span>
          <span className="bnq-pagination-total-page">{pageCount}</span>
        </div>
        <div
          className={`bnq-pagination-item ${
            value === pageCount ? "bnq-pagination-item-disabled" : ""
          }`}
          onClick={onSelect(value + 1)}
        >
          {nextText || renderNext()}
        </div>
      </>
    );
  };

  const renderPageContent = () => {
    // 圆点分页器
    if (mode === "dot") {
      return (
        <>
          {Array.from({ length: pageCount }, (_, index) => (
            <div
              key={index}
              className={`bnq-pagination-dot ${
                index + 1 === value ? "bnq-pagination-dot-active" : ""
              }`}
              onClick={onSelect(index + 1)}
            ></div>
          ))}
        </>
      );
    }
    // 胶囊分页器
    if (mode === "capsule") {
      return (
        <div className="bnq-pagination-capsule-content">
          <span
            className={`bnq-pagination-capsule-prev ${
              value === 1 ? "bnq-pagination-capsule-disabled" : ""
            }`}
            onClick={onSelect(value - 1)}
          >
            <i className="iconfont icon-jiantouzuo3" />
          </span>
          <span className="bnq-pagination-capsule-line" />
          <span
            className={`bnq-pagination-capsule-next ${
              value === pageCount ? "bnq-pagination-capsule-disabled" : ""
            }`}
            onClick={onSelect(value + 1)}
          >
            <i className="iconfont icon-jiantouyou3" />
          </span>
        </div>
      );
    }
    return renderPage();
  };

  return (
    <div
      className={`bnq-pagination ${props.className}`}
      style={props.style || {}}
    >
      {renderPageContent()}
    </div>
  );
}

export default Pagination;
