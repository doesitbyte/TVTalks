import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function Movie() {

    const router = useRouter();
    const id = router.query.id;
    const [itemId, setItemId] = useState()
    const [itemData, setItemData] = useState({})

    useEffect(() => {
        if (!id) {
            return;
        }

        if (itemId) {
            axios.get(`https://api.themoviedb.org/3/movie/${itemId}`, {
                params: {
                    api_key: apiKey,
                }
            }).then(response => {
                console.log(response);
                setItemData(response.data)
            });
        }

        setItemId(id)

    }, [id, itemId])

    if (!itemData.genres) {
        return '';
    } else {
        return (
            <>
                <Head>
                    <title>{itemData.title + ": TVTalks"}</title>
                    <meta name="description" content="One Stop Haven for all your entertainment needs..." />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className='relative'>
                    <div className="fixed top-0 left-0 right-0 h-screen z-0">
                        <Image src={"https://image.tmdb.org/t/p/original" + itemData.backdrop_path} priority={true} fill className="relative object-cover opacity-10 -z-0" alt={itemData.title} />
                    </div>
                    <div id="header" className='px-12 py-12 h-fit flex'>
                        <div id="poster" className='basis-1/3 relative h-full w-full max-h-5/6 aspect-[2/3]'>
                            <Image src={"https://image.tmdb.org/t/p/w500" + itemData.poster_path} alt={itemData.title} priority={true} fill object-fit="contain" className="relative pb-12 px-4" />
                        </div>
                        <div className='basis-2/3 headerText z-10'>
                            <h1 className='text-5xl font-extrabold text-white'>{itemData.title}</h1>
                            <div id="genres" className='flex text-white my-2'>
                                {itemData.genres.map((genre) => {
                                    return (
                                        <p key={genre.id} className='text-xs px-1.5 py-0.5 m-1 border-2 border-solid border-white rounded-md uppercase'>{genre.name}</p>
                                    )
                                })}
                            </div>
                            <p className='my-6 text-white'>{itemData.overview}</p>
                        </div>
                    </div>
                </div>
            </>

        )
    }
}