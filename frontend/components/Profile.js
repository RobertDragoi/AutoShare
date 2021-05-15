import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import UserContext from "./UserState/userContext";
import PostContext from "./PostState/postContext";
import Button from "./Button";
import Card from "./Card";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default function Profile({ navigation }) {
  const userContext = useContext(UserContext);
  const postContext = useContext(PostContext);
  const { user, Logout } = userContext;
  const { posts } = postContext;
  const userPosts = posts.filter((post) => post?.user?._id == user?._id);
  return (
    <View style={styles.container}>
      {!user ? (
        <View style={styles.row}>
          <Text style={styles.text}>
            Pentru a utiliza toate funcționalitățile, loghează-te sau
            înregistrează-te
          </Text>
          <Button color="#ff3200" function={() => navigation.navigate("Login")}>
            <Text style={styles.text}>Logare</Text>
          </Button>
          <Button
            color="#ff3200"
            function={() => navigation.navigate("Register")}
          >
            <Text style={styles.text}>Inregistrare</Text>
          </Button>
        </View>
      ) : (
        <ScrollView>
          <View>
            <Button color="#ff3200" function={() => Logout()}>
              <Text style={styles.text}>Deconectare</Text>
            </Button>
            <View style={styles.icontext}>
              <MaterialCommunityIcons
                name="account"
                color="#000000"
                size={26}
              />
              <Text style={styles.text}>{user?.name}</Text>
            </View>
            <View style={styles.icontext}>
              <MaterialCommunityIcons name="home" color="#000000" size={26} />
              <Text style={styles.text}>{user?.address}</Text>
            </View>
            <View style={styles.icontext}>
              <MaterialCommunityIcons
                name="phone-check-outline"
                color="#000000"
                size={26}
              />
              <Text style={styles.text}>{user?.phone}</Text>
            </View>
            <View
              style={{
                marginTop: 15,
                borderWidth: 3,
                color: "#030303",
                height: 1,
              }}
            />
            <Text style={styles.title}>Postări</Text>

            <View style={styles.row}>
              {userPosts?.map((post) => (
                <Card key={post._id}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <View style={styles.icontext}>
                      <MaterialCommunityIcons
                        name="home"
                        color="#000000"
                        size={26}
                      />
                      <Text style={styles.text}>De la: {post.from}</Text>
                    </View>
                    <Button color="#ff3200">
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        color="#000000"
                        size={15}
                      />
                    </Button>
                  </View>
                  <View style={styles.icontext}>
                    <MaterialCommunityIcons
                      name="map-marker-multiple"
                      color="#000000"
                      size={26}
                    />
                    <Text style={styles.text}>Pana la: {post.to}</Text>
                  </View>

                  <View style={styles.icontext}>
                    <MaterialCommunityIcons
                      name="calendar-text"
                      color="#000000"
                      size={26}
                    />
                    <Text style={styles.text}>Data si ora: {post.date}</Text>
                  </View>
                  <View style={styles.icontext}>
                    <MaterialCommunityIcons
                      name="car-seat"
                      color="#000000"
                      size={26}
                    />
                    <Text style={styles.text}>
                      Locuri libere: {post.freeSeats}
                    </Text>
                  </View>
                  <View style={styles.icontext}>
                    <MaterialCommunityIcons
                      name="account"
                      color="#000000"
                      size={26}
                    />
                    <Text style={styles.text}>Postat de: {post.user.name}</Text>
                  </View>
                  <View style={styles.icontext}>
                    <MaterialCommunityIcons
                      name="phone-check-outline"
                      color="#000000"
                      size={26}
                    />
                    <Text style={styles.text}>Contact: {post.user?.phone}</Text>
                  </View>
                </Card>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dedede",
  },
  icontext: { marginVertical: 4, flexDirection: "row", flexWrap: "wrap" },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "#000000",
    fontSize: 17,
  },
  title: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "#000000",
    fontSize: 20,
  },
});
