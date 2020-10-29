const sd = require("./data/StravaRaw.json");

const d = sd.map(({
    name,
    distance,
    moving_time,
    elapsed_time,
    total_elevation_gain,
    type,
    start_date_local,
    timezone,
    start_latlng,
    end_latlng,
    location_country,
    map,
    average_speed,
    max_speed,
    average_temp,
    elev_high,
    elev_low
}) => ({
        type: "geographical",
        elevationGain: total_elevation_gain,
        startLatLng: start_latlng,
        endLatLng: end_latlng,
        country: location_country,
        elevationHigh: elev_high,
        elevationLow: elev_low,
        map: map ? {
            id: map.id,
            summaryPolyline: map.summary_polyline
        } : null,
        distance,
        name,
        movingTime: moving_time,
        elapsedTime: elapsed_time,
        type,
        startDate: start_date_local,
        timezone,
        averageSpeed: average_speed,
        maxSpeed: max_speed,
        averageTemp: average_temp
    
}));

const fs = require("fs");

fs.writeFileSync("./stravaData.json", JSON.stringify(d, null, 2), { encoding: "utf8" });