/**
 * Author: Meng
 * Date: 2024-09-04
 * Modify: 2024-09-04
 * Desc: 
 */
import React from 'react';
import { connect } from 'react-redux';

function TestRedux(props) {
  return (
    <div>
      <h1>TestRedux</h1>
      <p>{props.num}</p>
      <button onClick={props.add}>+</button>
      <button onClick={props.minus}>-</button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    num: state.num
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: () => dispatch({ type: 'ADD' }),
    minus: () => dispatch({ type: 'MINUS' })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestRedux);