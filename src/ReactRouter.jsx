import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Home from './pages/Home';
//CSS
import './styles/Super/index.css';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Players from './pages/Players';
import ErrorPage from './pages/ErrorPage';
import Footer from './components/Footer';


const ReactRouter = () => {
    
    useEffect(() => {
        const handlePopstate = () => {
        window.location.reload();
    };
      
        window.addEventListener('popstate', handlePopstate);
      
    return () => {
        window.removeEventListener('popstate', handlePopstate);
    };
    }, []);
      
    
  return (

    
    <BrowserRouter>
        <div className='super'>
            <Navbar/>
         
            <div className='suer_routes'>
                <Routes>
                <Route exact path="/" element={<Home />} />
                <Route  exact  path="/summoner/:cont/:region/:username" element={<Profile />} />
                <Route exact path="/leaderboards/:cont/:region/:name" element={<Players />}/>
                <Route exact path="/staySafe/overflow" element={<ErrorPage err={'Too Many Requests.'} 
                sub={'Please wait and try again later.'}
                bg={'Heimerdinger_2'} errtype={429}
                />}/>
                 <Route exact path="/staySafe/summonerErr" element={<ErrorPage err={'There has been an error trying to find the summoner'} 
                bg={'Tryndamere_7'} errtype={429}
                />}/>


                <Route path="*" element={<ErrorPage err={'Page not found.'}  
                bg={'Ryze_3'} errtype={404}/>} />
                
                </Routes>
            </div>
        </div>
    </BrowserRouter>
  )
}

export default ReactRouter