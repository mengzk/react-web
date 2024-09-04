/**
 * Author: Meng
 * Date: 2024-09-04
 * Modify: 2024-09-04
 * Desc: 
 */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './appSlice'

export function TestRedux() {
  const count = useSelector((state) => state.slice.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}