import Link from 'next/link';
import dynamic from 'next/dynamic';
/* utils */
import {
  absoluteUrl,
  checkIsLogin,
  apiInstance,
} from '../../../../middleware/utils';
import axios from 'axios';

/* components */
import Layout from '../../../../components/layout/LayoutAdmin';
// import UserNav from '../components/navigation/User';
import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment';
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
import { InboxOutlined } from '@ant-design/icons';

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
  const [previewImage, setPreviewImage] = useState(null)
  const [imageLandingPage, setImageLandingPage] = useState(null)
  const [previewVisible, setPreviewVisible] = useState(false)

  useEffect(() => {
    fetch({ pagination });
  }, []);

  const [slide, setSlide] = useState(1);
  const slider = () => {
    slide ? setSlide(0) : setSlide(1);
  };

  const [active, setActive] = useState(1);
  const actived = () => {
    active ? setActive(0) : setActive(1);
  };

  const [date, setDate] = useState('');

  async function onSubmitHandler(value) {
    const data = {
      organization_id: user.organization_id,
      infor_title: value.infor_title,
      infor_detail: value.infor_detail,
      // activities_image: value.activities_image,
      infor_image: imageLandingPage,
      infor_date: date,
      // activities_date: '2001-01-31 17:00:00',
      infor_keyword: value.infor_keyword,
      infor_view: '0',
      status_active: active,
      is_deleted: 0,
    };

    const addinforData = await apiInstance().post(
      'admin/management/add-information',
      data,
    );
    if (addinforData.data.status == 200) {
      openNotificationRegisterSuccess();
      // setTimeout(function () { //Start the timer
      //   router.push('/login')
      // }.bind(this), 2000)
    } else {
      openNotificationRegisterFail(addinforData.data.message);
    }
  }

  const validateURL = inputText => {
    setUrl(validator.trim(inputText));
  };

  const openNotificationRegisterSuccess = () => {
    api.success({
      message: `????????????????????????????????????????????????????????????????????????????????????`,
      description: '??????????????????????????????????????????????????????????????????????????????',
      placement: 'topRight',
    });
  };

  const openNotificationRegisterFail = messgae => {
    api.error({
      message: `?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????`,
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

  function onChange(value, dateString) {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
    setDate(dateString);
  }

  const [form] = Form.useForm();

  const onReset = () => {
    setActive(1)
    setSlide(1)
    form.resetFields();
  };

  const imageUploadprops = {
    name: 'file',
    multiple: false,
    listType: 'text',
    maxCount: 1,
    action: "/api/upload/landing-page",
    preview: false,
    // uid: user.type_user == 1 ? "admin" : user.organization_id,
    // beforeUpload(file) {
    // 	const isLt10M = file.size / 1024 / 1024 < 10
    // 	if (!isLt10M) {
    // 		notification.open({
    // 			message: 'Upload error!',
    // 			description: <Text className="text-black">Image must smaller than 10MB!</Text>,
    // 		})
    // 	}
    // 	return isLt10M
    // },
    customRequest: (options) => {
      const data = new FormData()
      data.append('file', options.file)
      data.append('id', user.type_user == 1 ? "admin" : user.organization_id)
      const config = {
        "headers": {
          "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
        }
      }
      axios.post(options.action, data, config).then((res) => {
        // imageLandingPage
        // console.log(res.data.data.list[0]._name) 
        setImageLandingPage(res.data.data.list[0]._name)
        options.onSuccess(res.data, options.file)
      }).catch((err) => {
        console.log(err)
      })

    },
    async onChange(info) {
      const { status } = info.file
      // console.log(user)
      switch (info.file.status) {
        // case "uploading":
        //   nextState.selectedFileList = [info.file];
        //   break;
        case "done":
          if (!info.file.url && !info.file.preview) {
            info.file.preview = await getBase64(info.file.originFileObj);
          }
          setPreviewImage(info.file.url || info.file.preview)
          setPreviewVisible(true)
          break;

        default:
          // error or removed
          resetImagePreview()
      }
      //console.log(info.file)

      // this.setState({
      //   previewImage: file.url || file.preview,
      //   previewVisible: true,
      // });

    },
    onRemove(info) {
      console.log("onRemove")
      console.log(info)
      resetImagePreview()

    }
  }

  const resetImagePreview = () => {
    setPreviewVisible(false)
    setPreviewImage(null)
  }

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  return (
    <Layout
      title="Government - Admin management"
      url={origin}
      origin={origin}
      user={login}
      indexSubMenu={"1"}
      indexMenu={"sub-1-1"}
    >
      {contextHolder}
      <link
        rel="stylesheet"
        href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
      ></link>
      <h1>??????????????????????????????????????????????????????????????????</h1>
      <div className="w-5/6 lg:w-full mx-auto">
        <Form
          name="basic"
          layout="vertical"
          onFinish={onSubmitHandler}
          requiredMark={true}
          form={form}
        >
          <Form.Item
            name="infor_title"
            label="??????????????????????????????????????????????????????????????? :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[
              {
                required: true,
                message: '??????????????????????????????????????????????????????????????????????????????????????????',
              },
            ]}
          >
            <TextArea
              id="#"
              type="text"
              placeholder="???????????????????????????????????????????????????????????????"
              className="resize-none border rounded-md"
              autoSize={{ minRows: 1, maxRows: 3 }}
            />
          </Form.Item>
          <Form.Item
            name="infor_detail"
            label="?????????????????????????????? :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[
              {
                required: true,
                message: '????????????????????????????????????????????????????????????????????????????????????????????????????????????',
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
            name="infor_image"
            label="?????????????????????????????????????????????????????????????????? :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
            rules={[
              {
                required: true,
                message: '????????????????????????????????????????????????????????????????????????????????????????????????????????????',
              },
            ]}
          >
            {/* <Dragger {...dropimg}> */}
            <Dragger
                maxCount={1}
                // listType="picture"
                accept=".jpg, .jpeg, .png"
                {...imageUploadprops}
              >

                {previewVisible && <><Image
                  // width={200}
                  preview={false}
                  src={previewImage}
                />
                </>
                }
                {!previewVisible && <>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    ???????????? ???????????? ???????????????????????????????????????????????????????????????????????????????????????????????????
                  </p>
                </>
                }
              </Dragger>
          </Form.Item>
          <Form.Item
            name="activities_date"
            label="??????????????????????????????????????????????????????????????????????????? :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full "
            rules={[
              {
                required: true,
                message: '?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
              },
            ]}
          >

            <DatePicker
              className="w-full"
              showTime
              onChange={onChange}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item
            name="infor_keyword"
            label="Keyword ???????????????????????? SEO :"
            className="block text-gray-700 text-sm font-bold mb-2 w-full"
          >
            <TextArea
              id="#"
              type="text"
              placeholder="Keyword ???????????????????????? SEO :"
              className="resize-none border rounded-md"
              autoSize={{ minRows: 1, maxRows: 3 }}
            />
          </Form.Item>
          <Form.Item className="flex mt-6">
            <div className="lg:inline-flex w-full">
              <div className="inline-flex text-left lg:w-1/2">
                <Switch checked={active} onClick={actived} />
                <p className="mx-2 text-sm">???????????????????????????</p>
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
                  <Text className="text-custom-black ">??????????????????</Text>
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
                  <Text className="text-custom-white ">??????????????????</Text>
                </Button>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>

      <h4>admin/management/activities/add-activities.js</h4>
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