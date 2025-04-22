import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"

const WrapForm = () => {
  return (
    <div className="text-white h-screen flex justify-center items-center bg-cover" style={{'backgroundImage': 'url(/food12.jpg)'}}>
      <Routes>
        <Route path="Login" element = {<Login/>}/>
        <Route path="Register" element = {<Register/>}/>
      </Routes>
    </div>
  )
}
export default WrapForm