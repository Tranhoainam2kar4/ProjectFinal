import React, { useState } from "react";
import { Card, Button, Tag, Modal, Select } from "antd";
import { FaEdit } from "react-icons/fa";

const initialOrders = [
  {
    id: "#123",
    customer: "Nguyễn Văn A",
    date: "2025-04-17",
    status: "Đang xử lý",
    total: "250.000₫",
    items: [
      { name: "Pizza Hải Sản", quantity: 1 },
      { name: "Nước ngọt", quantity: 2 },
    ],
  },
  {
    id: "#124",
    customer: "Trần Thị B",
    date: "2025-04-16",
    status: "Đã giao",
    total: "410.000₫",
    items: [
      { name: "Burger Bò", quantity: 2 },
      { name: "Khoai tây chiên", quantity: 1 },
    ],
  },
  {
    id: "#125",
    customer: "Lê Văn C",
    date: "2025-04-15",
    status: "Đã hủy",
    total: "150.000₫",
    items: [
      { name: "Mì Ý", quantity: 1 },
    ],
  },
];

const OrderCardList = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [editingOrder, setEditingOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showEditModal = (order) => {
    setEditingOrder({ ...order });
    setIsModalVisible(true);
  };

  const handleChangeStatus = (value) => {
    setEditingOrder((prev) => ({ ...prev, status: value }));
  };

  const handleSave = () => {
    setOrders((prev) =>
      prev.map((o) => (o.id === editingOrder.id ? editingOrder : o))
    );
    setIsModalVisible(false);
    setEditingOrder(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {orders.map((order) => (
          <Card
            key={order.id}
            title={`Đơn hàng ${order.id}`}
            extra={
              <Button
                icon={<FaEdit />}
                size="small"
                onClick={() => showEditModal(order)}
              >
                Tùy chỉnh
              </Button>
            }
          >
            <p><strong>Khách hàng:</strong> {order.customer}</p>
            <p><strong>Ngày:</strong> {order.date}</p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              <Tag
                color={
                  order.status === "Đang xử lý"
                    ? "orange"
                    : order.status === "Đã giao"
                    ? "green"
                    : "red"
                }
              >
                {order.status}
              </Tag>
            </p>
            <p><strong>Tổng:</strong> {order.total}</p>
            <p><strong>Sản phẩm:</strong></p>
            <ul className="list-disc list-inside">
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} - SL: {item.quantity}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Modal
        title="Tùy chỉnh đơn hàng"
        open={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        {editingOrder && (
          <div className="flex flex-col gap-3">
            <p><strong>Mã đơn:</strong> {editingOrder.id}</p>
            <p><strong>Khách hàng:</strong> {editingOrder.customer}</p>
            <p><strong>Ngày đặt:</strong> {editingOrder.date}</p>
            <Select
              value={editingOrder.status}
              onChange={handleChangeStatus}
              options={[
                { value: "Đang xử lý", label: "Đang xử lý" },
                { value: "Đã giao", label: "Đã giao" },
                { value: "Đã hủy", label: "Đã hủy" },
              ]}
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default OrderCardList;
