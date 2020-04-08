import React, { useContext } from 'react';
import { READ_ALL_RANGES, store} from "../StateProvider"
import { toast } from 'react-toastify';
const Input = ({tokenId}) => {
    const context = useContext(store);
    const payload ={
        tokenId: tokenId,
        from:context.state.from,
        to:context.state.to
    }
    const setTokenId = (value) => {
        payload.tokenId = value;
        context.dispatch({ type: READ_ALL_RANGES, tokenId : value, from: payload.from , to: payload.to })
    }
    const setDateFrom = (value) => {
        payload.from = value;
    }
    const setDateTo = (value) => {
        payload.to = value;
    }
    const checkValid = () => {
        var url = new URL("http://localhost:3001/api/isTimeValid");
        payload.tokenId && url.searchParams.append("tokenId" , payload.tokenId);
        fetch(url).then(response => {
            if(response.ok){
                toast.success("Pass");
            }else{
                toast.error("Don`t Pass");
            }
        })
        };
    
    const save = async(payload) => {
        var url = new URL("http://localhost:3001/api/save/");
        payload.tokenId && url.searchParams.append("tokenId" , payload.tokenId);
        payload.from && url.searchParams.append("from" , payload.from); 
        payload.to && url.searchParams.append("to" , payload.to);
        fetch(url).then(response => {
            if(response.ok){
                toast.success("Saved");
                }else{
                    toast.error("Error");
                    }
                }
                )
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
                <input type="button" value="check Id" onClick={e => checkValid()}/>
                </div>      
                )
            }
            
            
            export default Input;