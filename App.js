/* UI by Sri Krishna.U */
import React, { useState, useEffect } from "react";
import { Alert, AppRegistry, StyleSheet, Button, View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import MapView from 'react-native-maps';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import logo from './assets/logo.png';
import vehicle_marker from './assets/car.png';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
let garbageloc = null;
let state = {
  location: null,
  geocode: null,
  errorMessage: null,
  userName: null,
  userPassword: null,
  userEmail: null,
  userAddress: null,
  userMobno: null,
  loginuserName: null,
  loginPassword: null
}

export default function App() {
  const [vehicleMarker, setVehicleMarker] = useState(null);
  const [garbageMarker, setGarbageMarker] = useState(null);
  global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
  global.FormData = global.originalFormData || global.FormData;

  if (window.FETCH_SUPPORT) {
    window.FETCH_SUPPORT.blob = false;
  } else {
    global.Blob = global.originalBlob || global.Blob;
    global.FileReader = global.originalFileReader || global.FileReader;
  }

  userRegister = (navigation) => {
    //alert('ok'); // version 0.48




    fetch('https://garbmanager.000webhostapp.com/register_user.php?username=' + state.userName + '&& email=' + state.userEmail + '&& password=' + state.userPassword + '&& address=' + state.userAddress + '&& mobile_number=' + state.userMobno, {
      method: 'get',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },


    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson == "true") { navigation.push('Login'); }
      })
      .catch((error) => {
        console.error(error);
      });

  }
  userLogin = (navigation) => {
    //alert('ok'); // version 0.48
    fetch('https://garbmanager.000webhostapp.com/login_user.php?email=' + state.loginuserName + '&&password=' + state.loginPassword, {
      method: 'get',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },


    })
      .then((response) => response.text())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson == "admin") { navigation.push('Admin'); }
        else if (responseJson == "true") { navigation.push('Welcome'); }
        else if (responseJson == "false") {
          navigation.push('Login');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  userLocation = () => {
    //alert('ok'); // version 0.48
    fetch('https://garbmanager.000webhostapp.com/add_location.php?location_lat=' + state.location.latitude + '&& location_lon=' + state.location.longitude + '&& email=' + state.loginuserName, {
      method: 'get',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },

    })
      .then((response) => response.text())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getGarbageLocation = () => {
    //alert('ok'); // version 0.48


    fetch('https://garbmanager.000webhostapp.com/garbage_locations.php', {
      method: 'get',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }

    })
      .then((response) => response.text())
      .then((responseJson) => {
        let markers = [];
        let loc = responseJson.split(';')
        for (let i = 0; i < loc.length - 1; i++) {
          let latlong = loc[i].split(',');

          let marker = {
            title: 'Garbage',
            coordinates: {
              latitude: parseFloat(latlong[0]),
              longitude: parseFloat(latlong[1])
            },
          }
          markers.push(marker);
        }
        setGarbageMarker(markers);



      })
      .catch((error) => {
        console.error(error);
      });
  }
  getVehicleLocation = () => {
    //alert('ok'); // version 0.48


    fetch('https://garbmanager.000webhostapp.com/vehicle_locations.php', {
      method: 'get',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }

    })
      .then((response) => response.text())
      .then((responseJson) => {


        let latlong = responseJson.split(',');
        let vehiclemarker = {
          title: 'vehicle',
          coordinates: {
            latitude: parseFloat(latlong[0]),
            longitude: parseFloat(latlong[1])
          },
        }
        state.vehiclemarker = vehiclemarker;
        setVehicleMarker(vehiclemarker);
        console.log(state.vehiclemarker);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getVehicleLocation = () => {
    //alert('ok'); // version 0.48


    fetch('https://garbmanager.000webhostapp.com/vehicle_locations.php', {
      method: 'get',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }

    })
      .then((response) => response.text())
      .then((responseJson) => {


        let latlong = responseJson.split(',');
        let vehiclemarker = {
          title: 'vehicle',
          coordinates: {
            latitude: parseFloat(latlong[0]),
            longitude: parseFloat(latlong[1])
          },
        }
        state.vehiclemarker = vehiclemarker;
        setVehicleMarker(vehiclemarker);
        console.log(state.vehiclemarker);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function InitialScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={logo} style={{ width: 305, height: 300 }} />

        <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>
          <Button

            title="Login"
            color="#90A4AE"
            onPress={() => navigation.push('Login')}
          />

        </View>
        <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>
          <Button
            title="Signup"
            color="#90A4AE"
            onPress={() => navigation.push('Signup')}
          />
        </View>
      </View>
    );
  }
  function LoginScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={logo} style={{ width: 305, height: 300 }} />

        <TextInput

          onChangeText={text => state.loginuserName = text}
          placeholder={'UserName'}
          style={styles.input}
        />
        <TextInput

          placeholder={'Password'}
          secureTextEntry={true}
          onChangeText={text => state.loginPassword = text}
          style={styles.input}
        />
        <Button
          title="Login"
          onPress={() => { userLogin(navigation); }}
        />
      </View>
    );
  }
  function SignupScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={logo} style={{ width: 305, height: 300 }} />
        <TextInput
          placeholder={'UserName'}

          onChangeText={text => state.userName = text}
          style={styles.input}

        />
        <TextInput
          placeholder={'Password'}

          onChangeText={text => state.userPassword = text}
          style={styles.input}
          secureTextEntry={true}
        />
        <TextInput
          placeholder={'Address'}

          onChangeText={text => state.userAddress = text}
          style={styles.input}

        />
        <TextInput
          placeholder={'Mobile No.'}

          onChangeText={text => state.userMobno = text}
          style={styles.input}
        />
        <TextInput

          placeholder={'Email'}
          keyboardType='email-address'
          onChangeText={text => state.userEmail = text}
          style={styles.input}

        />
        <Button
          title="Sign Up"
          onPress={() => { userRegister(navigation); }}
        />
      </View>
    );
  }
  function WelcomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e3fafc' }}>
        <Image source={logo} style={{ width: 305, height: 300 }} />
        <Text style={styles.titleText}>
          Welcome to GarbManager
          {"\n"}
        </Text>
        <Text style={styles.baseText}>
          Please file a complaint to report garbage in your area.
        <Text numberOfLines={5}>
            {"\n"}
            {"\n"}
          </Text>
        </Text>
        <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>
          <Button
            title="File a complaint"
            color="#90A4AE"
            onPress={() => navigation.push('FarmDetails')}
          />
        </View>
        <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>
          <Button

            color="#90A4AE"
            title="My compaints"
            onPress={() => navigation.push('MyRequests')}
          />
        </View>

      </View>
    );
  }
  function RequestDroneFirstScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.titleText}>
          complaint details
          {"\n"}
        </Text>
        <TextInput
          placeholder={'phone number'}
          style={styles.input}

        />
        <TextInput
          placeholder={'Days of collection'}
          style={styles.input}

        />
        <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>
          <Button

            color="#90A4AE"
            title="Mark Location"
            onPress={() => navigation.push('Map')}
          />
        </View>
      </View>
    );
  }
  function RequestDroneSecondScreen({ navigation }) {
    console.log(state.location);
    let newreg = {
      latitude: state.location.latitude,
      longitude: state.location.longitude,
      latitudeDelta: 2.0,
      longitudeDelta: 2.0
    };

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.titleText}>
          Mark Location
          {"\n"}
        </Text>


        <MapView style={{
          width: "100%",
          height: "85%",
        }} region={newreg}>
          <MapView.Marker coordinate={state.location} />

        </MapView>
        <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>
          <Button

            color="#90A4AE"
            title="Confirm"
            onPress={() => { userLocation(); navigation.push('Welcome'); }}
          />
        </View>


      </View>
    );
  }
  function RequestDroneThirdScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.titleText}>
          Confirmation
          {"\n"}
        </Text>

        <Button
          title="Confirm"
          onPress={() => navigation.push('Welcome')}
        />
      </View>
    );
  }

  function MyRequestScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.titleText}>
          My Complaints
          {"\n"}
        </Text>


      </View>
    );
  }

  function AdminScreen({ navigation }) {
    let newreg = null;
    if (vehicleMarker) {
      newreg = {
        latitude: vehicleMarker.coordinates.latitude,
        longitude: vehicleMarker.coordinates.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2
      };
    }
    else {
      newreg = {
        latitude: 13,
        longitude: 80,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      };
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.titleText}>
          GarbManager- Admin
          {"\n"}
        </Text>


        <MapView style={{
          width: "100%",
          height: "85%",
        }} region={newreg}>

          {garbageMarker.map((marker, index) => (
            <MapView.Marker
              key={index}
              coordinate={marker.coordinates}
              title={marker.title}
            />
          ))}
          {state.vehiclemarker ?
            (<MapView.Marker
              coordinate={vehicleMarker.coordinates}
              title={vehicleMarker.title}
              image={require('./assets/car.png')}
            />) : undefined}
        </MapView>



      </View>
    );
  }


  const Stack = createStackNavigator();
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      state.errorMessage = 'Permission to access location was denied';
    }
    getGarbageLocation();
    getVehicleLocation();
    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation });
    const { latitude, longitude } = location.coords
    getGeocodeAsync({ latitude, longitude })
    state.location = location.coords;

  };
  getGeocodeAsync = async (location) => {
    let geocode = await Location.reverseGeocodeAsync(location)
    state.geocode = geocode
  }
  useEffect(() => {
    getLocationAsync();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GarbManager">
        <Stack.Screen name="FarmDetails" component={RequestDroneFirstScreen} />
        <Stack.Screen name="Confirmation" component={RequestDroneThirdScreen} />
        <Stack.Screen name="Map" component={RequestDroneSecondScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="GarbManager" component={InitialScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="MyRequests" component={MyRequestScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  parent: {
    width: 300,
    height: 500,
    backgroundColor: 'red',
    margin: 50,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#e8e8e8'
  },
  baseText: {
    fontSize: 15,
    margin: 15,
  },
  titleText: {
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

