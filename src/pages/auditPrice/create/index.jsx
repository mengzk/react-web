/**
 * Author: Meng
 * Date: 2025-03-21
 * Modify: 2025-03-21
 * Desc:
 */

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { BnqButton, BnqToast, Dialog } from "mobilecomponet";

import Header from "../../../components/header";
import TabLayout3 from "../component/tabLayout";
import TabForm1 from "../component/tabForm1";
import TabForm2 from "../component/tabForm2";
import TabForm3 from "../component/tabForm3";

import { hideAppHeader, onH5Close } from "../../../libs/bnq";
import { getPageQuery } from "../../../utils";
import { isIOSDevice } from "../../../utils/device";
import {
  initAuditPrice,
  saveAuditPrice,
  commitAuditPrice,
  queryAuditPriceAuth,
  queryAuditPriceStatus,
} from "../../../apis/btsales";

import "./index.less";

const isIos = isIOSDevice();

function CreateAudit(props) {
  const navigate = useNavigate();
  const { soCode, soType, cpaCode } = getPageQuery();
  const formRef1 = useRef(null);
  const formRef2 = useRef(null);
  const formRef3 = useRef(null);
  const [step, setStep] = useState(1);
  const [options, setOptions] = useState({});
  // const [detail, setDetail] = useState({});
  const [selectGoods, setSelectGoods] = useState([]);
  const [hasAuth, setHasAuth] = useState(true);
  // const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    hideAppHeader();
    initData();
  }, []);

  async function initData() {
    const { succeed, data } = await queryAuditPriceStatus(soCode, soType);
    if (succeed) {
      if(data != 0) {
        toDetail(data.cpaCode);
      }else {
        getDetail();
        getAuth();
      }
    }
  }

  async function getDetail() {
    const { succeed, data } = await initAuditPrice(soCode, soType);
    if (succeed) {
      setOptions(data);
    }
  }

  // 获取数据
  async function getAuth() {
    const { succeed, data } = await queryAuditPriceAuth(cpaCode || soCode);
    if (succeed && data) {
      const buttons = data.buttons || [];
      const auth = buttons.some((item) => item.buttonIndex == 90);
      setHasAuth(auth);

      if (!auth) {
        Dialog.show({
          title: "您没有操作权限",
          ok: "我知道了",
          onPress: () => onH5Close(),
        });
      }
    }
  }

  // 保存
  const onSave = async (hideToast) => {
    const params = getParams();
    const { succeed, data } = await saveAuditPrice(params, hideToast);
    if (succeed) {
      if(!hideToast) {
        BnqToast.show({ content: "保存成功", icon: 'success' });
      }
      return data.id
    }
  };

  // 提交
  const onCommit = async () => {
    const params = getParams(true);
    if (!params) {
      return;
    }

    const { succeed, data } = await commitAuditPrice(params);
    if (succeed && data) {
      if(data.code == 0) {
        BnqToast.show({ content: "提交成功", icon: 'success' });
        setTimeout(() => onH5Close(), 1000);
      }else {
        BnqToast.show({ content: data.errorMsg });
      }
    }
  };
  // 组装参数
  function getParams(add) {
    // 获取表单数据
    const form1 = formRef1.current.getData();
    const form2 = formRef2.current.getData();
    const form3 = formRef3.current.getData();

    if (add) {
      if (form1.alert) {
        BnqToast.show({ content: form1.alert });
        setStep(1);
        return;
      } else if (form2.alert) {
        BnqToast.show({ content: form2.alert });
        setStep(2);
        return;
      } else if (form3.alert) {
        BnqToast.show({ content: form3.alert });
        return;
      }
    }

    const soList = options.collectionInfo || {};
    // console.log(form1, form2, form3);
    const params = {
      id: options.id,
      sourceOrderCode: soCode,
      sourceOrderType: soType,
      goodsInfoGroupList: form2.list,
      fileInfoGroupList: form3.list,
      contractInfoList: form1.contracts,
      collectionInfo: {
        checked: true,
        reason: form1.remark,
        sapSoCodeList: soList.sapSoCodeList,
      },
    };
    // if (add) {
    //   params.id = detail.id;
    //   params.soCode = detail.soCode;
    // }
    return params;
  }

  // 返回
  function onBack() {
    if (step == 1) {
      onH5Close();
    } else {
      onChangeStep(-1);
    }
  }

  // 下一步
  function onNext() {
    if (step == 3) {
      onCommit();
    } else {
      if (step == 2) {
        const form2 = formRef2.current.getData();
        setSelectGoods(form2.list);
      }
      onChangeStep(1);
    }
  }
  // 改变步骤
  function onChangeStep(num) {
    let value = step + num;
    if (step < 1) {
      value = 1;
    } else if (step > 3) {
      value = 3;
    }
    setStep(value);
  }

  // 详情
  function toDetail(cpaCode) {
    navigate(
      `/auditPrice/apply?soCode=${soCode}&soType=${soType}&cpaCode=${cpaCode||''}`
    );
  }
  // 编辑SO
  async function onEditCast() {
    if (hasAuth) {
      const sap = options.cpaCode || "";
      let cid = options.id || 0;
      const id = await onSave(true);
      navigate(
        `/auditPrice/soList?sapCode=${sap}&cid=${cid||id}&soCode=${soCode}&soType=${soType}`
      );
    } else {
      BnqToast.show({ content: "您没有操作权限" });
    }
  }

  function onIntoView(tag) {
    if (isIos) {
      return;
    }
    const rect = tag.target.getBoundingClientRect();
    const offsetBottom = window.innerHeight - rect.bottom; // 视口高度减去元素底部位置
    console.log("---> onIntoView bottom", offsetBottom);
    if (offsetBottom <= 330) {
      const body = document.getElementById("scroll-div");
      if (body) {
        const height = body.scrollTop - offsetBottom + 330;
        console.log("---> onIntoView -", height);
        body.scrollTo({ top: height, behavior: "smooth" });
      }
    }
  }


  return (
    <div className="oac-create-audit">
      <Header title="下单审核" onBack={onBack} />
      <TabLayout3 index={step} onChange={(tag) => setStep(tag)} />
      <div id="scroll-div" className="scroll flex-box">
        <TabForm1
          ref={formRef1}
          visible={step == 1}
          option={options}
          toEdit={onEditCast}
          onIntoView={onIntoView}
        />
        <TabForm2 ref={formRef2} visible={step == 2} option={options} onIntoView={onIntoView}/>
        <TabForm3
          ref={formRef3}
          visible={step == 3}
          option={options}
          goods={selectGoods}
        />
      </div>
      {hasAuth ? (
        <div className="footer-actions">
          <BnqButton color="light" block onClick={() => onSave()}>
            保存
          </BnqButton>
          <BnqButton block onClick={onNext}>
            {step > 2 ? "提交审核" : "下一步"}
          </BnqButton>
        </div>
      ) : null}
    </div>
  );
}

export default CreateAudit;
