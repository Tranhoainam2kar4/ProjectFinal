import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { AiOutlineUnlock } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  // Xử lý form submit (email/password)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      // Lưu token và thông tin user
      // if (remember) {
      //   localStorage.setItem('token', data.token);
      //   localStorage.setItem('user', JSON.stringify(data.user));
      // } else {
      //   sessionStorage.setItem('token', data.token);
      //   sessionStorage.setItem('user', JSON.stringify(data.user));
      // }

      toast.success('Đăng nhập thành công!');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  // Xử lý Google Login
  // const handleGoogleLogin = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     try {
  //       const res = await fetch('/oauth2/authorization/google', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ token: tokenResponse.credential || tokenResponse.access_token }),
  //       });
  //       const data = await res.json();
  //       if (!res.ok) throw new Error(data.message || 'Google login failed');
  //
  //       // Lưu token và thông tin user
  //       sessionStorage.setItem('token', data.token);
  //       sessionStorage.setItem('user', JSON.stringify(data.user));
  //
  //       toast.success('Đăng nhập với Google thành công!');
  //       navigate('/');
  //     } catch (err) {
  //       console.error(err);
  //       toast.error(err.message);
  //     }
  //   },
  //   onError: () => toast.error('Đăng nhập với Google thất bại!'),
  // });
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };


  return (
    <div>
      <div className="border border-slate-400 rounded-md md:p-8 p-6 backdrop-blur-lg bg-slate-800/30 relative transition-all duration-200">
        <h1 className="text-4xl text-white font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="relative my-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-orange-700 peer"
              placeholder=""
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-700">
              Your Username
            </label>
            <BiUser className="absolute top-4 right-4" />
          </div>

          <div className="relative my-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-orange-700 peer"
              placeholder=""
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-700">
              Your Password
            </label>
            <AiOutlineUnlock className="absolute top-4 right-4" />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label>Remember Me</label>
            </div>
            <Link to="/forgotpassword" className="text-orange-600">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-orange-600 hover:bg-orange-600 hover:text-white py-2 transition-colors duration-300 cursor-pointer"
          >
            Login
          </button>

          <div className="flex items-center mb-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-3 text-white">OR</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <button
            type="button"
            onClick={() => handleGoogleLogin()}
            className="w-full flex items-center justify-center gap-3 text-[18px] rounded-full bg-white text-gray-800 hover:bg-gray-100 py-2 transition-colors duration-300 cursor-pointer border border-gray-300"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>

          <div className="flex justify-center">
            <span className="m-2">
              New Here? <Link to="/register" className="text-orange-600">Create an Account</Link>
            </span>
          </div>

          <div className="flex justify-center">
            <Link to="/" className="text-orange-600">Continue as guest?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
