import Head from 'next/head'
import React from 'react';
import { Button, Label, TextInput, Card } from 'flowbite-react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Link from 'next/link';
import ItemCard from '../components/itemCard';

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function Movies() {

    const [itemType, setItemType] = useState();
    const [genreList, setGenreList] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [startYear, setStartYear] = useState(1960);
    const [endYear, setEndYear] = useState(2023);
    const [runtime, setRuntime] = useState(240);
    const [discoverList, setDiscoverList] = useState([]);

    useEffect(() => {
        if (itemType) {
            axios.get(`https://api.themoviedb.org/3/genre/${itemType.toLowerCase()}/list`, { params: { api_key: apiKey } }).then(response => {
                console.log(response);
                setGenreList(response.data.genres)
            });
        }
    }, [itemType])

    const discover = () => {
        let params = {}
        console.log(itemType, selectedGenres, startYear, endYear);
        if (selectedGenres.length > 0) {
            params["with_genres"] = selectedGenres.toString()
        }
        // params["release_date.gte"] = new Date(startYear, 0, 0)
        // params["release_date.lte"] = new Date(endYear, 0, 365)
        params["with_runtime.lte"] = runtime

        params["api_key"] = apiKey

        axios.get(`https://api.themoviedb.org/3/discover/movie`, { params: params }).then(response => {
            console.log(response);
            setDiscoverList(response.data.results)
        });
    }


    return (
        <>
            <Head>
                <title>Find Movies & TV Shows</title>
                <meta name="description" content="One Stop Haven for all your entertainment needs..." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='w-screen'>
                <h1 className='text-white'></h1>
                <div className='block m-auto w-5/6 text-center text-white'>
                    <div className='m-20'>
                        <div>
                            <h1>Are you in the mood for a Movie or TV?</h1>
                        </div>
                        <div className='flex justify-center m-10'>
                            <Button
                                outline={itemType == "Movie" ? false : true}
                                gradientDuoTone="greenToBlue"
                                className='mx-5'
                                size="lg"
                                onClick={() => {
                                    if (itemType == "Movie") {
                                        return;
                                    }
                                    else {
                                        setItemType("Movie")
                                        setSelectedGenres([]);
                                    }
                                }}
                            >
                                Movie
                            </Button>
                            <Button
                                outline={itemType == "TV" ? false : true}
                                gradientDuoTone="greenToBlue"
                                className='mx-5'
                                size="lg"
                                onClick={() => {
                                    if (itemType == "TV") {
                                        return;
                                    }
                                    else {
                                        setItemType("TV")
                                        setSelectedGenres([]);
                                    }
                                }}
                            >
                                TV Show
                            </Button>
                        </div>

                    </div>
                    {genreList && <div className='m-20'>
                        <div>
                            <h1>Which genres do you want to watch?</h1>
                        </div>
                        <div className='flex flex-wrap justify-center m-10'>
                            {
                                genreList && genreList.map(function (data) {
                                    return (
                                        <Button
                                            key={data.id}
                                            outline={selectedGenres.includes(data.id) ? false : true}
                                            gradientDuoTone="greenToBlue"
                                            className='mx-5 my-2'
                                            size="lg"
                                            onClick={() => {
                                                if (selectedGenres.includes(data.id)) {
                                                    let tempArray = [...selectedGenres]
                                                    let index = tempArray.indexOf(data.id)
                                                    tempArray.splice(index, 1)
                                                    setSelectedGenres(tempArray)
                                                } else {
                                                    setSelectedGenres([...selectedGenres, data.id])
                                                }
                                            }}
                                        >
                                            {data.name}
                                        </Button>
                                    )
                                })
                            }
                        </div>
                    </div>}
                    {/* {genreList && <div className='m-20'>
                        <div>
                            <h1>Any year range in mind?</h1>
                        </div>
                        <div className='flex flex-wrap justify-center m-10 gap-5'>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="startYear"
                                        color="red"
                                        value="Start Year"
                                    />
                                </div>
                                <TextInput
                                    id="yearStart"
                                    type="number"
                                    placeholder="1960"
                                    required={false}
                                    color="black"
                                    className='text-black'
                                    onChange={(e) => {
                                        setStartYear(e.target.value)
                                    }}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="endYear"
                                        color="red"
                                        value="End Year"
                                    />
                                </div>
                                <TextInput
                                    id="yearStart"
                                    type="number"
                                    placeholder="2023"
                                    required={false}
                                    color="black"
                                    className='text-black'
                                    onChange={(e) => {
                                        setEndYear(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>} */}
                    {genreList && <div className='m-20'>
                        <div>
                            <h1>How much time do you have?</h1>
                        </div>
                        <div className='flex flex-wrap justify-center m-10 gap-5'>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="runtime"
                                        color="red"
                                        value="Minutes"
                                    />
                                </div>
                                <TextInput
                                    id="runtime"
                                    type="number"
                                    placeholder="240"
                                    required={false}
                                    color="black"
                                    className='text-black'
                                    onChange={(e) => {
                                        setRuntime(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>}
                    {genreList && <div className='flex justify-center m-10'>
                        <Button
                            gradientDuoTone="cyanToBlue"
                            onClick={() => {
                                discover()
                            }}>
                            Discover
                        </Button>
                    </div>}
                </div>
                {(discoverList.length > 0) && <div className="grid grid-cols-5 gap-5 m-10">

                    {discoverList.map(function (data) {
                        return (
                            <div key={data.id}>
                                <Link key={data.id} href={"/movies/" + data.id}>
                                    <div className="max-w-sm ">
                                        <Card imgSrc={"https://image.tmdb.org/t/p/w780" + data.poster_path} className="h-full">
                                            <h5 className="text-xl font-bold tracking-tight h-12 text-gray-900 dark:text-white overflow-hidden">
                                                {data.title}
                                            </h5>
                                            <p className="text-sm font-normal text-gray-700 dark:text-gray-400 max-h-24 overflow-hidden">
                                                {data.overview}
                                            </p>
                                        </Card>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>}
            </main>
        </>
    )
}
