import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const generateQuestions = (courseName) => {
  let questions = [];
  for (let i = 1; i <= 10; i++) {
    questions.push({
      question: `What is a fundamental concept ${i} in ${courseName}?`,
      options: [
        `Option A for question ${i}`,
        `Option B for question ${i}`,
        `Option C for question ${i}`,
        `Option D for question ${i}`
      ],
      correctAnswer: `Option A for question ${i}`,
    });
  }
  return questions;
};

const QuizScreen = ({ route, navigation }) => {
  // Replace "Sample Course" with your default course name or logic to retrieve it
  const courseName = route?.params?.courseName || "Sample Course"; 
  const questions = generateQuestions(courseName);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Store selected options for each question
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));

  const handleOptionSelect = (index) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestionIndex] = index;
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleNextQuestion = () => {
    if (selectedOptions[currentQuestionIndex] === null) {
      Alert.alert("Answer Required", "Please choose an answer to proceed.");
    } else {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        handleSubmission();
      }
    }
  };

  const handleSubmission = () => {
    navigation.navigate('ThankYouScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{currentQuestionIndex + 1}/{questions.length} Questions</Text>
      <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
      <View style={styles.optionsContainer}>
        {questions[currentQuestionIndex].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOptions[currentQuestionIndex] === index && styles.selectedOption
            ]}
            onPress={() => handleOptionSelect(index)}>
            <Text style={styles.optionText}>{`${['A', 'B', 'C', 'D'][index]}. ${option}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
        <Text style={styles.nextButtonText}>
          {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
        </Text>
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
  counter: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: '#007bff',
  },
  optionText: {
    fontSize: 18,
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: 'seagreen',
    padding: 10,
    borderRadius: 5,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default QuizScreen;
