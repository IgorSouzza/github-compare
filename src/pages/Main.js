import React from 'react';

import { Container, Form } from './styles';
import logo from '../assets/logo.png';

const Main = () => (
  <Container>
    <img src={logo} alt="Github Compare" />

    <Form>
      <input type="text" placeholder="usuário/repositório" />
      <button type="submit">OK</button>
    </Form>
  </Container>
);

export default Main;
