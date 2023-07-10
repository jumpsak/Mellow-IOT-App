import React, { memo } from "react";
import { ImageSourcePropType, TouchableOpacity, View, ScrollView, StyleSheet, Image } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
// import Button from "../components/Button";
import { Button, Card, Text } from "react-native-paper";

import { AppConfig } from '../AppConfig';
import { useEffect, useState } from "react";
import { MaterialCommunityIcons, Octicons, AntDesign  } from "@expo/vector-icons";

const DeviceList = ({ navigation }) => {

  const [deviceList, setDeviceList] = useState([]);

  useEffect(() => {
    fetchDevice();
  }, [])

  //!! fetch device from server
  const fetchDevice = async (userId) => {
    await fetch(`${AppConfig.odooUrl}/api/v1/device`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "x-api-key": `${AppConfig.adminToken}`,
      },
    }).then((res) => {
      res.json().then((data) => {

        //dd
        // console.log('Device XXX OK', data.results[0])
        console.log('Device XXX OK', data.results[0].id)
        console.log('Device XXX OK', data.results[0].display_name)
        console.log('Device XXX OK', data.results[0].responsible_person)
        console.log('Device XXX OK', data.results[0].thinkboard_token)
        console.log('Device XXX OK', data.results[0].active)
        // console.log('Device XXX OK', data.results[0].image_item)

        //!! set State
        setDeviceList(data.results)
      })

    }).catch((error) => {
      console.log("error device: ", error);

    });
  }

/* 
  const dataItem = [
    {
      id: 1,
      display_name: "Title001",
      thinkboard_token: "item 001 from local",
      active: "True",
      image_item: "https://picsum.photos/700",
    },
    {
      id: 2,
      display_name: "Title001",
      thinkboard_token: "item 001 from local",
      active: "True",
      image_item: "https://picsum.photos/700",
    },
    {
      id: 3,
      display_name: "Title001",
      thinkboard_token: "item 001 from local",
      active: "True",
      image_item: "https://picsum.photos/700",
    },
  ];
*/

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
    },
    tinyLogo: {
      width: 100,
      height: 70,
      resizeMode: "contain",
    },
  });

  function ListItemCard({
    id,
    display_name,
    responsible_person,
    thinkboard_token,
    active,
    image_item,
  }) {

    let image_type = null;

    const signatures = {
      JVBERi0: "application/pdf",
      R0lGODdh: "image/gif",
      R0lGODlh: "image/gif",
      iVBORw0KGgo: "image/png",
      "/9j/4": "image/jpeg",
      "/9j/": "image/jpg",
    };

    for (let sign in signatures)
      if (image_item.startsWith(sign))
        image_type = signatures[sign]

    return (
      // <Card style={{ marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 5 }}>
      //   <Card.Content>
      //     <View>
      //       {/* <Text variant="titleMedium">{id}</Text> */}
      //       <Text variant="titleMedium">{display_name}</Text>
      //       <Text variant="bodyMedium">{thinkboard_token}</Text>
      //     </View>
      //     <View>
      //       <Text variant="bodyMedium">{active}</Text>
      //     </View>
      //   </Card.Content>
      //   <Card.Cover source={{ uri: `data:${image_type};base64,${image_item}` }} />
      //   <Card.Actions>
      //     <Button style={{borderRadius:6}} >Dashboard</Button>
      //     <Button style={{borderRadius:6}} >Infomation</Button>
      //   </Card.Actions>
      // </Card>

      // <Card style={{marginLeft: 10, marginRight:10, marginTop: 5, borderRadius:0 }}>
      <Card style={{marginLeft: 8, marginRight:8, marginTop: 1, marginBottom:1, borderRadius:0 }}>
        {/* <Card.Cover source={{ uri: `data:${image_type};base64,${image_item}` }} /> */}
        <Card.Content>

          <View style={[
                        styles.container,
                        {
                          // Try setting `flexDirection` to `"row"`.
                          flexDirection: 'row',
                        },
                      ]}>
            <View style={{alignItems:'flex-start', flexShrink: 0,flexBasis: 100}}>
              <Image
                  style={[styles.tinyLogo, 
                        {
                          borderWidth: 4,
                          borderColor: "#dcdcdc",
                          
                        }]}
                  source={{ uri: `data:${image_type};base64,${image_item}` }}
              />
            </View>
            <View style={{flexGrow: 1,flexBasis: 200, paddingLeft:10}}>
              <Text variant="titleMedium">{display_name}</Text>
              <Text variant="bodyMedium">{thinkboard_token}</Text>
            </View>
            <View style={{justifyContent: "center" ,alignItems:"center",flexShrink: 0,flexBasis: 50}}>
              <AntDesign name="dashboard" size={35} color="darkgray" />
            </View>
          </View>

        </Card.Content>
        <Card.Actions>
          <Button style={{borderRadius:6}} >Dashboard</Button>
          <Button style={{borderRadius:6}} >Infomation</Button>
        </Card.Actions>
      </Card>

    );
  }

  return (
    <>
    <ScrollView>
      {deviceList.map((el) => (
        // <TouchableOpacity
        //   key={Math.random()}
        //   style={{ marginHorizontal: 10, marginVertical: 5 }}
        //   onPress={() => navigation.navigate("LandingPage")}
        // >
          <ListItemCard key={el.id} {...el} />
        // </TouchableOpacity>
      ))}
    </ScrollView>
    </>
  );
  
};

export default memo(DeviceList);
