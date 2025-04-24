import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import ForgotPassword from "./ForgotPassword"
import OTPVerify from "./OTPVerify"
import ResetPassword from "./ResetPassword"

const WrapForm = () => {
  return (
    <div className="text-white h-screen flex justify-center items-center bg-cover" style={{'backgroundImage': 'url(/food12.jpg)'}}>
      <Routes>
        <Route path="Login" element = {<Login/>}/>
        <Route path="Register" element = {<Register/>}/>
        <Route path="forgotpassword" element = {<ForgotPassword/>}/>
        <Route path="otp-verify" element = {<OTPVerify/>}/>
        <Route path="resetpassword" element = {<ResetPassword/>}/>
      </Routes>
    </div>
  )
}
export default WrapForm