import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {

  // Example navigation function
  const handlePress = (screen) => {
    console.log(`Navigate to ${screen}`);
    // Uncomment and use a navigation call like below when you have the screens set up
    // navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome auca QuizLet !</Text>
      <View style={styles.cardContainer}>

           
        <TouchableOpacity
        style={[styles.card, { backgroundColor: 'tomato' }]}
        onPress={() => navigation.navigate('QuizList')}
        >
        <Text style={styles.cardText}>Browse  Quizzes</Text>
        </TouchableOpacity>


        <TouchableOpacity style={[styles.card, { backgroundColor: 'skyblue' }]} onPress={() => handlePress('Score')}>
          <Text style={styles.cardText}>Score</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, { backgroundColor: 'limegreen' }]} onPress={() => handlePress('Report')}>
          <Text style={styles.cardText}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, { backgroundColor: 'orange' }]} onPress={() => handlePress('Grade')}>
          <Text style={styles.cardText}>Grade</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  card: {
    width: '45%',
    height: 120,
    margin: 10,
    borderRadius: 8,
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center', // Ensure text is centered even if it wraps to a new line
  },
});

export default WelcomeScreen;
