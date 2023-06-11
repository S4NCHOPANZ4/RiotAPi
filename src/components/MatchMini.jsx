import React, { useEffect, useState, useContext } from 'react'
import { useNavigate  } from 'react-router-dom';
import { getMatchIdsByPuuid, getAccountSpecs } from '../Api-Calls'
import { getPLayerByName } from '../Api-Calls'
import { AppContext } from '../AppContext';
import { useLocation, useMatch } from 'react-router-dom';


const MatchMini = ({gameMode, gameDuration,
    participants, puuid, timeStamp }) => {
    const [durationMin, setDurationMin] = useState()
    const [durationSeg, setDurationSeg] = useState()
    const [matchSpecs, setMatchSpecs] = useState({})
    const [lobby, setLobby] = useState([])

    const {statePlatform, dispatchPlatform} = useContext(AppContext);

    
    const navigate = useNavigate();

    let match = useMatch("/summoner/:cont/:region/:username");
    let cont = match.params.cont;
    let region = match.params.region;


    useEffect(() =>{
        const duration = gameDuration/60
        let playerInfo = {}
        let lobby = []

        setDurationMin(Math.trunc(duration))
        setDurationSeg(Math.floor((duration%1)*60))
        participants.map((participant)=>{

            if(participant.puuid == puuid){
                playerInfo = {
                    summonerName: participant.summonerName,
                    win: participant.win,
                    champion: participant.championName,
                    summoner1: participant.summoner1Id,
                    summoner2: participant.summoner2Id,
                    kills: participant.kills,
                    deaths: participant.deaths,
                    assists: participant.assists,
                    kda: participant.challenges.kda.toFixed(2),
                    cs: participant.neutralMinionsKilled + participant.totalMinionsKilled,
                    multikills: participant.largestMultiKill,
                    items: [participant.item0, participant.item1,
                            participant.item2, participant.item3,
                            participant.item4, participant.item5,
                            participant.item6
                        ],
                    killParticipation: participant.challenges.killParticipation,
                    visionScore: participant.visionScore,
                    rune1: participant.perks.styles[0].selections[0].perk,
                    rune2: participant.perks.styles[1].style
                }
            }

            lobby.push({champion: participant.championName, summonerName: participant.summonerName })

        })
        setMatchSpecs(playerInfo)
        setLobby(lobby)

    },[participants])

    const navigateProfile = (puuid) =>{
        navigate('/summoner?puuidL='+puuid);
      }

    const summonerSpell = (spellID) =>{
       const spellURL =  "http://ddragon.leagueoflegends.com/cdn/13.10.1/img/spell/"
   
       switch (spellID){
            case 4:
                return spellURL +'SummonerFlash.png';
            case 12:
                return spellURL +'SummonerTeleport.png';
            case 11:
                return spellURL +'SummonerSmite.png';
            case 14: 
                return spellURL +'SummonerDot.png';
            case 7:
                return spellURL +'SummonerHeal.png';
            case 6: 
                return spellURL +'SummonerHaste.png'; 
            case 3: 
                return spellURL +'SummonerExhaust.png'; 
            case 21: 
                return spellURL +'SummonerBarrier.png';
            case 1: 
                return spellURL +'SummonerCleanse.png';
            case 32:
                return spellURL +'SummonerSnowball.png';
            case 13:
                return spellURL +'SummonerMana.png';

            default: 
                console.log('err on <MatchMini /> "img not found"');
                break;
       }
    }
    const killingSpree = (kills) =>{
        switch(kills){
            case 2:
                return 'Double Kill';
            case 3: 
                return 'Triple Kill';
            case 4: 
                return 'Cuadra Kill';
            case 5:
                return 'Penta Kill';
            default: 
                return;
        }
    }
    const timeAgo = (timeStamp) =>{
        const now = Date.now(); 
        const diferenciaEnMilisegundos = now - timeStamp;
      
        const sec = Math.floor(diferenciaEnMilisegundos / 1000);
        const min = Math.floor(sec / 60);
        const hours = Math.floor(min / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 31);
      
        if (months > 0) {
          return `${months} months ago`;
        } else if (days > 0) {
          return `${days} days ago`;
        } else if (hours > 0) {
          return `${hours} hours ago`;
        } else if (min > 0) {
          return `${min} minutes ago`;
        } else {
          return `${sec} seconds ago`;
        }

    }
    const queueType = (queueID) =>{
        switch(queueID){
            case 830:
                return 'Tutorial';
            case 820:
                return 'Co-op vs AI';
            case 400:
                return 'Normal 5v5 Blind Pick';
            case 420:
                return 'Ranked Solo/Duo';
            case 440:
                return 'Ranked Flex';
            case 450:
                return 'ARAM';
            case 700: 
                return 'Clash';
            default:
                return 'Custom'

        }
    }
    const runesType = (rune) =>{
        if(rune <= 8021){
            switch(rune){
                case 8000:
                    return '7201_precision.png'
                case 8005:
                    return 'precision/presstheattack/presstheattack.png'
                case 8008: 
                    return 'precision/lethaltempo/lethaltempotemp.png'
                case 8010:
                    return 'precision/conqueror/conqueror.png'
                case 8021: 
                    return 'precision/fleetfootwork/fleetfootwork.png'
            }
        }
        else if (rune <= 8128){
            switch (rune) {
                case 8100:
                    return '7200_domination.png'
                case 8112:
                    return 'domination/electrocute/electrocute.png'
                case 8124:
                    return 'domination/predator/predator.png'
                case 8128:
                    return 'domination/darkharvest/darkharvest.png'
            }
        }
        else if(rune <= 8230){
            switch(rune){
                case 8200:
                    return '7202_sorcery.png'
                case 8214:
                    return 'sorcery/summonaery/summonaery.png'
                case 8229: 
                    return 'sorcery/arcanecomet/arcanecomet.png'
                case 8230:
                    return 'sorcery/phaserush/phaserush.png'
            }
        }
        else if (rune <= 8369){
            switch (rune) {
                case 8300:
                    return '7203_whimsy.png'
                case 8351:
                    return 'inspiration/glacialaugment/glacialaugment.png'
                case 8360:
                    return 'inspiration/unsealedspellbook/unsealedspellbook.png'
                case 8369: 
                    return 'inspiration/firststrike/firststrike.png'
            }
        }
        else if (rune <= 8465){
            switch (rune) {
                case 8400:
                    return '7204_resolve.png'
                case 8437:
                    return 'resolve/graspoftheundying/graspoftheundying.png'
                case 8439:
                    return 'resolve/veteranaftershock/veteranaftershock.png'
                case 8465:
                    return 'resolve/guardian/guardian.png'
            }
           
        }
        else if(rune === 9923){
            return 'domination/hailofblades/hailofblades.png'
        }
    }


  return (
    <div className={(durationMin > 3)?  (matchSpecs.win? 
    'profile_body_match victory_match' : 'profile_body_match defeat_match')
    : 'profile_body_match remake_match' }>
    <div className='profile_body_match_specs queue'>
        <p className={ (durationMin > 3)? (matchSpecs.win? 'queue_type type_victory':
        'queue_type type_defeat'): 'queue_type type_remake'}
        >{queueType(gameMode)}</p>
        <p className='queue_result' >{(durationMin > 3)?  (matchSpecs.win? 
        'Victory' : 'Defeat')
        : 'Remake'}</p>
        <p className='queue_match_duration'>{durationMin}m {durationSeg}s</p>

    </div>
    <div className='profile_body_match_specs champion'>
        <p className={ (durationMin > 3)? (matchSpecs.win? 'queue_type_mini type_victory':
                'queue_type_mini type_defeat'): 'queue_type_mini type_remake'}
            >{queueType(gameMode)}</p>
        <div className='champion_champion'>
           
            <div className='champion-spells'>
        
                <div className='champion_icon'>
                    {(matchSpecs.champion == "FiddleSticks")? 
                    <img src={"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/Fiddlesticks.png"} alt="xd" />
                    : 
                    <img src={"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/"+ matchSpecs.champion +".png"} alt="xd" />
                    }
                   
                </div>
                <div className='champion_summoner-spell'>
                    <img src={summonerSpell(matchSpecs.summoner1)} alt="xd" />
                    <img src={summonerSpell(matchSpecs.summoner2)} alt="xd" />
                </div>
                <div className='champion_summoner-rune'>
                    <img className='rune1' src={"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/"+ runesType(matchSpecs.rune1) } alt="xd" />
                    <div className='rune2'>
                        <img src={"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/"+ runesType(matchSpecs.rune2) } alt="xd" />
                    </div>
                </div>
            </div>

            <div className='profile_body_match_specs scores'>
                <div className='scores_kda'>{matchSpecs.kills}/{matchSpecs.deaths}/{matchSpecs.assists}</div>
                <div className='scores_kda-points'>{matchSpecs.kda} KDA</div>
                <div className='scores_killing-spree' style={killingSpree(matchSpecs.multikills)? {}: {display: 'none'}}>{killingSpree(matchSpecs.multikills)}</div>
            </div>
        </div>
        



        <div className='profile_body_match_specs build'>
                {
                matchSpecs.items && 
                matchSpecs.items.map((item, index)=>{
                    return(
                        <div className='build_item' key={index}>
                        {(item > 0)? 
                        <img src={"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/"+ item +".png"} alt="xd" />
                        :
                        <></>
                        }
                        </div>
                    )
     
                })
                }
        </div>
    
    </div>
    <div className='profile_body_match_specs general_stats'>
            <p className='score_killP'>P/Kill {matchSpecs.killParticipation? (matchSpecs.killParticipation.toFixed(3)*100).toFixed(1): matchSpecs.killParticipation}%</p>
            <p className='score_visionScore'>Vision Score {matchSpecs.visionScore}</p>
            <div className='scores_cs'>{matchSpecs.cs} CS</div>
        </div>
    <div className='profile_body_match_lobby'>
        <p className='queue_match_timeago'>played {timeAgo(timeStamp)}</p>
    <div className='profile_body_match_specs team'>

    {
        // team_icon_member
        lobby.map((user)=>{
            return(
                <div className='team_member' key={user.summonerName}>
                <div 
                
                onClick={()=>{
                        navigate('/summoner/'+cont+'/'+region+'/'+user.summonerName);
                }}
                className={(user.summonerName == matchSpecs.summonerName)? 'team_icon_member selected_summoner': 'team_icon_member'}>

                    {(user.champion == "FiddleSticks")? 
                    <img src={"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/Fiddlesticks.png"} alt="xd" />
                    : 
                    <img src={"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/"+ user.champion +".png"} alt="xd" />
                    }
            
                </div>
                    <p className='lobby_summoner_name'>{user.summonerName}</p>
                </div>
            )
           
     
        })
        }
    
     
        
        
    </div>
    </div>

    </div>
  )
}

export default MatchMini