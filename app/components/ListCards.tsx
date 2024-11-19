import { View, Text, Image ,StyleSheet} from 'react-native'
import React from 'react'


interface Movie {
    movieId: number;     
    poster_url: string;     
    title: string;         
    updatedAt: string;   
  }
  

const ListCards = ({data} : {data:Movie}) => {
  return (
    <View>
       <View>
        <Image source={{ uri: data.poster_url }} style={styles.poster}/>
      </View>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail"  style={styles.textTitle}>{data.title}</Text>
          <Text style={styles.textUpdatedAt}>{data.updatedAt}</Text>
        </View>
    </View>
  )
}



const styles = StyleSheet.create({
    poster: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },
    textContainer:{
        width:100
    },
    textTitle: {
        fontWeight:700,
        fontSize:12,
    },
    textUpdatedAt:{
        fontSize:12
    }
  });  

export default ListCards