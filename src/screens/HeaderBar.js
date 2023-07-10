import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { theme } from '../core/theme';
import { useUserContext } from "../context/UserContext";
import { Appbar, Avatar } from "react-native-paper";

function HeaderBar({ navigation }) {
  const { avatar } = useUserContext();

  return (
    <Appbar.Header>
      <TouchableOpacity
        style={{ marginLeft: 10 }}
        onPress={() => navigation.openDrawer()}
      >
        <Avatar.Image
          size={40}
          source={{
            uri: avatar.b64
              ? `data:${avatar.type};base64,${avatar.b64}`
              : "https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg",
          }}
        />
      </TouchableOpacity>

      <Appbar.Content
        style={{ marginRight: 40 }}
        title={
          <View style={{ height: 40, width: "100%", overflow: "hidden" }}>
            <Image
              source={require("../../src/assets/logo.png")}
              style={{
                resizeMode: "contain",
                height: 80,
                width: "100%",
                overflow: "hidden",
              }}
            />
          </View>
        }
      />
    </Appbar.Header>
  );
}

export default memo(HeaderBar);
