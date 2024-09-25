const handleFirstTab = (e: any) => {
  if (e.keyCode === 9) {
    document.body.classList.add('user-is-tabbing')
    window.removeEventListener('keydown', handleFirstTab)
  }
}

export const initFocusRing = () => window.addEventListener('keydown', handleFirstTab)
