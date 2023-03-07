import React, {  useEffect, useState } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../../common/LoadingIndicator";
import IMovie from "../../models/Imovie";
import { LoadingStatus } from "../../models/types";
import { getMoviesList } from "../../services/movies";
import MoviesListItem from "./MoviesListItem";

type Props ={ 
};

const MoviesList =(props: Props) => {
    
    const { section }= useParams() as any;

    const [status, setStatus ] = useState<LoadingStatus> ('LOADING');

    const [movies, setMovies ] = useState<IMovie[] > ( [] as IMovie[] );

    const [error, setError ] = useState<Error | null> ( null );

    const [searchKey, setSearchKey ] = useState ( "" );
    
    const [filteredMovies, setFilteredMovies ] = useState<IMovie[] | null> ( [] as IMovie[] );

    useEffect( 
        () => { 
            const fetchMovies = async () => {
                try{                
                    const data = await getMoviesList(section);
                    setMovies(data);
                    setStatus('LOADED')
                }catch( error: any ){
                    setError( error );
                    setStatus("ERROR_LOADING");
                }
            };
            fetchMovies();
        },[]
    ) ;

    const filteredMovieList =() => {
        const filteredMovies = movies.filter( movie => 
            movie.title.includes( searchKey ) );
        setFilteredMovies(filteredMovies)
    };

    useEffect(
        filteredMovieList,
        [searchKey, movies]
    )
    
    let el;

    switch( status ){
        case 'LOADING':
            el = (
                <LoadingIndicator 
                    size="large"
                    message="We are fetching movies, please wait..."
                />
            );
        break;
        case 'LOADED':
            el = (
                <>
                <input 
                className="form-control my-3"
                value={searchKey}
                placeholder = 'Enter movie to search'
                onChange = {( event ) => setSearchKey( event.target.value )}
                style={{width:'200px', marginLeft: 'auto'}}
                ></input>
                
                <Row xs={2} md={4} lg={5}>
                    {
                        filteredMovies?.map(
                            movie => (
                                <Col key={movie.id} className='d-flex align-items-fetch my-2'>
                                    <MoviesListItem movie={movie} />
                                </Col>
                            )
                        )
                    }
                </Row>
                </>
            );
        break;
        case 'ERROR_LOADING':
            el = (
                <Alert variant="danger my-3">
                    {error?.message}
                </Alert>
            );
        break;
    };

    return el;     
}

export default MoviesList;
