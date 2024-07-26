import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import data from './../assets/data'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'




function Home() {
    const [value, setValue] = useState("")
    const [recommendations, setRecommendations] = useState([])
    const [loading, setLoading] = useState(false)

    const handleRecommend = () => {
        if (!value) {
            alert("Please enter a movie title")
            return;
        }

        setLoading(!loading)

        axios.post("http://127.0.0.1:5000/recommend", {
            name: value
        }).then(data => {
            console.log(data.data)
            setRecommendations(data.data)
            setLoading(false)
        })


    }

    return (
        <div className='w-full h-full flex flex-col justify-start items-center'>
            <div className="auto h-max flex flex-col justify-center items-center">
                {/* {console.log(value)} */}
                <div className='h-max flex justify-center items-center'>
                    <Autocomplete
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        className='text-blue-600'
                        id="combo-box-demo"
                        options={data}
                        sx={{
                            width: 600,
                            color: 'white',
                            textDecoration: 'none'
                        }}
                        renderInput={(params) => <TextField {...params} label="Movie" sx={{
                            backgroundColor: '#33343F',
                            borderRadius: 1,
                            color: 'white',
                            input: { color: 'white' },
                            '.MuiSvgIcon-root': {
                                color: 'white',
                            }
                        }}
                            InputLabelProps={{
                                style: { color: 'white' },
                            }
                            }
                            variant='outlined' />}
                    />
                    <div className="btn p-4 text-white cursor-pointer rounded-lg ml-5 bg-gradient-to-b from-green-500 to-green-700" onClick={handleRecommend}>SUGGEST</div>
                </div>

                <div className="w-full text-left px-2 text-cyan-600">Notice: Recommendations are limited to the movies listed in the dropdown menu.
                </div>
            </div>

            <div className='mt-20 flex flex-col w-[80rem] justify-center items-center'>
                <div className='font-bold mb-5 text-3xl '>RECOMMENDATIONS</div>



                {console.log(loading)}
                <div className='w-full flex justify-evenly'>

                    {loading ? (
                        <div className='flex w-full justify-evenly items-start'>
                            <SkeletonTheme baseColor="#C0C0C0" highlightColor="#fff">
                                <Skeleton className='w-[14rem] h-[320px]' />
                            </SkeletonTheme>
                            <SkeletonTheme baseColor="#C0C0C0" highlightColor="#fff">
                                <Skeleton className='w-[14rem] h-[320px]' />
                            </SkeletonTheme>
                            <SkeletonTheme baseColor="#C0C0C0" highlightColor="#fff">
                                <Skeleton className='w-[14rem] h-[320px]' />
                            </SkeletonTheme>
                            <SkeletonTheme baseColor="#C0C0C0" highlightColor="#fff">
                                <Skeleton className='w-[14rem] h-[320px]' />
                            </SkeletonTheme>
                            <SkeletonTheme baseColor="#C0C0C0" highlightColor="#fff">
                                <Skeleton className='w-[14rem] h-[320px]' />
                            </SkeletonTheme>
                        </div>
                    ) : (
                        recommendations?.map(recommendation => {
                            return (<div className='text-lg w-[30rem]'>
                                <img className='object-cover border-2 border-black w-[90%] h-[320px]' src={`https://image.tmdb.org/t/p/original${recommendation.poster_path}`} alt="File Not Found!" />
                                <div className="name text-lg">{recommendation.title}</div>
                            </div>)
                        })
                    )}




                </div>



            </div>
        </div>
    )
}

export default Home