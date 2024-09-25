import React from 'react'

import { Example } from '../../../features/counter/components/Example'
import { Container } from '../../_ui/Container'

// import s from './MainPage.css';

export const MainPage = () => (
  <main>
    <Container>
      <Example />
      <Example incBy={2} />
    </Container>
  </main>
)
