import { AiOutlineUnlock } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !address || !username || !password || !email) {
      alert("Vui lòng điền đầy đủ tất cả các trường!");
      return;
    }

    const registrationData = { firstName, lastName, address, username, password, email };

    try {
      const response = await fetch("http://localhost:8080/api/v1/registers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const text = await response.text();

      if (response.ok) {
        alert(text.message || "Đăng ký thành công!");
        navigate("/login");
      } else {
        alert(text.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Đã có lỗi xảy ra khi đăng ký!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
      <div className="border border-slate-400 rounded-md p-8 backdrop-blur-lg bg-slate-800/30 w-[350px] transition-all duration-200">
        <h1 className="text-4xl text-white font-bold text-center mb-8">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* First Name */}
          <div className="relative">
            <input
              type="text"
              className="block w-full py-2.5 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-600">
              Your First Name
            </label>
            <BiUser className="absolute top-4 right-3 text-white" />
          </div>

          {/* Last Name */}
          <div className="relative">
            <input
              type="text"
              className="block w-full py-2.5 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-600">
              Your Last Name
            </label>
            <BiUser className="absolute top-4 right-3 text-white" />
          </div>

          {/* Username */}
          <div className="relative">
            <input
              type="text"
              className="block w-full py-2.5 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-600">
              Your Username
            </label>
            <BiUser className="absolute top-4 right-3 text-white" />
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              className="block w-full py-2.5 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-600">
              Your Email
            </label>
            <BiUser className="absolute top-4 right-3 text-white" />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              className="block w-full py-2.5 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-600">
              Your Password
            </label>
            <AiOutlineUnlock className="absolute top-4 right-3 text-white" />
          </div>

          {/* Address */}
          <div className="relative">
            <input
              type="text"
              className="block w-full py-2.5 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-600">
              Your Address
            </label>
            <MdLocationOn className="absolute top-4 right-3 text-white" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-lg mt-4 rounded-full bg-white text-orange-600 hover:bg-orange-600 hover:text-white py-2 transition-colors duration-300"
          >
            Register
          </button>

          {/* Already have account */}
          <div className="flex justify-center">
            <span className="text-white mt-2">
              Already have an Account?{" "}
              <Link to="/Login" className="text-orange-500 hover:underline">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
