import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCards from "../components/MovieCards";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "../components/Header";
import { Link } from "@react-navigation/native";
import MovieOrShowDetail from "./MovieOrShowDetail";

interface Movie {
  title: string;
  Description: string;
  poster_url: string;
  type: string;
  id: number;
}

const Home = () => {
  const [data, setData] = useState<Movie[]>([]);
  const [searchData, setSearchData] = useState<Movie[]>([]);
  const [input, setInput] = useState<string>("");
  const [flag, setFlag] = useState<boolean>(false);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getApiRes = async () => {
    try {
      const response = await axios.get(
        "https://api.rapidmock.com/api/vikuman/v1/movies/all"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    getApiRes();
  }, []);

  useEffect(() => {
    setSearchData(
      data.filter((item) =>
        item.title.toLocaleLowerCase().startsWith(input.toLocaleLowerCase())
      )
    );
  }, [input]);

  const sortByAlp = () => {
    const sorted = [...data].sort((a, b) => a.title.localeCompare(b.title));
    setData(sorted);
  };

  const sortByType = () => {
    const sorted = flag
      ? [...data].sort((a, b) => a.type.localeCompare(b.type))
      : [...data].sort((a, b) => b.type.localeCompare(a.type));
    setData(sorted);
    setFlag((flag) => !flag);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Search Box */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search Movies/Shows/Genre"
          onChangeText={(e) => setInput(e)}
          value={input}
        />
        <Ionicons name="search" size={20} />
      </View>

      {/* Sort and Filter Buttons */}
      <View style={styles.actionRow}>
        <TouchableHighlight onPress={sortByAlp} underlayColor="#ddd">
          <View style={styles.actionButton}>
            <Ionicons name="git-compare-outline" size={15} />
            <Text style={styles.actionText}>Sort</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={sortByType} underlayColor="#ddd">
          <View style={styles.actionButton}>
            <Ionicons name="flask-outline" size={15} />
            <Text style={styles.actionText}>Filter</Text>
          </View>
        </TouchableHighlight>
      </View>

      {/* Movie List */}
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setData([]);
              setTimeout(() => {
                getApiRes();
                setRefreshing(false);
              }, 2000);
            }}
          />
        }
        data={searchData.length > 0 ? searchData : data}
        renderItem={({ item }) => (
          <Link params={{ id: item.id }} screen="MovieOrShowDetail">
            {" "}
            <MovieCards data={item} />{" "}
          </Link>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  searchContainer: {
    marginHorizontal: 10,
    backgroundColor: "white",
    borderColor: "#B4B4B8F",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  searchBox: {
    backgroundColor: "transparent",
    width: "90%",
  },
  actionRow: {
    flexDirection: "row",
    padding: 10,
    gap: 30,
  },
  actionButton: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    padding: 4,
  },
  actionText: {
    color: "#7F8487",
    fontWeight: "500",
  },
});

export default Home;
