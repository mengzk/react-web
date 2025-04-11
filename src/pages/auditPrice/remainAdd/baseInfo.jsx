/**
 * Author: Meng
 * Date: 2025-03-28
 * Modify: 2025-03-28
 * Desc:
 */
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { BnqTextArea, BottomPanel } from "mobilecomponet";

import CellLabel from "../../../components/cell-label";
import CellInput from "../../../components/cell-input";
import TabLayout from "../../../components/tab-layout";

const seleList = ["已排查完整", "未排查完整"];
//
function BaseInfo(props, ref) {
  const [seData, setSeData] = useState({
    brandName: "",
    cpaType: "",
    customerName: "",
    customerMobile: "",
    brandCode: "",
    problemCheckStatus: 0,
    cpaLegacyType: 0,
    cpaLegacyAmount: 0,
    cpaLegacyRemark: "",
  });
  const params = useRef({
    customerName: "",
    customerMobile: "",
    brandCode: "",
    problemCheckStatus: 0,
    cpaLegacyType: 0,
    cpaLegacyAmount: 0,
    cpaLegacyRemark: "",
  });

  useEffect(() => {
    // 初始化数据
    if (props.option) {
      const { customerName, customerMobile, cpaLegacyTypeEnum } = props.option;
      const info = params.current;

      info.customerName = customerName;
      info.customerMobile = customerMobile;

      const data = props.data;
      if (data && data.id) {
        if (data.customerName) {
          info.customerName = data.customerName;
        }
        if (data.customerMobile) {
          info.customerMobile = data.customerMobile;
        }

        info.brandCode = data.brandCode;
        info.problemCheckStatus = data.problemCheckStatus;
        info.cpaLegacyType = data.cpaLegacyType;
        info.cpaLegacyAmount = data.cpaLegacyAmount;
        info.cpaLegacyRemark = data.cpaLegacyRemark;

        let cpaType = "";
        if (cpaLegacyTypeEnum && data.cpaLegacyType) {
          cpaType = cpaLegacyTypeEnum[data.cpaLegacyType]?.label || "";
        }

        params.current = info;
        const brandName = data.brandName || "";
        setSeData({ brandName, cpaType, ...info });
      } else {
        params.current = info;
        setSeData({ ...seData, ...info });
      }
    }
  }, [props.data, props.option]);

  // 监听数据变化
  useEffect(() => {}, [props.option]);

  // 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    getData: () => {
      return params.current;
    },
  }));

  // 选择品牌
  function onChooseBrand() {
    const data = props.option.cpaLegacyBrandEnum || [];
    BottomPanel.sheet({
      data,
      label: "label",
      touchOutCancel: true,
      onPress: (key, data) => {
        if (key == "confirm") {
          const item = data.item;
          params.current.brandCode = item.code;
          setSeData({ ...seData, brandName: item.label });
        }
      },
    });
  }

  // 选择类型
  function onChooseType() {
    const data = props.option.cpaLegacyTypeEnum || [];
    BottomPanel.sheet({
      data,
      label: "label",
      touchOutCancel: true,
      onPress: (key, data) => {
        if (key == "confirm") {
          const item = data.item;
          params.current.cpaLegacyType = item.index;
          setSeData({ ...seData, cpaType: item.label });
        }
      },
    });
  }

  return (
    <div className="box-ar">
      <CellLabel title="基本信息" />

      <CellInput
        label="品牌"
        star
        value={seData.brandName}
        onClick={onChooseBrand}
      />
      <CellInput
        label="客户姓名"
        star
        max={20}
        value={seData.customerName}
        onChange={(text) => {
          params.current.customerName = text;
        }}
      />
      <CellInput
        label="手机号码"
        star
        max={11}
        type="number"
        value={seData.customerMobile}
        onChange={(text) => {
          params.current.customerMobile = text;
        }}
      />

      <div className="label-box">
        <div className="cell-label">
          <span>遗留单问题是否一次性排查完成</span>
          <span>*</span>
        </div>
        <TabLayout
          data={seleList}
          index={seData.problemCheckStatus}
          onChange={(_, index) => {
            params.current.problemCheckStatus = index;
          }}
        />
      </div>

      <CellInput
        label="遗留单类型"
        star
        value={seData.cpaType}
        onClick={onChooseType}
      />
      <CellInput
        label="遗留单预下单预估金额"
        star
        max={10}
        type="number"
        value={seData.cpaLegacyAmount}
        onChange={(text) => {
          params.current.cpaLegacyAmount = text;
        }}
      />

      <div className="memo-box">
        <div className="cell-label">
          <span>遗留单情况说明</span>
          <span>*</span>
        </div>
        <BnqTextArea
          key={seData.cpaLegacyRemark}
          placeholder="请输入"
          defaultValue={seData.cpaLegacyRemark}
          showCount
          rows={4}
          maxCount={500}
          type="card"
          onFocus={props.onIntoView}
          onChange={(text) => {
            params.current.cpaLegacyRemark = text;
          }}
        />
      </div>
    </div>
  );
}

export default forwardRef(BaseInfo);
