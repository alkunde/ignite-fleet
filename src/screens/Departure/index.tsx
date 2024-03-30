import { useRef, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput } from "react-native";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { LicensePlateInput } from "../../components/LicensePlateInput";
import { TextAreaInput } from "../../components/TextAreaInput";

import { Container, Content } from "./styles";
import { licensePlateValidate } from "../../utils/licensePlateValidate";

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {
  const licensePlateRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  function handleDepartureRegister() {
    if (!licensePlateValidate(licensePlate)) {
      licensePlateRef.current?.focus();
      return Alert.alert('Aviso', 'Placa é inválida');
    }
  }

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardAvoidingViewBehavior}>
        <ScrollView>
          <Content>
            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
              onChangeText={setLicensePlate}
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              blurOnSubmit
              onChangeText={setDescription}
            />

            <Button
              title="Registrar saída"
              onPress={handleDepartureRegister}
            />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}