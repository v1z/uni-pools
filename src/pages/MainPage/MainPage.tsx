import React from 'react'

import { Header } from '../../features/header/Header'
import { List } from '../../features/list/List'
import { Form } from '../../features/form/Form'
import { Container } from '../../shared/components/Container'

import s from './styles.css'

export const MainPage = () => (
  <div className={s.root}>
    <Header />

    <main>
      <Container>
        <Form />
        <List />
      </Container>
    </main>

    {/* TODO: footer */}
  </div>
)
