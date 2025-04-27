import React, { useState, useRef } from "react";
import { Card, Button, Modal, Input } from "antd";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const initialProducts = [
  {
    id: "P001",
    name: "Pizza Hải Sản",
    category: "Pizza",
    price: "120.000₫",
    quantity: 50,
    description:
      "Pizza hải sản thơm ngon, đậm đà hương vị biển. Một sự kết hợp tuyệt vời giữa hải sản tươi sống và phô mai đậm đà, đảm bảo khiến bạn mê mẩn. Chắc chắn sẽ là sự lựa chọn hoàn hảo cho các bữa tiệc gia đình và bạn bè.",
    image: null,
    imageName: "",
  },
  {
    id: "P002",
    name: "Burger Bò",
    category: "Burger",
    price: "90.000₫",
    quantity: 0,
    description:
      "Burger bò tươi ngon, đầy đủ gia vị. Lớp thịt bò nướng mềm mại, kết hợp với các nguyên liệu tươi ngon, tạo nên món burger tuyệt vời cho mọi người yêu thích ẩm thực nhanh.",
    image: null,
    imageName: "",
  },
];

const ProductCardList = () => {
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const imageInputRef = useRef(null);

  const showEditModal = (product) => {
    setEditingProduct({
      ...product,
      image: product.image || null,
      imageName: product.imageName || "",
    });
    setIsAdding(false);
    setIsModalVisible(true);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const showAddModal = () => {
    setEditingProduct({
      id: `P${String(products.length + 1).padStart(3, "0")}`,
      name: "",
      category: "",
      price: "",
      quantity: 0,
      description: "",
      image: null,
      imageName: "",
    });
    setIsAdding(true);
    setIsModalVisible(true);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleChange = (field, value) => {
    setEditingProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditingProduct((prev) => ({
          ...prev,
          image: reader.result,
          imageName: file.name,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setEditingProduct((prev) => ({
      ...prev,
      image: null,
      imageName: "",
    }));
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
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
            {product.image && (
              <div className="w-full h-40 overflow-hidden rounded mb-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <p>
              <strong>Mã SP:</strong> {product.id}
            </p>
            <p>
              <strong>Danh mục:</strong> {product.category}
            </p>
            <p>
              <strong>Giá:</strong> {product.price}
            </p>
            <p>
              <strong>Số lượng:</strong> {product.quantity}
            </p>
            <p>
              <strong>Mô tả:</strong>{" "}
              <span
                className="text-gray-600 line-clamp-2"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  WebkitLineClamp: 2,
                }}
              >
                {product.description}
              </span>
            </p>
          </Card>
        ))}
      </div>

      <Modal
        title={isAdding ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
        open={isModalVisible}
        onOk={() => {
          const requiredFields = [
            "name",
            "category",
            "price",
            "quantity",
            "description",
          ];
          const isValid = requiredFields.every(
            (field) => editingProduct[field]?.toString().trim() !== ""
          );
          if (!isValid) {
            alert("Vui lòng điền đầy đủ tất cả các trường bắt buộc.");
            return;
          }
          handleSave();
        }}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        {editingProduct && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="font-medium">Tên sản phẩm *</label>
              <Input
                value={editingProduct.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Nhập tên sản phẩm"
              />
            </div>

            <div>
              <label className="font-medium">Danh mục *</label>
              <Input
                value={editingProduct.category}
                onChange={(e) => handleChange("category", e.target.value)}
                placeholder="Nhập danh mục"
              />
            </div>

            <div>
              <label className="font-medium">Giá *</label>
              <Input
                value={editingProduct.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="Nhập giá"
              />
            </div>

            <div>
              <label className="font-medium">Số lượng trong kho *</label>
              <Input
                value={editingProduct.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
                placeholder="Nhập số lượng"
              />
            </div>

            <div>
              <label className="font-medium">Mô tả sản phẩm *</label>
              <Input.TextArea
                value={editingProduct.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Nhập mô tả sản phẩm"
                rows={4}
                style={{ resize: "none" }}
              />
            </div>

            {/* Upload ảnh */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Ảnh sản phẩm (tùy chọn)</label>
              <label
                htmlFor="imageUpload"
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer w-fit"
              >
                Chọn ảnh
              </label>
              <input
                type="file"
                accept="image/*"
                id="imageUpload"
                ref={imageInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              {editingProduct.imageName && (
                <p className="text-sm text-gray-600">
                  Đã chọn: {editingProduct.imageName}
                </p>
              )}

              {editingProduct.image && (
                <div className="w-full rounded overflow-hidden">
                  <img
                    src={editingProduct.image}
                    alt="Ảnh sản phẩm"
                    className="w-full h-40 object-cover rounded"
                  />
                  <Button
                    danger
                    onClick={handleImageRemove}
                    className="mt-2"
                    block
                  >
                    Xóa ảnh
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title="Xác nhận xóa"
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
      </Modal>
    </>
  );
};

export default ProductCardList;
