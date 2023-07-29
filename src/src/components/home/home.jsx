import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

  console.log(window.location.pathname)


  useEffect(() => {
    navigate('/login'); // Redirect to /login
  }, []);
  return (


    <div>
        
    </div>
  )
}

export default Home