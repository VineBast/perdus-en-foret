// Permet de filtrer Toutes les PRS de Frances en fonction d'un itinéraire
// Prend en paramètre un itinéraire (tableau de point), plus il y a de point plus le filtre en précis
// Retourne un tableau de PRS
export function filterDataPRS(itinerary, dataPRS) {
  let list = [];
  itinerary.forEach((step) => {
    let latitudeNord = step.latitude + 0.08;
    let latitudeSud = step.latitude - 0.08;
    let longitudeOuest = step.longitude - 0.08;
    let longitudeEst = step.longitude + 0.08;
    list.push(
      dataPRS.features.filter(
        (elm) =>
          elm.geometry.coordinates[0] < longitudeEst &&
          elm.geometry.coordinates[0] > longitudeOuest &&
          elm.geometry.coordinates[1] < latitudeNord &&
          elm.geometry.coordinates[1] > latitudeSud
      )
    );
  });
  return list.flat();
}

// Rajoute des étapes dans l'itinéraire (invisible sur la carte)
// Prend en paramètre l'itiéraire, et un boolean, si celui si est à :
// - true : On aura seulement une étape entre deux points (utile pour prendre des photos)
// - false : La fonction va créer des étape en fonction de la taille de l'itinéraire, plus
//          l'itinéraire est grand, plus il y aura d'étape, plus il est petit moins il y en aura
//          C'est très utile pour afficher tous les PRS le long de l'itinéraire.
export function createItineraryWithStep(itinerary, isOnlyOneStep) {
  const list = [];
  itinerary.forEach((_, i) => {
    list.push({
      latitude: itinerary[i].latitude,
      longitude: itinerary[i].longitude,
    });
    if (i < itinerary.length - 1)
      list.push(createSteps(itinerary, isOnlyOneStep, i));
  });
  return list.flat();
}

//Cette fonction créer les steps
//Elle retourn un liste d'étape en plus à rajouter dans l'itinéraire
function createSteps(itinerary, isOnlyOneStep, index) {
  const nbrStep = isOnlyOneStep
    ? 0
    : numberStepBetweenTwoPoints(itinerary, index);
  const list = [
    {
      latitude: (itinerary[index].latitude + itinerary[index + 1].latitude) / 2,
      longitude:
        (itinerary[index].longitude + itinerary[index + 1].longitude) / 2,
    },
  ];

  for (let i = 0; i < Math.pow(2, nbrStep) - 1; i++) {
    const point = {
      latitude: (itinerary[index].latitude + list[i].latitude) / 2,
      longitude: (itinerary[index].longitude + list[i].longitude) / 2,
    };

    const point2 = {
      latitude: (list[i].latitude + itinerary[index + 1].latitude) / 2,
      longitude: (list[i].longitude + itinerary[index + 1].longitude) / 2,
    };

    list.push(point, point2);
  }

  return list;
}

// Cette fonction calcule le nombre d'étapes à rjouter entre deux points
// Elle calcule la distance absolue (pour les coordonnés négative)
function numberStepBetweenTwoPoints(list, index) {
  const distance = {
    latitude: Math.abs(list[index].latitude - list[index + 1].latitude),
    longitude: Math.abs(list[index].longitude - list[index + 1].longitude),
  };

  return distance.latitude >= distance.longitude
    ? distance.latitude / 0.5
    : distance.longitude / 0.5;
}
