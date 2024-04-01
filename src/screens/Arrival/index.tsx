import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BSON } from "realm";
import { X } from "phosphor-react-native";

import { useObject, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";

import { Button } from "../../components/Button";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Header } from "../../components/Header";

import { Container, Content, Description, Footer, Label, LicensePlate } from "./styles";

type RouteParamsProps = {
  id: string;
}

export function Arrival() {
  const { goBack } = useNavigation();
  const route = useRoute();
  const { id } = route.params as RouteParamsProps;

  const historic = useObject(Historic, new BSON.UUID(id));
  const realm = useRealm();

  function handleRemoveVehicleUsage() {
    Alert.alert(
      'Aviso',
      'Deseja cancelar a utilização do veículo?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => removeVehicleUsage()}
      ]
    );
  }

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic);
    });

    goBack();
  }

  function handleArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert('Aviso', 'Não foi possível obter os dados para registrar a chegada');
      }

      realm.write(() => {
        historic.status = 'arrival';
        historic.updated_at = new Date();
      });

      Alert.alert('Sucesso', 'Chegada registrada com sucesso');
      goBack();
    } catch(error) {
      console.log(error);
      Alert.alert('Aviso', 'Não foi possível registrar a chegada do veículo');
    }
  }

  return (
    <Container>
      <Header title="Chegada" />

      <Content>
        <Label>Placa do veículo</Label>

        <LicensePlate>
          {historic?.license_plate}
        </LicensePlate>

        <Label>Finalidade</Label>

        <Description>
          {historic?.description}
        </Description>

        <Footer>
          <ButtonIcon
            icon={X}
            onPress={handleRemoveVehicleUsage}
          />

          <Button
            title="Registrar chegada"
            onPress={handleArrivalRegister}
          />
        </Footer>
      </Content>
    </Container>
  );
}