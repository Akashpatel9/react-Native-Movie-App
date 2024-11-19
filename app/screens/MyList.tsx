import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import ListCards from "../components/ListCards";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "@react-navigation/native";

interface Movie {
  movieId: number;
  poster_url: string;
  title: string;
  updatedAt: string;
}

const MyList = () => {
  const [towatched, setToWatched] = useState<Movie[]>([]);
  const [watched, setWatched] = useState<Movie[]>([]);

  const [showWatched, setShowWatched] = useState<boolean>(true);
  const [showToWatch, setShowToWatch] = useState<boolean>(false);

  const getEatchedData = async () => {
    const res = await axios.get(
      "https://api.rapidmock.com/api/vikuman/v1/mylist"
    );
    setToWatched(res?.data?.["To Watch"]);
    setWatched(res?.data?.["Watched"]);
  };

  useEffect(() => {
    getEatchedData();
  }, []);

  return (
    <View style={style.container}>
      {/* Header */}
      <Header />

      {/* Watched */}
      <View>
        <TouchableOpacity onPress={() => setShowWatched((pre) => !pre)}>
          <View
            style={[
              { backgroundColor: showWatched ? "skyblue" : "#C7C8CC" },
              style.button,
            ]}
          >
            {showWatched && (
              <Ionicons
                style={{ fontWeight: 700, fontSize: 15 }}
                name="checkmark-outline"
              />
            )}
            <Text style={style.buttonText}>Watched</Text>
          </View>
        </TouchableOpacity>

        {showWatched && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {watched.length > 0 && (
              <FlatList
                data={watched}
                renderItem={({ item }) => (
                  <Link
                  style={{margin:10}}
                    key={item.movieId}
                    params={{ id: item.movieId }}
                    screen="MovieOrShowDetail"
                  >
                    <ListCards data={item} />
                  </Link>
                )}
                keyExtractor={(item) => item.movieId.toString()}
                numColumns={(towatched.length + 1) / 2}
                contentContainerStyle={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              />
            )}
          </ScrollView>
        )}
      </View>

      {/* To Watched */}
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity onPress={() => setShowToWatch((pre) => !pre)}>
          <View
            style={[
              { backgroundColor: showToWatch ? "skyblue" : "#C7C8CC" },
              style.button,
            ]}
          >
            {showToWatch && (
              <Ionicons
                style={{ fontWeight: 700, fontSize: 15 }}
                name="checkmark-outline"
              />
            )}
            <Text style={style.buttonText}>To Watched</Text>
          </View>
        </TouchableOpacity>

        {showToWatch && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {towatched.length > 0 && (
              <FlatList
                data={towatched}
                renderItem={({ item }) => (
                  <Link style={{margin:10}}
                    key={item.movieId}
                    params={{ id: item.movieId }}
                    screen="MovieOrShowDetail"
                  >
                    <ListCards data={item} />
                  </Link>
                )}
                keyExtractor={(item) => item.movieId.toString()}
                numColumns={(towatched.length + 1) / 2}
                contentContainerStyle={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              />
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    gap: 10,
  },
  button: {
    width: 130,
    height: 35,
    borderEndStartRadius: 30,
    borderEndEndRadius: 30,
    justifyContent: "center",
    flexDirection: "row",
    padding: 1,
    alignItems: "center",
    gap: 4,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: 500,
  },
});

export default MyList;
