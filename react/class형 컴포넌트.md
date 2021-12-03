# class형 컴포넌트

클래스형 컴포넌트에는 `render()` 메소드가 꼭 있어야 하고, `props` 를 조회 해야 하는 경우에는 `this.props` 로 조회하면 됨.

함수형 컴포넌트로 작성된 코드를 클래스형 컴포넌트 코드로 수정해보자.

```jsx
// 함수형 컴포넌트로 작성
import React from 'react'

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      {isSpecial && <b>*</b>}
      안녕하세요 {name}
    </div>
  )
}

Hello.defaultProps = {
  name: '이름없음'
}

export default Hello

// 클래스형 컴포넌트로 작성
import React, { Component } from 'react'

class hello extends Component {
	render() {
		const { color, name, isSpecial } = this.props
		return {
			<div style={{ color }}>
				{isSpecial && <b>*<b>}
				안녕하세요 {name}
			</div>
		}
	}
}

Hello.defaultProps = {
  name: '이름없음'
}

export default Hello
```

`defaultProps`를 설정해주는 방법은 함수형 컴포넌트에서 사용한 방법과 동일하게 설정해줘도 되고, 클래스 내부에 `static` 키워드와 함께 선언하는 방법도 가능함.

```jsx
class hello extends Component {
	static defualtProps = {
		name: '이름없음'
	}

	render() {
		// ... 코드 생략
	}
}
```

## this

클래스형 컴포넌트에서 상태를 업데이트 할 때, 메소드에서 `this.setState` 함수를 사용해야 하는데, 여기서 `this` 는 컴포넌트 인스턴스를 가르킴. 

하지만 아래의 코드 `handleIncrease` 에서 `this` 를 조회하려고 하면 해당 컴포넌트의 인스턴스를 가르키지 않음.

```jsx
// Counter.js
import React, { Component } from 'react'

class Counter extends Component {
  handleIncrease() {
    console.log('increase')
    console.log(this)
  }

  render() {
    return (
      <div>
        <h1>0</h1>
        <button onClick={this.handleIncrease}>+1</button>
      </div>
    )
  }
}

export default Counter
```

이런 현상이 나타나는 이유는 만든 메소드를 button의 이벤트로 등록하는 과정에서 각 메소드와 컴포넌트 인스턴스의 관계가 끊겨버리기 때문.

이를 해결하기 위한 방법에는 3가지가 있음.

1. 클래스의 `constructor` 에서 `bind` 작업을 해주는 방법
    
    ```jsx
    import React, { Component } from 'react'
    
    class Counter extends Component {
    	constructor(props) {
    		super(props)
    		this.handleIncrease = this.handleIncrease.bind(this)
    	}
    
      handleIncrease() {
        console.log('increase')
        console.log(this)
      }
    
      render() {
        return (
          <div>
            <h1>0</h1>
            <button onClick={this.handleIncrease}>+1</button>
          </div>
        )
      }
    }
    
    export default Counter
    ```
    
2. 메소드 선언 시, 화살표 함수 문법을 사용해 작성하는 방식
    
    ```jsx
    import React, { Component } from 'react'
    
    class Counter extends Component {
      handleIncrease = () => {
        console.log('increase')
        console.log(this)
      }
    
      render() {
        return (
          <div>
            <h1>0</h1>
            <button onClick={this.handleIncrease}>+1</button>
          </div>
        )
      }
    }
    
    export default Counter
    ```
    
    클래스형 컴포넌트에서 화살표 함수를 사용해서 메서드를 구현 하는 것은 클래스에 특정 속성을 선언 할 수 있게 해주는 `class-properties`라는 문법을 사용하는데 이 문법은 아직 정식 자바스크립트 문법이 아님.
    
    * CRA(create-react-app)로 만든 프로젝트에는 적용이 되어있는 문법이기 때문에 바로 사용 가능하므로 보통 CRA로 만든 프로젝트에서는 메소드를 만들 때 해당 방법을 많이 사용함.
    
3. `onClick` 에서 새로운 함수를 만들어 전달하는 방법
    
    ```jsx
    <button onClick={() => this.handleIncrease()}>+1</button>
    ```
    
    하지만 이 방법은 렌더링 될 때 마다 함수가 새로 만들어지기 때문에 이 후, 컴포넌트 최적화를 해야하는 경우 까다로워 추천하지 않음.
    

## 상태 선언

클래스형 컴포넌트에서는 상태를 관리할 때 `state` 를 사용함.

상태를 선언하는 방법은 `constructor` 내부에서 `this.state`를 설정해주면 됨.

```jsx
constructor(props) {
    super(props)
    this.state = {
      counter: 0
    }
  }
```

❗ 클래스형 컴포넌트의 경우, `state`는 무조건 객체형태여야 함.

만약, 위에서 화살표 함수 문법을 사용하여 메소드를 작성 할 수 있게 해줬던 `class-properties` 문법이 적용되어 있다면 `constuctor` 를 작성하지 않고도 `state`를 설정하는 것이 가능함.

```jsx
class Counter extends Component {
  state = {
    counter: 0
  }

  handleIncrease = () => {
    console.log('increase')
    console.log(this)
  }
	
	render() {
	 // ... 코드 생략
	}
}
```

## 상태 업데이트

상태를 업데이트하는 경우에는 `this.setState` 함수를 사용하여 객체 안에  업데이트 하고 싶은 값을 넣어 호출해주면 됨.

```jsx
import React, { Component } from 'react';

class Counter extends Component {
  state = {
    counter: 0
  }

  handleIncrease = () => {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  render() {
    return (
      <div>
        <h1>{this.state.counter}</h1>
        <button onClick={this.handleIncrease}>+1</button>
      </div>
    );
  }
}

export default Counter;
```

### setState 함수형 업데이트

이전에 다뤘던 `useState` 에서 함수형 업데이트가 가능했던 것 처럼 `setState` 도 마찬가지로 함수형 업데이트가 가능함.

```jsx
handleIncrease = () => {
    this.setState(state => ({
      counter: state.counter + 1
    }))
  }
```

만약에, 상태가 업데이트 되고 난 후, 어떠한 작업을 하고 싶다면 `setState` 의 두번째 파라미터에 콜백함수를 넣어 줄 수 있음.

```jsx
handleIncrease = () => {
    this.setState(
      {
        counter: this.state.counter + 1
      },
      () => {
        console.log(this.state.counter)
      }
    )
  }
```