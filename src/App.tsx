import { Button, Calendar, Rate } from "antd";
import DefaultLayout from "./layouts/DefaultLayout";

export default function App() {
  return (
    <div>
      {/* <h1 className="text-3xl text-blue-600 font-semibold text-center bg-red-300 p-9 m-9">
        Welcome to Rikkei Education
      </h1>
      <h1 className="text-3xl text-blue-600 font-semibold text-center bg-red-300 p-9 m-9">
        Welcome to Rikkei Education
      </h1>

      <Button type="primary" danger>
        Button Primary
      </Button>

      <Button type="primary" shape="circle">
        A
      </Button>

      <Rate onChange={(value) => console.log("Value: ", value)} />

      <Calendar /> */}
      <DefaultLayout />
    </div>
  );
}
