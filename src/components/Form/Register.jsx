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

        const registrationData = {
            firstName,
            lastName,
            address,
            username,
            password,
            email,
        };

        try {
            const response = await fetch("http://localhost:8080/api/v1/registers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registrationData),
            });

            const text = await response.text(); // lấy text trước

            if (response.ok) {
                alert(text || "Đăng ký thành công!");
                navigate("/login");
            } else {
                alert(text || "Đăng ký thất bại!");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Đã có lỗi xảy ra khi đăng ký!");
        }
    };

    return (
        <div>
            <div className="border border-slate-400 rounded-md md:p-8 p-6 backdrop-blur-lg bg-slate-800/30 relative transition-all duration-200">
                <h1 className="text-4xl text-white font-bold text-center mb-6">Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* First Name */}
                        <div className="relative my-4">
                            <input
                                type="text"
                                className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                                placeholder=""
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-700">
                                Your First Name
                            </label>
                            <BiUser className="absolute top-4 right-4" />
                        </div>

                        {/* Last Name */}
                        <div className="relative my-4">
                            <input
                                type="text"
                                className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                                placeholder=""
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-700">
                                Your Last Name
                            </label>
                            <BiUser className="absolute top-4 right-4" />
                        </div>
                        {/* Username */}
                        <div className="relative my-4">
                            <input
                                type="text"
                                className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                                placeholder=""
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-700">
                                Your Username
                            </label>
                            <BiUser className="absolute top-4 right-4" />
                        </div>
                        {/* Email */}
                        <div className="relative my-4">
                            <input
                                type="email"
                                className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                                placeholder=""
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-700">
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-700">
                                Your Password
                            </label>
                            <AiOutlineUnlock className="absolute top-4 right-4" />
                        </div>

                        {/* Address */}
                        <div className="relative my-4">
                            <input
                                type="text"
                                className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                                placeholder=""
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-700">
                                Your Address
                            </label>
                            <MdLocationOn className="absolute top-4 right-4" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-orange-600 hover:bg-orange-600 hover:text-white py-2 transition-colors duration-300 cursor-pointer"
                    >
                        Register
                    </button>

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
