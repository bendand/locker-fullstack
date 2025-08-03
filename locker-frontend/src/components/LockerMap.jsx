import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import MainNav from "./elements/nav/MainNav";
import Box from '@mui/joy/Box';

export default function LockerMap() {
    // accesses Google maps api key stored in env file
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    // this is an undeveloped feature containing static data for now. I'm going to find a way to implement 
    // a dynamic version of this that will have markers at each locker's location, with cards off to the side
    // for each locker that are highlighted when a user mouses over the marker, and 
    // corresponding markers that are moved to when a user mouses over a card
    return (
        <>
            <MainNav />
            <main>
                <Box
                    sx={{ 
                        justifyContent: 'center',
                        height: '85%',
                        width: '60%',
                    }}                
                >
                    <div>
                        <p><em>Live LockerMap with geocoded markers soon</em></p>
                    </div>
                    <br />
                    <APIProvider apiKey={apiKey}>
                        <Map
                            defaultCenter={{lat: 22.54992, lng: 0}}
                            defaultZoom={3}
                            gestureHandling={'greedy'}
                            disableDefaultUI={true}
                            loading={'async'}
                        >
                            <Marker position={{lat: 38.54992, lng: -90.578}} />
                            <Marker position={{lat: 37.5392, lng: -91.578}} />
                            <Marker position={{lat: 30.592, lng: -94.578}} />
                        </Map>
                    </APIProvider>
                </Box>
            </main>
        </>
    );
}