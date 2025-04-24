import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error('Vui lòng điền đầy đủ các trường!');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Đặt lại mật khẩu thất bại');

      toast.success('Mật khẩu đã được đặt lại thành công!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="border border-slate-400 rounded-md md:p-8 p-6 backdrop-blur-lg bg-slate-800/30 relative transition-all duration-200
                    w-[300px] sm:w-[340px] md:w-[380px] mx-auto">
      <h2 className="text-3xl text-white text-center mb-2">Đặt Lại Mật Khẩu</h2>

      <p className="text-xs text-gray-300 text-center mb-4">
        Nhập mật khẩu mới và xác nhận lại để hoàn tất quá trình đặt lại mật khẩu.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="relative my-4">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300
                       appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-orange-700 peer"
            placeholder=""
          />
          <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                             peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-700">
            Mật Khẩu Mới
          </label>
        </div>

        <div className="relative my-4">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300
                       appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-orange-700 peer"
            placeholder=""
          />
          <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                             peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-700">
            Xác Nhận Mật Khẩu
          </label>
        </div>

        <button
          type="submit"
          className="w-full mt-4 rounded-full bg-white text-orange-600 hover:bg-orange-600 hover:text-white py-2
                     transition-colors duration-300 cursor-pointer"
        >
          Đặt Lại
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
