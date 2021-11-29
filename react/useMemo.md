# useMemo
주로, 성능을 최적화 하기위해 `useMemo` 를 사용하여 이전에 연산된 값을 재사용하는 방법을 사용함.

## 사용 방법

- 첫번째 파라미터 : 함수
- 두번째 파라미터 : deps 
deps의 내용이 변경되면 등록된 함수가 호출되어 값을 연산하고 만약, 내용이 변경되지 않으면 이전에 연산한 값을 재사용함.

```jsx
import React, { useMemo } from 'react'

// useMemo(() => 등록할 함수), deps) 
const count = useMemo(() => countActiveUsers(users), [users])
```