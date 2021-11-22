# Props

### props를 통해 컴포넌트에 값 전달하기 (부모 → 자식)

```jsx
// App.js (부모)
function App() {
  return (
    <div>
      <Hello name="sieun" color="blue"/>
    </div>
  );
}

// Hello.js (자식)
function Hello(props){
    return <div style={{
        color: props.color
    }}>{props.name}님. 안녕하세요.</div>
}

// props를 비구조 할당해서 사용 가능
function Hello({ name, color }){
    return <div style={{
        color: color
    }}>{name}님. 안녕하세요.</div>
}
```

### Hello.defaultProps = {}

props를 지정하지 않는 경우, 기본값을 설정하는 방법

```jsx
Hello.defaultProps = {
    name: 'sieun',
    color: 'balck'
}
```

### propsChildren

태그와 태그 사이에 넣는 내용을 받아옴.

```jsx
// App.js
function App() {
  return (
    <Wrapper>
      <Hello name="chorok"/>
    </Wrapper>
  );
}

// Wrapper.js
function Wrapper({ children }) {
    const style = {
        border: '2px solid black',
        padding: 16
    };

    return <div style={style}>{ children }</div>
}
```

위의 코드를 보면, `<Wrapper>` JSX 태그 안에 있는 `<Hello name="chorok"/>` 가 Wrapper 컴포넌트의 **children prop**으로 전달되고, Wrapper는 { children }을 `<div>` 안에 렌더링하므로 전달된 요소들이 최종 출력됨.