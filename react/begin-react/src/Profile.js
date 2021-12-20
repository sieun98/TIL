import React from 'react'

const profileData = {
    sieun: {
        name: '김시은',
        description: 'Frontend Engineer'
    },
    pooh: {
        name: '푸',
        description: 'bear pooh'
    }
}

function Profile({ useParams }) {
    const username = useParams().username
    const profile = profileData[username]

    if (!profile) {
        return <div>존재하지 않는 사용자.</div>
    }

    return (
        <div>
            <h3>{username} ({profile.name})</h3>
            <p>{profile.description}</p>
        </div>
    )
}

export default Profile