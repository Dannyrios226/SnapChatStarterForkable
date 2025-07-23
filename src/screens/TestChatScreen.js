import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform, Text } from "react-native";
import BasicChatbot from "../components/BasicChatbot";
//import SEA_SSAChatBot from  "../components/SEA_SSAChatBot";

// prettier-ignore
export const CHATBOTS = {
  
  "BasicChatbot": {
    id: "BasicChatbot",
    name: "Mine Swipe",
    imageUrl: "https://static.vecteezy.com/system/resources/previews/060/512/971/non_2x/retro-pixel-art-bomb-icon-with-lit-fuse-classic-game-style-vector.jpg",
    component: BasicChatbot,
  },
  "BakersChatbot": {
    id: "BakersChatbot",
    name: "Baker's Dog Trivia",
    imageUrl: "https://img.freepik.com/free-vector/cute-dog-robot-cartoon-character-animal-technology-isolated_138676-3143.jpg?w=150",
    component: BakersChatbot,
  },
  "DannysChatbot": {
    id: "DannysChatbot",
    name: "Danny's Trivia",
    imageUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/9c/af/8f/9caf8f36-9ad8-2a10-84ab-5a57d031ede0/App_Icon-marketing.lsr/1200x630bb.png",
    component: DannysChatbot,
  },
    "ChanhoChatBot": {
    id: "ChanhoChatBot",
    name: "Chanhos Triva",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Jackie_Chan_July_2016.jpg",
    component: ChanhoChatBot,
  }
  //   "SEA_SSAChatBot": {
  //   id: "SEA_SSAChatBot",
  //   name: "Imagining Reconnection Chatbot",
  //   imageUrl: "https://attractionsmagazine.com/wp-content/uploads/2021/05/unnamed-1-500x500.png",
  //   component: SEA_SSAChatBot,
  // },
};

export default function ChatScreen({ route }) {

  const { chatbotName } = route.params;
  const makeChatbotComponent = (chatbotName) => {
    if (CHATBOTS[chatbotName]) {
      const Chatbot = CHATBOTS[chatbotName].component;
      return <Chatbot />;
    } else {
      return <Text>No Chatbot Found with name '{chatbotName}'</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {makeChatbotComponent(chatbotName)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
