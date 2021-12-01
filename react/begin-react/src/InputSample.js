import React, { useState, useRef } from 'react'

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    });
    const nameInput = useRef();
    const { name, nickname } = inputs;

    const onChange = (event) => {
        const { name, value } = event.target

        setInputs({
            ...inputs,
            [name]: value
        })
    }
    const onReset = (event) => {
        setInputs({
            name: '',
            nickname: ''
        })
        nameInput.current.focus()
    }

    return (
        <div>
            <input name='name' onChange={onChange} value={name} placeholder='이름' ref={nameInput} />
            <input name='nickname' onChange={onChange} value={nickname} placeholder='닉네임'/>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>이름: {name}</b>
                <br />
                <b>닉네임: {nickname}</b>
            </div>
        </div>
    )
}

export default InputSample