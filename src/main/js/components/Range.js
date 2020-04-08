import React, { useContext } from 'react';
import { store } from "../StateProvider"
import { READ_ALL_RANGES } from "../StateProvider"
const Range = ({id, from, to}) => {
    const context = useContext(store);
    const deleteCall = async (id) => {
        var url = new URL("http://localhost:3001/api/delete");
        id && url.searchParams.append("id" , id);
        await fetch(url).then(response => console.log("deleted: "+id))
        context.dispatch({ type: READ_ALL_RANGES, tokenId: context.state.tokenId});
    };
    return(
        <div class="row">
            <div class="col-2">{id}</div>
            <div class="col-4">{from}</div>
            <div class="col-4">{to}</div>
            <div class="col-2">
            <button onClick={e => deleteCall(id)}>delete</button>
            </div>
        </div>
        )
    } 
    export default Range;