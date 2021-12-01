# context API

리액트 개발 시, 특정 함수를 특정 컴포넌트를 거쳐 원하는 컴포넌트에 전달하는 작업을 하는 경우가 있을 수 있음.

한 단계 정도를 거쳐 전달하는 건 그다지 큰 불편함은 없지만 만약 3 ~ 4 단계 정도 이상을 거쳐 전달해야 하는 경우가 생긴다면 매우 번거로울 수 있는데, 

이러한 경우에 `context Api` 와 `dispatch` 를 함께 사용하면 복잡한 구조의 해결이 가능함.

`context API` 를 사용하면, 프로젝트 안에서 전역적으로 사용할 수 있는 **값**을 관리할 수 있는데, 여기서 값은 **상태**뿐만 아니라 **함수**나 **외부 라이브러리 인스턴스** 또는 **DOM**이 될 수 도 있음. 

## 사용 방법

1. `React.createContext(기본값)` 로 새로운 context를 생성
2. 생성된 context 안에 `Provider` 라는 컴포넌트를 이용해 context 값을 정함.
3. `Provider` 에 의해 감싸진 컴포넌트 중 어디서든지 context 값을 다른 곳에서 조회하여 사용 가능.

### 예시 코드

```jsx
// App.js
import React, { createContext } from 'react

// 1. 새로운 context 생성.
export const userDispatch = createContext(null)

// 2. Provider 컴포넌트를 이용하여 context 값을 지정.
return (
	<userDispatch.Provider value = {dispatch}>
	  <CreateUser username = {username} eamil={email} onChange={onChange} onCreate={onCreate} />
    <UserList users={users} />
    <div>활성 사용자 수: {count}</div>
	</userDispatch.Provider>
)
```

```jsx
// UserList.js에서 context 값 조회/사용.
import React, { useContext } from 'react'
import { userDispatch } from './App'

function User({ user }) {
    const { username, email, id, active } = user
    const dispatch = useContext(userDispatch)

    return (
        <div>
            <b 
                style={{
                    color: active ? 'blue' : 'black',
                    cursor: 'pointer'
                }} 
                onClick={() => dispatch({ 
                    type: 'TOGGLE_USER', 
                    id 
                })}
            >
                {username}
            </b>
            <span>({email})</span>
            <button onClick={() => dispatch({
                type: 'REMOVE_USER',
                id
            })}>삭제</button>
        </div>
    )
}
```