import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Tasks from './components/Tasks';
import AddTasks from './components/AddTasks';
import Footer from './components/Footer';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    if (taskText.trim().length > 0) {
      setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
      setTaskText('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.textTitle}>Welcome To To Do App!</Text>
        <Text style={styles.textInfo}>{completedTasks}/{tasks.length} Completed  {pendingTasks}/{tasks.length} Pending</Text>
      </View>
      <View style={styles.InputArea}>
        <AddTasks 
          taskText={taskText}
          setTaskText={setTaskText}
          addTask={addTask}
        />
      </View>
      <View style={styles.tasksContainer}>
        {tasks.map(task => (
          <Tasks 
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggle={toggleTask}
          />
        ))}
      </View>
      <StatusBar style="light" />
      <View>
        <Text>
        <Footer year={2025} />
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
  },
  infoContainer:{
    marginTop: 60,
    marginHorizontal: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle:{
    fontSize: 21,
    fontFamily: 'bold',
  },
  textInfo:{
    fontSize: 14,
  },
  InputArea:{
   flexDirection: 'row',
   justifyContent: 'center',
   marginTop: 20,
   marginBottom: 20,
  },
  textInput:{
    backgroundColor: '#ff6b6b',
    width: 300,
    height: 40,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: 'white',
    fontSize: 16,
    fontFamily: 'bold',
    placeholderTextColor: 'rgba(255, 255, 255, 0.7)',
  },
  inputStyle: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 20,
    padding: 20
  },
  inputContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16
  },
  textBtn:{
    backgroundColor: "#ff6b6b",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  textAdd:{
    color: "white",
    fontSize: 24
  },
  tasksContainer: {
    flex: 1,
    marginHorizontal: 20,
  }
});
