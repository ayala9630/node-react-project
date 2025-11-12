import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import React, { useRef, useState } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import Basket from "./Basket";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { clearToken } from "../store/tokenSlice";


const Header = () => {
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch()

  const op = useRef(null);
  const token = useSelector(store => store.tokenSlice.token)
  const role = useSelector(store => store.tokenSlice.role)
  const message = useRef(null);

  const navigate = useNavigate()

  const startContent = (
    <div className="flex flex-wrap align-items-center gap-3">
      <Link to="/" className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
        <i className="pi pi-home text-2xl"></i>
      </Link>
      {token ?
       <OverlayPanel ref={op}>
        <Basket />
      </OverlayPanel>:<></>}
      {!token&&<Link to="register" setVisible={setVisible} visible={visible} className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
        <i className="pi pi-user-plus text-2xl"></i>
      </Link>}
      {!token&&<Link to="login" setVisible={setVisible} visible={visible} className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
        <i className="pi pi-user text-2xl"></i>
      </Link>}
      {token&&<button onClick={()=>{dispatch(clearToken());navigate("/")}} className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
        <i className="pi pi-sign-out text-2xl "></i>
      </button>}
      <Button  onClick={(e) => {
        op.current?.toggle(e); !op.current && message.current.show({ severity: "error", summary: 'Error', detail: 'Please Login', life: 3000 })
      }} className="p-link inline-flex justify-content-center align-items-center text-white h-3rem w-3rem border-circle hover:bg-white-alpha-10 transition-all transition-duration-200">
        <i className="pi pi-shopping-cart text-2xl"></i>
      </Button >
    </div>
  );

  const centerContent = (<div style={{ display: "flex", flexDirection: "column" }}>
    <NavLink>
      {role==="Admin"&&<Link to={"edit"} className="p-button font-bold bg-indig-900	mr-3">ניהול מוצרים</Link>}
      <Link to={"category/windInstrument"} className="p-button font-bold bg-indigo-300	mr-3">כלי נשיפה</Link>
      <Link to={"category/guitars"} className="p-button font-bold bg-indigo-300	mr-3">גיטרות</Link>
      <Link to={"category/pianos"} className="p-button font-bold bg-indigo-300	mr-3">קלידים</Link>
      <Link to={"category/drums"} className="p-button font-bold bg-indigo-300	mr-3">תופים</Link>
      <Link to={"category/bow"} className="p-button font-bold bg-indigo-300	mr-3">כלי מיתר</Link>
      <Link to={"category/all"} className="p-button font-bold bg-indigo-300	mr-3">כל המוצרים</Link>
    </NavLink>

  </div>

  );

  const endContent = (
    <>
      <img className="w-9 sm:w-4rem xl:w-6rem block xl:block m-0 border-round" src="http://localhost:1234/logo.png" />
    </>
  );

  return (
    <div>
      <div className="card sticky top-0 z-2" >
        <Toolbar start={startContent} center={centerContent} end={endContent} className="sticky font-bold bg-primary py-4 bg-gray-900 shadow-2" style={{ borderRadius: '3rem', backgroundImage: 'linear-gradient(to right, var(--bluegray-500), var(--bluegray-800))' }} >
        </Toolbar>
      </div>
      <Toast ref={message} position='top-center' />
      <Outlet />
    </div>
  )
}

export default Header
