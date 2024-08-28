/**
 * Author: Meng
 * Date: 2023-08-31
 * Modify: 2023-08-31
 * Desc: 
 */
import React from 'react';
import Search from '../../components/search/index';

function TestPage() {

  function onResult(value) {
    console.log('onResult', value);
  }

  return (
    <div className="test">
      <h1>哎哟，页面加载错误</h1>

      <Search
          mode="line"
          searchBtn={false}
          onResult={onResult}
        />

<Search
          hasBack
          value=""
          leftIcon="saoma"
          hasSearchIcon={false}
          btnStyle="inside"
        />
    </div>
  );
}

export default TestPage;
