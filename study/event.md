# 이벤트 루프

브라우저는 단일 스레드에서 이벤트 드리븐 방식으로 동작하는데, 단일 스레드라는 것은 한 번에 하나의 작업만을 처리할 수 있다는 것을 의미한다. 하지만 실제 동작하는 웹 애플리케이션을 보면 여러 작업이 동시에 처리되는 것처럼 보이는데, 이러한 자바스크립트의 동시성을 지원하는 것이 바로 **이벤트 루프**이다.

※ 동시성 : 실제로 동시에 작업이 이루어지는 것이 아니라 동시에 처리되는 것처럼 빠르게 번갈아 작업이 수행되는 것을 말한다.

![Untitled (19)](https://user-images.githubusercontent.com/88129850/186800027-e75f8615-67a9-49f2-a6b7-4e7c5d4debd0.png)

※ 사진 출처 : [https://poiemaweb.com/js-event](https://poiemaweb.com/js-event)

## call stack

작업이 요청되면 요청된 작업은 순차적으로 call stack에 쌓이고 실행된다.

자바스크립트는 단 하나의 call stack을 사용하기 때문에 해당 작업이 종료되기 전가지는 다른 어떤 작업도 수행될 수 없다.

## heap

동적으로 생성된 객체 인스턴스가 할당되는 영역

## event queue (=task queue)

비동기 처리 함수의 콜백 함수, 비동기식 이벤트 핸들러, 타이머 함수의 콜백 함수가 보관되는 영역

## event loop

call stack 내에 실행 중인 작업이 있는지 event queue에 보관된 작업이 있는지 반복적으로 확인하고, 만약 call stack이 빈 경우 event queue 내 작업이 call stack으로 이동되어 실행된다.

<br/>

# 이벤트 전파

계층적 구조의 html 요소에 이벤트가 발생할 경우, 연쇄적으로 반응이 일어난다. 즉, 이벤트가 전파되는데 전파되는 방향에 따라 이벤트 버블링과 캡처링으로 구분된다.

![Untitled (20)](https://user-images.githubusercontent.com/88129850/186800046-381e5a13-fe91-424b-bdc2-258343aa3fda.png)

※ 사진 출처 : [https://ko.javascript.info/bubbling-and-capturing](https://ko.javascript.info/bubbling-and-capturing)

## Event Bubbling

자식요소에서 발생한 이벤트가 부모 요소로 전파되는 것을 말한다.

※ 버블링 되지 않는 이벤트 종류 참고

🔗 [https://en.wikipedia.org/wiki/DOM_events#Events](https://en.wikipedia.org/wiki/DOM_events#Events)

<br/>

⚠ **버블링을 막는 건 꼭 필요한 경우에만 사용하자.**

이벤트 버블링을 막아야 하는 경우는 거의 없으며, 버블링을 막아야 해결되는 문제라면 커스텀 이벤트 등을 사용해 문제를 해결할 수 있다.

또한, 핸들러의 `event` 객체에 데이터를 저장해 다른 핸들러에서 읽을 수 있게 한다면 아래쪽에서 무슨 일이 일어나는지를 부모 요소의 핸들러에게 전달할 수 있는데 이러한 방법으로도 이벤트 버블링을 통제할 수 있다.

## Event Capturing

자식 요소에서 발생한 이벤트가 부모 요소부터 시작하여 이벤트를 발생시킨 자식 요소까지 도달하는 것을 말한다.

캡처링 단계에서 이벤트를 잡아내는 방법은 `addEventListener`의 3번째 인자로 capture 사용 여부를 넘겨주면 된다.

```jsx
element.addEventListener(eventType, functionName [, useCapture])
// useCapture - true: 캡처링단계에서 핸들러 동작
// useCapture - false: 버블링단계에서 핸들러 동작 (default)
```

❗ 버블링과 캡처링은 둘 중 하나만 일어나는 것이 아니라 캡처링부터 시작해 버블링으로 종료한다는 점(즉, 이벤트 발생 시, 캡처링과 버블링이 순차적으로 발생)을 주의하자.

<br/>

# 이벤트 속성

## Event.target

**실제로** 이벤트를 **발생**시킨 요소를 가리킨다.

## Event.currentTarget

**이벤트에 바인딩된 DOM 요소**를 가리킨다. 즉, `addEventListner` 앞에 기술된 객체를 가리킨다.

⇒ `addEventListener` 메소드에서 지정한 이벤트 핸들러 내부의 `this`와 currentTarget은 언제나 일치한다.

## Event.cancelable

요소의 기본 동작을 취소 가능 여부를 나타낸다.

## Event. eventPhase

이벤트 흐름 상 어떤 단계에 있는지 반환해준다.

- `0` : 이벤트 없음
- `1` : 캡처링 단계
- `2` : 타깃
- `3` : 버블링 단계

<br/>

# 이벤트 위임

이벤트 위임은 다수의 자식 요소에 각각 이벤트 핸들러를 바인딩하는 것 대신 하나의 부모 요소에 이벤트 핸들러를 바인딩하는 방법을 말한다.

이러한 방법이 가능한 이유는 이벤트 흐름에 의해 이벤트를 발생시킨 요소의 부모 요소에도 영향을 미치기 때문이다.

<br/>

# 기본 동작 변경 메소드

## Event.preventDefault()

요소가 가지고 있는 기본 동작을 중단시키기 위한 메소드

## Event.stopPropagation()

어떤 요소의 이벤트를 처리한 후 이벤트가 부모 요소로 전파되는 것(버블링)을 중단시키기 위한 메소드

부모 요소와 자식 요소의 이벤트를 각각 별도로 처리하기 위해서 사용한다.

<br/>
🤷‍♂️ 만약 한 요소의 특정 이벤트를 처리하는 핸들러가 여러 개인 상황이라면?

`event.stopPropagation()`은 부모 요소로 이벤트가 전파되는 버블링은 막아주지만 다른 나머지 핸들러들이 동작하는 건 막지 못한다.

이런 경우 버블링 뿐만 아니라 요소에 할당된 다른 핸들러의 동작도 막기 위해서는 `event.stopImmediatePropagation()`을 사용하면 된다. 해당 메소드는 요소에 할당된 특정 이벤트를 처리하는 핸들러의 모든 동작을 막는다.
