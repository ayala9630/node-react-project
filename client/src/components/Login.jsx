import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { createToken } from "../store/tokenSlice";
import { Link, useNavigate } from "react-router-dom"
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import Home from "./Home";

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  const message = useRef(null);
  const [disabled, setDisabled] = useState(false);

  const load = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      const { data } = await Axios.post("http://localhost:1234/api/users/login", { userName, password })
      console.log(data);
      dispatch(createToken({ token: data.accessToken, role: data.role }))
      message.current.show({ severity: "success", summary: 'Success', detail: 'Welcom', life: 1500 })
      setTimeout(() => {
        setVisible(false)
        navigate("/")
      }, 1000);
    } catch (error) {
      message.current?.show({ severity: "error", summary: 'Error', detail: 'Wrong username or password', life: 3000 })
    }

    setLoading(false);
    setDisabled(false)
  }

  return (
    <>
      <Home />
      <Dialog className='p-9 card ' visible={visible} onHide={() => { if (!visible) return; setVisible(false); navigate("/") }} style={{ border: "solid 5px var(--indigo-300)" }}>
        <form onSubmit={load}	>
          <h1 className="flex justify-content-center w-full 	" >Login</h1>
          <div className="card flex justify-content-center" style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
            <FloatLabel>
              <InputText className="w-full" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} required />
              <label htmlFor="username">Username</label>
            </FloatLabel>
            <FloatLabel >
              <Password inputStyle={{ width: "223px" }} className="w-8" inputId="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} toggleMask required />
              <label htmlFor="password">Password</label>
            </FloatLabel>
            <Toast ref={message} position='top-center' />
            <div className="flex align-items-center gap-2">
              <Button label="Login" icon="pi pi-check" loading={loading} disabled={disabled} autoFocus className="p-3 w-full  border-1 border-white-alpha-30" />
              <Button label="Cancel" onClick={() => { setVisible(false); navigate("/") }} outlined className="p-3 w-full border-1 border-white-alpha-30 "></Button>
            </div>
          </div>
        </form>
        <div className="flex align-items-center gap-3">
          <Link to="/register" className="p-3  border-1 border-white-alpha-30 hover:bg-white-alpha-10" >
            <i className="pi pi-user-plus text-2xl"></i>
          </Link >
          <h3 >← עדיין לא רשום? לחץ כאן </h3>
        </div>
      </Dialog>
    </>

  )
}

export default Login
