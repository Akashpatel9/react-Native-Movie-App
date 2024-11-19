import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Movie {
  description: string;
  genre: string[];
  id: number;
  poster_url: string;
  rating: number;
  release_date: string;
  title: string;
  type: string;
  "To Watch"?: string;
  Watched?: string;
}

export default function MovieOrShowDetail({ navigation }: any) {
  const [data, setData] = useState<Movie | null>();
  const [addedWatched, setAddedWatched] = useState<boolean>(false);
  const [addedToWatch, setAddedToWatch] = useState<boolean>(false);

  const route = useRoute();
  const { id }: any = route.params;

  const getapiRes = async () => {
    const res = await axios.get(
      `https://api.rapidmock.com/api/vikuman/v1/movies?id=${id}`
    );

    navigation.navigate("MovieOrShowDetail", { name: res.data.title });
    setData(res.data);
  };

  async function addtoWatchOrWatched(str: string) {
    const obj = {
      movieId: data?.id,
      status: str,
    };

    const res = await axios.post(
      "https://api.rapidmock.com/api/vikuman/v1/mylist/add",
      obj
    );

    if (res.data.success == true) {
      if (str === "To Watch") {
        setAddedToWatch(true);
      } else {
        setAddedWatched(true);
      }
    }
  }

  useEffect(() => {
    getapiRes();
  }, [id]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: data?.poster_url }} style={styles.image} />
        <View>
          <Text style={styles.title}>{data?.title}</Text>
          <Text>{data?.type}</Text>
          <Text>{data?.rating}</Text>
          <Text style={styles.type}>{data?.genre?.join(", ")}</Text>
        </View>
      </View>
      <Text style={{ marginTop: 40, fontWeight: 600, fontSize: 16 }}>
        Description
      </Text>
      <Text style={styles.description}>{data?.description}</Text>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          padding: 1,
          marginTop: 20,
        }}
      >
        <TouchableHighlight
          underlayColor="#ddd"
          onPress={() => addtoWatchOrWatched("To Watch")}
          style={{
            backgroundColor: addedToWatch ? "skyblue" : "transparent",
            borderStartEndRadius: 100,
            borderStartStartRadius: 100,
            borderWidth: 1,
            width: "50%",
            paddingVertical: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 6,
              alignItems: "center",
              justifyContent: "center",
              padding: 1,
            }}
          >
            {addedToWatch && (
              <Ionicons
                style={{ fontWeight: 700, fontSize: 15 }}
                name="checkmark-outline"
              />
            )}
            <Text style={{ textAlign: "center", fontWeight: 400 }}>
              To Watch
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="#ddd"
          onPress={() => addtoWatchOrWatched("Watched")}
          style={{
            backgroundColor: addedWatched ? "skyblue" : "transparent",
            borderEndEndRadius: 100,
            borderEndStartRadius: 100,
            borderWidth: 1,
            width: "50%",
            paddingVertical: 8,
            borderLeftWidth: 0,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 6,
              alignItems: "center",
              justifyContent: "center",
              padding: 1,
            }}
          >
            {addedWatched && (
              <Ionicons
                style={{ fontWeight: 700, fontSize: 15 }}
                name="checkmark-outline"
              />
            )}
            <Text style={{ textAlign: "center", fontWeight: 400 }}>
              Watched
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
  },
  title: {
    fontWeight: 600,
    fontSize: 30,
  },
  type: {
    fontWeight: 500,
    fontSize: 14,
  },
  headerContainer: {
    flexDirection: "row",
    gap: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  description: {
    marginTop: 8,
  },
});
