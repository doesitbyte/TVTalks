import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from "next/link"


export default function About() {
  return (
    <>
      <Head>
        <title>TVTalks: Movies, TV SHows, Anime</title>
        <meta name="description" content="One Stop Haven for all your entertainment needs..." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>TVTALKS ABOUT</h1>
        <div>
          <Link href="/">
            HOME
          </Link>
          <Link href="/movies">
            MOVIES
          </Link>
        </div>
      </main>
    </>
  )
}
