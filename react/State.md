# State

## useState

`const [state, setState] = useState(initialState);`

최초 렌더링 하는 동안, 반환된 state는 useState()에서 첫 번째로 전달된 인자(`initialState`)의 값과 같음.

예를 들어,

```jsx
function Counter() {
    const [number, setNumber] = useState(0)
    const onIncrease = () => {
        setNumber(number + 1)
    }

    return (
        <div>
            <h1>{ number }</h1>
            <button onClick={onIncrease}>+</button>
        </div>
    )
}
```

useState()의 인자로 0을 넣어줬으니, 아래 `<h1>` 은 0부터 시작하고,

만약, 인자로 10을 넣어준다면 `<h1>`은 10부터 시작 됨.

### setState

setState 함수는 state 값을 갱신할 때 사용하고, 새로운 state 값을 받아 컴포넌트 리렌더링 큐에 등록함.

이러한 setState 함수를 사용해 state 값을 갱신해주는 2가지 방법이 있음.

1. 업데이트 하고 싶은 새로운 값을 파라미터로 넣어주기
    
    ```jsx
    setNumber(number + 1)
    ```
    
2. 기존 값을 어떻게 업데이트 할 지에 대한 함수 등록하기
    
    ```jsx
    setNumber(prevNumber => prevNumber + 1);
    ```

## input State 관리

### 하나의 input State 관리

```jsx
import React, { useState } from 'react'

function InputSample() {
    const [text, setText] = useState('');
    const onChange = (event) => {
        setText(event.target.value)
    }
    const onReset = () => {
        setText('')
    }
    return (
        <div>
            <input onChange={onChange} value={text} placeholder='이름'/>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>이름: {text}</b>
            </div>
        </div>
    )
}
```

### 여러개의 input State 관리

```jsx
function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    })
    const { name, nickname } = inputs;

    const onChange = (event) => {
        const { name, value } = event.target

        s*etInputs({
            ...inputs,
            [name]: value
        })*
    }
    const onReset = (event) => {
        setInputs({
            name: '',
            nickname: ''
        })
    }

    return (
        <div>
            <input name='name' onChange={onChange} value={name} placeholder='값을 입력해주세요'/>
            <input name='nickname' onChange={onChange} value={nickname} placeholder='값을 입력해주세요'/>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>이름: {name}</b>
                <br />
                <b>닉네임: {nickname}</b>
            </div>
        </div>
    )
}
```

- input 에 `name` 을 설정 ⇒ 이벤트가 발생 시, 값을 참조
- `useState` 에서 문자열이 아닌 객체 형태로 상태를 관리해줘야 함.
    
    ```jsx
    const [inputs, setInputs] = useState({
    	name: '',
    	nickname: ''
    })
    ```
    
- state 값을 수정해야하는 경우에는 객체를 직접 수정하는 것이 아니라 새로운 객체를 만들어 state 값을 수정한 뒤 사용해야 함.
    
    ```jsx
    s*etInputs({
    	// spread 문법을 사용하여 기존 객체를 복사한 후,
    	...inputs,
    	// state 값이 변경된 부분의 값만 수정해줌.
    	[name]: value
    })*
    ```
    
    이러한 작업을 **'불변성을 지킨다'**라고 하는데, 불변성을 지켜주어야만 리액트 컴포넌트에서 상태가 업데이트 됐음을 감지 할 수 있고 이에 따라 필요한 리렌더링이 진행되어 짐.
    
    또, 리액트에서는 불변성을 지켜주어야만 컴포넌트 업데이트 성능 최적화를 제대로 할 수 있음.