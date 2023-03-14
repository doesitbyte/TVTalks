import Head from 'next/head'
import MoviesCarousel from '../components/MoviesCarousel'


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
        <MoviesCarousel/>
      </main>
    </>
  )
}
