import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const Tasks = ({ task, onDelete, onToggle }) => {

    return(
        <View style={styles.taskContainer}>
          <TouchableOpacity style={styles.task} onPress={() => onToggle(task.id)}>
            <View style={[
              styles.circle, 
              { backgroundColor: task.completed ? '#667eea' : 'transparent' }
            ]}>
              {task.completed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={[styles.taskText, task.completed && styles.completedText]}>
              {task.text}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(task.id)}>
            <Text style={styles.trash}>🗑️</Text>
          </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
   taskContainer:{
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
},
task:{
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
},
circle:{
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#667eea',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
},
checkmark:{
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
},
taskText:{
    fontSize: 16,
    fontFamily: 'bold',
    color: '#667eea',
    flex: 1,
},
completedText:{
    textDecorationLine: 'line-through',
    color: '#999',
},
trash:{
    fontSize: 18,
    marginLeft: 10,
},

})

export default Tasks