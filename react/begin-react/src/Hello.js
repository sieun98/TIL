import React from 'react';

function Hello(props){
    return <div style={{
        color: props.color
    }}>{props.name}님. 안녕하세요.</div>;
}

Hello.defaultProps = {
    name: 'sieun',
    color: 'balck'
};

export default Hello;