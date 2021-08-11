const API_KEY = "1e86b3f6b1210da54b87e9828bac1e42";

const requests = {
    fetchNetflix : `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTrendingMovies : `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchTopRatedMovies : `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies : `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies : `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies : `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies : `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaryMovies : `/discover/movie?api_key=${API_KEY}&with_genres=28`,
}

 export default requests;