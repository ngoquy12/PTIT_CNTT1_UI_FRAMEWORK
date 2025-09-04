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

// import { Button, Modal } from "antd";
// import { SearchOutlined } from "@ant-design/icons";
// import { useState } from "react";

// export default function App() {
//   const [isShowModal, setIsShowModal] = useState<boolean>(false);

//   const handleShowModal = () => {
//     setIsShowModal(true);
//   };

//   const handleHiddenModal = () => {
//     setIsShowModal(false);
//   };

//   return (
//     <div>
//       <Button type="primary" danger>
//         Button
//       </Button>
//       <Button type="primary" shape="circle" icon={<SearchOutlined />} />

//       <Button onClick={handleShowModal}>Mở modal</Button>

//       {/* Component modal */}
//       <Modal
//         centered={false}
//         width={500}
//         closeIcon={false}
//         // footer={null}
//         onOk={() => console.log("Nút ok được nhấn")}
//         onCancel={handleHiddenModal}
//         open={isShowModal}
//         title="Tiêu đề modal"
//         okText="Xác nhận"
//         cancelText="Hủy"
//         maskClosable={false}
//       ></Modal>
//     </div>
//   );
// }
