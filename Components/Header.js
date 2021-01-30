import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
export default function Header() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Satsang Diksha Tracker</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        paddingVertical:30,
        marginBottom:10,
        height:70,
        
        backgroundColor:"lightcoral"
    },
    text:{
        textAlign:'center',
        fontSize:25,
       
        color:'cornsilk',
    }
});
