import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from "next/link"


export default function Movies() {
  return (
    <>
      <Head>
        <title>TVTalks: Movies, TV SHows, Anime</title>
        <meta name="description" content="One Stop Haven for all your entertainment needs..." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>TVTALKS MOVIES</h1>
        <div>
          <Link href="/">
            HOME
          </Link>
          <Link href="/about">
            ABOUT
          </Link>
        </div>
      </main>
    </>
  )
}
