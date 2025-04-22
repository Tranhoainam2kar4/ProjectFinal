import { Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";

const Login = () => {
  return (
    <div>
      <div className="border border-slate-400 rounded-md md:p-8 p-6 backdrop-blur-lg bg-slate-800/30 relative transition-all duration-200">
        <h1 className="text-4xl text-white font-bold text-center mb-6">Login</h1>
        <form action="">
          <div className="relative my-4">
            <input type="email" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-otext-orange-600 focus:outline-none focus:ring-0 focus:text-white focus:border-otext-orange-700 peer" placeholder=""/>
            <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-700 peer-focus:dark:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Email</label>
            <BiUser className="absolute top-4 right-4"/>
          </div>
          <div className="relative my-4">
            <input type="password" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-otext-orange-600 focus:outline-none focus:ring-0 focus:text-white focus:border-orange-700 peer" placeholder=""/>
            <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-700 peer-focus:dark:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Password</label>
            <AiOutlineUnlock className="absolute top-4 right-4"/>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <input type="checkbox" value="" />
              <label htmlFor="Remember Me">Remember Me</label>
            </div>
            <Link to='' className="text-orange-600">Forgot Password?</Link>
          </div>
          <button type="submit" className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-orange-600 hover:bg-orange-600 hover:text-white py-2 transition-colors duration-300 cursor-pointer">Login</button>
          <div className="flex justify-center">
            <span className="m-2">New Here? <Link to='/Register' className="text-orange-600">Create an Account</Link></span>
          </div>
          <div className="flex justify-center">
            <Link to='/' className="text-orange-600">Continue as guest?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;




    //   <div className="min-h-screen flex items-center justify-center font-mono bg-gradient-to-r from-cyan-500 from-10% via-indigo-500 via-50% to-sky-500 to-100%">
    //   <div className="flex shadow-2xl">
    //     <div className="flex flex-col items-center justify-center text-center !p-20 gap-8 bg-white rounded-2xl">
    //       <h1 className="text-5xl font-bold">Login</h1>
    //       <div className="flex flex-col text-2xl text-left gap-1">
    //         <span>Username</span>
    //         <input type="text" className="rounded-md p-1 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50"/>
    //       </div>
    //       <div className="flex flex-col text-2xl text-left gap-1">
    //         <span>Password</span>
    //         <input type="password" className="rounded-md p-1 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50"/>
    //       </div>
    //     </div>
    //   </div>
    // </div>