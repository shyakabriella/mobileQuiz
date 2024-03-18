import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/HomeScreen/LoginScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import WelcomeScreen from './screens/HomeScreen/WelcomeScreen';
import QuizListScreen from './screens/HomeScreen/QuizListScreen';
import QuizScreen from './screens/HomeScreen/QuizScreen';
import ThankYouScreen from './screens/HomeScreen/ThankYouScreen';
import TeacherDashboard from './screens/HomeScreen/TeacherDashboard'; // Assuming you add this

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: true, title: 'Welcome' }} />
        <Stack.Screen name="QuizList" component={QuizListScreen} options={{ headerShown: true, title: 'Available Quizzes' }} />
        <Stack.Screen name="QuizScreen" component={QuizScreen} options={({ route }) => ({ title: route.params.quizName || 'Quiz' })} />
        <Stack.Screen name="ThankYouScreen" component={ThankYouScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} options={{ headerShown: true, title: 'Teacher Dashboard' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
