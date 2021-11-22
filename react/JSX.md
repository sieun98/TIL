# JSX

JSX로 작성된 코드가 자바스크립트로 제대로 변환되려면 준수해야하는 규칙들이 있다.

- 태그는 반드시 닫혀있어야 함.
    - `<br>`, `<input>`과 같이 html에서는 닫지 않고 사용하기도 하는 태그들 또한, **self closing**으로 닫아줘야 함.
- 최상위 요소가 **하나**여야 함.
    
    ```jsx
    // 최상위 요소가 하나가 아닌 경우 => error
    function App() {
    	return (
    		<Hello />
    		<div>안녕하세요! ^^</div>
    	)
    }
    
    // 올바르게 작성된 예시
    function App() {
    	return (
    		<div>
    			<Hello />
    			<div>안녕하세요! ^^</div>
    		</div>
    	)
    }
    
    // 또는 fragment 사용! (불필요한 div 태그 사용하기 싫은 경우)
    function App() {
    	return (
    		<>
    			<Hello />
    			<div>안녕하세요! ^^</div>
    		</>
    	)
    }
    ```
    
- 클래스 이름은 `className` 으로 작성!
- 주석은 `/**/` 로 작성한 부분을 중괄호로 감싸주어야 함. ( * 아래 코드 참고 )
- 자바스크립트 값을 JSX 내부에서 사용하는 경우, 중괄호로 감싸서 사용!
- 인라인 스타일을 설정할 때, html에서의 작성 방법과 달리 객체를 만들어 사용해야 함.
    
    ```jsx
    function App() {
      const name = 'sieun'
      const style = {
    		// 속성명을 카멜케이스로 작성!
        backgroundColor: 'black',
        color: 'aqua',
        fontSize: 24,
        padding: '1rem'
      }
    
      return (
        <div>
          <Hello />
    			{/* html의 경우 - JSX에서 사용하면 error */}
          {/* <div style="bacground-color: black;">{name}</div> */}
          {/* JSX의 경우 */}
          <div style={style}>{name}</div>
        </div>
      );
    }
    ```