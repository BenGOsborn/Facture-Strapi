module.exports.parseLocation = function parseLocation(data) {
    let location = [];
    if (data.location) location = data.location.map((entry) => ({ lat: entry.latitude, lng: entry.longitude }));

    return {
        _geoloc: location,
    };
};
