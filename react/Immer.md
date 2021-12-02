# Immer

리액트에서는 배열이나 객체를 업데이트 할 경우, 직접적으로 수정 하는 방법 대신 **불병성을 지켜주면서 업데이트**를 해 주어야 함.

**예시**

- **객체**의 경우
    
    `...` 연산자를 사용해서 새로운 객체를 만들어줘야함.
    
    ```jsx
    const object = {
    	a: 1,
    	b: 2,
    }
    
    // ❌ 올바르지 않은 방법
    object.b = 3;
    
    // ⭕ ****올바른 방법
    const nextObject = {
      ...object,
      b: 3
    };
    ```
    
- **배열**의 경우
    
    배열의 경우, `push`, `splice` 와 같은 함수를 사용하거나 n 번째 항목을 직접 수정하는 것이 아닌 `**concat`, `filter`, `map`** 같은 함수를 사용하여 새로운 배열을 만들어내야 함
    
    ```jsx
    const users = [
    	{
    		id: 1,
    		name: user1,
    		active: true
    	},
    	{
    		id: 2,
    		name: user2,
    		active: false
    	}
    ]
    
    // ❌ 올바르지 않은 방법
    users.push({
    		id: 3,
    		name: user3,
    		done: false
    })
    
    users.splice(users.findIndex(user => user.id === 2), 1)
    
    const selected = users.find(user => user.id === 2)
    selected.active = !selected.active
    
    // ⭕ ****올바른 방법
    const inserted = users.concat({
    		id: 3,
    		name: user3,
    		done: false
    })
    
    const filtered = users.filter(user => user.id !== 2)
    
    const toggled = users.map(
    	user => user.id === 2
    		? { ...user, active: !user.active }
    		: user
    )
    ```
    

대부분의 위의 방식으로 데이터를 업데이트해주는 방법이 그다지 어렵지는 않을 수 있지만 데이터의 구조가 좀 더 까다로워진다면 불변성을 지키며 데이터를 업데이트해주는 코드가 좀 더 복잡해질 수 있음.

이런 경우, `immer` 라는 라이브러리를 사용하면 더 간단한 코드로 구현이 가능함.

**예시**

`posts` 배열 안의 id 가 1 인 `post` 객체를 찾아서, `comments` 에 새로운 댓글 객체를 추가해줘야 한다고 가정해보자.

```jsx
const state = {
  posts: [
    {
      id: 1,
      title: '제목1',
      body: '내용1',
      comments: [
        {
          id: 1,
          text: '댓글1'
        }
      ]
    },
    {
      id: 2,
      title: '제목1',
      body: '내용2',
      comments: [
        {
          id: 2,
          text: '댓글2'
        }
      ]
    }
  ],
  selectedId: 1
}

// immer 라이브러리를 사용하지 않은 경우
const nextState = {
  ...state,
  posts: state.posts.map(post =>
    post.id === 1
      ? {
          ...post,
          comments: post.comments.concat({
            id: 3,
            text: '댓글3'
          })
        }
      : post
  )
}

// immer 라이브러리를 사용하는 경우
const nextState = produce(state, draft => {
  const post = draft.posts.find(post => post.id === 1)
  post.comments.push({
    id: 3,
    text: '댓글3'
  })
})
```

## Immer

데이터를 업데이트 할 때, `Immer` 가 대신 불변성 관리를 해주기 때문에 불변성을 신경쓰지 않으면서 없데이트를 해줄 수 있음.

### 사용 방법

1. `yarn add immer` 먼저, 라이브러리를 추가해줌.
2. `import produce from 'immer'`
3. `produce()` 함수 사용.
    - 첫번 째 파라미터 : 수정하고 싶은 데이터(상태)
    - 두번 째 파라미터 : 어떻게 업데이트 할 지 정의하는 함수
    
    ```jsx
    const state = {
    	number: 1,
    	countChanged: 2
    }
    
    const nextState = produce(state, draft => {
    	draft.number += 10
    })
    
    console.log(nextState) // { number: 11, countChanged: 2 }
    ```
    

❗ 하지만, `Immer` 를 사용한다고 해서 무조건 코드가 깔끔해지는 것은 아님!

아래 예시를 보면,

```jsx
// immer를 사용하지 않은 경우
function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return {
				users: state.users.concat(action.user)
      }
    case 'TOGGLE_USER':
			return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id
            ? { ...user, active: !user.active}
            : user
          )
      }
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      }
    default:
      throw new Error('Unhandled action')
  }
}

// immer를 사용한 경우
function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return produce(state, draft => {
        draft.users.push(action.user)
      })
    case 'TOGGLE_USER':
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id)
        user.active = !user.active
      })
    case 'REMOVE_USER':
      return produce(state, draft => {
        const index = draft.users.findIndex(user => user.id === action.id)
        draft.users.splice(index, 1)
      })
    default:
      throw new Error('Unhandled action')
  }
}
```

위의 코드를 보면 

- `CREATE_USER` 의 경우, `immer`를 쓰지 않은 경우가 더 깔끔하고 간결함.
- `TOGGLE_USER` 의 경우, `immer`를 사용한 경우의 코드가 더 깔끔하고 이해하기 쉬움.
- `REMOVE_USER` 의 경우도 굳이 `immer`를 사용할 필요가 없음.

이처럼, 업데이트 로직이 조금 까다로운 경우만 사용하고 간단한 경우에는 굳이 `immer`를 사용할 필요는 없음. 그러니 로직이 복잡해 필요한 경우에만 사용하도록 하자.