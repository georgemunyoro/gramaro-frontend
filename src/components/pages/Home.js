import React from 'react';

import { Block } from "baseui/block";
import { Button, KIND } from "baseui/button"

const Home = () => {
  return (
    <Block
      style={{
        height: "100vh",
        justifyContent: "center",
        display: "flex",
          alignItems: "center",
          background: "url(https://i.imgur.com/ZhOw8YK.jpg)",
          backgroundSize: "cover",
      }}>
      <Block 
        style={{
          width: "50%",
          // height: "100vh",
          // display: "flex",
          // justifyContent: "center",
          // fontWeight: "1000",
          // flexDirection: "column",
        }}>
        <h1 style={{
          // width: "50%",
          fontWeight: "10",
          fontSize: "3rem",
          textAlign: "left"
        }}>A notebook that's with you everywhere you go</h1>
        <Block style={{
          display: "flex",
        }}>
          <Button primary>Signup</Button>
          <Button kind={KIND.tertiary}>Login</Button>
        </Block>
      </Block>
    </Block>
  )
}

export default Home;

