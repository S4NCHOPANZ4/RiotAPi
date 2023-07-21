import React, { useEffect, useState } from 'react'
import '../styles/Profile/account_stats.css'

const WinRate = ({ data, puuid}) => {

    const [winrate, setWinrate] = useState([])
    const [lanes, setLanes] = useState([])

    useEffect(()=>{
        const helper_lanes = {
            TOP: {
                role: "TOP",
                counter: 0
            },
            JUNGLE: {
                role: "JUNGLE",
                counter: 0
            },
            MIDDLE: {
                role: "MIDDLE",
                counter: 0
            },
            BOTTOM: {
                role: "BOTTOM",
                counter: 0
            },
            UTILITY: {
                role: "UTILITY",
                counter: 0
            },
        };
        const helper_winratio = {
            wins: 0,
            games: 0,
            kda: 0,
            killP: 0,
            kills: 0,
            deaths: 0,
            assists: 0
        }
        
        let games = []
        data.map((item)=>{
            item.info.participants.map((participant)=>{
                if(participant.puuid === puuid){
                    games.push(participant)   
                }
            })  
        })
        games.forEach((objeto) => {
            const role = objeto.teamPosition
            if(helper_lanes[role]){
                helper_lanes[role].counter ++;
            }

          });
    
          setLanes(Object.values(helper_lanes))
          games.map((game)=>{
            helper_winratio.wins += game.win
            helper_winratio.games ++
            helper_winratio.kda += game.challenges?.kda
            helper_winratio.kills += game.kills
            helper_winratio.deaths += game.deaths
            helper_winratio.assists += game.assists
            if(game.challenges?.killParticipation){
                helper_winratio.killP +=  game.challenges?.killParticipation

            }
          })
        setWinrate(helper_winratio);
        setLanes(Object.values(helper_lanes));
        console.log(lanes);

    },[data])
    const getGraphicWinrate = (wins, games) =>{
        return Math.floor((((wins * 100)/games)*220)/100)
    }
    const getLanesImg = (lane) =>{
        switch(lane){
            case "TOP":
                return 'top'
            case "JUNGLE":
                return 'jungle'
            case "MIDDLE":
                return 'mid'
            case "BOTTOM":
                return 'adc'
            case "UTILITY":
                return 'support'
        }

    }
    const getLanesHeight = (lane, games) =>{
        console.log(Math.floor(lane * 100)/games);
        return (Math.floor(lane * 100)/games)
    }

  return (
    <div className='winrate_super'>
        <div className="progress-bar">
            <svg className="progress-circle" viewBox="0 0 100 100">
                <circle className="progress-background" cx="50" cy="50" r="35"></circle>
                <circle className="progress" cx="50" cy="50" r="35" style={{strokeDasharray: `${220-(getGraphicWinrate(winrate.wins, winrate.games))} 220`}}></circle>
            </svg>
            <h1 className='winrate_per'>{((winrate.wins*100)/winrate.games).toFixed(1)}%</h1>
        </div>
        <div className='winrate_graphic-stats'>
            <p className='winrate_wl'>{winrate.wins}W {winrate.games - winrate.wins}L</p>
            <p className='winrate_kda'>{(winrate.kills/winrate.games).toFixed(1)}
            /<span className='deaths'>{(winrate.deaths/winrate.games).toFixed(1)}</span>
            /{(winrate.assists/winrate.games).toFixed(1)}</p>
            <p className='winrate_kda-score'>{(winrate.kda/winrate.games).toFixed(1)} KDA</p>
            <p className='winrate_killp'>P/Kill {((winrate.killP/winrate.games)*100).toFixed(1)}%</p>
        </div>
        <div className='winrate_lanes_super'>
            {lanes.map((lane)=>{
                return (
                <div className='winrate_lanes' key={lane.role}>
                    <div className='winrate_lanes_bar'>
                        <div className='winrate_lanes_bar_over' style={{height: `${getLanesHeight(lane.counter, winrate.games)+"%"}`}}></div>
                    </div>
                    <div className='winrate_lanes_imgContainer'>    
                        <img src={"https://s-lol-web.op.gg/images/icon/icon-position-"+getLanesImg(lane.role)+".svg?v=1685352893390"} alt="" />
                    </div>
                </div>
                )
               
            })}
        </div>
    </div>
  )
}

export default WinRate