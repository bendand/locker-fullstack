import React from 'react';
import {createRoot} from 'react-dom/client';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import MainNav from "./elements/nav/MainNav";
import Box from '@mui/joy/Box';


export default function LockerMap() {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    console.log(apiKey);

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