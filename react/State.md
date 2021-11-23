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