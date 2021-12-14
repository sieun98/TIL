import React from 'react'
import { createGlobalStyle } from 'styled-components'
import TodoCreate from './components/TodoCreate'
import TodoHead from './components/TodoHead'
import TodoList from './components/TodoList'
import TodoTemplate from './components/TodoTemplate'
import { TodoProvider } from './TodoContext'

const GlobalStyel = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`

function App() {
  return (
    <TodoProvider>
      <GlobalStyel />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  )
}

export default App
