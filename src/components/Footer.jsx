import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import loltrackersml from '../assets/loltraker_sml.webp'


const Footer = () => {
  return (
    <div className='super_footer'>
      <div className='footer_img_container'>
        <img src={loltrackersml} alt="" />
      </div>
      <div className='footer_left_cont' 
      onClick={()=>{
        const url = 'https://www.linkedin.com/in/juan-buitrago-047a4a206/';

        window.open(url, '_blank');
      }}>
        <p className='footer_dev'>Developed by <span className='footer_me'>Juan Buitrago</span></p>
        <LinkedInIcon className='icon'/>
      </div>

    </div>
  )
}

export default Footer