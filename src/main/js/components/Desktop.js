import RangeList from "./RangeList"
import InputTable from "./InputTable"
import React, { useContext, useEffect } from 'react';
import { store, READ_ALL_RANGES } from "../StateProvider"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Desktop = (props) => {
    const context = useContext(store);
    const callReadAll = async(tokenId) => {
        let url = new URL("http://localhost:3001/api/readAll");
        tokenId && url.searchParams.append("tokenId" , tokenId);
        let ranges = [];
        await fetch(url)
        .then(response => {
            if(response.ok)
                return response.json();
        })
        .then(data =>  {
            console.log(data);
            context.dispatch({type: READ_ALL_RANGES, tokenId: tokenId, ranges:data })
            ranges = data;
        }).catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
        });
        return ranges;
    };
    useEffect(() => {
        callReadAll(context.state.tokenId)
    }, [context.state.tokenId])
    return (
        <div class="container">
        <InputTable tokenId={context.state.tokenId}/>
        <RangeList items={context.state.ranges} /> 
        <ToastContainer autoClose={1000}  position={toast.POSITION.BOTTOM_LEFT}/>
        </div>
        ); 
    }
    export default Desktop;
