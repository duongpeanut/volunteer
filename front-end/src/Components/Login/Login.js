import { Form, Input, Button, message } from 'antd';
import imgModalLogin from './modalLogin.jpg';
import { LoginApi } from '../../Apis/LoginApi';
import './Login.scss'
const Login = (props) => {
    const onFinish = async (values) => {
        try {
            var res = await LoginApi(values)
            message.success(res.data.message)
            props.setLoginIsShow(0)
            localStorage.setItem("token", res.data.refreshToken)
            localStorage.setItem("user", JSON.stringify(res.data.user))
            props.setUser(res.data.user)
        }
        catch (e) {
            message.warning(e.response.data.message)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };
    return (
        <div className="login-container">
            <div className='modal-login-img-container' >
                <img className='modal-login-img' src={imgModalLogin} />
            </div>
            <Form
                name="basic"
                className='form'
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    label="Tài khoản"
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng điền tài khoản!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng điền password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset} style={{ marginLeft: '10px' }}>
                        Reset
                    </Button>
                </Form.Item>
                <p style={{ marginLeft: 'auto', width: 'fit-content' }}>Bạn chưa có tài khoản? <b onClick={() => props.setLoginIsShow(2)} style={{ color: 'red', fontStyle: 'italic', cursor: 'pointer' }}>Đăng ký</b></p>
            </Form>

        </ div>
    )
}
export default Login