import React, { useState } from "react";
import { Card, Button, Tag, Modal, Input, Select } from "antd";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const initialProducts = [
  {
    id: "P001",
    name: "Pizza Hải Sản",
    category: "Pizza",
    price: "120.000₫",
    status: "Còn hàng",
  },
  {
    id: "P002",
    name: "Burger Bò",
    category: "Burger",
    price: "90.000₫",
    status: "Hết hàng",
  },
];

const ProductCardList = () => {
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Thêm state cho xác nhận xóa
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const showEditModal = (product) => {
    setEditingProduct({ ...product });
    setIsAdding(false);
    setIsModalVisible(true);
  };

  const showAddModal = () => {
    setEditingProduct({
      id: `P${String(products.length + 1).padStart(3, "0")}`,
      name: "",
      category: "",
      price: "",
      status: "Còn hàng",
    });
    setIsAdding(true);
    setIsModalVisible(true);
  };

  const handleChange = (field, value) => {
    setEditingProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (isAdding) {
      setProducts((prev) => [...prev, editingProduct]);
    } else {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
      );
    }
    setIsModalVisible(false);
    setEditingProduct(null);
  };

  // Bắt đầu xóa sản phẩm
  const confirmDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = () => {
    if (productToDelete) {
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
    }
    setIsDeleteModalVisible(false);
    setProductToDelete(null);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button type="primary" icon={<FaPlus />} onClick={showAddModal}>
          Thêm sản phẩm
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card
            key={product.id}
            title={product.name}
            extra={
              <div className="flex gap-2">
                <Button
                  icon={<FaEdit />}
                  size="small"
                  onClick={() => showEditModal(product)}
                >
                  Tùy chỉnh
                </Button>
                <Button
                  icon={<FaTrash />}
                  size="small"
                  danger
                  onClick={() => confirmDelete(product)}
                >
                  Xóa
                </Button>
              </div>
            }
          >
            <p><strong>Mã SP:</strong> {product.id}</p>
            <p><strong>Danh mục:</strong> {product.category}</p>
            <p><strong>Giá:</strong> {product.price}</p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              <Tag color={product.status === "Còn hàng" ? "green" : "red"}>
                {product.status}
              </Tag>
            </p>
          </Card>
        ))}
      </div>

      {/* Modal chỉnh sửa hoặc thêm sản phẩm */}
      <Modal
        title={isAdding ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
        open={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        {editingProduct && (
          <div className="flex flex-col gap-3">
            <Input
              value={editingProduct.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Tên sản phẩm"
            />
            <Input
              value={editingProduct.category}
              onChange={(e) => handleChange("category", e.target.value)}
              placeholder="Danh mục"
            />
            <Input
              value={editingProduct.price}
              onChange={(e) => handleChange("price", e.target.value)}
              placeholder="Giá"
            />
            <Select
              value={editingProduct.status}
              onChange={(value) => handleChange("status", value)}
              options={[
                { value: "Còn hàng", label: "Còn hàng" },
                { value: "Hết hàng", label: "Hết hàng" },
              ]}
            />
          </div>
        )}
      </Modal>

      {/* Modal xác nhận xóa */}
      <Modal
        title="Xác nhận xóa"
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa sản phẩm <strong>{productToDelete?.name}</strong> không?</p>
      </Modal>
    </>
  );
};

export default ProductCardList;
