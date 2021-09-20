import Link from 'next/link';
import { useRouter } from 'next/router';
/* utils */
import { absoluteUrl, checkIsLogin, apiInstance, convertDateDBtoDatePickerNoTime } from '../../../../middleware/utils';

/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
// import UserNav from '../components/navigation/User';
import { useEffect, useState } from 'react'
import moment from 'moment';
import validator from 'validator'
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
  notification,
  Form,
  DatePicker,
  Select,
  Switch
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
const { Text, Title } = Typography;
const { Option } = Select;

export default function Home(props) {
  const { user, origin } = props;
  const [url, setUrl] = useState("")
  const [informationData, setInformationData] = useState(null)
  const [isUse, setIsUse] = useState(1);
  const [fields, setFields] = useState([
    {
      name: ['information_title'],
      value: '',
    },
  ]);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const { informationId } = router.query

  async function onSubmitHandler(value) {
    // console.log("value")
    // console.log(value)
    const data = {
      'infor_title': value.infor_title,
      'infor_detail': value.infor_detail,
      'infor_image': imageLandingPage,
      'infor_date': date,
      'infor_keyword': infor_keyword,
      'infor_view': '0',
      'status_active': active,
      'is_deleted': '0',
    }
    // console.log(data)
    const registerData = await apiInstance().put('/information/' + informationId, data);
    if (registerData.data.status == 200) {
      openNotificationRegisterSuccess()
      fetchInformationData();

    } else {
      openNotificationRegisterFail(registerData.data.message)

    }
  }


  const openNotificationRegisterSuccess = () => {
    api.success({
      message: `บันทึกข้อมูลสำเร็จ`,
      description: 'บันทึกข้อมูลสำเร็จ',
      placement: 'topRight',
    });
  };

  const openNotificationRegisterFail = (messgae) => {
    api.error({
      message: `พบปัญหาระหว่างการบันทึกข้อมูล`,
      description: messgae,
      placement: 'topRight',
    });
  };
  const validateURL = (inputText) => {
    setUrl(validator.trim(inputText))
  }

  useEffect(() => {
    fetchInformationData();
  }, [])

  const onResetForm = () => {
    setIsUse(informationData.is_use == 1 ? 1 : 0)
    setFields([
      {
        name: ['infor_title'],
        value: informationData.infor_title,
      },
      {
        name: ['infor_detail'],
        value: informationData.infor_detail,
      },
      {
        name: ['infor_image'],
        value: informationData.infor_image,
      },
      {
        name: ['infor_date'],
        value: convertDateDBtoDatePickerNoTime(informationData.infor_date),
      },
      {
        name: ['infor_keyword'],s
        value: informationData.infor_keyword,
      },
      {
        name: ['status_active'],
        value: informationData.status_active,
      },

    ])
  }
  const fetchInformationData = async () => {

    const _informationData = await apiInstance().get(
      'information/' + informationId
    );

    setInformationData(_informationData.data.information)
    setFields([
      {
        name: ['infor_title'],
        value: _informationData.data.information.infor_title,
      },
      {
        name: ['infor_detail'],
        value: _informationData.data.information.infor_detail,
      },
      {
        name: ['infor_image'],
        value: _informationData.data.information.infor_image,
      },
      {
        name: ['infor_date'],
        value: convertDateDBtoDatePickerNoTime(_informationData.data.information.infor_date),
      },
      {
        name: ['infor_keyword'],
        value: _informationData.data.information.infor_keyword,
      },
      {
        name: ['status_active'],
        value: _informationData.data.information.status_active,
      },

    ])
  };
  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  return (
    <Layout title="Government - Admin management" titlePage={"แก้ไขข่าวประชาสัมพันธ์ " + (informationData ? informationData.information_title : "")} url={origin} indexMenu={"2"} origin={origin} props={props} _routes={[
      {
        path: '/admin/dashborad',
        breadcrumbName: 'หน้าหลัก',
      }, {
        path: '/admin/management-information',
        breadcrumbName: 'จัดการข่าวประชาสัมพันธ์',
      }, {
        path: '/admin/management-information/add-information',
        breadcrumbName: 'แก้ไขข่าวประชาสัมพันธ์',
      }]}>
      <div>
        {contextHolder}
        {/* {JSON.stringify(organizationData)} */}
        <Row >
          {/* {JSON.stringify(organizationData)} */}
          <Form
            name="basic"
            className="w-full"
            // initialValues={{ email: email, invitationCode: code }}
            layout="vertical"
            onFinish={onSubmitHandler}
            // onFinishFailed={onFinishFailed}
            requiredMark={true}
            fields={fields}
          >


            <Form.Item
              name="infor_title"
              label="ชื่อข่าวประชาสัมพันธ์"
              className="block text-gray-700 text-sm font-bold mb-2 w-full form-organization"
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกชื่อข่าวประชาสัมพันธ์',
                },
              ]}
            >
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="#"
                type="text"
                placeholder="ชื่อข่าวประชาสัมพันธ์"
              />
            </Form.Item>
            <div style={{ clear: "both" }}></div>
            <Form.Item
              name="infor_detail"
              label="รายละเอียด"
              className="block text-gray-700 text-sm font-bold mb-2 w-full form-organization"
              style={{ textAlign: "left !important" }}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกรายละเอียดข่าวประชาสัมพันธ์',
                },
              ]}
            >
              <TextArea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="#"
                type="textarea"
                placeholder="รายละเอียดข่าวประชาสัมพันธ์"
                rows={5}
              />
            </Form.Item>
            <div style={{ clear: "both" }}></div>
            <Form.Item
              name="activities_date"
              label="วันที่ลงข่าวประชาสัมพันธ์"
              className="block text-gray-700 text-sm font-bold mb-2 w-full form-organization"
              style={{ textAlign: "left !important" }}
              rules={[
                {
                  required: true,
                  message: 'กรุณากรอกเลือกวันที่ลงข่าวประชาสัมพันธ์',
                },
              ]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              // showTime={{ defaultValue: moment('00:00:00') }}
              />

            </Form.Item>
            <div style={{ clear: "both" }}></div>
            <Form.Item
              name="infor_keyword"
              label="Keyword สำหรับทำ SEO"
              className="block text-gray-700 text-sm font-bold mb-2 w-full form-organization"
            >
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" size="large" placeholder="Email"
              // onChange={() => setEmailText(event.target.value)} 
              />
            </Form.Item>
            <div style={{ clear: "both" }}></div>
            <Form.Item className="flex mt-6">
              <div className="lg:inline-flex w-full">
                <div className="lg:inline-flex text-left w-1/2">
                  <Switch className="swt-btn" checked={isUse} onClick={(value) => setIsUse(value ? 1 : 0)} />
                  <p className="mx-2 text-sm">สถานะการใช้งาน</p>

                </div>
                <div className="text-center lg:text-right w-full lg:w-1/2">
                  <Button
                    htmlType="button"
                    onClick={onResetForm}
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
        </Row>

      </div>


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
