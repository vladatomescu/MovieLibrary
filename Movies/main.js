$(document).ready(()=>{
    //creearea eventului
    $('#searchForm').on('submit', (e)=>{
        let searchText=$('#searchText').val();
        getMovies(searchText);
        e.preventDefault();

    });
});

function getMovies(searchText){
    //metoda pentru returnarea tuturor filmelor cu ajutorul inputulu
axios.get('http://www.omdbapi.com/?s='+ searchText +'&apikey=4e9d3ee3')
    .then((response)=> {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) =>{
            output += `
            <div class="container">
        <div class="row">
            <div class="col-sm-6 col-lg-4">
                <!-- Card Flip -->
                <div class="card-flip">
                <div class="flip-card-inner">
                    <div class="flip">
                    <div class="front">
                    <!-- front content -->
                    <div class="card">
                            
                    <img src="${movie.Poster}" style="display: block;" >
                    <div class="card-block">    
                    </div>
                            </div>
                        </div>
                        <div class="back">
                        <div class="card">
                              <div class="card-block">                    
                    <h3>${movie.Title}</h3>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                                        
                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <!-- End Card Flip -->
            </div>    
            `;
        });        
        $('#movies').html(output);
    })
    .catch((err)=>{
        console.log(err);
    });
}
//salvam id-ul in sessionstorage pentru a putea sa il folosim in pasul urmator
function movieSelected(id){
    sessionStorage.setItem('movieId', id);   
    this.getMovie();
    return false;
};
//obtinem id-ul filmului din sorage si il asociem cu linkul de la API
function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    axios.get('http://www.omdbapi.com/?i='+ movieId +'&apikey=4e9d3ee3')
    .then((response)=> {
        console.log(response);
        let movie = response.data;
        
        let output=`        
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-4" >   
                <h2 >${movie.Title}</h2> 
                <ul class="list-group">
                <li class="list-group-item" style="background-color:#E27D60"><strong>Genre: </strong>${movie.Genre}</li>
                <li class="list-group-item" style="background-color:#E27D60"><strong>Year: </strong>${movie.Year}</li>                
                <li class="list-group-item" style="background-color:#E27D60"><strong>Actors: </strong>${movie.Actors}</li>        
                </ul>
                </div>
                <div class="col-md-8">
                <h3>Plot</h3>
                <h4>${movie.Plot}</h4>
                <hr>
                <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-warning">View IMDB</a>
                <a href="index.html" class="btn btn-danger">Go back</a> 
                </div>
        </div>
                         
        
        `
        $('#movies').html(output);
    })
    .catch((err)=>{
        console.log(err);
    });
}