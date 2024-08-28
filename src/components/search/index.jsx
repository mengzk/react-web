/**
 * Author: Meng
 * Date: 2023-11-20
 * Modify: 2023-11-20
 * Desc:
 */
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

import './index.css';

function Search(
  {
    value = '',
    leftView = null,
    leftIcon = null,
    autoFocus = false,
    hasBack = false,
    hasSearchIcon = true,
    searchBtn = true,
    // alway = false,
    maxLength = 50,
    backIcon = 'sousuo-fanhui',
    mode = 'fill',
    btnStyle = 'out',
    margin = '0 0',
    backgroundColor = 'white',
    placeholder = '请输入',
    inputType = 'text',
    enterKeyHint,
    enableEnter = false,
    inputMode = 'text',
    onResult = null,
    onBack = null,
    onBlur = null,
    onFocus = null,
    onChange = null,
  } = props,
  ref,
) {
  const inputRef = useRef(null);
  const [defValue, setDefValue] = useState(value);
  const [focus, setFocus] = useState(autoFocus);

  useEffect(() => {
    setDefValue(value);
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [value]);

  useImperativeHandle(ref, () => ({
    clear: () => {
      onClearInput();
    },
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    blur: () => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    },
    setValue: () => {
      setDefValue(value);
      if (inputRef.current) {
        inputRef.current.value = value;
      }
    },
  }));

  function onClearInput() {
    setDefValue('');
    inputRef.current.value = '';
    if (onResult) {
      onResult('clear', '');
    }
  }

  function onInput(e) {
    const text = inputRef.current.value;
    setDefValue(text);
    if (onResult) {
      onResult('input', text);
    }
  }

  function goBack() {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  }

  function onInputFocus() {
    setFocus(true);
    if (onFocus) {
      onFocus();
    }
  }
  function onInputBlur() {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      setFocus(false);
    }, 300);
    if (onBlur) {
      onBlur();
    }
  }

  function onKeyDown(e) {
    if (enableEnter) {
      if ((e.key || 'Enter').toLowerCase() === 'enter') {
        const val = inputRef.current.value;
        if (onResult) {
          onResult('enter', val);
        }
      }
    }
  }

  function onLeftClick() {
    if (onResult) {
      const val = inputRef.current.value;
      onResult('left', val);
    }
  }

  function onSearch(commit) {
    const val = inputRef.current.value;
    let tag = 'cancel';
    if (commit) {
      tag = 'ok';
    }
    if (onResult) {
      onResult(tag, val);
    }
  }

  // 最左方布局
  function LeftView() {
    if (leftView) {
      return (
        <div className="v-search-left-box" onClick={onLeftClick}>
          {leftView()}
          <div className="v-search-line"></div>
        </div>
      );
    } else if (leftIcon) {
      return (
        <div className="v-search-left-box" onClick={onLeftClick}>
          <Icon icon={leftIcon} size={18} color="#1D2129" />
          <div className="v-search-line"></div>
        </div>
      );
    } else {
      return <></>;
    }
  }

  const clear = defValue.length > 0;
  const inside = btnStyle === 'out';
  // const show3 = (focus && !searchBtn) || searchBtn;
  let insBtnCls = 'v-search-btn v-search-ok';
  let btnCls = `v-search-btn`;
  if (mode === 'line') {
    btnCls += ' v-search-cancel';
    insBtnCls += 'v-search-cancel';
  }

  const isOkBtn = searchBtn;

  return (
    <div className="v-search-layout" style={{ margin }}>
      {hasBack ? (
        <Icon
          icon={backIcon}
          size={24}
          margin="0 16px 0 0"
          color="#1D2129"
          onClick={goBack}
        />
      ) : (
        <></>
      )}
      <div
        className={`v-search-input-box v-search-input-box-${
          focus ? 'focus' : ''
        }`}
        style={{ backgroundColor }}
      >
        <LeftView />
        {hasSearchIcon ? (
          <Icon icon="search1" margin="0 0 0 0" size={24} color="#C9CDD4" />
        ) : (
          <></>
        )}
        <input
          ref={inputRef}
          className="v-search-input"
          defaultValue={defValue}
          type={inputType}
          autoFocus={autoFocus}
          maxLength={maxLength}
          onBlur={onInputBlur}
          onFocus={onInputFocus}
          onInput={onInput}
          inputMode={inputMode}
          enterKeyHint={enterKeyHint}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          onChange={onChange}
        />
        {clear ? (
          <Icon
            icon="sousuo-guanbi"
            margin="0 4px 0 0"
            size={24}
            color="#C9CDD4"
            onClick={onClearInput}
          />
        ) : (
          <></>
        )}
        {/* {!inside && show3 && searchBtn ? <div className={insBtnCls} onClick={onSearch}>搜索</div> : <></>} */}
        {!inside && searchBtn ? (
          <div className={insBtnCls} onClick={() => onSearch(true)}>
            搜索
          </div>
        ) : (
          <></>
        )}
      </div>
      {inside ? (
        <div className={btnCls} onClick={() => onSearch(isOkBtn)}>
          {isOkBtn ? '搜索' : '取消'}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function Icon({ icon, size, margin, color, onClick }) {
  return (
    <i
      className={`icon-${icon}`}
      style={{ fontSize: size, margin, color }}
      onClick={onClick}
    ></i>
  );
}

export default React.forwardRef(Search);
