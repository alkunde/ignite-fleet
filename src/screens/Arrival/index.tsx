import { useRoute } from "@react-navigation/native";
import { X } from "phosphor-react-native";

import { Button } from "../../components/Button";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Header } from "../../components/Header";

import { Container, Content, Description, Footer, Label, LicensePlate } from "./styles";

type RouteParamsProps = {
  id: string;
}

export function Arrival() {
  const route = useRoute();
  const { id } = route.params as RouteParamsProps;

  return (
    <Container>
      <Header title="Chegada" />

      <Content>
        <Label>Placa do veículo</Label>

        <LicensePlate>
          XXX0000
        </LicensePlate>

        <Label>Finalidade</Label>

        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae alias quam ipsam laudantium mollitia
        </Description>

        <Footer>
          <ButtonIcon
            icon={X}
          />

          <Button title="Registrar chegada" />
        </Footer>
      </Content>
    </Container>
  );
}