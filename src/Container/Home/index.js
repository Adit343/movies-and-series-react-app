// this component fetches and displays trending movies and TV shows from an API, handles pagination, and uses React's state and effect hooks to manage data retrieval and updates.


import  React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import CardMoviesComponents from '../../Components/CardMovies';
import PaginationComponent from '../../Components/Pagination';

const  HomeContainer = ()=>{

    //this state variable will hold the data retrieved from API
    const [content, setContent] = useState([]);

    //it tracks the current page number of the data being displayed
    const [pageno, setPageno] = useState(1)

    //this state variable stores the total no of pages available for pagination
    const [paginationno, setPaginationno] = useState(0)

    //this will fetch from .env file and store in an API key variable 
    const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE;


    
    const GetDataTrending = async ()=>{


        //retrieved data is stored in the 'content' state variable and the 'paginationno' state variable is updated with total no of pages available 
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${pageno}`)
        setContent(data.results);
        setPaginationno(data.total_pages);
    }

    //fetch and set intial data 
    useEffect(()=>{
        console.log('Trending Component did mount');
        GetDataTrending();
        //eslint-disable-next-line
    }, [])

    const handleClick = (number)=>{
        setPageno(number);
    }
    

    //this useEffect is for when the 'pageno' state variable.when 'pageno' changes it calls 'GetDataTrending' to fetch data for the new page
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
                            <h1 className='txtCenter'>Top Trending </h1>
                            <h3 className='txtCenter'>Tv and Movie's</h3>
                        </section>
                    </Col>
                    {
                        content && content.length > 0 ? content.map((item, index)=>{
                            return (<CardMoviesComponents key={index} data={item} />)
                        }) : 'Loading ....'
                    }


                    {/* if there is more than one page it renders a pagination component to navigate between pages */}
                {
                    paginationno && paginationno > 1 ? <PaginationComponent maxnum={paginationno} activenum={pageno} handleClick={handleClick}/> : ''
                }
                    
                </Row>
            </Container>
        </main>
    )
}

export default HomeContainer;