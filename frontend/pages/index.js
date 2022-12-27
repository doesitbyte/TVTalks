import Head from 'next/head'
import Link from "next/link"
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Carousel } from 'flowbite-react'
import ItemCard from '../components/itemCard'
import Image from 'next/image'

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function Home() {

  const [trendingList, setTrendingList] = useState([]);
  const [trendingType, setTrendingType] = useState("movie");
  const [trendingRange, setTrendingRange] = useState("week");

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/trending/${trendingType}/${trendingRange}`, { params: { api_key: apiKey } }).then(response => {
      console.log(response);
      setTrendingList(response.data.results)
    });
  }, [trendingType, trendingRange])

  return (
    <>
      <Head>
        <title>TVTalks: Movies, TV SHows, Anime</title>
        <meta name="description" content="One Stop Haven for all your entertainment needs..." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div id='trending' className='h-screen'>
          <h1 className='p-10 text-center text-5xl text-white font-extrabold uppercase'>Trending Movies of this week</h1>
          <div className="block h-4/5 xl:h-4/5 2xl:h-3/5 w-1/2 mx-auto">
            <Carousel
              indicators={false}
              leftControl={
                <div type="button" className="bg-gray-900/20 absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white/10 group-focus:outline-none">
                    <svg aria-hidden="true" className="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    <div className="sr-only">Previous</div>
                  </div>
                </div>
              }
              rightControl={
                <div type="button" className="bg-gray-900/20 absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30  group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white/10 group-focus:outline-none">
                    <svg aria-hidden="true" className="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    <div className="sr-only">Next</div>
                  </div>
                </div>
              }
            >
              {trendingList.map(function (data) {
                return (
                  <Link key={data.id} href={"/movies/" + data.id}>
                    <ItemCard data={data} />
                  </Link>
                )
              })}
            </Carousel>
          </div>
        </div>

      </main>
    </>
  )
}


