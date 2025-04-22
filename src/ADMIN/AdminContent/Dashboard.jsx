import React from "react";
import { FaUser, FaBoxOpen, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { Card, Row, Col, Tag } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

// Component chính
const Dashboard = () => {
  const dataRevenue = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 6000 },
    { month: "May", revenue: 7000 },
    { month: "Jun", revenue: 8000 },
  ];

  const dataSales = [
    { product: "Product A", sales: 200 },
    { product: "Product B", sales: 150 },
    { product: "Product C", sales: 100 },
    { product: "Product D", sales: 80 },
    { product: "Product E", sales: 120 },
  ];

  const data = [
    { id: "#123", name: "Nguyễn Văn A", date: "2025-04-17", status: "Đang xử lý", total: "250.000₫" },
    { id: "#124", name: "Trần Thị B", date: "2025-04-16", status: "Đã giao", total: "410.000₫" },
    { id: "#125", name: "Lê Văn C", date: "2025-04-15", status: "Đã hủy", total: "150.000₫" },
  ];

  return (
    <div className="space-y-8">
      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard icon={<FaShoppingCart />} title="Đơn hàng" value="120" />
        <StatCard icon={<FaUser />} title="Người dùng" value="350" />
        <StatCard icon={<FaBoxOpen />} title="Sản phẩm" value="85" />
        <StatCard icon={<MdMessage />} title="Tin nhắn" value="42" />
        <StatCard icon={<FaMoneyBillWave />} title="Doanh thu" value="75.000.000₫" />
      </div>

      {/* Biểu đồ doanh thu theo tháng và sản phẩm bán chạy */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Biểu đồ doanh thu theo tháng" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Biểu đồ sản phẩm bán chạy" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataSales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#82ca9d">
                  {dataSales.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.sales > 100 ? "#8884d8" : "#ff7300"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Đơn hàng gần đây dạng Card */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Đơn hàng gần đây</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((order) => (
            <Card key={order.id} title={`Đơn hàng ${order.id}`} bordered={false}>
              <p><strong>Khách hàng:</strong> {order.name}</p>
              <p><strong>Ngày:</strong> {order.date}</p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <Tag color={
                  order.status === "Đang xử lý" ? "orange" :
                  order.status === "Đã giao" ? "green" :
                  "red"
                }>
                  {order.status}
                </Tag>
              </p>
              <p><strong>Tổng:</strong> {order.total}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Component thống kê giữ nguyên
const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
    <div className="text-3xl text-orange-500">{icon}</div>
    <div>
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  </div>
);

export default Dashboard;
