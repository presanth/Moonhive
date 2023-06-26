import React, { useEffect, useState } from 'react'
import './Register.css'
import axios from 'axios'
import uuid from 'react-uuid'
import { useNavigate } from 'react-router-dom'

function Register() {


    const [id,setId] = useState('')
    const [name,setName]= useState('')
    const [email,setEmail]=useState('')
    const [prof,setProf]=useState('')
    const [contact,setContact]=useState(0)
    const [profile,setProfile]=useState('')
    const [password,setPassword]= useState('')
    const [day,setDay]=useState('')
    const [error,setError] = useState('')

    const location = useNavigate()

    const register =async (e)=>{
        e.preventDefault()
        console.log(prof);
        console.log(name);
        setId(uuid().slice(0,3))
        const body= {
            id,
            name,
            email,
            prof,
            contact,
            profile,
            password,
            day
        }
        try{
            const result = await axios.post('http://localhost:8000/register',body)
            setError(result.data.message)
            location('/')
        }catch(error){
            setError(error.response.data.message)
        }

    }

    useEffect(()=>{
        var d = new Date()
        setDay(d)
        setId(uuid().slice(0,3))
    },[])
  return (
    <div className='register_section'>
        <div className='register_box'>
            <p className='register_head'>Create Account</p>
            <p>{error}</p>
            <div className='reg_inp_box'>
                <input type="text" onChange={(e)=>{setName(e.target.value)}}/>
                <label>Name</label>
            </div>
            <div className='reg_inp_box'>
                <input type="text" onChange={(e)=>{setEmail(e.target.value)}}/>
                <label>Email</label>
            </div>
            <div className='reg_inp_box'>
                <select onChange={(e)=>{setProf(e.target.value)}}>
                    <option value="">Select your profession</option>
                    <option value="student">Student</option>
                    <option value="working">Working</option>
                    <option value="frelancing">Freelancing</option>
                    <option value="tutor">Tutor</option>
                </select>
                <label>Profession</label>
            </div>
            <div className='reg_inp_box'>
                <input type="text" onChange={(e)=>{setContact(e.target.value)}}/>
                <label>Contact</label>
            </div>
            <div className='reg_inp_box'>
                <input type="text" onChange={(e)=>{setProfile(e.target.value)}}/>
                <label>image Link</label>
            </div>
            <div className='reg_inp_box'>
                <input type="text" onChange={(e)=>{setPassword(e.target.value)}}/>
                <label>Password</label>
            </div>
            <div className='reg_btn_box'>
                <button className='reg_btn' onClick={(e)=>{register(e)}}>Create</button>
            </div>
        </div>
    </div>
  )
}

export default Register