import React from 'react'

import { Header } from '../../features/header/Header'
import { List } from '../../features/list/List'
import { RequestForm } from '../../features/requestForm/requestForm'
import { Container } from '../../shared/components/Container'

import s from './styles.css'

export const MainPage = () => (
  <div className={s.root}>
    <Header />

    <main>
      <Container>
        <RequestForm />
        <List />
      </Container>
    </main>

    {/* TODO: footer */}
  </div>
)
