module.exports.parseLocation = function parseLocation(data) {
    if (!data.location) return {};

    return {
        _geoloc: data.location.map((entry) => ({ lat: entry.latitude, lng: entry.longitude })),
    };
};
