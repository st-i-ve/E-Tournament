import {Stack} from "expo-router";

export default function layout(){
    return (
      <Stack
        screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
      />
    );

}