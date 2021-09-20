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
import moment from 'moment';
// import UserNav from '../components/navigation/User';
import { useEffect, useState, useRef } from 'react';

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
  Tooltip,
  Dropdown,
  Menu,
  Select,
} from 'antd';
const { Text, Title } = Typography;
const { Option } = Select;

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
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
    _fetchUserLogin();
  }, []);

  async function _fetchUserLogin() {
    const userLogin = await checkIsLogin();
    console.log(user);
  }

  const [active, setActive] = useState('');
  const actived = () => {
    active ? setActive(0) : setActive(1);
  };

  const [datestart, setDatestart] = useState('');

  const [dateend, setDateend] = useState('');

  const [menu, setMenu] = useState('');

  const [tender_type, setTender_type] = useState(null)

  async function onSubmitHandler(value) {
    var date_s_Str = moment(value.tender_date).format()
    var date_e_Str = moment(value.expire_date).format()
    const data = {
      organization_id: user.organization_id,
      tender_date: date_s_Str,
      //   type_tender_id: value.type_tender_id,
      type_tender_id: menu,
      tender_title: value.tender_title,
      tender_detail: value.tender_detail,
      tender_keyword: value.tender_keyword,
      expire_date: date_e_Str,
      status_active: active,
    };

    const addactivitiesData = await apiInstance().post(
      'admin/management/add-tender',
      data,
    );
    if (addactivitiesData.data.status == 200) {
      openNotificationRegisterSuccess();
      // setTimeout(function () { //Start the timer
      //   router.push('/login')
      // }.bind(this), 2000)
    } else {
      openNotificationRegisterFail(addactivitiesData.data.message);
    }
  }

  const validateURL = inputText => {
    setUrl(validator.trim(inputText));
  };

  const openNotificationRegisterSuccess = () => {
    api.success({
      message: `เพิ่มประกาศจัดซื้อจัดจ้างสำเร็จ`,
      description: 'เพิ่มประกาศจัดซื้อจัดจ้างแล้ว',
      placement: 'topRight',
    });
  };

  const openNotificationRegisterFail = messgae => {
    api.error({
      message: `พบปัญหาระหว่างการเพิ่มประกาศจัดซื้อจัดจ้าง`,
      description: messgae,
      placement: 'topRight',
    });
  };

  const contentStyle = {
    height: 'auto',
    textAlign: 'center',
  };

  useEffect(() => {
    fetch({ pagination });
    tender_typeData();
  }, []);

  const tender_typeData = async () => {
    const tender_type_Data = await apiInstance().get(
      'admin/management/tender_type'
    );

    setTender_type(tender_type_Data.data.data)
  }

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  const [form] = Form.useForm();

  const onReset = () => {
    setActive(1)
    form.resetFields();
  };


  function handleChange(value) {
    console.log(`selected ${value}`);
    setMenu(value);
  }
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
    <h1>เพิ่มประกาศจัดซื้อจัดจ้าง</h1>
    <div className="w-5/6 lg:w-full mx-auto">
      <Form
        name="basic"
        layout="vertical"
        onFinish={onSubmitHandler}
        requiredMark={true}
        form={form}
      >
        <Form.Item
          name="tender_title"
          label="ชื่อประกาศจัดซื้อจัดจ้าง :"
          className="block text-gray-700 text-sm font-bold mb-2 w-full"
          rules={[
            {
              required: true,
              message: 'กรุณากรอกชื่อจัดซื้อจัดจ้าง',
            },
          ]}
        >
          <TextArea
            id="#"
            type="text"
            placeholder="ชื่อประกาศจัดซื้อจัดจ้าง"
            className="resize-none border rounded-md"
            autoSize={{ minRows: 1, maxRows: 3 }}
          />
        </Form.Item>
        <Form.Item
          name="type_tender_id"
          label="ประเภทประกาศ :"
          className="block text-gray-700 text-sm font-bold mb-2 w-full"
        >
          <div className="w-full">
            <Select
              defaultValue="1"
              onChange={handleChange}
            >
               <Option value="0">เลือก</Option>
              {tender_type ? tender_type.map((object) => {
                return <Option value={object.tender_type_id}>{object.tendet_type_name}  </Option>
              }) : ""}
            </Select>
          </div>
        </Form.Item>
        <Form.Item
          name="tender_detail"
          label="รายละเอียด :"
          className="block text-gray-700 text-sm font-bold mb-2 w-full"
          rules={[
            {
              required: true,
              message: 'กรุณากรอกรายละเอียดจัดซื้อจัดจ้าง',
            },
          ]}
        >
          <JoditEditor
            ref={editor}
            value={content}
            config={config.config(user)}
            height={"700px"}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => { }}
          />
        </Form.Item>
        <Form.Item
          name="tender_date"
          label="วันที่ลงข่าวจัดซื้อจัดจ้าง :"
          className="block text-gray-700 text-sm font-bold mb-2 w-full "
          rules={[
            {
              required: true,
              message: 'กรุณากรอกเลือกวันที่ลงการแสดงจัดซื้อจัดจ้าง',
            },
          ]}
        >
        <DatePicker
                format="YYYY-MM-DD"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              // showTime={{ defaultValue: moment('00:00:00') }}
              />
        </Form.Item>
        <Form.Item
          name="expire_date"
          label="วันที่สิ้นสุดการแสดงประกาศ :"
          className="block text-gray-700 text-sm font-bold mb-2 w-full "
          rules={[
            {
              required: true,
              message: 'กรุณากรอกเลือกวันที่สิ้นสุดการแสดงจัดซื้อจัดจ้าง',
            },
          ]}
        >
        <DatePicker
                format="YYYY-MM-DD"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              // showTime={{ defaultValue: moment('00:00:00') }}
              />
        </Form.Item>
        <Form.Item
          name="tender_keyword"
          label="Keyword สำหรับทำ SEO :"
          className="block text-gray-700 text-sm font-bold mb-2 w-full"
        >
          <TextArea
            id="#"
            type="text"
            placeholder="Keyword สำหรับทำ SEO :"
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
    <h4>admin/management/purchase-news/add-purchase-news.js</h4>
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