import React from 'react'
import styled from 'styled-components'

const TodoTempateBlock = styled.div`
  width: 512px;
  height: 80vh;

  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);

  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 32px;

  display: flex;
  flex-direction: column;
`

function TodoTemplate({ children }) {
  return <TodoTempateBlock>{children}</TodoTempateBlock>
}

export default TodoTemplate
