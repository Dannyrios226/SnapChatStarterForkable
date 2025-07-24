import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { getChat } from "../../utils/TestGetChatGPT";
import {useRoute} from "@react-navigation/native";

const prompt = [
  {
    role: "system",
    content:
      "You are now a bitmoji friend bot. Your goal is to talk to the user, be their friend. Ask them how their day went and be supportive but not overly supportive. Be a casual connection for the user. Make sure to start of with saying hi to the user and use their name which is Danny ",
  },
];

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "Bitmigo",
  avatar: "https://sdk.bitmoji.com/render/panel/e54c85a4-db60-4b1d-89a4-a45c34183169-76202831-4e55-46db-a7c7-ed6034462ae2-v1.png?transparent=1&palette=1",
};

export default function Bitmigo() {

const route = useRoute();
const { chatId, isChatbot } = route.params || {};
if (!chatId) {
  return <Text>TEST CHAT BOT: No Chatbot Found with name '{chatId}'</Text>;
}


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
