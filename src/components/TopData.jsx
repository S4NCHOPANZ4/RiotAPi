import React, { useEffect, useState } from 'react'
import '../styles/Profile/account_stats.css'

const TopData = ({data, puuid}) => {

    const [stats, setStats] = useState([])
    
    useEffect(()=>{
        const helper = {};
        let games = []
        data.map((item)=>{
            item.info.participants.map((participant)=>{
                if(participant.puuid === puuid){
                    games.push(participant)   
                }
            })  
        })
        games.forEach((objeto) => {
            const championName = objeto.championName;
            if (helper[championName]) {
              helper[championName].games++;
              helper[championName].deaths += objeto.deaths;
              helper[championName].assists += objeto.assists;
              helper[championName].kills += objeto.kills;
              helper[championName].kda += objeto.challenges.kda;
              helper[championName].cs += (objeto.neutralMinionsKilled + objeto.totalMinionsKilled);
              if(objeto.win){
                helper[championName].wins++;
              }
            } 
            
            else {
              helper[championName] = { 
                championName: championName,
                games: 1,
                deaths: objeto.deaths,
                assists: objeto.assists,
                kills: objeto.kills,
                kda: objeto.challenges.kda,
                wins: 0,
                cs: objeto.neutralMinionsKilled + objeto.totalMinionsKilled
              };
              if(objeto.win){
                helper[championName].wins += 1;
              }
            }
          });
          setStats(Object.values(helper));
          

    },[data])

  return (
    <div className='general-champ-stats_super'>
        {
        stats.length > 0 &&
        stats.map((stat)=>{
          console.log(stat);
          return(
          <div className='champ_stats' key={stat.championName}>
            <div className='champ_stats_i left'>
              <div className='img_champ-container'>
                <img 
                src={
                  (stat.championName === 'FiddleSticks')?
                  "http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/Fiddlesticks.png"
                  :
                  "http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/"+stat.championName+".png"} 
                alt="" />
              </div>  
              <div className='name_cs'>
                <h3>{stat.championName}</h3>  
                <p>{Math.floor(stat.cs/stat.games)} CS</p>
              </div>
            </div>
            <div className='champ_stats_i center'>
                <h4>{(stat.kda/stat.games).toFixed(1)} KDA</h4>
                <p>
                {(stat.kills/stat.games).toFixed(1)}
                /{(stat.deaths/stat.games).toFixed(1)}
                /{(stat.assists/stat.games).toFixed(1)}</p>
            </div>
            <div className='champ_stats_i right'>
                <h3>{((stat.wins*100)/stat.games).toFixed(1)}%</h3>
                <p>{stat.games} Played</p>
            </div>
            

          </div>
            )
        })}

    </div>
  )
}

export default TopData