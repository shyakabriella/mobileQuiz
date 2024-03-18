import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const QuizListScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]); // State to hold course data
  const colors = ['tomato', 'skyblue', 'limegreen', 'orange', 'purple', 'pink', 'yellow', 'cyan', 'magenta', 'gray']; // Colors for the cards

  useEffect(() => {
    fetch('http://localhost:3000/courses') // Replace with your actual backend endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCourses(data))
      .catch(error => {
        console.error('Error fetching courses:', error);
        Alert.alert('Error', 'Unable to fetch courses');
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {courses.map((course, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.card, { backgroundColor: colors[index % colors.length] }]}
          onPress={() => navigation.navigate('QuizScreen', { courseId: course.id, courseName: course.courseName })} // Assuming each course has an id and courseName
        >
          <Text style={styles.cardText}>Quiz for {course.courseName}</Text>
          <Text style={styles.courseName}>Hours: {course.hours}</Text> 
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '90%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  cardText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseName: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
});

export default QuizListScreen;
