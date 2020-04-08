import Range from "./Range" 
import React, {useState} from 'react';
const RangeList = ({items}) => {
    console.log(items);
    let [rangeItems, setRangeItems] = useState([]);
    
    const paint = [];
    if(items!==undefined){
        items.map((item, index )=> {
            paint.push(
                <Range key={index} id={item.id} from={item.fromTime} to={item.toTime} />
                )      
            }); 
        }
        return(
            <>
            {paint}
            </>
            )
        } 
        export default RangeList;