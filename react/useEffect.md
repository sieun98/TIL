# useEffect

## `useEffect` 가 실행되는 경우

- 마운트 됐을 때
- 언마운트 됐을 때
- 특정 props가 바뀌어 업데이트 될 때

## 사용 방법

- 첫번째 파라미터 : 함수
- 두번째 파라미터 : deps (의존값이 들어있는 배열)
    - **deps가 비어있는 경우?** 컴포넌트가 처음 나타날 때만 useEffect에 등록된 함수가 호출됨
    - **deps에 특정 값을 넣으면?** 컴포넌트가 처음 마운트 될 때와 지정한 값이 변경될 때 함수가 호출되고, 또한 언마운트 될 때와 값이 바뀌기 직전에도 호출이 됨.
- `cleanup` 함수 : useEffect에 대한 뒷 정리를 해주는 역할.
    - `return () ⇒ {}` 으로 함수를 반환할 수 있음.
    - 만약 deps가 비어있다면, 컴포넌트가 사라질 때 cleanup 함수가 호출됨.

```jsx
import React, { useEffect } from 'react';

useEffect(() => {
	// ...
	return () => {
	// cleanup 함수
	}
}, [deps])
```

## 마운트 시,

- `props` 로 받은 값을 컴포넌트의 로컬 상태로 설정
- 외부 API 요청 ex. REST API 등
- 라이브러리 사용 ex. D3, Video.js 등
- setInterval을 통한 반복작업 or setTimeout을 통한 작업 예약

## 언마운트 시,

- setInterval, setTimeout을 사용하여 등록한 작업들 clear
⇒ clearInterval, clearTimeout
- 라이브러리 인스턴스 제거

## **deps에 특정 값을 넣으면?**

컴포넌트가 처음 마운트 될 때와 지정한 값이 변경될 때, 그리고 언마운트 될 때와 값이 바뀌기 직전에도 함수가 호출 됨.

```jsx
function User({ user }) {
	useEffect(() => {
		console.log('user 값이 설정됨')
		console.log(user)

		return () => {
			console.log('user 값이 변경되기 전,')
			console.log(user)
		}
	}, [user)
}
```

! `useEffect` 안에서 사용하는 상태나, props 가 있다면, `deps` 에 넣어주어야 함.

만약, 넣어주지 않으면, `useEffect` 에 등록된 함수가 실행될 때 최신 props나 상태를 가르키지 않게 됨.

# 참고

리액트 컴포넌트는 바뀐 내용이 없다 할지라도 기본적으로 부모컴포넌트가 리렌더링되면 자식 컴포넌트 또한 리렌더링 되어짐.