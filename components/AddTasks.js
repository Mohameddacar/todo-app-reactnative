import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

const AddTasks = ({ taskText, setTaskText, addTask }) => {
  return (
    <View style={styles.container}>
        <TextInput 
          style={styles.textInput} 
          placeholder='Enter Tasks' 
          placeholderTextColor='rgba(255, 255, 255, 0.7)'
          value={taskText}
          onChangeText={setTaskText}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.textBtn} onPress={addTask}>
            <Text style={styles.textAdd}>+</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    textBtn:{
        backgroundColor: '#ff6b6b',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    textAdd:{
        color: 'white',
        fontSize: 24,
        fontFamily: 'bold',
    }
})

export default AddTasks