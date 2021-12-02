import React, { useRef, useReducer, useCallback, useMemo, createContext } from 'react'
import UserList from './UserList'
import CreateUser from './CreateUser'
import useInputs from './useInputs'
import produce from 'immer'

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...')
  return users.filter(user => user.active).length
}

// window.produce = produce

const initialState = {
  users: [
    {
      id: 1,
      username: 'sieun',
      email: 'sieun@naver.com',
      active: true
  },
  {
      id: 2,
      username: 'test1',
      email: 'test1@naver.com',
      active: false
  },
  {
      id: 3,
      username: 'test2',
      email: 'test2@naver.com',
      active: false
  }]
}

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        users: state.users.concat(action.user)
      }
    case 'TOGGLE_USER':
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id)
        user.active = !user.active
      })
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      }
    default:
      throw new Error('Unhandled action')
  }
}

export const userDispatch = createContext(null)

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { users } = state;
  // const [form, onChange, reset] = useInputs({
  //   username: '',
  //   email: ''
  // })

  // const {username, email} = form
  
  // const nextId = useRef(4)

  
  const count = useMemo(() => countActiveUsers(users), [users])

  return (
    <userDispatch.Provider value = {dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>활성 사용자 수: {count}</div>
    </userDispatch.Provider>
  )
}

export default App