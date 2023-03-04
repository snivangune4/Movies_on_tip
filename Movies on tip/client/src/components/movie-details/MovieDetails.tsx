import React, { useState, useEffect } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../../common/LoadingIndicator";
import IMovie from "../../models/Imovie";
import { LoadingStatus } from "../../models/types";
import { getMovieById } from "../../services/movies";



type Props = {  
};

const MovieDetails = ( props: Props) => {
    
    const { movieSection, id }= useParams() as any;

    const [status, setStatus ] = useState<LoadingStatus> ('LOADING');

    const [movie, setMovie ] = useState<IMovie | null> ( null );

    const [error, setError ] = useState<Error | null> ( null );

   
   useEffect ( 
        () => {
            const fetchMovie = async () => {
                try{
                    const data = await getMovieById (movieSection, parseInt(id));
                    setMovie (data);
                    setStatus('LOADED');
                }catch( error: any ){
                    setError( error );
                    setStatus("ERROR_LOADING");
                }
            };
            fetchMovie();
        }, [ ]
    );

    let el;

    switch( status ){
        case 'LOADING':
            el = (
                <LoadingIndicator 
                    size="large"
                    message="We are fetching details of Movie, please wait..."
                />
            );
        break;
        case 'LOADED':
            const {
                id,
                title,
                year,
                genres,
                ratings,
                poster,
                contentRating,
                duration,
                releaseDate,
                averageRating,
                originalTitle,
                storyline,
                actors,
                imdbRating,
                posterurl
            } = movie as IMovie;
            el = (
                <>
                    <Row>
                        <Col xs={12} lg={4}>
                            <img src={posterurl} alt={title} 
                            className="w-80"
                            />
                        </Col>
                        <Col xs={12} lg={8} className="my-2">
                            <h1>{title} ({year})</h1>
                            <Row className='my-2'>
                                <Col>
                                    <span>Imdb Rating: {imdbRating}</span> 
                                </Col>
                            </Row>
                            <Row className='my-2'>
                                <Col>
                                    Content Rating: {contentRating}
                                </Col>
                            </Row>
                            <Row className='my-2'>
                                <Col>
                                    Average Rating: {averageRating}
                                </Col>
                            </Row>
                            <Row className='my-2'>
                                <Col>
                                    Duration: {duration}
                                </Col>
                            </Row>
                            <Row className='my-2'>
                                <Col>
                                    Generes: {
                                        genres.map(
                                            genere => (
                                                `${genere},`
                                            )
                                        )
                                    }
                                </Col>
                            </Row>
                            <Row className='my-2'>
                                <Col>
                                    Actors: {
                                        actors.map(
                                            actor => (
                                                `${actor},`
                                            )
                                        )
                                    }
                                </Col>
                            </Row>
                            <Row className='my-2'>
                                <Col>
                                    Release Date: {releaseDate}
                                </Col>
                            </Row>
                            <Row className='my-2'>
                                <Col>
                                    StoryLine: {storyline}
                                </Col>
                            </Row>
                        </Col>
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

export default MovieDetails;