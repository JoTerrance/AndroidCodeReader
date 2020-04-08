import React, { useContext } from 'react';
import { READ_ALL_RANGES, store} from "../StateProvider"
const Input = ({tokenId}) => {
    const context = useContext(store);
    const payload ={
        tokenId: tokenId,
        from:undefined,
        to:undefined
    }
    const setTokenId = (value) => {
        payload.tokenId = value;
        context.dispatch({ type: READ_ALL_RANGES, tokenId : value });
        
    }
    const setDateFrom = (value) => {
        payload.from = value;
    }
    const setDateTo = (value) => {
        payload.to = value;
    }

    const save = async(payload) => {
        var url = new URL("http://localhost:3001/api/save/");
        payload.tokenId && url.searchParams.append("tokenId" , payload.tokenId);
        payload.from && url.searchParams.append("from" , payload.from); 
        payload.to && url.searchParams.append("to" , payload.to);
        fetch(url).then(response => console.log("saved"))
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(`Submitting Name ${payload}`)
        save(payload);
        //context.dispatch({ type: READ_ALL_RANGES, tokenId: payload.tokenId });
    }
    return(
        <div>
            
            <form onSubmit={handleSubmit}>
                <input name="token" type="text" onChange={e => setTokenId(e.target.value)}></input>
                <input name="from" type="time" min="08:00" max="14:00" onChange={e => setDateFrom(e.target.value)}></input>
                <input name="to" type="time" min="08:00" max="14:00" onChange={e => setDateTo(e.target.value)}></input>
                <input type="submit" value="save"/>
            </form>
        </div>      
        )
    }
    
    
    export default Input;