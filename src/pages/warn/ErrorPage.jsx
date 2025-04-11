/**
 * Author: Meng
 * Date: 2025-02-26
 * Modify: 2025-02-26
 * Desc: 
 */
import React, {useEffect, useState} from 'react';

import Header from '../../components/header';

import './index.css';
// 
function ErrorPage() {
  const [domain, setDomain] = useState('');
  useEffect(() => {
    document.title = '加载失败';
    const path = window.location.href;
    setDomain(path);
  }, []);
  return (
    <div className="error">
      <Header title="加载失败" />
      <div className='box-layout'>
        <h3>哎哟，页面加载失败，请检查代码！</h3>
        <div className='path-hint'>路径：{domain}</div>
      </div>
    </div>
  );
}

export default ErrorPage;
