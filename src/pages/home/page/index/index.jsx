/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc:
 */
import React, { useRef, useState, useEffect } from "react";

import "./index.css";
import { navigate } from "../../../routes";
import { Toolbar, Footer } from "../../../../components/index";
import { GoodsItem, Banner, Product } from "../../component/index";
import { test } from "../../../../modules/api/index";

const bgImgUrl =
  "https://s.cn.bing.net/th?id=OHR.BrightonBoxes_ZH-CN0947219018_1920x1080.webp&qlt=50";
function HomePage(props) {
  useEffect(() => {
    test()
  }, []);
  const [count, setCount] = useState(5);

  function onBarChange(res) {
    console.log("onChange", res);
    if (res === "goods") {
      navigate("product");
    }
  }

  return (
    <>
      <img className="home-img-bg" src={bgImgUrl} />
      <div className="home">
        <Toolbar onChange={onBarChange} />
        <div className="home-banner">
          <Banner />
        </div>
        <div className="home-box">
          <h1 className="home-label">产品展示</h1>
          <div className="home-products">
            <GoodsItem />
            <GoodsItem />
            <GoodsItem />
            <GoodsItem />
            <GoodsItem />
            <GoodsItem />
            <GoodsItem />
            <GoodsItem />
          </div>

          <h1 className="home-label">生产流程</h1>
          <div className="home-flow">
            <div className="home-flow-item">
              <div></div>
              <span>提出想法</span>
            </div>
            <div className="home-flow-item">
              <div></div>
              <span>草图探讨</span>
            </div>
            <div className="home-flow-item">
              <div></div>
              <span>模型展示</span>
            </div>
            <div className="home-flow-item">
              <div></div>
              <span>量产制作</span>
            </div>
          </div>

          <h1 className="home-label">关于我们</h1>
          <div className="home-gallery">
            <Product text="产品分布 列表  每行(左文右图/右图左文)" site />
            <Product
              text="产品分布 列表  每行(左文右图/右图左文)"
              site={false}
            />
          </div>

          <h1 className="home-label">联系</h1>
          <div className="home-contact">
            <div className="home-contact-left">
              <div className="home-contact-item">
                <span className="home-contact-label">姓名</span>
                <input className="home-contact-input" placeholder="请输入" />
              </div>
              <div className="home-contact-item">
                <span className="home-contact-label">电话: </span>
                <input className="home-contact-input" placeholder="请输入" />
              </div>
              <div className="home-contact-item">
                <span className="home-contact-label">邮箱</span>
                <input className="home-contact-input" placeholder="请输入" />
              </div>
              <div className="home-contact-item">
                <span className="home-contact-label">备注</span>
                <input className="home-contact-input" placeholder="请输入" />
              </div>
              <div className="home-contact-item">
                <button className="home-contact-commit">提交</button>
              </div>
            </div>
            <div className="home-contact-right">
              <h1>联系我们</h1>
              <p>这将是一个大好的机会</p>
            </div>
          </div>

          <div className="home-footer-flow">
            <div className="home-footer-flow-item">
              <span>200w</span>
            </div>
            <div className="home-footer-flow-item">
              <span>3200个</span>
            </div>
            <div className="home-footer-flow-item">
              <span>90300+</span>
            </div>
            <div className="home-footer-flow-item">
              <span>12800单</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
