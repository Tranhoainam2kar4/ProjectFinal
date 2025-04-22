import React, { useState } from "react";
import { Card, Button, Tag, Modal, Select } from "antd";
import { FaEdit } from "react-icons/fa";

const initialUsers = [
  { id: "U001", name: "Nguyễn Văn A", email: "a@gmail.com", role: "Admin" },
  { id: "U002", name: "Trần Thị B", email: "b@gmail.com", role: "Khách hàng" },
  { id: "U003", name: "Lê Văn C", email: "c@gmail.com", role: "Khách hàng" },
];

const UserCardList = () => {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showEditModal = (user) => {
    setEditingUser({ ...user });
    setIsModalVisible(true);
  };

  const handleRoleChange = (value) => {
    setEditingUser((prev) => ({ ...prev, role: value }));
  };

  const handleSave = () => {
    setUsers((prev) =>
      prev.map((u) => (u.id === editingUser.id ? editingUser : u))
    );
    setIsModalVisible(false);
    setEditingUser(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <Card
            key={user.id}
            title={user.name}
            extra={
              <Button icon={<FaEdit />} size="small" onClick={() => showEditModal(user)}>
                Tùy chỉnh
              </Button>
            }
          >
            <p><strong>Mã người dùng:</strong> {user.id}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p>
              <strong>Vai trò:</strong>{" "}
              <Tag color={user.role === "Admin" ? "volcano" : "blue"}>
                {user.role}
              </Tag>
            </p>
          </Card>
        ))}
      </div>

      <Modal
        title="Chỉnh sửa người dùng"
        open={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        {editingUser && (
          <div className="flex flex-col gap-4">
            <p><strong>ID:</strong> {editingUser.id}</p>
            <p><strong>Tên:</strong> {editingUser.name}</p>
            <p><strong>Email:</strong> {editingUser.email}</p>
            <Select
              value={editingUser.role}
              onChange={handleRoleChange}
              options={[
                { value: "Admin", label: "Admin" },
                { value: "Khách hàng", label: "Khách hàng" },
              ]}
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default UserCardList;
