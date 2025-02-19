//this component is used within a large react application to display information about co-stars, and it utilizes the 'Alice Carousel' library to handle the carousel functionality.

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './style.css';
import {img_300, no_picture} from '../../Config';
const handleDragStart = (e) => e.preventDefault();


//data is an array of co-star information
function DarkVariantExample({data}) {

    
   
    //this object defines the responsiveness settings for the carousel.it specifies how many items to show at different screen widths
   const responsive = {
    0: {
        items: 1,
    },
    320: {
        items: 2,
    },
    640: {
        items: 3,
    },
    900: {
        items: 4,
    },
    1024: {
        items: 5
    },
    1280: {
        items: 6
    }
  }
  const items = data.map((item)=>{
    return(
        <div className="carouselItem">
            <img onDragStart={handleDragStart}  src={item.profile_path ? `${img_300}/${item.profile_path}`:no_picture} 
            alt={item.name} title={item.name} />
        
        <div className='carouselItemText'>
            <div>Name :- {item.name}</div>
            <div>Department :-  {item.known_for_department}</div>
        </div>
    </div>
   ) 
})
    return (
      <div className='myCarWrap'>
        <h2>Co-Star Informations</h2>
        <AliceCarousel 
        responsive={responsive}
        autoPlay={true}
        autoPlayInterval={5000}
        infinite={true}
        disableButtonsControls
        disableDotsControls
        mouseTracking 
        items={items} />
      </div>
    );
  }
  
  export default DarkVariantExample;