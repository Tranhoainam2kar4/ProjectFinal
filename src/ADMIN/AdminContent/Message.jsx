import React, { useState } from "react";
import { IoSend, IoArrowBack } from "react-icons/io5";

const initialUsers = [
  {
    id: "u1",
    name: "Nguyễn Văn A",
    email: "vana@gmail.com",
    messages: [
      { from: "user", text: "Tôi cần hỗ trợ về đơn hàng", time: "10:00" },
      { from: "admin", text: "Chào bạn, đơn hàng nào ạ?", time: "10:02" },
    ],
  },
  {
    id: "u2",
    name: "Trần Thị B",
    email: "tranb@gmail.com",
    messages: [
      { from: "user", text: "Tôi có góp ý nhỏ...", time: "11:00" },
    ],
  },
];

const MessagePage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [showList, setShowList] = useState(true); // Quản lý hiển thị danh sách người nhắn (cho mobile)

  const selectedUserIndex = users.findIndex((u) => u.id === selectedUserId);
  const selectedUser = users[selectedUserIndex];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const updatedUsers = [...users];
    updatedUsers[selectedUserIndex].messages.push({
      from: "admin",
      text: newMessage,
      time: timeStr,
    });

    setUsers(updatedUsers);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col md:flex-row h-[80vh] bg-white rounded shadow overflow-hidden">
      {/* Danh sách người nhắn */}
      <div
        className={`w-full md:w-1/3 border-r p-4 bg-gray-50 overflow-y-auto
          ${showList ? "block" : "hidden"} md:block`}
      >
        <h2 className="text-lg font-semibold mb-3">Người nhắn</h2>
        {users.map((user) => (
          <div
            key={user.id}
            className={`p-3 mb-2 rounded cursor-pointer hover:bg-gray-200 ${
              user.id === selectedUserId ? "bg-gray-300" : ""
            }`}
            onClick={() => {
              setSelectedUserId(user.id);
              setShowList(false); // Ẩn danh sách khi chọn trên mobile
            }}
          >
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 truncate italic">
              {user.messages[user.messages.length - 1]?.text}
            </p>
          </div>
        ))}
      </div>

      {/* Khung chat */}
      {selectedUser && (
        <div
          className={`w-full md:w-2/3 p-4 flex flex-col ${
            showList ? "hidden" : "block"
          } md:block`}
        >
          {/* Nút quay lại cho mobile */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowList(true)}
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <IoArrowBack />
              Quay lại
            </button>
          </div>

          <h2 className="text-lg font-semibold border-b pb-2 mb-4">
            Đoạn chat với: {selectedUser.name}
          </h2>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {selectedUser.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[75%] p-3 rounded-lg ${
                  msg.from === "admin"
                    ? "bg-blue-100 self-end"
                    : "bg-gray-100 self-start"
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-xs text-gray-500 text-right mt-1">{msg.time}</p>
              </div>
            ))}
          </div>

          {/* Nhập và gửi tin nhắn */}
          <div className="mt-4 flex gap-2 items-center">
            <input
              type="text"
              placeholder="Nhập phản hồi..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border border-gray-300 p-2 rounded-md"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-1"
            >
              <IoSend className="text-lg" />
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagePage;
