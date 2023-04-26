import useGeoLocation from "./useGeoLocation"

export default function Test() {
    const location = useGeoLocation();
    console.log(location);
    return (
        <div>
           {location.loaded
            ? JSON.stringify(location)
            : "Location data not available yet."} 
        </div>
    )
}