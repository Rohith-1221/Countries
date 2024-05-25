import React from 'react'
import {Typography,Button} from '@mui/material';
import {useNavigate} from 'react-router-dom'

const Country = () => {
    const navigate=useNavigate()
    const handleClick=()=>{
        navigate('/countries')
    }
  return (
    <div style={{margin:"20px"}}>
      <Typography variant='h2' className='text-white'>Welcome, Know more about the countries...</Typography>
      <Typography variant='h3' className='text-slate-300'>One's destination is never a place, but a new way of seeing things.</Typography>
      <Typography variant='h5' className='text-slate-400'>About the countries...</Typography>
      <Button variant='contained' color='success' onClick={()=>handleClick()}>Know more</Button>
    </div>
  )
}

export default Country
