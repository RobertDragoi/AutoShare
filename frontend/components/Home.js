import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Card from "./Card";
import UserContext from "./UserState/userContext";
import PostContext from "./PostState/postContext";
import Form from "./Form";
import Button from "./Button";
export default function Home(props) {
  const userContext = useContext(UserContext);
  const postContext = useContext(PostContext);
  const { isAuthenticated, user } = userContext;
  const { addPost, deletePost, posts, error } = postContext;
  const [add, setAdd] = useState(true);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const auxiliary = (bool) => {
    setAdd(bool);
  };
  const filteredPosts = posts?.filter((post) =>
    from !== "" || to !== ""
      ? from !== ""
        ? to !== ""
          ? post.from === from && post.to === to
          : post.from === from
        : post.to === to
      : post
  );
  return (
    <React.Fragment>
      {add ? (
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>Postări</Text>
          </View>
          <ScrollView>
            <Text style={styles.text}>De la</Text>
            <TextInput
              {...props}
              onChangeText={(text) => setFrom(text)}
              value={from}
              editable
              maxLength={40}
            />

            <Text style={styles.text}>Pana la</Text>
            <TextInput
              {...props}
              onChangeText={(text) => setTo(text)}
              value={to}
              editable
              maxLength={40}
            />
            <View style={styles.row}>
              {filteredPosts?.map((post) => (
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
                    {post.user._id === user?._id ? (
                      <Button
                        function={() => deletePost(post._id)}
                        color="#ff3200"
                      >
                        <MaterialCommunityIcons
                          name="trash-can-outline"
                          color="#000000"
                          size={15}
                        />
                      </Button>
                    ) : null}
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
          </ScrollView>
          {isAuthenticated ? (
            <TouchableHighlight
              onPress={() => {
                setAdd(false);
              }}
              style={styles.actionbutton}
            >
              <MaterialCommunityIcons name="plus" color="#000000" size={26} />
            </TouchableHighlight>
          ) : (
            <React.Fragment />
          )}
        </View>
      ) : (
        <View style={styles.container}>
          <Form
            auxiliary={auxiliary}
            action={addPost}
            error={error}
            buttonText="Adauga anunt"
            fields={{
              from: {
                label: "De la",
                inputProps: {
                  keyboardType: "default",
                },
              },
              to: {
                label: "Pana la",
                inputProps: {
                  keyboardType: "default",
                },
              },
              date: {
                label: "Data",
                inputProps: {
                  keyboardType: "default",
                },
              },
              freeSeats: {
                label: "Locuri libere",
                inputProps: {
                  keyboardType: "numeric",
                },
              },
            }}
          />
          {}
          <TouchableHighlight
            onPress={() => {
              setAdd(true);
            }}
            style={styles.actionbutton}
          >
            <MaterialCommunityIcons
              name="format-line-weight"
              color="#000000"
              size={26}
            />
          </TouchableHighlight>
        </View>
      )}
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dedede",
    marginTop: StatusBar.currentHeight,
  },
  actionbutton: {
    borderWidth: 1,
    borderColor: "rgba(253,132,3,0.8)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: "#fc8403",
    borderRadius: 100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  icontext: {
    marginVertical: 4,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "#000000",
    fontSize: 20,
  },
  text: {
    textAlign: "left",
    textAlignVertical: "center",
    color: "#000000",
    fontSize: 17,
  },
});
