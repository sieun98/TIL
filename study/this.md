자바스크립트의 경우 `this`에 바인딩되는 객체는 함수가 호출되는 방식에 의해 동적으로 결정된다.

❗ 함수 선언 위치에 따라 함수의 상위 스코프를 결정하는 렉시컬 스코프와 혼동하지 않도록 주의하자.

함수를 호출하는 방식은 아래와 같이 4가지로 구분할 수 있다.

<br/>

## 함수 호출

`this` 는 전역객체에 바인딩된다.

내부 함수인 경우에도 `this`는 외부 함수가 아닌 전역 객체에 바인딩된다.

또한, 메소드의 내부함수나 콜백함수인 경우에도 마찬가지로 전역 객체에 바인딩된다.

- ex. 내부 함수

  ```jsx
  function func() {
    console.log("func's this: ", this);
    function inner() {
      console.log("inner's this: ", this);
    }
    inner();
  }

  func();
  ```

  ![Untitled (17)](https://user-images.githubusercontent.com/88129850/185941685-afd80a90-a98d-4488-b23a-6e324b048a67.png)

- ex. 메소드 내부 함수

  ```jsx
  const obj = {
    func: function () {
      console.log("func's this:", this);
      function inner() {
        console.log("inner's this:", this);
      }
      inner();
    },
  };

  obj.func();
  ```

  ![Untitled (18)](https://user-images.githubusercontent.com/88129850/185941699-1c48a9ed-64fc-4775-8f22-5048826ac9c8.png)

📌 **내부함수는 일반 함수, 메소드, 콜백함수 어디에서 선언되었든 관게없이 this는 전역객체를 바인딩한다.**

<br/>

## 메소드 호출

메소드 내부의 `this`는 해당 메소드를 소유한 객체 즉, 메소드를 호출한 객체에 바인딩된다.

<br/>

## 생성자 함수 호출

`new` 연산자와 함께 생성자 함수를 호출하는 경우 동작 방식을 살펴보자.

1. 빈 객체가 생성되고, 생성자 함수 내 `this`는 이 빈 객체를 가리킨다.
2. `this`를 사용해 동적으로 프로퍼티나 메소드를 생성할 수 있다.
3. 생성된 객체가 반환된다.

<br/>

## call/apply/bind 함수 메소드를 통한 호출

위의 함수 호출이나 메소드 호출, 생성자 함수 호출 3가지 방식의 `this` 바인딩은 자바스크립트 엔진에 의해 수행되지만 call, apply, bind와 같은 함수 메소드를 사용하여 `this`를 특정 객체에 명시적으로 바인딩하는 방법도 있다.

call()과 apply() 메소드의 첫번째 인자가 함수 내부의 `this`에 바인딩할 객체이다.

두 메소드의 차이점은 아래에서 확인해보자.

### call()

call() 메소드는 주어진 `this` 값 및 각각 전달된 인수와 함께 함수를 호출한다.

### apply()

call() 메소드와 달리 인자를 하나의 배열로 묶어 넘겨준다.

### bind()

bind() 함수에 인자로 전달한 this가 바인딩된 새로운 함수를 리턴한다.

또한, bind()는 call(), apply() 메소드와 같이 함수를 실행하지 않기 때문에 명시적으로 함수를 호출할 필요가 있다.
