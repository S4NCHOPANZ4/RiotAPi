import React, { useEffect, useState } from 'react'
import '../styles/Profile/account_stats.css'

const AccountStats = ({stats}) => {
  const [flex, setFlex] = useState({})
  const [soloq, setSoloq] = useState({})
  const [loadded, setLoadded] = useState(true)

 

  useEffect(() =>{
    stats.map((stat)=>{
        if(stat.queueType === 'RANKED_SOLO_5x5'){
          setSoloq(stat)
        }
        else if(stat.queueType === "RANKED_FLEX_SR"){
          setFlex(stat)

        }
    })
    console.log(stats);

  },[stats])

  const toLoweCaseF = (txt) =>{
    if(txt){
      return txt.toLowerCase()
    }
    return 'unranked'
  }
  const getWinrate = (wins, losses) =>{
    const games = wins + losses
    return ((wins * 100)/games).toFixed(1)
  }


  return (
   
    <div className='account-stats_super'>
     <div className='elo_items soloq'>
        <div className='elo_img-container soloq'>
          <img src={"https://raw.communitydragon.org/13.9/plugins/rcp-fe-lol-shared-components/global/default/images/"+toLoweCaseF(soloq.tier)+".png"} alt="" />
  
        </div>
        <div className='account_queue_stats'>
            <div className='queue_stats'>
              <h3>{soloq.tier} {soloq.rank}</h3>
              <h2>Ranked Solo</h2>
              <p>{soloq.leaguePoints} LP</p>
            </div>
            <div className='queue_winratio'>
              <p>{soloq.wins}W {soloq.losses}L</p>
              <p>Win Rate {getWinrate(soloq.wins, soloq.losses)}%</p>
            </div>
        </div>
      </div>
        <div className='elo_items flex'>
        <div className='elo_img-container '>
          <img src={"https://raw.communitydragon.org/13.9/plugins/rcp-fe-lol-shared-components/global/default/images/"+toLoweCaseF(flex.tier)+".png"} alt="" />
        </div>
        <div className='account_queue_stats'>
            <div className='queue_stats'>
              <h3>{flex.tier} {flex.rank}</h3>
              <h2>Ranked Flex</h2>
              <p>{flex.leaguePoints} LP</p>
            </div>
            <div className='queue_winratio'>
              <p>{flex.wins}W {flex.losses}L</p>
              <p>Win Rate {getWinrate(flex.wins, flex.losses)}%</p>
            </div>
        </div>
      </div>
     
    </div>

   
  )
}

export default AccountStats