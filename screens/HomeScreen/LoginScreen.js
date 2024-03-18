import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role is student

  // Inside LoginScreen component

const handleLogin = () => {
  // Use the 'role' state which reflects the user's choice
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, role }), // Corrected to use the role state
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Invalid email or password or role mismatch');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    if (data.user.role === 'teacher') {
      navigation.navigate('TeacherDashboard');
    } else {
      navigation.navigate('Welcome');
    }
  })
  .catch(error => {
    Alert.alert('Error', error.message);
  });
};

  
  
  const handleRegister = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#a9a9a9"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#a9a9a9"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <View style={styles.roleContainer}>
        <TouchableOpacity onPress={() => setRole('student')} style={[styles.roleButton, role === 'student' && styles.selectedRoleButton]}>
          <Text style={[styles.roleButtonText, role === 'student' && styles.selectedRoleButtonText]}>Student</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRole('teacher')} style={[styles.roleButton, role === 'teacher' && styles.selectedRoleButton]}>
          <Text style={[styles.roleButtonText, role === 'teacher' && styles.selectedRoleButtonText]}>Teacher</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.signUpText}>Don’t have an account? <Text style={styles.signUpButton}>Create a new account</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    width: '80%',
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
  },
  signUpText: {
    marginTop: 20,
    fontSize: 16,
  },
  signUpButton: {
    color: 'blue',
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  roleButton: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  selectedRoleButton: {
    backgroundColor: 'blue',
  },
  roleButtonText: {
    color: 'black',
  },
  selectedRoleButtonText: {
    color: '#fff',
  },
});

export default LoginScreen;
