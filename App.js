/* UI by Sri Krishna.U */
import React, { useState,useEffect }  from "react";
import { StyleSheet,Button, View, Text,TextInput,Image,TouchableOpacity} from "react-native";
import MapView from 'react-native-maps';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import logo from './assets/logo.png'; 
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
 



export default function App() {
  const [location, setLocation] = useState(null);
  const [geocode, setGeocode] = useState(null);
  const [errorMessage, seterrorMessage] = useState("");
  const [marker, setMarker] = useState(null);
  const [region, setRegion] = useState({
    latitude: 24.92009056750823, 
    longitude: 67.1012272143364,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1
  });
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
        
        placeholder={'UserName'}
        style={styles.input}
      />
       <TextInput
        
        placeholder={'Password'}
        style={styles.input}
      />
        <Button
          title="Login"
          onPress={() => navigation.push('Welcome')}
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
        style={styles.input}
       
      />
      <TextInput
      placeholder={'Password'}
      style={styles.input}
        
      />
       <TextInput
       placeholder={'Address'}
       style={styles.input}
       
      />
       <TextInput
       placeholder={'Mobile No.'}
       style={styles.input}
        
      />
        <Button
          title="Sign Up"
          onPress={() => navigation.push('Login')}
        />
      </View>
    );
  }
  function WelcomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: '#e3fafc' }}>
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
    console.log(location);
    let newreg={
      latitude: location.latitude, 
      longitude: location.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
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
            <MapView.Marker coordinate={location} />
      
      </MapView>
      <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>
  <Button
          
          color="#90A4AE"
          title="Recipt"
          onPress={() => navigation.push('Confirmation')}
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
  
const Stack = createStackNavigator();
getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
   seterrorMessage( 'Permission to access location was denied');
  }

  let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.BestForNavigation});
  const { latitude , longitude } = location.coords
  getGeocodeAsync({latitude, longitude})
  setLocation(location.coords);
  
};
getGeocodeAsync= async (location) => {
  let geocode = await Location.reverseGeocodeAsync(location)
  setGeocode(geocode);
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
    margin:15,
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

