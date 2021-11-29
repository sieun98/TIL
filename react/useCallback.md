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