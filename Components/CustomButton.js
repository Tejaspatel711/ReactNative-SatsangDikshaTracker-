import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export default function CustomButton(props) {
    return (
        <TouchableOpacity style={{
            margin:props.margin,
            height:props.height,
            width:props.width,
            backgroundColor:props.color,
            alignItems:"center",
            justifyContent:"center",
            borderRadius:props.radius,
            paddingBottom:5
        }} onPress={props.onPress} >
            <Text style={{ textAlign:"center",fontSize:props.fontSize,color:props.textColor}}> {props.text} </Text>

        </TouchableOpacity>
    )
}
