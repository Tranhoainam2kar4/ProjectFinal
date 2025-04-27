import { AiOutlineUnlock } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <div className="border border-slate-400 rounded-md md:p-8 p-6 backdrop-blur-lg bg-slate-800/30 relative transition-all duration-200">
        <h1 className="text-4xl text-white font-bold text-center mb-6">
          Register
        </h1>
        <form action="">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side */}
            <div className="flex-1">
              {/* User Name */}
              <div className="relative my-4">
                <input
                  type="text"
                  className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                  placeholder=""
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-700"
                >
                  Your Name
                </label>
                <BiUser className="absolute top-4 right-4" />
              </div>

              {/* Email */}
              <div className="relative my-4">
                <input
                  type="email"
                  className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                  placeholder=""
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-700"
                >
                  Your Email
                </label>
                <BiUser className="absolute top-4 right-4" />
              </div>

              {/* Password */}
              <div className="relative my-4">
                <input
                  type="password"
                  className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                  placeholder=""
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-700"
                >
                  Your Password
                </label>
                <AiOutlineUnlock className="absolute top-4 right-4" />
              </div>

              {/* Confirm Password */}
              <div className="relative my-4">
                <input
                  type="password"
                  className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                  placeholder=""
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-700"
                >
                  Confirm Password
                </label>
                <AiOutlineUnlock className="absolute top-4 right-4" />
              </div>
            </div>

            {/* Right side */}
            <div className="flex-1">
              {/* District */}
              <div className="relative my-4">
                <input
                  type="text"
                  className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                  placeholder=""
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-700"
                >
                  District
                </label>
                <MdLocationOn className="absolute top-4 right-4" />
              </div>

              {/* Ward */}
              <div className="relative my-4">
                <input
                  type="text"
                  className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                  placeholder=""
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-700"
                >
                  Ward
                </label>
                <MdLocationOn className="absolute top-4 right-4" />
              </div>

              {/* House Number */}
              <div className="relative my-4">
                <input
                  type="text"
                  className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                  placeholder=""
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-700"
                >
                  House Number
                </label>
                <MdLocationOn className="absolute top-4 right-4" />
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-orange-600 hover:bg-orange-600 hover:text-white py-2 transition-colors duration-300 cursor-pointer"
          >
            Register
          </button>

          {/* Login Link */}
          <div className="flex justify-center">
            <span className="m-2">
              Already have an Account?{" "}
              <Link to="/Login" className="text-orange-600">
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
