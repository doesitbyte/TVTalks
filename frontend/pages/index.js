import Head from 'next/head'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

import MoviesCarousel from '../components/MoviesCarousel';

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function Home() {

  return (
    <>
      <Head>
        <title>TVTalks: Movies, TV SHows, Anime</title>
        <meta name="description" content="One Stop Haven for all your entertainment needs..." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className='text-5xl text-center text-white'>TVTALKS</h1>
      </main>
    </>
  )
}


