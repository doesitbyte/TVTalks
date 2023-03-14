import { useState, useEffect } from "react";
import axios from "axios";
import { Carousel, Dropdown, Button } from "flowbite-react"
import Image from "next/image"
import Link from "next/link"

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function MoviesCarousel(props) {

    const [trendingList, setTrendingList] = useState([]);
    const [trendingRange, setTrendingRange] = useState("week");

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/trending/movie/${trendingRange.toLowerCase()}`, { params: { api_key: apiKey } }).then(response => {
            console.log(response);
            setTrendingList(response.data.results)
        });
    }, [trendingRange])

    return (
        <div id='trending' className='flex flex-col content-center items-center h-screen gap-4'>
            <h1 className='text-center text-5xl text-white font-extrabold uppercase'>Trending Movies</h1>
            <div className='flex justify-center'>
                <Button
                    outline={trendingRange == "week" ? false : true}
                    gradientDuoTone="greenToBlue"
                    className='mx-5'
                    size="sm"
                    onClick={() => {
                        if (trendingRange == "week") {
                            return;
                        }
                        else {
                            setTrendingRange("week")
                        }
                    }}
                >
                    Weekly
                </Button>
                <Button
                    outline={trendingRange == "day" ? false : true}
                    gradientDuoTone="greenToBlue"
                    className='mx-5'
                    size="sm"
                    onClick={() => {
                        if (trendingRange == "day") {
                            return;
                        }
                        else {
                            setTrendingRange("day")
                        }
                    }}
                >
                    Daily
                </Button>
            </div>
            <div className="h-4/5 xl:h-4/5 2xl:h-3/5 w-1/2">
                <Carousel
                    indicators={false}
                    leftControl={
                        <div type="button" className="bg-gray-900/30 absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white/10 group-focus:outline-none">
                                <svg aria-hidden="true" className="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                <div className="sr-only">Previous</div>
                            </div>
                        </div>
                    }
                    rightControl={
                        <div type="button" className="bg-gray-900/30 absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white  group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white/10 group-focus:outline-none">
                                <svg aria-hidden="true" className="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                <div className="sr-only">Next</div>
                            </div>
                        </div>
                    }
                >
                    {trendingList.map(function (data) {
                        return (
                            <Link key={data.id} href={"/movies/" + data.id}>
                                <div>
                                    <div className="relative h-screen">
                                        <Image src={"https://image.tmdb.org/t/p/original" + data.backdrop_path} alt={data.title} priority={true} fill className="object-contain opacity-50" />
                                        <h1 className="absolute text-5xl font-extrabold text-center text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                                            {data.title ? data.title : data.name}
                                        </h1>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </Carousel>
            </div>
        </div>
    )
}