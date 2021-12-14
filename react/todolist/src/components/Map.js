/* global kakao */
import React, {useEffect} from 'react'

const listData = [
    { lat: 37.50104890165194, lng: 127.03679979123969 },
    { lat: 37.54957487980486, lng: 126.83617591611495}
]
function Map() {

    useEffect(() => {
        const mapContainer = document.getElementById("map"),
            mapOption = {
                center: new window.kakao.maps.LatLng(
                    37.50104890165194,
                    127.03679979123969
                ),
                level: 7,
            }
        
        const map = new window.kakao.maps.Map(mapContainer, mapOption)
        
        // marker 등록
        
        
        for (let i = 0; i < listData.length; i++) {
            let data = listData[i]
            let marker = new window.kakao.maps.Marker({
                map: map,
                position: new window.kakao.maps.LatLng(
                    data.lat, data.lng
                )
            })
        }

    }, [])
    return (
        <div
            id="map"
            style={{width:"100%", height: "500px"}}>
            
        </div>
    )
}

export default Map