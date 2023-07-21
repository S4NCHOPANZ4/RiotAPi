import React, { useEffect, useState, useContext }  from 'react'
import { useNavigate  } from 'react-router-dom';
import { useLocation, useMatch } from 'react-router-dom';

import MatchMini from '../components/MatchMini'
import { AppContext } from '../AppContext';
import { getMatchIdsByPuuid, getAccountSpecs, getPLayerByName } from '../Api-Calls'
import AccountStats from '../components/AccountStats';
import TopData from '../components/TopData';
import WinRate from '../components/WinRate';

import '../styles/Profile/index.css'
import Footer from '../components/Footer';

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const { state, dispatch } = useContext(AppContext);
    
    const [matches, setMatches] = useState([]);
    const [stats, setStats]  = useState();
    const [loaded, setLoaded] = useState(false)
    const [params, setParams] = useState()

    let match = useMatch("/summoner/:cont/:region/:username");
    let cont = match.params.cont;
    let region = match.params.region;
    let username = match.params.username;


async function data_fetch(){
    try{
     
        getPLayerByName(params.username, params.region).then(res =>{
            if(res === 'err'){
                navigate('/staySafe/summonerErr')
                console.log('name');
                return
            }

            dispatch({ type: 'NEW_PROFILE', payload: res })
   
            getMatchIdsByPuuid(res.puuid, params.cont).then(res =>{
                if(res === 'err'){
                    navigate('/staySafe/overflow')
                }
                setMatches(res)
                setLoaded(true)
            })
            getAccountSpecs(res.id, params.region).then(res =>{
                if(res === 'err'){
                    navigate('/staySafe/summonerErr')
                }

                setStats(res)
            })
        })

       
    }catch(err){
        console.log('error fetching <Profile />');
    }
}


    
useEffect(() => {
    setParams({
        cont: cont,
        region: region,
        username: username
    })

}, [location]);

useEffect(()=>{
    setLoaded(false)
    data_fetch()
},[params])




  return (
      <div className='PROFILE_super'>

        <div>


        </div>
        {loaded? 
            <>
                <div className='profile_header'>
                <div className='profile_header_left'>
                    <div className='profile_header_pfp_container'>
                        <img src={"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/"+ state.profileIconId +".png"} 
                        alt="" />
                    </div>
                    <div className='profile_header_general_info'>
                        <p className='profile_header_sumoner_name'>{state.name}</p>
                        <p className='profile_header_sumoner_level'>lvl {state.summonerLevel}</p>
                    </div>
                </div>
                <div className='profile_header_rigth'>
                    <p className='profile_header_ladder_rank'></p>
                </div>
            </div>
            <div className='profile_body'>
                <div className='profile_body_left'>
                    {stats? <AccountStats stats={stats} />:
                    <div className='loading_accStats'>
                    </div>
                    }
                    {
                    matches.length>0? 
                    <TopData data={matches} puuid={state.puuid}/>
                    :
                    <div className='loading_matches'>
                    </div>
                    }       
    
                   
                </div>
                <div className='profile_body_rigth'>
                    {matches.length>0? 
                    <WinRate data={matches} puuid={state.puuid}/>
                    :
                    <div className='loading_winrate'>
                    </div>
                    }
                    
                    {
                    matches.length>0?
                    matches.map((match, index)=>{
                        return (
                            <div key={index}>
                                <MatchMini 
                                gameMode={match.info.queueId} 
                                gameDuration={match.info.gameDuration} 
                                participants={match.info.participants}
                                puuid={state.puuid}
                                timeStamp={match.info.gameEndTimestamp}
                                visionScore={match.info.visionScore}
                                />
                            </div>
                        )
                    }): 
                    <div className='loading_matchmini'>
                    </div>
                    }
                </div>
            
            </div>
            </>
            
            : 
            <div className='profile_loading_super'>
                <div className='loader'></div>
            </div>
    
        }
        <Footer/>
    </div>
  )
}

export default Profile