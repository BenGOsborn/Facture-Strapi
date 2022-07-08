module.exports.parseLocation = function parseLocation(data) {
    if (!data.location) return {};

    return {
        _geoloc: data.location.length > 0 ? data.location.map((entry) => ({ lat: entry.latitude, lng: entry.longitude })) : [{ lat: -22.9778201, lng: 132.5032925 }],
    };
};
