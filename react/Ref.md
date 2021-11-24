# Ref
자바스크립트를 사용할 때, 특정 DOM을 선택해야 하는 경우 `getElementById` 또는 `querySelector` 와 같은 DOM selector 함수를 사용함.

리액트의 경우에도 특정 요소의 크기를 가져온다거나, 스크롤의 위치를 가져오는 등 DOM을 직접 선택해야하는 상황이 생기는데, 이런 경우에 `ref` 사용함.

- 함수형 컴포넌트에서는 `useRef()` 를 사용.
- 클래스형 컴포넌트에서는 콜백 함수나 `React.createRef()` 를 사용.

## 함수형 컴포넌트

1. `useRef()` 를 사용하여 Ref 객체를 생성
2. 생성된 객체를 선택하고자 하는 DOM에 `ref={}` 값으로 설정해줌

### 사용 예시 코드

초기화 버튼을 클릭했을 때, 이름을 입력하는 입력창에 포커스가 잡히도록.

```jsx
import React, { useState, useRef } from 'react'

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    });
		// 1. Ref 객체 생성.
    const nameInput = useRef();
    const { name, nickname } = inputs;

    const onChange = (event) => {
        const { name, value } = event.target

        setInputs({
            ...inputs,
            [name]: value
        })
    }
    const onReset = (event) => {
        setInputs({
            name: '',
            nickname: ''
        })
				// 3. 이름을 입력받는 input에 포커스 잡히도록 설정.
        nameInput.current.focus()
    }

    return (
        <div>
						{/* 선택하고자 하는 DOM 요소에 ref={} 값으로 설정. */}
            <input name='name' onChange={onChange} value={name} placeholder='이름' ref={nameInput} />
            <input name='nickname' onChange={onChange} value={nickname} placeholder='닉네임'/>
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

❗ useRef는 DOM을 선택하는 용도 외에도 **컴포넌트 안에서 조회 및 수정을 할 수 있는 변수를 관리하는 용도**로도 사용 됨 

- `setTimeout` 이나 `setInterval` 을 사용하는 경우, id 값을 기억
- 외부라이브러리를 사용하여 생성된 인스턴스를 담을 때
- scroll 위치를 기억해야 하는 경우

*** useRef로 관리되는 변수는 값이 변경되더라도 컴포넌트가 리렌더링 되지 않음.**

`useRef()` 를 사용 할 때 파라미터를 넣어주면, 해당 값이 `.current` 값의 기본값이 되고,  해당 값을 수정 할때에는 `.current` 값을 수정하면 되고 조회 할 때에는 `.current` 를 조회하면 됨.