import { useState } from "react";
import { View, Button, Text, Alert, StyleSheet } from "react-native";
import * as Location from "expo-location";

export default function App() {

  const [location, setLocation] = useState(null);

  const [place, setPlace] = useState([])

  const getLocation = async () => {

    const permission =
      await Location.requestForegroundPermissionsAsync(); //Requests location permission while the app is active.

    if (permission.status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Location permission is required."
      );
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({}); //Gets the device's current GPS position.

    console.log(currentLocation);

    setLocation(currentLocation.coords); //Contains latitude, longitude, altitude, speed, and more.


    //To get the city, state, and country, use Reverse Geocoding
    // After getting the coordinates:
    const address = await Location.reverseGeocodeAsync({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });
    console.log(address);

    //     const address =
    // await Location.reverseGeocodeAsync({

    //   latitude: 17.385,

    //   longitude: 78.486,

    // });

    // console.log(address);

    setPlace(address[0])
    console.log("place", place)

    //  LOG  place [{"city": "Hyderabad", "country": "India", "district": "Habsiguda", "formattedAddress": "202, Habsiguda Main Rd, Manikyapuri Colony, Vijayanagar Colony, Kakateeya Nagar, Habsiguda, Hyderabad, Telangana 500007, India", "isoCountryCode": "IN", "name": "202", "postalCode": "500007", "region": "Telangana", "street": "Habsiguda Main Road", "streetNumber": "202", "subregion": null, "timezone": null}]

  };

  return (
    <View style={styles.container}>
      <Button
        title="Get Current Location"
        onPress={getLocation}
      />
      {location && (
        <>
          <Text>
            Latitude: {location.latitude}
          </Text>
          <Text>
            Longitude: {location.longitude}
          </Text>
          <Text>
            City: {place.city}

          </Text>

          <Text>
            Address: {place.formattedAddress}

          </Text>

        </>
      )}

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },

});