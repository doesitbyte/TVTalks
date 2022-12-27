import '../styles/globals.css'
import NavbarComponent from '../components/navbar'
import { Montserrat } from '@next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <main className={montserrat.className}>
        <NavbarComponent />
        <Component {...pageProps} />
    </main>
  )
}
