// Haversine formula to calculate distance between two lat/lon points
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}


export async function findNearestRestaurant(restaurants) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        let nearest = null;
        let minDistance = Infinity;

        for (let restaurant of restaurants) {
          const dist = getDistanceFromLatLonInKm(
            latitude,
            longitude,
            restaurant.lat,
            restaurant.lon
          );

          if (dist < minDistance) {
            minDistance = dist;
            nearest = { ...restaurant, distance: dist };
          }
        }

        resolve(nearest);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
