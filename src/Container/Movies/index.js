import  React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import CardMoviesComponents from '../../Components/CardMovies';
import PaginationComponent from '../../Components/Pagination';


const  MoviesContainer = ()=>{
    const [content, setContent] = useState([]);


    const [pageno, setPageno] = useState(1)
    const [paginationno, setPaginationno] = useState(0)
    const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE;

    
    const GetDataTrending = async ()=>{
        const {data}=await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${pageno}&languge=en-US`)
        setContent(data.results);
        setPaginationno(data.total_pages);
    }

    useEffect(()=>{
        console.log('Trending Component did mount');
        GetDataTrending();
        //eslint-disable-next-line
    }, [])

    useEffect(()=>{
        GetDataTrending();
        //eslint-disable-next-line
    }, [pageno])

    const handleClick = (number)=>{
        setPageno(number);
    }
    useEffect(()=>{
        console.log('Trending Component didupdate mount');
        GetDataTrending();
        //eslint-disable-next-line
    }, [pageno])
    return (
        <main className='homePage'>
            <Container>
                <Row>
                    <Col className='col-12'>
                        <section>
                            <h1 className='txtCenter'>Top Trending Movies</h1>
                            <h3 className='txtCenter'> For You</h3>
                        </section>
                    </Col>
                
                
                   
                                {
                                    content && content.length > 0 ? content.map((item, index)=>{
                                        return (<CardMoviesComponents key={index} data={item} mediaType="movie"/>)
                                    }) : 'Loading ....'
                                }

                            {
                                paginationno && paginationno > 1 ? <PaginationComponent maxnum={paginationno} activenum={pageno} handleClick={handleClick}/> : ''
                            }
                        
                    
                </Row>
            </Container>
        </main>
    )
}

export default MoviesContainer;