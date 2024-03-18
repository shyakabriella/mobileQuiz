import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ThankYouScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken'); 
    navigation.replace('Login'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Thank you for completing the quiz!</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Welcome')}> {/* Navigate to Welcome Screen */}
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.button, {marginTop: 20}]} 
        onPress={handleLogout}> {/* Logout function */}
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'seagreen',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default ThankYouScreen;
