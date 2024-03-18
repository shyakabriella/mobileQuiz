import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const StatCard = ({ color, title, value }) => (
  <View style={[styles.statCard, { backgroundColor: color }]}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

const NotificationItem = ({ title, time }) => (
  <View style={styles.notificationItem}>
    <Text style={styles.notificationTitle}>{title}</Text>
    <Text style={styles.notificationTime}>{time}</Text>
  </View>
);

const DashboardButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.dashboardButton}>
    <Text style={styles.dashboardButtonText}>{title}</Text>
  </TouchableOpacity>
);

const TeacherDashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [hours, setHours] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/courses') // Replace with your actual backend URL
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleAddCourse = () => {
    const courseData = {
      courseName: courseName,
      hours: hours,
    };
  
    fetch('http://localhost:3000/add-course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add course');
        }
        return response.json();
      })
      .then(data => {
        Alert.alert('Course Added', 'The course has been added successfully.');
        // Optionally, you can update the courses list here
        // For example, fetch the updated courses list from the server
        // and set it in the state
        fetchCourses(); // Assume fetchCourses is a function that fetches the updated courses list
      })
      .catch(error => {
        console.error('Error adding course:', error);
        Alert.alert('Error', 'There was an error adding the course.');
      })
      .finally(() => {
        // Reset the form and close the modal
        setCourseName('');
        setHours('');
        setModalVisible(false);
      });
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userName}>Teacher</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.statsRow}>
          <StatCard color="#FFB6C1" title="Grades" value="23" />
          <StatCard color="#87CEFA" title="Pending" value="12" />
          <StatCard color="#90EE90" title="Students" value="35" />
        </View>
        <Text style={styles.notificationsTitle}>Courses Available</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, { flex: 2 }]}>Course Name</Text>
          <Text style={[styles.headerText, { flex: 1 }]}>Hours</Text>
          <Text style={[styles.headerText, { flex: 1 }]}>Actions</Text>
        </View>
        {courses.map(course => (
          <View key={course.id} style={styles.courseRow}>
            <Text style={[styles.courseText, { flex: 2 }]}>{course.courseName}</Text>
            <Text style={[styles.courseText, { flex: 1 }]}>{course.hours} hours</Text>
            <View style={[styles.actions, { flex: 1 }]}>
              <TouchableOpacity>
                <FontAwesome5 name="trash-alt" style={[styles.courseAction, { color: 'red' }]} />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome5 name="edit" style={[styles.courseAction, { color: 'blue' }]} />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome5 name="question" style={[styles.courseAction, { color: 'green' }]} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.dashboardButtonsContainer}>
        <DashboardButton title="Add Course" onPress={() => setModalVisible(true)} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Course</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Course Name"
              value={courseName}
              onChangeText={setCourseName}
              autoCapitalize="words"
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Hours"
              value={hours}
              onChangeText={setHours}
              keyboardType="number-pad"
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={handleAddCourse}>
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '30%',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'space-between',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statTitle: {
    fontSize: 18,
    color: '#fff',
  },
  notificationsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationTime: {
    fontSize: 14,
    color: '#666',
  },
  dashboardButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
  },
  dashboardButton: {
    backgroundColor: '#4e9af1',
    padding: 15,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  dashboardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalInput: {
    width: '100%',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    alignSelf: 'stretch',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
 courseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  courseText: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
  },
});

export default TeacherDashboard;
