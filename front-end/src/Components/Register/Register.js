import { Form, Input, Select, Button, message } from 'antd';
import { RegisterApi } from '../../Apis/LoginApi';
import imgModalSignUp from './modalSignUp.jpg';
import "./Register.scss"

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        lg: { span: 8 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        lg: { span: 32 }
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const Register = ({ setLoginIsShow }) => {
    const [form] = Form.useForm()
    const onFinish = async (values) => {
        try {
            var res = await RegisterApi(values)
            message.success(res.data.message)
            setLoginIsShow(0)
        }
        catch (e) {
            message.warning(e.response.data.message)
        }
    };

    return (
        <div className='register_container' >
            <div className='modal-login-img-container'>
                <img className='modal-login-img' src={imgModalSignUp} style={{ width: '100%' }} />
            </div>
            <Form
                {...formItemLayout}
                className="form"
                form={form}
                name="register"
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            min: 6,
                            message: 'Password phải dài ít nhất 6 ký tự!'
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="username"
                    label="UserName"
                    rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="fullname"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Please input fullname!' }]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Địa chỉ"
                    rules={[{ required: true, message: 'Please input address!' }]}
                >
                    <Input style={{ width: '100%' }} />

                </Form.Item>

                <Form.Item
                    name="role"
                    label="Vai trò"
                    rules={[{ required: true, message: 'Please input rule' }]}
                >
                    <Select placeholder="Please select a vai trò">
                        <Option value="volunteer">Tình nguyện viên</Option>
                        <Option value="organization">Tổ chức tình nguyện</Option>
                    </Select>
                </Form.Item>

                <Form.Item className='button_submit'>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
                <p style={{ marginLeft: 'auto', width: 'fit-content' }}>Bạn đã có tài khoản? <b onClick={() => setLoginIsShow(1)} style={{ color: 'red', fontStyle: 'italic', cursor: 'pointer' }}>Đăng nhập</b></p>
            </Form>

        </div>
    )
}
export default Register