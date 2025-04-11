/**
 * Author: Meng
 * Date: 2024-09-06
 * Modify: 2024-09-06
 * Desc:
 */
import React, { useEffect, useState } from 'react';
import { Popup, Search, Avatar, BnqButton, BnqToast } from 'mobilecomponet';

import { queryTrackingUser } from '../../apis/btsales';

import selectIc from '../../assets/icon/checked2.png';
import selectedIc from 'static/img/checked.png';
import './index.less';

let searchTimer = null;
//
export default function ChooseUser2(props) {
  const users = props.data || [];
  const [visible, setVisible] = useState(false);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUserData('100');
  }, []);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  // 获取用户数据
  async function getUserData(keyword) {
    const { code, data } = await queryTrackingUser(keyword);
    if (code == 0) {
      const list = data || [];
      list.forEach((e) => {
        e.select = false;
      });
      setUserList(list);
    }
  }

  function onClose() {
    users.forEach((item) => {
      item.select = false;
    });
    props.onChange && props.onChange(null);
  }

  function onCancel() {

  }
  function onCommit() {
    const user3 = userList.filter((e) => e.select);
    if (user3) {
      props.onChange && props.onChange(user3);
    } else {
      BnqToast.show({ content: '请选择协作人' });
    }
  }

  function onResult(res, data) {
    console.log(res, data);
    if(searchTimer) {
      clearTimeout(searchTimer);
    }
    if (res == 'enter' || res == 'clear' || res == 'ok') {
      getUserData(data || '100');
    }else if (res == 'input') {
      searchTimer = setTimeout(() => {
        getUserData(data);
      }, 1200);
    }
  }

  function onSelectUser(index) {
    userList.forEach((e, idx) => {
      if (index == idx) {
        e.select = !e.select;
      } else {
        e.select = false;
      }
    });
    setUserList([...userList]);
  }

  function itemView(item, index) {
    const icon = item.select ? selectedIc : selectIc;
    return (
      <div key={index} className="v-box-item" onClick={() => onSelectUser(index)}>
        <Avatar size={32} no={parseInt(item.username)} name={item.realName} />
        <div className="v-item-info">
          <span className="v-item-info-name">{item.realName}</span>
          <span>
            {item.username} | {item.positionName}
          </span>
        </div>
        <img className="v-item-check" src={icon} />
      </div>
    );
  }

  return (
    <Popup
      visible={visible}
      headerConfig={{
        title: '选择协作人',
        bgStyle: 'white',
      }}
      bodyStyle={{ '--border-radius': '16px' }}
      onClose={onClose}
    >
      <div className="v-choose-cooperation-user">
        <div className="search-box">
          {visible ? (
            <Search placeholder="请输入姓名" btnStyle="inside" enableEnter onResult={onResult} />
          ) : (
            <></>
          )}
        </div>
        <div className="v-box-list">{userList.map(itemView)}</div>

        <div className="v-choose-btn">
          <BnqButton color="light" block onClick={onCancel}>
            取消
          </BnqButton>
          <BnqButton block onClick={onCommit}>
            确定
          </BnqButton>
        </div>
      </div>
    </Popup>
  );
}
