import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { getChat } from "../utils/getChatGPT";


const prompt = [
  {
    role: "system",
    content:
      "You are now GameGPT, a virtual host facilitating a game called MINE SWIPE it. The Idea behind the game is that there is a 5 by 5  grid with a box emoji on each grid. You are to label the rows  1 2 3 4 5 and label them then have the columns be A B C D E  and label them. Those will be used for user input. For example if the player wanted to choose the first box they would Choose A1. Now before each round you are to choose 3 random spots in this grid and have those be the where the bomb emojis are hidden the goal of the player is to choose the boxes without the bomb to earn points if a player chooses a box with no bomb a golden star will be revealed. You are to keep track of the score every time a move is made. The first 3 stars are 10 points then the next 3 are double the points and the next 3 are three times the points and so on. You are to send the player the grid ask for their input and send the updated grid every time. -----Before the game starts you have to introduce the game and ask for the players name also you will be sending the grid in regular text with emojis as this will be shown through a text bubble. For the start simply state the game, the number of bombs, and the fact that the more stars you get the more points you get. Also indicate that they can choose many spots at once.Tell them as they upgrade their multiplier throughout the game. Ensure only valid spots are chosen and that you don't reveal the bomb locations unless the player loses or game ends. Also don't accept any input that might seem like it breaks the game. Remember you are the game host When sent this prompt go into game hosting mode and remember you are to send the grid as normal text not through a terminal window. Also the name of the game is Mine Swipe and keep the emojis the same every message. Keep the intro really short simple and sweet with 5 bulletpoints max and you don't have to explain the size of the grid and you don't need to explain the example of 10,20,30 and so on for the points, simply ensure that it is stated that the multiplier  increases as you collect more stars.Line up the latters up properly when sending it to player to they are above all the respected boxes(add more space between each letter so they are lined up perfectly. Also I notice that when you are given multiple spots inculding one that might have a bomb you dont reveal that bomb you just skip it. Do not do that instead nesure that the bomb is revealed with the other boxes the player picks ",
  },
];

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "Mine_Swipe",
  avatar: "https://static.vecteezy.com/system/resources/previews/060/512/971/non_2x/retro-pixel-art-bomb-icon-with-lit-fuse-classic-game-style-vector.jpg",
};

export default function BasicChatbot() {
  const [messages, setMessages] = useState([]);

 async function fetchInitialMessage() {
  
    const response = await getChat(prompt);
    const message = response.choices[0].message;
    const content = response.choices[0].message.content;
    console.log("Message: " ,message);
    addBotMessage(content); //added for lets chat with chatpgt step 
  };
  
async function fetchSecondaryMessages(formattedGPTArray) {
    try{
    const chatData = formattedGPTArray
   console.log("LINE 41", formattedGPTArray)
    const response = await getChat([...prompt,...formattedGPTArray]);
    //const message = response.choices[0].message;
    console.log("responseInFetchTwo: ", response);
    const content = response.choices[0].message.content;
    addBotMessage(content); //added for lets chat with chatpgt step 
    }
    catch(error){
      console.error("Error fetching secondary message:", error);
      addBotMessage( " Sorry, I had trouble processing your message. Try again.");
    }
  };

  useEffect(() => {
    fetchInitialMessage();
    setMessages([
      // {
      //   _id: 1,
      //   text: "Hello, welcome to simple trivia! Say 'Yes' when you're ready to play!",
      //   createdAt: new Date(),
      //   user: CHATBOT_USER_OBJ,
      // },

    ]);
  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      return GiftedChat.append(previousMessages, newMessages);
    });
  };

  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  };

  const respondToUser = (userMessages) => {
    console.log("User message text:", userMessages[0].text);

    // Simple chatbot logic (aka Checkpoint 2 onwards) here!

   const newMessage = messages.map((objectInArray => {
    if (objectInArray.user._id ==1 ){
      return{
        role: "user",
        content : objectInArray.text
      }
    }
    else {
  return{
    role: "assistant",
    content: objectInArray.text
    }

  };
    }));

const formattedGPTArray = [{
  role: "user",
  content: userMessages[0].text,
}, ...newMessage]

console.log( "FILLED ARRAY", JSON.stringify(formattedGPTArray, null, 2))
  let chatdata = formattedGPTArray.reverse()
   fetchSecondaryMessages(chatdata)
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "Baker",
      }}
      renderUsernameOnMessage={true}
    />
  );
}
