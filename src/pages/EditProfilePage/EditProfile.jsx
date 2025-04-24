import { useState } from "react";
import { useAppContext } from "../../context/AppProvider";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [uploadedAvatar, setUploadedAvatar] = useState(null);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      avatar: uploadedAvatar || avatar,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert("Cập nhật thông tin thành công!");

    setTimeout(() => navigate("/"), 300); // Delay để cập nhật xong rồi chuyển trang
  };

  return (
    <div className="mt-30 mb-10 max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">Chỉnh sửa thông tin</h2>

      {/* Avatar upload section */}
      <div className="mb-6 flex flex-col items-center">
        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-orange-500 shadow-md mb-3 relative group">
          <img
            src={uploadedAvatar || avatar}
            alt="Avatar preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "9999px"
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-sm">
            Chọn ảnh mới
          </div>
        </div>

        <label className="cursor-pointer px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition text-sm font-medium">
          Tải ảnh lên
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Name input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Tên hiển thị</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Save button */}
      <div className="text-center">
        <button
          onClick={handleSave}
          className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition font-semibold"
        >
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
