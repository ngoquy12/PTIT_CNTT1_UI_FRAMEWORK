import {
  Button,
  Input,
  Modal,
  Pagination,
  Table,
  type TableColumnsType,
  type TableProps,
} from "antd";
import React, { useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

export default function ListEmployee() {
  const [isShowModal, setIsShowModal] = useState<boolean>(false); // State quản lý trạng thái đóng/mở modal

  // Hàm mở modal
  const handleShowModal = () => {
    setIsShowModal(true);
  };

  // Đóng modal
  const handleHiddenModal = () => {
    setIsShowModal(false);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      width: 200,
      title: "Function",
      dataIndex: "address",
      render: () => (
        <div className="flex gap-2">
          <Button>Edit</Button>
          <Button>Delete</Button>
        </div>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Disabled User",
      age: 99,
      address: "Sydney No. 1 Lake Park",
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection: TableProps<DataType>["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <>
      {/* Modal thêm mới / Cập nhật nhân viên */}
      <Modal
        cancelText="Hủy"
        okText="Thêm"
        onCancel={handleHiddenModal}
        title={<h3 className="text-[20px]">Thêm mới nhân viên</h3>}
        open={isShowModal}
      >
        {/* Form thêm mới / cập nhật nhân viên */}
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
        <Table<DataType>
          rowSelection={{ type: "checkbox", ...rowSelection }}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>

      <div className="flex justify-end mt-5">
        <Pagination showQuickJumper defaultCurrent={2} total={500} />
      </div>
    </>
  );
}
