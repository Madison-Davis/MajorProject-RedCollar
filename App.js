import React, {useState} from 'react';
import { mapStyle } from './mapStyle';
import  {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";
import * as shelterData from './data/shelterextract.json';
let intermediateJson = shelterData;

// Create Marker Icon
function createMarkerIcon() {
  var iconURL = '';
  var randomIcon = Math.floor(Math.random() * (6))
  switch(randomIcon) {
    case 0:
      iconURL = '/catIcons/Cat1.png';
      break;
    case 1:
      iconURL = '/catIcons/Cat2.png';
      break;
    case 2:
      iconURL = '/catIcons/Cat3.png';
      break;
    case 3:
      iconURL = '/catIcons/Cat4.png';
      break;
    case 4:
      iconURL = '/catIcons/Cat5.png';
      break;
    case 5:
      iconURL = '/catIcons/Cat6.png';
      break;
  }
  return ({
      url: iconURL,
      scaledSize: new window.google.maps.Size(75, 100)
  })
}


// Export the App
export default function App() {

  // Identify What Shelter the User Has Selected
  const [selectedShelter, setSelectedShelter] = useState(null);

  // Set Up Map API Key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDVUxbVJmDNJ4ayOso2kfXnlb0FaEb_Z0I'
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
    
  // Set Up CSS Customizations
  const mapContainerStyle = {
    width: '75vw',
    height: '100vh',
  };
  const mapCenter = {
    lat: 41,
    lng: -87
  };
  const mapOptions = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: false
  };
  const appTitle = {
    color: 'white', 
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
    marginBottom: -90,
    paddingTop: 5,
    paddingRight: 200,
    fontFamily: 'impact',
    fontSize: 35,
    fontWeight: 'bold'
  }

  // Return HTML
  //    1: Create Google Map
  //    2: Create a marker icon per shelter
  //    3: If marker is clicked on, open InfoWindow
  //    results: an array of all the shelters
  //    key: acts as the index while looping over the results array
  return (
    <div class = "row">

      <div class = "column right">
        <h2>some text</h2>
      </div>

      <div class = "column left">
        <h1 id = "title"> SHELTER FINDER </h1>
        <GoogleMap
            mapContainerStyle = {mapContainerStyle}
            center = {mapCenter}
            zoom = {10}
            options = {mapOptions}
            id = "map"
            styles = {{
              position: 'absolute',
              zIndex: 0}}>
            
               
            <Marker position = {{
            lat: 45, 
            lng: 44
            }}/>
            {intermediateJson.results.map((shelter) => (
              <Marker 
                key = {shelter.ID}
                position = {{
                  lat: shelter.Latitude, 
                  lng: shelter.Longitude
                }}
                onClick = {() => {
                  setSelectedShelter(shelter);
                }}
                icon = {createMarkerIcon()}
              />
            ))}

            {selectedShelter && (
              <InfoWindow
                position = {{
                  lat: selectedShelter.Latitude, 
                  lng: selectedShelter.Longitude
                }}
              >
                <div>shelter details</div>
              </InfoWindow>
            )}
        </GoogleMap>
      </div>
    </div>   
  );
}