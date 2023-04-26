import useGeolocation from "react-hook-geolocation";

export default function Test() {
    const location = useGeolocation();
    console.log(location);
    return (
        <div>
           {location.loaded
            ? JSON.stringify(location)
            : "Location data not available yet."} 
        </div>
    )
}