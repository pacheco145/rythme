import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './map.scss'

const Map = () => {

    


    return (
        <MapContainer center={[40.42, -3.7]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[40.42, -3.7]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>

    )
};

export default Map;