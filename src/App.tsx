import CurrentcyConverter from '@pages/CurrencyConverter/CurrencyConverter'
import styles from './app.module.scss'
import Header from '@components/Header/Header'


function App() {

  return (
    <div className={styles.mainApp}>
      <Header />
      <CurrentcyConverter />
    </div>
  )
}

export default App
