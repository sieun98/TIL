# Class

## 기본 문법

```js
class MyClass {
    constructor() {}
    method1() {}
    ...
}
```

<br/>

## 인스턴스 생성

`new` 연산자와 함께 호출하면 클래스의 인스턴스가 생성된다.

```js
class Person {...}
const sieun = new Person()
```

<br/>

## constructor

`constructor`는 인스턴스를 생성하고 클래스 필드를 초기화하기 위한 특수한 메소드로 클래스 내 하나만 존재할 수 있다.<br/>

인스턴스를 생성하는 경우, `new` 연산자와 함께 호출한 것이 바로 이 `constructor`이다.

### 클래스 필드

클래스 내부의 캡슐화된 변수 (= 데이터 멤버 or 멤버 변수)

⭐ <b>접근 제한자</b> <br/>
접근 제한자란 다른 클래스에서 현재 클래스의 변수나 메소드의 접근 가능 여부를 선언하는 기법을 말한다.

- `public` : 기본 값
- `private` : 변수 앞에 `#`을 붙여줌.

  ```js
  class User {
    #age;
    constructor(name, age) {
      this.name = name;
      this.#age = age;
    }
  }
  ```

  - 내부 생성자에서 `this`로 접근 가능
  - 내부 메서드에서 `this`로 접근 가능
  - 클래스 외부나 인스턴스에서 접근 불가능

<br/>

## getter, setter

`getter`와 `setter`는 호출하는 것이 아닌 프로퍼티처럼 참조하는 형식으로 사용한다.

### getter

클래스 필드에 접근할 때마다 클래스 필드의 값을 조작해야 하는 경우 사용하며 `get` 키워드를 사용하여 정의한다.

### setter

클래스 필드에 값을 할당할 때마다 클래스 필드의 값을 조작해야 하는 경우 사용하며 `set` 키워들르 사용하여 정의한다.

<br/>

## 클래스 상속

새롭게 정의할 클래스가 기존의 클래스와 유사하다면, `extends` 키워드로 기존 클래스를 상속하여 그대로 사용하면서 다른 부분만 추가 구현해주면 된다. <br/>
👉 코드 재사용 관점에서 클래스 상속은 매우 유용하다.

```js
// 체스-기물의 공통점을 Piece에 구현.
class Piece {...}

// Piece 클래스 상속받아 해당 체스말만의 기능을 따로 구현.
class Pawn extends Piece {...}
```

### 오버라이딩

상위 클래스가 가지고 있는 메소드를 하위 클래스가 재정의하여 사용하는 방식

### 오버로딩

같은 이름이지만 매개변수의 타입 또는 갯수가 다른 메소드를 구현하고, 매개변수에 의해 메소드를 구별하여 호출하는 방식

### `super`

- super 메소드

  자식 클래스의 constructor 내부에서 부모 클래스의 constructor를 호출하는 경우 `super()`를 사용한다.

- super 키워드

  부모 클래스를 참조하는 경우 `super.[부모 클래스의 필드 or 메소드]`와 같이 super 키워를 사용한다.

<br/>

## static 메소드

정적 메소드는 클래스의 인스턴스가 아닌 클래스 이름으로 호출한다.

```js
class MyClass {
  static staticMethod() {
    return "this is static method";
  }
}

console.log(MyClass.staticMethod()); // this is static method

const c = new MyClass();
console.log(c.staticMethod()); // TypeError: c.staticMethod is not a function
```

인스턴스로 호출할 수 없다는 것은 정적 메소드는 `this`를 사용할 수 없다는 것을 의미한다.

※ 정적 메소드는 Math 객체의 메소드처럼 애플리케이션 전역에서 사용할 유틸리티(utility) 함수를 생성할 때 주로 사용한다.
