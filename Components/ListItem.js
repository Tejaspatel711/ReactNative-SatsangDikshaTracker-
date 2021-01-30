import React from 'react'
import { View,StyleSheet,Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto';

export default function ListItem({item}) {
    return (
        <TouchableOpacity >
            <View style={ styles.item}>
                {(item.mandal==="Yuva"||item.mandal==="Purush")?<Icon size={20} color="lightskyblue" name="male" /> :<Icon size={20} color="plum" name="female"/> }
                <Text style={styles.text} >{item.name}</Text>
                <View style={styles.count}>
                    <Text style={styles.text} >{item.count}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    item:{
        flexDirection:"row",
        alignItems:"center",
        fontSize:20,
        padding:10,
        marginTop:10,
        borderWidth:1,
        borderStyle:'dashed',
        borderRadius:10,
        borderColor:"wheat",
    },
    text:{
        marginLeft:10 ,
        fontSize:20,
        color:"antiquewhite"
    },
    count:{
        flex:1,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"flex-end",
    },
});