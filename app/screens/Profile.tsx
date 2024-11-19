import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    height:"100%"
  },
  text:{
    fontWeight:700,
    fontSize:20
  }
})

export default Profile