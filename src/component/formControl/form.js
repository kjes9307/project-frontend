import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const LoginForm = () => {
  const [form] = Form.useForm();
  const onFinish = async(values) => {
    console.log('Success:', values);
    this.props.history.push('/post')
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    // <Form
    //   name="basic"
    //   onFinish={onFinish}
    //   onFinishFailed={onFinishFailed}
    //   autoComplete="off"
    //   form={form} 
    // >
     <div>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
        >
        <Input prefix={<UserOutlined className="site-form-item-icon" />}  
              className="login-form-input"
              placeholder="Username" />
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
        <Button type="primary" className="login-form-button" htmlType="submit" >
          登入
        </Button>
      </div>

  );
};

export default LoginForm;