// AppContext.js
import React, { createContext, useReducer } from 'react';

// Definir el estado inicial
const initialProfile = {
  profileIconId: 5226,
  summonerName: 'Dota Enjoyer',
  ladderRank: 420,
  puuid: 'Vvm9lKCf27l84QGmeywR8MgIgZKhQVm4T5Dk7pYRdZmGfwiHHcSaq73XonkPRlkahfMgUUU8',
  id: "798XhLgm3ZghbtbSfjmqEy2yl0xTj-issJOn4qt9HEmfDA"
};

const serverLocation = {
  platform: 'LAN',
  value: 'am',
  server: 'la1'
}

// Definir el reducer para actualizar el estado
function reducer(state, action) {
  switch (action.type) {
    case 'NEW_PROFILE':
      return action.payload

    default:
      return state;
  }
}

function serverLocationReducer(state, action) {
  switch (action.type) {
    case 'NEW_PLATFORM':
      return { platform: action.payload.platform , value: action.payload.value, server: action.payload.server}
    default:
      return state
  }
}

// Crear el contexto
export const AppContext = createContext();

// Proveedor del contexto
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialProfile);
  const [statePlatform, dispatchPlatform] = useReducer(serverLocationReducer, serverLocation)

  return (
    <AppContext.Provider value={{ state, dispatch, statePlatform, dispatchPlatform }}>
      {children}
    </AppContext.Provider>
  );
}