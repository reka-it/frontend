import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression } from 'leaflet';
import "leaflet/dist/leaflet.css";
import './Map.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// ---------------------------------------- //
//          Default marker settings         //
// ---------------------------------------- //
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

// ---------------------------------------- //
//                Positions                 //
// ---------------------------------------- //
type Position = {
    coords: LatLngExpression;
    popup: string;
    icon?: L.Icon;
};

const Origin: LatLngExpression = [63.42247137590749, 10.394944024912283];
const Markers: Position[] = [
    { coords: [63.42247137580749, 10.394944025912283], popup: 'Luka' },
    { coords: [63.42217237590749, 10.394244024912083], popup: 'Butta' },
    { coords: [63.42257137590749, 10.394354024912283], popup: 'Bæssen' }
];


export const Map = () => {
  return (
    <MapContainer className='map' center={Origin} zoom={18} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Markers.map((position, index) => {
        return (
          <Marker key={index} position={position.coords}>
            <Popup>
              {position.popup}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  )
};