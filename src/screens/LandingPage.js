import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

const LandingPage = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Login Template</Header>

    <Paragraph>
      ระบบนี้ได้ทำการถูกยึดครองด้วย AI ดาวเคราะห์อุลตร้าV113 ประเทศกำลังจะจำเริญ จับตามองพวกเรา
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
    {/* <Button mode="contained">Login</Button> */}
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreen')}
    >
      Sign Up
    </Button>
    {/* <Button mode="outlined">Sign Up</Button> */}
  </Background>
);

export default memo(LandingPage);