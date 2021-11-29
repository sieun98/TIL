# useCallback
`useCallback` 은 `useMemo` 와 비슷하지만,

`useMemo` 는 **특정 결과값**을 재사용하는 경우 사용하고,  `useCallback` 은 **특정 함수**를 재사용하는 경우에 사용함.

## 사용 방법

- 첫번째 파라미터 : 함수
- 두번째 파라미터 : deps

```jsx
const func_1 = useCallback(() => {}, [deps])

// ex 1. 실제 코드 예시
const onChange = useCallback(
    e => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value
      })
    },
    [inputs]
  )
```

하지만, 이러한 `useCallback` 을 사용해서는 바로 눈에 띄는 최적화를 이뤄낼 수는 없고, 컴포넌트 렌더링 최적화 작업을 통해서 성능이 최적화 되어짐.

## React.memo

`React.memo` 사용해서 컴포넌트의 props가 변경되지 않았을 경우, 리렌더링을 방지하여 컴포넌트의 리렌더링 성능을 최적화해줄 수 있음.

### 사용 방법

사용 방법은 아주 간단함

- 해당 컴포넌트를 내보낼 때, **React.memo()**로 감싸주면 됨!
- 두번 째 파라미터로 `propsAreEqual` 를 사용하여 특정 값들만 비교하는 것도 가능함.

```jsx
import React from 'react';

const CreateUser = ({ username, email, onChange, onCreate }) => {
  return (
    <div>
      ... // 코드 생략
    </div>
  )
}

export default React.memo(CreateUser);
```

❗ 리액트 개발 시, `useCallback`, `useMemo`, `React.memo` 는 컴포넌트의 성능을 실제로 개선할수있는 상황에서만 사용하도록 하자!

만약, 렌더링 최적화를 하지 않을 컴포넌트에 `React.memo`를 사용하면 불필요한 props 비교를 하기 때문!