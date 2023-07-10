import React, { memo, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, StatusBar } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { MaterialCommunityIcons, Octicons, AntDesign  } from "@expo/vector-icons";
import { useUserContext } from "../context/UserContext";
import * as SecureStore from 'expo-secure-store';

function DrawerScreen({ navigation }) {
  const { email, avatar, name } = useUserContext();

  async function signOut () {
    await SecureStore.deleteItemAsync("UserId")
    await SecureStore.deleteItemAsync("LogInOn")
    navigation.navigate("LandingPage");
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        marginVertical: StatusBar.currentHeight,
      }}
    >
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri: avatar.b64
                ? `data:${avatar.type};base64,${avatar.b64}`
                : "https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg",
            }}
            size={50}
          />
          <Title style={styles.title}>{name}</Title>
          {/* <Caption style={styles.caption}>{"@" + userData.username}</Caption> */}
          <Caption style={styles.caption}>{email}</Caption>
          <Caption style={styles.caption}>
            {"Jasmine International PCL"}
          </Caption>
        </View>
        <View style={styles.drawerSection}>
          {/* <Drawer.Section style={styles.drawerSection}> */}
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Profile"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <AntDesign 
                name="dashboard"
                color={color}
                size={size}
              />
            )}
            label="Dashboard"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="devices"
                color={color}
                size={size}
              />
            )}
            label="Device List No.1 (Home)"
            onPress={() => {
              navigation.navigate("DeviceList_1");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="devices"
                color={color}
                size={size}
              />
            )}
            label="Device List No.2"
            onPress={() => {
              navigation.navigate("DeviceList_2");
            }}
          />
        </View>
      </View>
      <View>
        <DrawerItem
          icon={({ color, size }) => (
            <Octicons name="sign-out" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {    
            signOut();
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingBottom: 20,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  drawerSection: {
    marginTop: 5,
  },
});

export default memo(DrawerScreen);
