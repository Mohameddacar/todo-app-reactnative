import { View, Text, StyleSheet } from 'react-native'
const Footer = (props) => {
  return (
    <View style={styles.footer}>
        <Text style={styles.footerText}>All rights reserved {props.year} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    footer:{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 30,
        backgroundColor: '#667eea',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        height: 50,

    },
    footerText:{
        color: 'white',
        fontSize: 16,
        fontFamily: 'bold',
    }
})

export default Footer