import { Button, Select } from "antd";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  return (
    <>
      {/* <h1 className="text-red-600 text-4xl bg-gray-300 font-semibold">
        Welcome to Rikkei Education
      </h1>

      <div className="size-[50px] bg-blue-600 rounded-full"></div>

      <Button type="primary" danger>
        Button Primary
      </Button>

      <Select
        mode="multiple"
        showSearch
        allowClear
        defaultValue="lucy"
        style={{ width: 300 }}
        options={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
          { value: "disabled", label: "Disabled", disabled: true },
        ]}
      /> */}

      <DefaultLayout />
    </>
  );
}

export default App;
