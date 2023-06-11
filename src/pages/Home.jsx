import React, { useState ,useContext, useEffect, useRef } from 'react'
import { useNavigate  } from 'react-router-dom';
import { getPLayerByName } from '../Api-Calls'
import { AppContext } from '../AppContext';
import loltrcaker from  '../assets/loltracker.svg'

//MUI
import StarIcon from '@mui/icons-material/Star';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import InventoryIcon from '@mui/icons-material/Inventory';
import LoopIcon from '@mui/icons-material/Loop';

//CSS
import '../styles/Home/index.css'
import Footer from '../components/Footer';

const Home = () => {

  const { state, dispatch } = useContext(AppContext);
  const {statePlatform, dispatchPlatform} = useContext(AppContext);

  const navigate = useNavigate();
  
  const timerRef = useRef(null);
  
  const [isFocusedInput, setIsFocusedInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true)
  const [recomendations, setRecomendations] = useState(true)
  const [inputRes, setInputRes] = useState({})
  const [server, setServer] = useState({
    url: 'la1',
    name: 'LAN'
  })
  const [notFound, setNotFound] = useState(false)

  const shortCutSearches = [
    {
      name: 'Samikin',
      server: 'na1',
      region: 'am',
      serverName:'NA'
    },
    {
      name: 'Narukami',
      server: 'la1',
      region: 'am',
      serverName:'LAN'
    },
    {
      name: 'Kyrië',
      server: 'br1',
      region: 'am',
      serverName:'BR'
      
    }
  ]

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (inputValue !== '') {
      setNotFound(false)

      timerRef.current = setTimeout(() => {

        getPLayerByName(inputValue, server.url).then(res =>{

            console.log(res);
            setInputRes(res);
            setLoading(false)
            dispatch({ type: 'NEW_PROFILE', payload: res })
            setLoading(false)
            if(res === 'err'){
              setNotFound(true)
            }

        })
      }, 2000);
    }

    if(inputValue !== '') {
      setRecomendations(false)

    }
    else if (inputValue === '') {
      setRecomendations(true)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [inputValue]);

  const handleFocus = () => {
    setIsFocusedInput(true);
  };

  const handleBlur = () => {
    setTimeout(()=>{
        setIsFocusedInput(false);
    },[100])
  };

  const navigateProfile = () =>{
    navigate('/summoner/'+statePlatform.value+'/'+statePlatform.server+'/'+state.name);
  }

  const changeServer = (url, name, value) =>{
      setServer({
          url,
          name
        })
    dispatchPlatform({type: 'NEW_PLATFORM', payload: {platform: name, value: value, server: url}});
  }

  return (
    <>
    <div className='HOME_super'>
    <div className='home_icon_container'>
      <img src={loltrcaker} alt="" />
    </div>
    <form 
    onSubmit={(e)=>{
        e.preventDefault();
        console.log(loading);
        setInputValue(inputValue);

    }}
    className='HOME_user_browser_input'>
        <div className='server_selector'>
            <div className="dropdown_options_container">
                    <div className="dropbtn">{server.name}<ArrowDropDownIcon className='server_selector_icon'/></div>


                  <div className="dropdown_content_on">
                      <div className={(server.name === 'NA')? 'dropdown_option selected' : 'dropdown_option'}
                      onClick={()=> changeServer('na1', 'NA', 'am')}
                      ><p>NA</p></div>
                      <div className={(server.name === 'LAN')? 'dropdown_option selected' : 'dropdown_option'}
                      onClick={()=> changeServer('la1', 'LAN', 'am')}
                      ><p>LAN</p></div>
                      <div className={(server.name === 'LAS')? 'dropdown_option selected' : 'dropdown_option'}
                      onClick={()=> changeServer('la2', 'LAS', 'am')}
                      ><p>LAS</p></div>
                      <div className={(server.name === 'EUW')? 'dropdown_option selected' : 'dropdown_option'}
                      onClick={()=> changeServer('euw1', 'EUW', 'eu')}
                      ><p>EUW</p></div>
                      <div className={(server.name === 'EUN')? 'dropdown_option selected' : 'dropdown_option'}
                      onClick={()=> changeServer('eun1', 'EUN', 'eu')}
                      ><p>EUN</p></div>
                      <div className={(server.name === 'RU')? 'dropdown_option selected' : 'dropdown_option'}
                      onClick={()=> changeServer('ru', 'RU', 'eu')}
                      ><p>RU</p></div>
                      <div className={(server.name === 'BR1')? 'dropdown_option selected' : 'dropdown_option'}
                      onClick={()=> changeServer('br1', 'BR1', 'am')}
                      ><p>BR</p></div>
                </div>
             
            </div>
        </div>

        <input type="text" placeholder={`Summoner's name`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => {
                setInputValue(e.target.value);
                setLoading(true)

            }}
            />
        <button className='HOME_submit_button' type='submit'>
            <SearchIcon/>
        </button>
            
        {isFocusedInput? 
            <div className='dropdown_search'>
            {(inputValue === '')?
            <></>:
            (loading)?
              (
                <div className='dropdown_search_loading'>
                <LoopIcon className='icon_loading'/>
                <p>Searching... </p>
                </div>)
            :
            notFound? 
              <div className='dropdown_search_error'>
                <InventoryIcon className='icon_error'/> <span className='msg'>Summoner not found</span>
              </div>
            :

            
            <div className='dropdown_search_result' onClick={()=>{
                navigateProfile()
                }}>
                <div className='search_img_container'>
                    <img src={"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/"+ inputRes.profileIconId +".png"} alt="" />
                </div>
                <p> {inputRes.name} </p>
            </div> 
            } 
        
                
            
            {recomendations?
                <div className='dropdown_searches_recomendations'>
                <p className='recomendations_title'> <StarIcon className='icon'/>  Popular</p>
                {shortCutSearches.map((search)=>{
                  return(
                    <div 
                    onClick={()=>{
                      navigate('/summoner/'+search.region+'/'+search.server+'/'+search.name);
                    }}
                    className='dropdown_search_recomendation' key={search.name}>
                      <p className='recomendation_name'><span className='server'>{search.serverName}</span>{search.name}</p><SearchIcon className='recommendation_icon'/> 
                    </div>
                  )
                })}
              </div> :
              <></>
          
          
          
           }
              
            
            </div>   
        :
          <></>
        }   
     

    </form>

    </div>
    <div className='home_footer'>
      <Footer/>

    </div>
    </>
  )
}

export default Home