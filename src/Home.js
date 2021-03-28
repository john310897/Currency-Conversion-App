import React,{useEffect, useState,useRef} from 'react';
import './Home.css';
import Axios from 'axios';
const Home = () => {

    useEffect(()=>{
        fetchdata();
    },[])

    const [currency,setcurrency]=useState([]);
    const [result,setresult]=useState(0);

    // fetching the data
    const fetchdata=async()=>{
        try{
        const result=await Axios.get('http://data.fixer.io/api/latest?access_key=7710d67e7af884c92e3dbaaa7abc1151');
        setcurrency(result.data.rates);
        }catch(err){
            alert('Unable to access api/Please recheck the network');
        }
    }

    // accessing input
    const input=useRef();
    const sc=useRef();
    const dc=useRef();
    
    // conversion of currency
    const convert=()=>{
        if(input.current.value===""){
            alert('please enter amount');
        }
        else if(sc.current.value==="" || dc.current.value===""){
            alert('unable to access the API, please check the network/try again');
        }
        else{
            const num=(dc.current.value/sc.current.value)*input.current.value;
            const conversion_result=num+" "+dc.current.options[dc.current.selectedIndex].text;
            setresult(conversion_result);
        }
    }

    // module design
    return (
        <div className='home_section'>
            <h2>Currency Coversion Application</h2>
        <div className='home_module'>
            <div className='result_box'>
                <input type='text' className='result_field' value={result} readOnly/>
            </div>
            <div className='currency_converter_box'>
                <div className='input_box'>
                    <input type='number' className='input_field' ref={input} placeholder='Enter amount'/>
                </div>
                <div className='source_cur'>
                    
                    <select className='input_field' ref={sc}>
                        {
                         Object.keys(currency).map((value,index)=>
                         <option key={index} value={currency[value]}>{value}</option>
                         )
                        }
                    </select>
                </div>
                <p> &#8645;</p>
                <div className='target_cur'>
                <select className='input_field' ref={dc}>
                    {
                         Object.keys(currency).map((value,index)=>
                         <option key={index} value={currency[value]}>{value}</option>
                         )
                    }
                        
                    </select>
                </div>
            </div>
            <div className='button_box'>
                <button onClick={convert}>Convert</button>
            </div>
        </div>
        </div>
    );
};

export default Home;