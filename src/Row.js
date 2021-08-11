import React , {useState , useEffect} from 'react';
import axios from './axios';
import './Row.css'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const baseURL = 'https://image.tmdb.org/t/p/original/'

function Row({title , fetchURL , isLargerRow}){

    const [movies, setMovies] = useState([])

    const [trailerUrl, setTrailerUrl] = useState("")

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchURL]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    };

    const handleClick = (movie)=>{
        if(trailerUrl){
            setTrailerUrl("");
        }else {
            movieTrailer(movie?.name || "")
            .then((url) => {
               const urlParams = new URLSearchParams(new URL(url).search) ;
               setTrailerUrl(urlParams.get("v"))
            })
            .catch((error)=>console.log(error))
        }
    }

    return (
        <div className="row">
            {/* title */}
            <h1 className="row-title">{title}</h1>
            {/* container -> posters */}
            <div className="row-posters">
                {movies.map(movie => (
                    <img key={movie.id}
                    onClick={()=>handleClick(movie)} 
                    className={`row-poster ${isLargerRow && "row-larger"}`} src={`${baseURL}${isLargerRow? movie.poster_path : movie.backdrop_path }`} alt={movie.name}/>
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row
