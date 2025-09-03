import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps, TableColumnsType, TableProps } from "antd";
import {
  Avatar,
  Breadcrumb,
  Button,
  Input,
  Layout,
  Menu,
  Pagination,
  Table,
  theme,
} from "antd";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

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

const DefaultLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: colorBgContainer,
          }}
        >
          <div className="flex items-center justify-between h-[64px]">
            <Input.Search style={{ width: 300 }} />
            <div className="flex items-center gap-3">
              <BellOutlined />
              <Avatar size="small" icon={<UserOutlined />} />
            </div>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[
              { title: "Quản lý nhân sự" },
              { title: "Quản lý nhân viên" },
              { title: "Danh sách nhân viên" },
            ]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[24px] font-semibold">Nhân viên</h3>
              <Button type="primary">Thêm mới nhân viên</Button>
            </div>

            <div className="my-5">
              <Input.Search placeholder="Tìm kiếm nhân viên" />
            </div>

            <div>
              <Table<DataType>
                rowSelection={{ type: "checkbox", ...rowSelection }}
                columns={columns}
                dataSource={data}
                pagination={false}
              />
            </div>

            <div className="mt-5 flex justify-end">
              <Pagination showQuickJumper defaultCurrent={2} total={500} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
