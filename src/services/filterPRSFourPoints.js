/*
Retourne les PRS filtrés grâce à 5 données :
Il faut mettre en entrée les PRS selon la forme suivante: dataPRS.features
et une latitude nord, une latitude sud, une longitude Ouest et une longitude Sud.
*/
export function filterDataPRS(
    latitudeNord,
    latitudeSud,
    longitudeOuest,
    longitudeEst,
    dataPRS
  ) {
    return dataPRS.filter(
      (elm) =>
        elm.geometry.coordinates[0] < longitudeEst &&
        elm.geometry.coordinates[0] > longitudeOuest &&
        elm.geometry.coordinates[1] < latitudeNord &&
        elm.geometry.coordinates[1] > latitudeSud
    );
  }