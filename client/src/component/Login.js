import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Login() {
    var location= useNavigate()
    const [id,setId]=useState('')
    const [pass,setPassword]=useState('')
    const [er,setError] = useState('')

    const userLogin = async (e)=>{
        e.preventDefault()
        const body={
            id,
            pass
        }
        try{
            const result = await axios.post('http://localhost:8000/login',body)
            localStorage.setItem("userid",JSON.stringify(result.data.user.user_id))
            localStorage.setItem("username",JSON.stringify(result.data.user.user_name))
            localStorage.setItem("userimg",JSON.stringify(result.data.user.user_profile))
            setError(result.data.message);
            alert(result.data.message);

            location('dashboard')
        }catch(error){
            setError(error.response.data.message)
          }
    }
  return (
    <div className='login_section'>
        <div className='login_box'>
            <p className='login_head'>LogIn</p>
            <div className='login_input_box'>
                <input type="email" onChange={(e)=>{setId(e.target.value)}}/>
                <label>Email</label>
            </div>
            <div className='login_input_box'>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <label>Password</label>
                <p className='error_message'>{er}</p>
            </div>
            <div className='login_btn_box'>
                <button className='login_btn' onClick={(e)=>userLogin(e)}>LogIn</button>
                <Link to={'register'} className='reg_link'>create new account</Link>
            </div>
        </div>
    </div>
  )
}

export default Login