import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Edit() {

    const [id,setId]=useState('')
    const [day,setDay]= useState('')


    const [mname,setmName]= useState('')
    const [email,setEmail]=useState('')
    const [prof,setProf]=useState('')
    const [contact,setContact]=useState(0)
    const [img,setimg]=useState('')
    const [password,setPassword]= useState('')



    const [dn,setDn]= useState('')
    const [de,setDe]= useState('')
    const [dpr,setDpr]= useState('')
    const [dc,setDc]= useState('')
    const [di,setDi]= useState('')
    const [dp,setDp]= useState('')

    const location = useNavigate()
    const params = useParams('')

    const fetchUser= async ()=>{
        const result = await axios.get('http://localhost:8000/getdata/'+params.id)

        setId(result.data.user.user_id)
        setDay(result.data.user.user_date)
        setDn(result.data.user.user_name)
        setDe(result.data.user.user_email)
        setDpr(result.data.user.user_profession)
        setDc(result.data.user.user_contact)
        setDi(result.data.user.user_profile)
        setDp(result.data.user.user_password)

    }


    const [error,setError] = useState('')
    const editData= async (e)=>{
    e.preventDefault()
    const body={
        id,
        mname,
        email,
        prof,
        contact,
        img,
        password,
        day
    }
    try{
        const result = await axios.post('http://localhost:8000/edituser',body)
        alert(result.data.message)
        localStorage.removeItem("userimg")
        localStorage.setItem("userimg",JSON.stringify(img))
        location('/dashboard')
    }catch(er){
        setError(error.response.data.message)
    }
}
    useEffect(()=>{
        fetchUser()
    })
  return (
        <div className="register_section">
      <div className="register_box">
        <p className="register_head">Edit Account</p>
          <div  className="reg_inp_box">
            <input
              type="text"
              defaultValue={dn}
              onChange={(e) =>setmName(e.target.value)}/>
            <label>Name</label>
          </div>
          <div className="reg_inp_box">
            <input
              type="text"
              onChange={(e)=>setEmail(e.target.value)}
              defaultValue={de}
            />
            <label>Email</label>
          </div>
  
          <div className="reg_inp_box">
            <select defaultValue={dpr} onChange={(e) => setProf(e.target.value)}>
              <option>{dpr? dpr:"select your possition"}</option>
              <option>Student</option>
              <option>Working</option>
              <option>Freelancing</option>
              <option>Tutor</option>
            </select>
            <label>profession</label>
          </div>
          <div className="reg_inp_box">
            <input
              type="text"
              onChange={(e) => setContact(e.target.value)}
              defaultValue={dc}
            />
            <label>Contact</label>
          </div>
          <div className="reg_inp_box">
            <input
              type="text"
              onChange={(e) => setimg(e.target.value)}
              defaultValue={di}
            />
            <label>Image Link</label>
          </div>
          <div className="reg_inp_box">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              defaultValue={dp}
            />
            <label>Password</label>
          </div>
          <div className="reg_btn_box">
            <button className="reg_btn" onClick={(e)=>editData(e)}>Submit</button>
          </div>
         
      </div>
      </div>

  )
}

export default Edit