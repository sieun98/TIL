import React, { useState, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'
import Button from './Button'

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`
const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`
const slideUp = keyframes`
    from {
        transform: translateY(200px);
    }
    to {
        transform: translateY(0px);
    }
`
const slideDown = keyframes`
    from {
        transform: translateY(0px);
    }
    to {
        transform: translateY(200px);
    }
`
const DarkBackground = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, .8);

    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${fadeIn};
    animation-fill-mode: forwards;

    ${props => props.disappear && css`
        animation-name: ${fadeOut}
    `}
`
const DialogBlock = styled.div`
    width: 320px;
    padding: 1.5rem;
    background: white;
    border-radius: 2px;

    h3 {
        margin: 0;
        font-size: 1.5rem;
    }

    p {
        font-size: 1.125rem;
    }

    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${slideUp};
    animation-fill-mode: forwards;
    
    ${props => props.disappear && css`
        animation-name: ${slideDown}
    `}
`
const ButtonGroup = styled.div`
    margin-top: 3rem;
    display: flex;
    justify-content: flex-end;
`

const ShortmarginButton = styled(Button)`
    & + & {
        margin-left: 0.5rem;
    }
`

function Dialog({ title, children, confirmText, cancelText, onConfirm, onCancel, visible}) {
    const [animate, setAnimate] = useState(false)
    const [localVisible, setLocalVisible] = useState(visible)

    useEffect(() => {
        // visible: true => false
        if(localVisible && !visible) {
            setAnimate(true)
            setTimeout(() => setAnimate(false), 250)
        }
        setLocalVisible(visible)
    }, [localVisible, visible])

    if (!visible && !animate) return null;
    return (
        <DarkBackground disappear={!visible}>
            <DialogBlock disappear={!visible}>
                <h3>{title}</h3>
                <p>{children}</p>
                <ButtonGroup>
                    <ShortmarginButton color="gray" onClick={onCancel}>{cancelText}</ShortmarginButton>
                    <ShortmarginButton color="pink" onClick={onConfirm}>{confirmText}</ShortmarginButton>
                </ButtonGroup>
            </DialogBlock>
        </DarkBackground>
    )
}

Dialog.defaultProps = {
    cancelText: '취소',
    confirmText: '확인'
}

export default Dialog