import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import {userRegistry,userLogin} from '../../API'
import userStatuRecorder from "../../util/memoryParams";
import memoryService from "../../util/memoryUtil";
import userInfo from "../../util/memoryUser"

const LoginForm = (params) => {
  const [form] = Form.useForm();
  const {action} = params
  const onSubmit = async (values) => {
      let callType = Object.keys(values).length
      // console.log(values)
      let resposne
      if(callType > 2){
        resposne = await userRegistry(values)
        if(resposne.status === 201){
          message.success("Registry Success",2)
          form.resetFields();
          params.modeSwitch();
        }
      }
      else{ 
        resposne = await userLogin(values);
        if(resposne.status === 200){  
          let obj = {}
          obj.sex = resposne.data.sex;
          obj.name = resposne.data.name;
          obj.photo = resposne.data.photo || "https://i.imgur.com/2qPisdC.png";
          userInfo.saveUser(obj);
          userStatuRecorder[0]= resposne.data.token;
          memoryService.saveUser(resposne.data.token);
          message.success("Login Success",2)
          form.resetFields();
          params.history.replace('/post')
        }
      }
  };
  const onFailed = (errorInfo) => {
    message.error('validate failed',10);
  }
  return (
    <div className="login-form">
      <Form
          name="normal_login"
          className="login-form"
          form={form} 
          onFinish={onSubmit} onFinishFailed={onFailed}
          >
        {action ||
          <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
            },
          ]}
          >
          <Input prefix={<UserOutlined className="site-form-item-icon" />}  
                className="login-form-input"
                placeholder="暱稱" />
          </Form.Item>
        }
        <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
      <Input
        prefix={<MailOutlined className="site-form-item-icon" />}
        type="email"
        className="login-form-input"
        placeholder="email"
        rules={[{ 
          required: true,
          type: 'email' 
        }]}
        />
        </Form.Item>
        <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
        >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          className="login-form-input"
          placeholder="Password"
        />
        </Form.Item>
        {action ||
          <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'confirm your password!',
            },
          ]}
          >
          <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          className="login-form-input"
          placeholder="Confirm Password"
          />
          </Form.Item>
        }
          <Button type="primary" className="login-form-button" htmlType="submit"  >
          {action? "登入":"註冊"}
          </Button>
          <div className="register" onClick={params.modeSwitch}>
            {action? "註冊帳號":"登入"}
          </div>
        </Form>
      </div>

  );
};

export default LoginForm;