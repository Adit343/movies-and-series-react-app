import  React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import CardMoviesComponents from '../../Components/CardMovies';
import PaginationComponent from '../../Components/Pagination';
import SearchBarCardComponents from '../../Components/SearchBox';

const  SearchContainer = ()=>{

    //this state variable will hold the data retrieved from API
    const [content, setContent] = useState([]);

    //it tracks the current page number of the data being displayed.it is intially set to 1
    const [pageno, setPageno] = useState(1);

    //this state variable stores the total no of pages available for pagination
    const [paginationno, setPaginationno] = useState(0);

    const [searchValue, setSearchValue] = useState('crime');
    const [typeValue, setTypeValue] = useState('movie');
    const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE;

    
    
    const GetDataTrending = async ()=>{
        
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/${typeValue}?api_key=${API_KEY}&page=${pageno}&language=en-US&query=${searchValue}&include_adult=false`);

        
        //retrieved data is stored in the 'content' state variable and the 'paginationno' state variable is updated with total no of pages available 
        console.log('data', data.results)
        setContent(data.results);
        setPaginationno(data.total_pages);
    }

    useEffect(()=>{
        console.log('Trending Component did mount');
        GetDataTrending();
        //eslint-disable-next-line
    }, [])

    const fetchDataQuery = ()=>{
        GetDataTrending()
    }
    
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
                            <h1 className='txtCenter'>Search Movies /  TV Series</h1>
                            <h3 className='txtCenter'> For You</h3>
                            <SearchBarCardComponents 
                                searchValue={searchValue}
                                setSearchValue={(value)=>{setSearchValue(value)}}
                                typeValue={typeValue}
                                setTypeValue={(value)=>{setTypeValue(value)}}
                                filterData={fetchDataQuery} />
                        </section>
                    </Col>
                </Row>
                <Row>
                    
                    <Col className='col-12'>
                        <Row>
                                {

                                // This is a conditional rendering statement. It checks if the content array has data. If it does, it maps over the content array and renders CardMoviesComponents for each item. If content is empty, it displays "Loading ...." indicating that data is being fetched.
                                    content && content.length > 0 ? content.map((item, index)=>{
                                        return (<CardMoviesComponents key={index} data={item} mediaType={typeValue}/>)
                                    }) : 'Loading ....'
                                }

                            {
                                paginationno && paginationno > 1 ? <PaginationComponent maxnum={paginationno} activenum={pageno} handleClick={handleClick}/> : ''
                            }
                        </Row>
                    </Col>
                    
                </Row>
            </Container>
        </main>
    )
}

export default SearchContainer;