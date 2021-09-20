import Link from 'next/link';
import dynamic from 'next/dynamic';
/* utils */
import {
  absoluteUrl,
  checkIsLogin,
  apiInstance,
} from '../../../../middleware/utils';

/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
// import UserNav from '../components/navigation/User';
import React, { useEffect, useState, useRef } from 'react'

import {
  Carousel,
  Row,
  Col,
  Typography,
  Image,
  Button,
  Input,
  Card,
  Table,
  Upload,
  Form,
  DatePicker,
  Space,
  TimePicker,
  Switch,
  notification,
  message,
} from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const { Text, Title } = Typography;

const { TextArea } = Input;
const config = require('./../../config');

export default function Home(props) {
  const [api, contextHolder] = notification.useNotification();
  const { user, origin } = props;
  const [login, setLogin] = useState(null);
  const [shouldRun, setShouldRun] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
  });
  const editor = useRef(null)
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch({ pagination });
  }, []);

  const [active, setActive] = useState(1);
  const actived = () => {
    active ? setActive(0) : setActive(1);
  };

  async function onSubmitHandler(value) {
    const data = {
      organization_id: user.organization_id,
      file_name: 'a',
      file_name_ori: 'aa',
      file_subject: value.file_subject,
      file_url: value.file_url,
      is_show: active,
      download: '0',
      is_deleted: '0'
    };

    const addactivitiesData = await apiInstance().post(
      'admin/management/add-documents',
      data,
    );
    if (addactivitiesData.data.status == 200) {
      openNotificationRegisterSuccess();
    } else {
      openNotificationRegisterFail(addactivitiesData.data.message);
    }
  }

  const validateURL = inputText => {
    setUrl(validator.trim(inputText));
  };

  const openNotificationRegisterSuccess = () => {
    api.success({
      message: `เพิ่มเอกสารสำเร็จ`,
      description: 'เพิ่มเอกสารแล้ว',
      placement: 'topRight',
    });
  };

  const openNotificationRegisterFail = messgae => {
    api.error({
      message: `พบปัญหาระหว่างการเพิ่มเอกสาร`,
      description: messgae,
      placement: 'topRight',
    });
  };

  const contentStyle = {
    height: 'auto',
    textAlign: 'center',
  };

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  const { Dragger } = Upload;

  const [form] = Form.useForm();

  const onReset = () => {
    setActive(1)
    form.resetFields();
  };

  return (
    <Layout
    title="Government - Admin management"
    url={origin}
    origin={origin}
    user={login}
  >
    {contextHolder}
    <link
      rel="stylesheet"
      href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
    ></link>
    <h1>เพิ่มเอกสาร</h1>
    <div className="w-5/6 lg:w-full mx-auto">
      <Form
        name="basic"
        layout="vertical"
        onFinish={onSubmitHandler}
        requiredMark={true}
        form={form}
      >
        <Form.Item
          name="file_subject"
          label="ชื่อเอกสาร :"
          className="block text-gray-700 text-sm font-bold mb-2 w-full"
          rules={[
            {
              required: true,
              message: 'กรุณากรอกชื่อเอกสาร',
            },
          ]}
        >
          <TextArea
            id="#"
            type="text"
            placeholder="ชื่อเอกสาร"
            className="resize-none border rounded-md"
            autoSize={{ minRows: 1, maxRows: 3 }}
          />
        </Form.Item>
        <Form.Item
          name="banner_title"
          label="แนบไฟล์ :"
          className="block text-gray-700 text-sm font-bold mb-2 w-full"
          rules={[
            {
              required: true,
              message: 'กรุณากรอกเลือกเอกสาร',
            },
          ]}
        >
            <Upload>
            <Button
              style={{
                  width: '100%',
                }}
              icon={<UploadOutlined />}
            >
              INPUT FILE
            </Button>
            </Upload>
        </Form.Item>
        <hr
          style={{
            backgroundColor: 'black',
            height: 2,
            width: '100%',
          }}
        />
        <p>หรือ Download จาก url</p>
        <Form.Item
          name="file_url"
          label="ที่อยู่ url :"
          className="block text-gray-700 text-sm font-bold mb-2 w-full"
          rules={[
            {
              required: true,
              message: 'กรุณากรอกที่อยู่ url ของเอกสาร',
            },
          ]}
        >
          <TextArea
            id="#"
            type="text"
            placeholder="ที่อยู่ url"
            className="resize-none border rounded-md"
            autoSize={{ minRows: 1, maxRows: 3 }}
          />
        </Form.Item>
        <Form.Item className="flex mt-6">
          <div className="lg:inline-flex w-full">
            <div className="inline-flex text-left lg:w-1/2">
              <Switch checked={active} onClick={actived} />
              <p className="mx-2 text-sm">การแสดงผล</p>
            </div>
            <div className="text-center lg:text-right w-full lg:w-1/2">
              <Button
                htmlType="button"
                onClick={onReset}
                style={{
                  backgroundColor: '#C2CFE0',
                  borderColor: '#C2CFE0',
                  height: 40,
                  width: 110,
                  marginBottom: '0px !important',
                  marginRight: '2px',
                  color: 'white !important',
                }}
                // htmlType="submit"
                className="text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full lg:w-1/4"
              >
                <Text className="text-custom-black ">รีเซ็ท</Text>
              </Button>
              <Button
                // type="primary"
                style={{
                  backgroundColor: '#059669',
                  borderColor: '#059669',
                  height: 40,
                  width: 110,
                  marginBottom: '0px !important',
                  color: 'white !important',
                }}
                htmlType="submit"
                className="text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full lg:w-1/4"
              >
                <Text className="text-custom-white ">บันทึก</Text>
              </Button>
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>

    <h4>admin/management/documents/add-documents.js</h4>
  </Layout>
  );
}
/* getServerSideProps */
export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  return {
    props: {
      origin,
    },
  };
}