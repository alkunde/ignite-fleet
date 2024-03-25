import { useState } from "react";
import { Alert } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Realm, useApp } from "@realm/react";

import backgroundImg from "../../assets/background.png";
import { Button } from "../../components/Button";

import { IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";

import { Container, Slogan, Title } from "./styles";

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
});

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const app = useApp();

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true);

      const { idToken } = await GoogleSignin.signIn();
      if (idToken) {
        const credentials = Realm.Credentials.jwt(idToken);

        await app.logIn(credentials);
      } else {
        Alert.alert("Aviso", "Não foi possível conectar-se à sua conta google.");
        setIsAuthenticating(false);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Aviso", "Não foi possível conectar-se à sua conta google.");
      setIsAuthenticating(false);
    }
  }

  return (
    <Container source={backgroundImg}>
      <Title>
        Ignite Fleet
      </Title>

      <Slogan>
        Gestão de uso de veículos
      </Slogan>

      <Button
        title="Entrar com Google"
        isLoading={isAuthenticating}
        onPress={handleGoogleSignIn}
      />
    </Container>
  );
}