/**
 * Author: Meng
 * Date: 2023-09-14
 * Modify: 2023-09-14
 * Desc:
 */

import "./goods.css";

import img3dBg from "../../../../assets/img/img3d_bg.png";
import img3dIc from "../../../../assets/img/img3d_ic.png";

export default function GoodsItem(props) {
  return (
    <div className="v-goods-item-3d" onClick={props.itemClick}>
      <img className="v-goods-item-3d-bg" src={img3dBg} />
      <img className="v-goods-item-3d-ic" src={img3dIc} />
    </div>
  );
}
