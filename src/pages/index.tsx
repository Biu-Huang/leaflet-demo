import { useState, useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

// import styles from './index.less';

export default function IndexPage() {
  const mapbox = useRef()
  // const [map, setMap] = useState()
  useEffect(() => {
    let map
    map = !map && L.map(mapbox.current, {
      center: [39.904989, 116.405285],
      zoom: 4,
      attributionControl: false,
      layers: [
        L.tileLayer(
          "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}", // 高德街道
          // "https://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}", // 高德卫星
          // "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}", // arcgis街道
          {
            // maxZoom: 18,
            minZoom: 3,
            subdomains: "1234"
          }),
      ]
    })

    // const layer = L.tileLayer(
    //   "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}", // 高德街道
    //   // "https://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}", // 高德卫星
    //   // "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}", // arcgis街道
    //   {
    //   // maxZoom: 18,
    //   minZoom: 3,
    //   subdomains: "1234"
    // })
    // layer.addTo(mapObj)
    map.on('click', e => {
      console.log(e)
      map.flyTo(e.latlng, map.getZoom() + 1)
    })

    let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
    })

    L.Marker.prototype.options.icon = DefaultIcon

    L.marker([39.904989, 116.405285]).addTo(map)

    L.popup()
    .setLatLng([40, 117])
    .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    .openOn(map)
  }, [])
  return (
    <div ref={mapbox} style={{ height: '100%' }} />
  );
}
