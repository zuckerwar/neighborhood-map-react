var FOURSQUARE_CLIENT_ID = 'A2USPEJDBNC5NLPO1JCRGUQDOJIOBMZ00QAKLCLHXSGRT0CN';
var FOURSQUARE_CLIENT_SECRET = 'ALG31RSUZEQJTKQP5OAE4U4W0R5F0S4DPLCBIMSGUYFXUA1T';

export const search = (query, location) =>
    fetch(
        `https://api.foursquare.com/v2/venues/search?` +
            `ll=${location.lat},${location.lng}` +
            `&query=${query}` +
            `&limit=20` +
            `&radius=50000` +
            `&client_id=${FOURSQUARE_CLIENT_ID}` +
            `&client_secret=${FOURSQUARE_CLIENT_SECRET}` +
            `&v=20180819`
    )
        .then(handleErrors)
        .catch(err => {
            throw Error('network-error');
        });
//.catch(err => console.log('Network Error\n', err));

export const venue = venueID =>
    fetch(
        `https://api.foursquare.com/v2/venues/${venueID}?` +
            `&client_id=${FOURSQUARE_CLIENT_ID}` +
            `&client_secret=${FOURSQUARE_CLIENT_SECRET}` +
            `&v=20180819`
    )
        .then(handleErrors)
        .catch(err => console.log('Network Error\n', err));

const handleErrors = response => {
    if (!response.ok) {
        throw Error(response.status);
    }
    return response.json();
};
