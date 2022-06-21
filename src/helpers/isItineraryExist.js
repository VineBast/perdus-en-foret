const isItineraryExist = (currentItinerary, itineraries) => {
  const isExist = itineraries.find(
    itinerary => 
      JSON.stringify(itinerary.points.map(
        point => (
          { lat: point.latitude, lng: point.longitude }
        )
      )) == JSON.stringify(currentItinerary.points.map(
        point => (
          { lat: point.latitude, lng: point.longitude }
        )
      ))
    );

  return isExist;
}

export default isItineraryExist;
