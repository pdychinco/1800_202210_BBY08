function writeFavouriteRestaurant() {
  var favouriteRestaurantRef = db.collection("favourites");

  favouriteRestaurantRef.add({
    code: "JDF01",
    name: "Suika",
    details: ""
  });
}
