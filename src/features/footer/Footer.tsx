import React from 'react'
import { Container } from '../../shared/components/Container'

import s from './styles.css'

export const Footer = () => {
  // const abs = []

  return (
    <footer className={s.root}>
      <Container>
        <div className={s.content}>
          <span>Support project</span>

          {/* TODO: EVM / SOL wallets */}

          <a href="https://github.com/v1z" target="_blank" className={s.link}>
            made by
          </a>
        </div>
      </Container>
    </footer>
  )
}
