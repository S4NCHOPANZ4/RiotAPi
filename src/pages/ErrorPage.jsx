import React from 'react'
import { useNavigate  } from 'react-router-dom';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const ErrorPage = ({err, bg, errtype, sub}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/')
  }

  return (
    <div className='error_super' style={{backgroundImage: `linear-gradient(218deg, rgba(0,0,0,0.16) 0%, rgba(70,138,255,0.5) 94%), url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${bg}.jpg')`}}>
        <div className='error_content'>
    
            <div className='error_sidecont'>
              <p className='err_title'>Something went wrong {':('}</p>
              {errtype&& 
              <p className='errtype'>err type: {errtype} <br/>{err}<br/> {sub} </p>
              }
              <div className='button_container'>
                <button className='error_button' onClick={handleClick}> <KeyboardBackspaceIcon className='icon'/>  </button>
              </div>
              
            </div>

        </div>
  

    </div>
  )
}

export default ErrorPage