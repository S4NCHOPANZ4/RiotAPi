import React, { useEffect, useState, useContext, useRef } from 'react'
import { useNavigate, useMatch  } from 'react-router-dom';
import { getPLayerByName } from '../Api-Calls'
import { AppContext } from '../AppContext';
import { useLocation } from 'react-router-dom';


import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import InventoryIcon from '@mui/icons-material/Inventory';
import LoopIcon from '@mui/icons-material/Loop';
import loltracker from '../assets/loltracker_whiite.svg'
import loltrackersml from '../assets/loltraker_sml.webp'

//css
import '../styles/Navbar/index.css'

const Navbar = () => {

  const { state, dispatch } = useContext(AppContext);
  const {statePlatform, dispatchPlatform} = useContext(AppContext);

  const location = useLocation();
  const navigate = useNavigate();
  
  const timerRef = useRef(null);
  
  const [pagValue, setPagValue] = useState('')
  const [isFocusedInput, setIsFocusedInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true)
  const [recomendations, setRecomendations] = useState(true)
  const [inputRes, setInputRes] = useState({})
  const [server, setServer] = useState({
    url: 'la1',
    name: 'LAN'
  })
  const [summonerName, setsummonerName] = useState({})
  
  let match = useMatch("/leaderboards/:cont/:region/:name");

  useEffect(()=>{
    const path = window.location.pathname;
    const segments = path.split('/');
    const value = segments[1];
    setPagValue(value)
    console.log(value);
  },[location])

  useEffect(() => {

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (inputValue !== '') {
      timerRef.current = setTimeout(() => {

        getPLayerByName(inputValue, server.url).then(res =>{
            console.log(res);
            setInputRes(res);
            setLoading(false)
            setLoading(false)
            setsummonerName(res.name)


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
    navigate('/summoner/'+statePlatform.value+'/'+statePlatform.server+'/'+summonerName);
    window.location.reload();
  }

  const changeServer = (url, name, value) =>{
      setServer({
          url,
          name
        })
    dispatchPlatform({type: 'NEW_PLATFORM', payload: {platform: name, value: value, server: url}});
  }

  return (
    <nav className='navBar_super'>
    <div className='navbar_ul'>
        <div className='navbar_img_container_big'
        onClick={()=>{
          navigate('/')
        }}>
          <img src={loltracker} alt="" />
        </div>
        <div className='navbar_img_container_sml' 
        onClick={()=>{
          navigate('/')
        }}
        >
          <img src={loltrackersml} alt="" />
        </div>


        <div className='navbar_inputcont'>
          <form 
          onSubmit={(e)=>{
          e.preventDefault();
          console.log(loading);
          setInputValue(inputValue);

      }}
      className='navBar_user_browser_input'>
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
              <div className='navbar_dropdown_search'>
              {loading?
                      (
                      <div className='dropdown_search_loading'>
                      <LoopIcon className='icon_loading'/>
                      <p>Searching... </p>
                      </div>)
                  :
                  inputRes.error? 
                    <div className='dropdown_search_error'>
                          <InventoryIcon className='icon_error'/>
                          <p>There are no data.</p>
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
              {/* {recomendations?
                  <div className='dropdown_searches_recomendations'>
                  <p className='recomendations_title'>Shortcut</p>
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
            
            
            
            } */}
                
              
              </div>   
          :
            <></>
          }   
     
          </form>
        </div>
    </div>
    <div className='nav_explorer'>
      <div className={(pagValue === '')? ' pag_button button_selected': 'pag_button'}
         onClick={()=>{
          navigate('/')
        }}>
        Home
      </div>
      <div className={(pagValue === 'leaderboards')? 'leaderboards_button pag_button button_selected': ' leaderboards_button pag_button'}
      onClick={()=>{
        navigate('leaderboards/am/la1/LAN')
      }}
      >
        Leaderboards
      </div>
    </div>
    </nav>
  )
}

export default Navbar