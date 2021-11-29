# useReducer

상태를 관리하는 방법에는 `useState` 를 사용하는 방법 말고도 `useReducer` 를 사용하는 방법도 있는데, `useReducer` 를 사용하면 상태 업데이트 로직을 분리할 수 있음.

## 사용 방법

1. 먼저 reducer 함수를 생성 
    - `(state, action)` 를 파라미터로 받아와 새로운 상태를 반환해주는 함수
    - action 은 주로 type 값을 지닌 객체 형태로 사용
2. `useReducer(reducer, initialState)` 사용.

```jsx
function reducer(state, action) {
	// ... 새로운 상태를 만드는 로직
	
	ruturn nextState;
}

const [state, dispatch] = useReducer(reducer, initialState)
```

### useState 사용 코드 vs useReducer 사용 코드

```jsx
// useState를 사용한 Counter.js
import React, { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber(prevNumber => prevNumber + 1);
  };

  const onDecrease = () => {
    setNumber(prevNumber => prevNumber - 1);
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}
```

```jsx
// useReducer를 사용한 Counter.js
import React, { useReducer } from 'react'

function reducer(state, action) {
    switch(action.type) {
        case 'INCREMENT':
            return state+1
        case 'DECREMENT':
            return state-1
        default:
            throw new Error('Unhandled action')
    }
}

function Counter() {
    const [number, dispatch] = useReducer(reducer, 0)
    
    const onIncrease = () => {
        dispatch({
            type: 'INCREMENT'
        })
    }
    const onDecrease = () => {
        dispatch({
            type: 'DECREMENT'
        })
    }

    return (
        <div>
            <h1>{ number }</h1>
            <button onClick={onIncrease}>+</button>
            <button onClick={onDecrease}>-</button>
        </div>
    )
}
```