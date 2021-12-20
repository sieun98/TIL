# Router

※ **SPA** : Single Page Application

- 라우팅을 클라이언트가 담당 ⇒ 보통 서버에서 담당
  - 라우팅? 어떤 주소에 어떤 UI를 보여줄지 정하는 작업
- 단점
  - 앱의 규모가 커지면 JS 파일의 크기가 너무 커질 수 있음
    ❗해결책: code splitting
  - 브라우저에서 자바스크립트가 구동되지 않으면 UI를 볼 수 없음
    ⇒ 검색엔진에서 크롤링 불가능
    ❗해결책: server side rendering

※ 리액트에서 가장 많이 사용되는 router 라이브러리

- **react-router** : 컴포넌트를 기반으로 라우팅
- **next** : 서버사이드 렌더링을 엄청나게 쉽게 구현 가능하며, 파일 경로와 이름을 기반으로 라우팅

---

## React-Router

### react-router에서 사용되는 주요 컴포넌트

`<BrowserRouter>`

- HTML5 History Api 사용
- 주소만 변경하고 페이지는 다시 불러오지 않음
- hashRouter와 달리 엄청 옛날 브라우저에서는 지원 x

`<HashRouter>`

- 주소 뒤에 # 를 넣는 형태의 주소 사용
- 옛날 브라우저에서도 사용 가능

`<MemoryRouter>`

- 브라우저의 주소와 무관. 전혀 관계가 x ⇒ 브라우저가 아닌 환경에서 사용하기 좋음.
- 테스트 환경이나 리액트 네이티브, 임베디드 웹앱, 등에서 사용

`<StaticRouter>`

- 서버사이드 렌더링할 때 사용

### React-Router 사용해보기

1. `yarn add react-router-dom`
2. `import { BrowserRouter } from 'react-router-dom'` in index.js
3. App 컴포넌트를 `<BrowserRouter>`로 감싸주기

<**Route>**

특정 주소에 컴포넌트 연결하기

`<Route path="주소규칙" element={원하는 컴포넌트}>`

`<Route>` 를 `<Routes>` 로 감싸주기

```jsx
//index.js
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

//App.js
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}
```

**<Link>**

클릭 시, 다른 주소로 이동시켜주는 컴포넌트로 해당 컴포넌트는 `HTML5 History API` 를 사용하여 브라우저의 주소만 변경해줄 뿐, `<a>` 와 달리 페이지를 새로 불러오지는 않음.

※ `<a>` : 페이지를 이동시키면서, 페이지를 아예 새로 불러옴

```jsx
<nav>
  <Link to="/">Home</Link>
  <Link to="/dialog">Dialog</Link>
</nav>
```

### 페이지 주소 - 동적 데이터 전달

- **파마리터**
  - 일반적으로 특정 id나 이름을 가지고 조회를 하는 경우 사용함.
  - ex) `/profiles/:username`
  ```jsx
  // App.js
  import React from "react";
  import { Route, Routes, Link, useParams } from "react-router-dom";
  import Profile from "./Profile";

  function App() {
    return (
      <div>
        <Routes>
          <Route
            path="/profiles/:username"
            element={<Profile useParams={useParams} />}
          />
        </Routes>
      </div>
    );
  }

  // Profile.js
  import React from "react";

  const profileData = {
    sieun: {
      name: "김시은",
      description: "Frontend Engineer",
    },
    pooh: {
      name: "푸",
      description: "bear pooh",
    },
  };

  function Profile({ useParams }) {
    const username = useParams().username;
    const profile = profileData[username];

    if (!profile) {
      return <div>존재하지 않는 사용자.</div>;
    }

    return (
      <div>
        <h3>
          {username} ({profile.name})
        </h3>
        <p>{profile.description}</p>
      </div>
    );
  }
  ```
