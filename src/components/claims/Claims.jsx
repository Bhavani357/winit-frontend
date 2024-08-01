import React from 'react'

import { Link, useNavigate } from 'react-router-dom'
import './Claims.css'

const Claims = () => {
    const navigate = useNavigate()
    const handleAddClaims = ()=>{
        navigate('/claimItems')
    }
  return (
    <div>
      <h1>Claims</h1>
        <div className='home-buttons-container'>
        <div>
            <button>Saved</button>
            <button>Submitted</button>
        </div>
        <div>
            <button onClick={handleAddClaims}>Add</button>
            <button>Filter</button>
        </div>
      </div>
      

      
    </div>
  )
}

export default Claims
