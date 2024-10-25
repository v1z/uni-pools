import React from 'react'

import { Header } from '../../features/header/Header'
// import { Footer } from '../../features/footer/Footer'
import { List } from '../../features/list/List'
import { Form } from '../../features/form/Form'
import { Container } from '../../shared/components/Container'

import s from './styles.css'

export const MainPage = () => (
  <div className={s.root}>
    <Header />

    <main className={s.main}>
      <Container>
        <Form />
        <List />
      </Container>
    </main>

    {/* <Footer /> */}
  </div>
)
