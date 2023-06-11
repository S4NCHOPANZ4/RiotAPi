const api_key = import.meta.env.VITE_API_KEY
import axios from 'axios'


export function getPLayerByName (name, url)  {
  
    var API_URL = 'https://'+url+'.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+name+'?api_key='+ api_key;
    
    return axios.get(API_URL).then((res)=>{
      return res.data
    })
    .catch((error)=>{
      if (error.response) {
        // Error de respuesta de la API
        console.log('Número de error:', error.response.status);
        console.log('Datos del error:', error.response.data);
      } else if (error.request) {
        // No se recibió respuesta del servidor
        console.log('Error de solicitud:', error.request);
      } else {
        // Ocurrió un error durante la solicitud
        console.log('Error:', error.message);
      }

      return 'err'
    })
}

export const getAccountSpecs = async (id, url) =>{
  const API_URL = 'https://'+url+'.api.riotgames.com/lol/league/v4/entries/by-summoner/'+id+'?api_key='+ api_key;
  try {
    const response = await axios.get(API_URL);
    // console.log(response.data)
    return response.data

  } catch (err) {

    console.log(err);
    return 'err'
  }

}

export const getMatchIdsByPuuid = async (puuid, server) => {

  let location
  switch (server) {
    case 'am':
      location = 'americas';
      break;
    case 'eu':
      location = 'europe';
      break;
    case 'as':
      location = 'asia';
      break;
  }

  const API_URL = 'https://'+location+'.api.riotgames.com/lol/match/v5/matches/by-puuid/'+puuid+'/ids?api_key='+ api_key;

  try {
    const response = await axios.get(API_URL);
    const matchIds = response.data.slice(0, response.data.length - 11);
    const matchPromises = matchIds.map(matchId =>
      axios.get('https://'+location+'.api.riotgames.com/lol/match/v5/matches/'+matchId+'?api_key='+ api_key)
    );

    const matchResponses = await Promise.all(matchPromises);
    const matchesg = matchResponses.map(matchResponse => matchResponse.data);

    return matchesg;
  } catch (err) {

    console.log(err);
    return 'err';
  }
};

export const getLeaderboars = async (url) =>{
  const API_URL = 'https://'+url+'.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key='+ api_key;
  try{
    const res = await axios.get(API_URL)
    return res.data
    
  } catch (err) {
    return 'err'
  }


}


export const getChampions = async () =>{
  const ALI_URL = 'http://ddragon.leagueoflegends.com/cdn/13.11.1/data/en_US/champion.json'

  try{
      const res = await axios.get(ALI_URL)
      return res.data

  }catch (err) {
    console.log(err);
    return err
  }

}