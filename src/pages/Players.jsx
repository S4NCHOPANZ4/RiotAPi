import React, { useEffect, useState } from 'react'
import { useLocation, useMatch, useNavigate} from 'react-router-dom';
import { getLeaderboars, getPLayerByName } from '../Api-Calls'

//MUI
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
//css
import '../styles/Leadderborads/index.css'
import Footer from '../components/Footer';

const Players = () => {
  const navigate = useNavigate();
  
  let match = useMatch("/leaderboards/:cont/:region/:name");
  let cont = match.params.cont;
  let region = match.params.region;
  let name = match.params.name;

  const [leaderdoard , setLeaderboars] = useState([])
  const [topPlayers , setTopPlayers] = useState([])
  const [minRank, setMinRank] = useState(4)
  const [maxRank, setMaxRank] = useState(30)
  const [server, setServer] = useState({server: region, serverName: name, continent: cont})
  const [loading, setLoading] = useState(true)
  const servers = [
  {server: 'la1', serverName: 'LAN', continet: 'am'},
  {server: 'la2', serverName: 'LAS', continet: 'am'},
  {server: 'na1', serverName: 'NA', continet: 'am'},
  {server: 'br1', serverName: 'BR', continet: 'am'},
  {server: 'eun1', serverName: 'EUN', continet: 'eu'},
  {server: 'euw1', serverName: 'EUW', continet: 'eu'}
  ]




  useEffect(()=>{
    setLoading(true)

    getLeaderboars(server.server).then((res)=>{
      const sortedPlayers = res.entries.sort((p1, p2) => p2.leaguePoints - p1.leaguePoints);
      
      setLeaderboars(sortedPlayers)
      const topPlayersPre = sortedPlayers.slice(0,4)

      Promise.all(
      topPlayersPre.map((player, index)=>{
        return getPLayerByName(player.summonerName, server.server).then(res =>{
            if(res === 'err'){
              navigate('/staySafe/overflow')
            }
            return {summoner: res, rank: topPlayersPre[index]}
        })  
      })
      ).then((res) =>{
     
        setLoading(false)
        setTopPlayers(res)

      })  
    })
  },[server])

  // const preList = leaderdoard.slice(4, 30);
  // console.log(preList);
  // setLeaderboardList(preList);

  const getWinratePer = (wins, losses) =>{
    const games = wins + losses
    return  Math.floor((wins * 100)/games)
  }
  const setNewServer = (name, serv, continent) =>{
    setServer({server: serv, serverName: name, continent: continent})
    navigate('/leaderboards/'+continent+'/'+serv+'/'+name)
  }
  const gotoProfile = (summonerName, server, continent) =>{
    navigate('/summoner/'+continent+'/'+server+'/'+summonerName)
    window.location.reload()
  } 
  const fixMax = () =>{
    if (maxRank >= 200){
      return
    } 
    setMaxRank(maxRank + 30)
    setMinRank(maxRank)
  }
  const fixMin = ()=>{
    if ((minRank - 30) <= 0){
      setMinRank(4)
      setMaxRank(30)
      return
    } 
    else{
      setMinRank(minRank - 30)
      setMaxRank(minRank)
  
    }
    
  }


  return (


    <>
    {loading? 
    <div className='leaderboard_loading'>
      <div className="loader"></div>
    </div>
    : 
    <div className='leadderboards_super'>
    {
    (leaderdoard.length > 10 && topPlayers.length > 0)&&
    (    
    <div className='leaderboards_top4'>

      <div className='top_0'>
        <div className='select_server'>
          <p className='selected_server'>{server.serverName}</p>
          <ArrowDropDownIcon className='icon'/>
          <div className='servers'>
            {servers.map((server, index)=>{
              return(
                <p key={index} className='server_display' onClick={() => setNewServer(server.serverName, server.server,server.continet)}>{server.serverName}</p>
              )
            })}
          </div>
        </div>
          <div className='top_0_crown'>
              <h1>1</h1>
          </div>
         <div className='imgContainer_top0'>
             <img src={"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/"+ topPlayers[0].summoner.profileIconId +".png"} alt="" />
         </div>
         <div className='top_0_data'>
            <p 
            onClick={()=>{gotoProfile(leaderdoard[0].summonerName, server.server, server.continent)}}
            className='top_0_summonerName'>{leaderdoard[0].summonerName} <span className='lps'>{topPlayers[0].rank.leaguePoints} LP</span></p>
            <div className='top_0_winrate'>
              <div className='top_0_winrate_tier'>
                <img src="https://raw.communitydragon.org/13.9/plugins/rcp-fe-lol-shared-components/global/default/images/challenger.png" alt="" />
              </div>
              <div className='top_0_winrate_side'>
                  <p className='top_0_winrate_stats'>
                      <span className='top_0_winrate_per'> 
                      {getWinratePer(topPlayers[0].rank.wins, topPlayers[0].rank.losses)}%
                      </span>
                      /
                      {topPlayers[0].rank.wins + topPlayers[0].rank.losses} games
                      </p>
                    <div className='top_0_winrateBar'>
                        <div className='lower_bar'>
                          <div className='upper_bar' style={{width: `${getWinratePer(topPlayers[0].rank.wins, topPlayers[0].rank.losses)}%`}}></div>
                        </div>
                    </div>
              </div>
            </div>
         </div>
      </div>
      <div className='sub_top'>
          {topPlayers.map((plyr, index)=>{
            if(index === 0){
              return null
            }
              else{
                return(
                  <div key={index} className={`${'top_'+index} sub_top_card`}>
                    <div className='sub_card_topSide'>
                      <p className={`sub_card_rank ${'rank'+index+1}`}>{index+1}</p>
                      <div className='imgContainer'>
                        <img src={"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/"+ plyr.summoner.profileIconId +".png"} alt="" />
                      </div>
                      <div className='sub_card_lower'>
                        <p 
                        onClick={()=>{gotoProfile(plyr.summoner.name, server.server, server.continent)}}
                        className='sub_card_summonerName'>{plyr.summoner.name}</p>
                        <p className='subcard_specs'> 
                        <span className='subcard_winratio'>{getWinratePer(plyr.rank.wins, plyr.rank.losses)}% </span> 
                        <span className='bar'>/</span> 
                        <span className='subcard_games'>{plyr.rank.wins+plyr.rank.losses} games</span></p>
                        <div className='lower_card_lowerbar'>
                          <div className='lower_card_upperbar' style={{width: `${getWinratePer(plyr.rank.wins, plyr.rank.losses)}%`}}></div>
                        </div>
                    </div>
                    </div>
                    <div className='sub_card_midSide'>
                      <div className='midSide_img_container'>
                          <img src="https://raw.communitydragon.org/13.9/plugins/rcp-fe-lol-shared-components/global/default/images/challenger.png" alt="" />
                      </div>
                      <p className='midSide_elo'> 
                      <span className='rank'>Challenger</span> 
                      <span className='bar'>/</span> 
                      <span className='elo_points'>{plyr.rank.leaguePoints} LP</span></p>
                    </div>
                  
             
                </div>
                )
              }
            })
          }
      </div>
   
    </div>
    )
    }
    <div className='leaderboards_pagination'>
      <div className='pag_container'>
        <button onClick={fixMin}>
          <KeyboardArrowLeftIcon className='icon'/>
        </button>
        <button onClick={fixMax}>
          <KeyboardArrowRightIcon className='icon'/>
        </button>
      </div>
    </div>
    <div className='leaderboards_table'> 
        {leaderdoard.slice(minRank, maxRank).map((elemento, index) => (
          <div key={index}   
          onClick={()=> gotoProfile(elemento.summonerName, server.server, server.continent)}
          className={(index%2 === 0)? 'leaderboards_item pair_item': 'leaderboards_item even_item'}  >
            <p className='item_summoner_rank'>{index+minRank+1}</p>
            <p className='item_summoner_name'>{elemento.summonerName}</p>
            <p className='item_summoner_lp'>{elemento.leaguePoints} LP</p>
            <div className='item_summoner_winratio'>
              <p><span className={(getWinratePer(elemento.wins, elemento.losses) >= 60)?
              'winratrio_per per_positive':
              'winratrio_per'
              }>{getWinratePer(elemento.wins, elemento.losses)}%</span> <span className='winratio_wins winratio_stat'>{elemento.wins}W</span> <span className='winratio_losses winratio_stat'>{elemento.losses}L</span></p>
              <div className='winratio_lower_bar'>
                <div className='winratio_upper_bar' style={{width: `${getWinratePer(elemento.wins, elemento.losses)}%`}}></div>
              </div>
            </div>
          </div>
        ))}
    </div>
    <div className='leaderboards_pagination'>
      <div className='pag_container'>
        <button onClick={fixMin}>
          <KeyboardArrowLeftIcon className='icon'/>
        </button>
        <button  onClick={fixMax}>
          <KeyboardArrowRightIcon className='icon'/>
        </button>
      </div>
    </div>
  

  </div>
    
    
    }
   <Footer/>
    </>

  )
}

export default Players