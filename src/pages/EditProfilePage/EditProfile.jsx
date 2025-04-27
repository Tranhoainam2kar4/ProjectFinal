import { useState } from "react";
import { useAppContext } from "../../context/AppProvider";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Modal, Select, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const districtsWithWards = {
  "Ba Đình": [
    "Cống Vị", "Điện Biên", "Đội Cấn", "Giảng Võ", "Kim Mã",
    "Liễu Giai", "Ngọc Hà", "Ngọc Khánh", "Nguyễn Trung Trực",
    "Phúc Xá", "Quán Thánh", "Thành Công", "Trúc Bạch", "Vĩnh Phúc"
  ],
  "Hoàn Kiếm": [
    "Chương Dương", "Cửa Đông", "Cửa Nam", "Đồng Xuân", "Hàng Bạc",
    "Hàng Bài", "Hàng Bồ", "Hàng Bông", "Hàng Buồm", "Hàng Đào",
    "Hàng Gai", "Hàng Mã", "Hàng Trống", "Lý Thái Tổ", "Phan Chu Trinh",
    "Phúc Tân", "Trần Hưng Đạo", "Tràng Tiền"
  ],
  "Đống Đa": [
    "Cát Linh", "Hàng Bột", "Khâm Thiên", "Khương Thượng", "Kim Liên",
    "Láng Hạ", "Láng Thượng", "Nam Đồng", "Ngã Tư Sở", "Phương Liên",
    "Phương Mai", "Quang Trung", "Quốc Tử Giám", "Thịnh Quang", "Thổ Quan",
    "Trung Liệt", "Trung Phụng", "Trung Tự", "Văn Chương", "Văn Miếu"
  ],
  "Hai Bà Trưng": [
    "Bách Khoa", "Bạch Đằng", "Bạch Mai", "Cầu Dền", "Đồng Nhân",
    "Đồng Tâm", "Lê Đại Hành", "Minh Khai", "Ngô Thì Nhậm", "Nguyễn Du",
    "Phạm Đình Hổ", "Phố Huế", "Quỳnh Lôi", "Quỳnh Mai", "Thanh Lương",
    "Thanh Nhàn", "Trương Định", "Vĩnh Tuy"
  ],
  "Tây Hồ": [
    "Bưởi", "Nhật Tân", "Phú Thượng", "Quảng An", "Thuỵ Khuê",
    "Tứ Liên", "Xuân La", "Yên Phụ"
  ],
  "Cầu Giấy": [
    "Dịch Vọng", "Dịch Vọng Hậu", "Mai Dịch", "Nghĩa Đô",
    "Nghĩa Tân", "Quan Hoa", "Trung Hoà", "Yên Hoà"
  ],
  "Thanh Xuân": [
    "Hạ Đình", "Khương Đình", "Khương Mai", "Khương Trung",
    "Kim Giang", "Nhân Chính", "Phương Liệt", "Thanh Xuân Bắc",
    "Thanh Xuân Nam", "Thanh Xuân Trung", "Thượng Đình"
  ],
  "Hoàng Mai": [
    "Đại Kim", "Định Công", "Giáp Bát", "Hoàng Liệt", "Hoàng Văn Thụ",
    "Lĩnh Nam", "Mai Động", "Tân Mai", "Thanh Trì", "Thịnh Liệt",
    "Trần Phú", "Tương Mai", "Vĩnh Hưng", "Yên Sở"
  ]
};

const EditProfile = () => {
  const { user, updateUser } = useAppContext();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(user?.district || "");

  const onDistrictChange = (district) => {
    setSelectedDistrict(district);
    form.setFieldsValue({ ward: undefined }); // Reset ward khi đổi quận
  };

  const onFinish = (values) => {
    setLoading(true);

    const updatedUser = {
      ...user,
      ...values,
      // Không cần avatar nữa
    };

    console.log("Saving data:", updatedUser);

    setTimeout(() => {
      updateUser(updatedUser);
      setLoading(false);

      Modal.success({
        title: "Thành công",
        content: "Cập nhật thông tin thành công",
        onOk: () => navigate("/"),
      });
    }, 500);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Vui lòng điền đầy đủ thông tin bắt buộc");
  };

  return (
    <div className="mt-24 max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
        Chỉnh sửa thông tin
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          name: user?.name || "",
          phone: user?.phone || "",
          district: user?.district || "",
          ward: user?.ward || "",
          streetAddress: user?.streetAddress || "",
        }}
      >
        <div className="text-center mb-6">
          <Avatar 
            size={100} 
            icon={<UserOutlined />} 
            className="bg-orange-500"
          />
        </div>

        <Form.Item
          label="Tên hiển thị"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên hiển thị" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Quận"
          name="district"
          rules={[{ required: true, message: "Vui lòng chọn quận" }]}
        >
          <Select
            showSearch
            placeholder="Chọn quận"
            optionFilterProp="children"
            onChange={onDistrictChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {Object.keys(districtsWithWards).map((district) => (
              <Select.Option key={district} value={district}>
                {district}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Phường"
          name="ward"
          rules={[{ required: true, message: "Vui lòng chọn phường" }]}
        >
          <Select
            showSearch
            placeholder="Chọn phường"
            disabled={!selectedDistrict}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {(districtsWithWards[selectedDistrict] || []).map((ward) => (
              <Select.Option key={ward} value={ward}>
                {ward}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Địa chỉ chi tiết"
          name="streetAddress"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Input placeholder="Ví dụ: 123 Nguyễn Chí Thanh, 25B Lý Thường Kiệt..." />
        </Form.Item>

        <Form.Item className="text-center">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="bg-orange-500 hover:bg-orange-600 border-orange-500"
            size="large"
          >
            Lưu thay đổi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProfile;