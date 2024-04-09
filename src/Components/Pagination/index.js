import React from "react"
import ReactPaginate from "react-paginate";
import './style.css';
const PaginationComponent = (props)=>{
    const {maxnum, activenum, handleClick} = props
    const forcePageActive = parseInt(activenum) - 1;
    const handlePageClick = (e)=>{

        //this tells which page was selected
        console.log('hello', e.selected)

        //indexing starts from 0 so 1 is added to the selected page
        let pageNo = parseInt(e.selected) + 1
        handleClick(pageNo);

        //scrolls to top of page when new page is opened from pagination 
        window.scrollTo(0, 0)
    }
      
    
    return(
        <>
            <div className="paginationWap">
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    pageCount={maxnum}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                    renderOnZeroPageCount={null}
                    forcePage={forcePageActive}
                />
            </div>
        </>
    )
}

export  default PaginationComponent;