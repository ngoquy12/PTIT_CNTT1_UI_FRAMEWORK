import {
  Button,
  Form,
  Input,
  message,
  Modal,
  notification,
  Pagination,
  Table,
  type FormProps,
  type TableColumnsType,
  type TableProps,
} from "antd";
import React, { useEffect, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { v6 as uuid } from "uuid";

interface Employee {
  id?: string;
  fullName?: string;
  email?: string;
  address?: string;
}

type FieldType = {
  fullName?: string;
  email?: string;
  address?: string;
};

export default function ListEmployee() {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    // Lấy dữ liệu từ localStorage
    const employeeLocal = localStorage.getItem("employees");

    return employeeLocal ? JSON.parse(employeeLocal) : [];
  });
  const [isShowModal, setIsShowModal] = useState<boolean>(false); // State quản lý trạng thái đóng/mở modal
  const [employeInfo, setEmployeeInfo] = useState<Employee | null>(null);
  const [idDelete, setIdDelete] = useState<number | null>(null);
  const [form] = Form.useForm(); // Tham chiếu đến form cần thao tác

  // Cập nhật giá trị vào trong form (Lưu ý: Form được update khi có sự thay đổi trong employeInfo)
  useEffect(() => {
    // Cập nhật giá trị vào Form
    form.setFieldsValue(employeInfo);
  }, [employeInfo, form]);

  // Hàm mở modal
  const handleShowModal = () => {
    setIsShowModal(true);
  };

  // Đóng modal
  const handleHiddenModal = () => {
    setIsShowModal(false);

    // Reset lại employeeInfo
    setEmployeeInfo(null);

    form.resetFields();
  };

  const handleDelete = (id: number | null) => {
    setIdDelete(id);
  };

  const handleEdit = (employee: Employee) => {
    // Mở modal cập nhật
    handleShowModal();

    // Cập nhật giá trị cho employeeInfo
    setEmployeeInfo(employee);
  };

  const columns: TableColumnsType<Employee> = [
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      width: 200,
      title: "Function",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection: TableProps<Employee>["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Employee[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: Employee) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    // Tạo đối tượng employee mới
    const newEmployee = {
      id: uuid(),
      ...values,
    };

    // Clone employees ra 1 mảng mới
    const employeeClones = [...employees, newEmployee];

    // Thêm dữ liệu vào trong state
    setEmployees(employeeClones);

    // Lưu trữ dữ liệu lên localStorage
    localStorage.setItem("employees", JSON.stringify(employeeClones));

    // Đóng modal và hiển thị thông báo
    handleHiddenModal();

    notification.success({
      message: "Thành công",
      description: "Thêm nhân viên thành công",
    });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title="Xác nhận"
        open={true}
        footer={
          <div>
            <Button className="!bg-amber-300 hover:!bg-amber-600">Hủy</Button>
            <Button type="primary" danger>
              Xóa
            </Button>
          </div>
        }
      >
        <p>Bạn có chắc chắn muốn xóa nhân viên này không?</p>
      </Modal>

      {/* Modal thêm mới / Cập nhật nhân viên */}
      <Modal
        footer={false}
        cancelText="Hủy"
        okText="Thêm"
        onCancel={handleHiddenModal}
        title={
          <h3 className="text-[20px]">
            {employeInfo ? "Cập nhật" : "Thêm mới"} nhân viên
          </h3>
        }
        open={isShowModal}
        destroyOnHidden
      >
        {/* Form thêm mới / cập nhật nhân viên */}
        <Form
          form={form}
          name="formEmployee"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            required={false}
            label={<h3 className="font-medium">Họ và tên</h3>}
            name="fullName"
            rules={[{ required: true, message: "Tên không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Địa chỉ không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <div className="flex justify-end gap-4">
              <Button onClick={handleHiddenModal} htmlType="button">
                Hủy
              </Button>
              <Button type="primary" htmlType="submit">
                {employeInfo ? "Lưu" : "Thêm"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <div className="flex items-center justify-between">
        <h3 className="text-[24px] font-semibold">Nhân viên</h3>
        <Button onClick={handleShowModal} type="primary">
          Thêm mới nhân viên
        </Button>
      </div>

      <div className="flex items-center justify-end gap-5 my-5">
        <Input.Search
          style={{ width: 300 }}
          placeholder="Tìm kiếm nhân viên theo tên..."
        />
        <ReloadOutlined className="text-[24px]" />
      </div>

      <div>
        <Table<Employee>
          rowSelection={{ type: "checkbox", ...rowSelection }}
          columns={columns}
          dataSource={employees}
          pagination={false}
          rowKey={"id"}
        />
      </div>

      <div className="flex justify-end mt-5">
        <Pagination showQuickJumper defaultCurrent={2} total={500} />
      </div>
    </>
  );
}
