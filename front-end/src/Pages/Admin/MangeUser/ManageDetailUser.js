import { Button, Form, Input, Select, Switch, message, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./ManageDetailUser.scss"
import { UpdateUserApi, GetUserByIdApi } from '../../../Apis/UserApi';

const { Option } = Select
const ManageDetailUser = () => {
  const [form] = Form.useForm()
  const { id } = useParams()
  const [user, setUser] = useState(null)
  useEffect(() => {
    GetUserByIdApi(id)
      .then((res) => {
        setUser(res.data.user)
      })
  }, [id])
  if (!user) {
    return <Spin />
  }

  const onSelectedChange = (checked) => {
    form.setFieldsValue({
      on: checked ? 1 : 0
    });
  }


  const onFinish = (values) => {
    console.log(values)
    var newUser = {
      _id: id,
      ...values
    }
    UpdateUserApi(newUser)
      .then(() => {
        message.success("Update user thành công")
      })
      .catch(() => {
        message.error("Update user thất bại")
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='user_detail_manager'>
      <p style={{ fontSize: '25px', textAlign: 'center' }}>Edit User</p>
      <Form
        className="form"
        form={form}
        name="basic"
        labelCol={{ span: 6 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
          initialValue={user.username}
        >
          <Input />
        </Form.Item>
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
          initialValue={user.email}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="role"
          label="Vai trò"
          rules={[{ required: true, message: 'Please input rule' }]}
          initialValue={user.role}
        >
          <Select placeholder="Please select a vai trò">
            <Option value="volunteer">Tình nguyện viên</Option>
            <Option value="organization">Tổ chức tình nguyện</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="IsActive"
          name="isActive"
        >
          <Switch onChange={onSelectedChange} defaultChecked={user.isActive} />
        </Form.Item>

        <Form.Item className='button_submit'>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ManageDetailUser