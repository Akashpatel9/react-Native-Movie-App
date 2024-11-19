import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";


interface Movie {
  title: string;
  Description: string;
  poster_url: string;
  type: string;
  id: number;
}


const MovieCards = ({ data }: {data:Movie} ) => {
  return (
    <View style={styles.cardContainer}>
      <View>
        <Image source={{ uri: data.poster_url }} style={styles.poster} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.descriptionContainer}>
          <Text>{data.Description}</Text>
        </View>
        <View style={styles.typeContainer}>
          <Text style={styles.typeText}>{data.type}</Text>
        </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 10,
  },
  poster: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  textContainer: {
    flexDirection: "column",
    gap: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  descriptionContainer: {
    width: 280,
  },
  typeContainer: {
    borderWidth: 1,
    width: 55,
    height: 25,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  typeText: {
    textAlign: "center",
    fontWeight: "500",
  },
});

export default MovieCards;
