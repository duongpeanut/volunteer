import { Descriptions, Button, Modal, Form, Input, message, Calendar } from "antd"
import { useState } from "react"
import { ChagePasswordApi } from "../../Apis/LoginApi"
const Profile = (props) => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")))
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {

    if (values.newPassword === values.reNewPassword) {
      var user = {
        id: JSON.parse(localStorage.getItem("user"))._id,
        ...values
      }
      await ChagePasswordApi(user)
        .then(() => {
          message.success("Thay đổi password thành công")
          setIsModalVisible(false);
        })
        .catch(() => {
          message.error("Không thể thay đổi password")
        })
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error("thay đổi không thành công")
  };
  return (
    <div style={{ marginTop: '100px', padding: '20px' }}>
      <Descriptions title="User Info" bordered column={{ xs: 1, sm: 1, md: 1 }}>
        <Descriptions.Item label="UserName">{user.username}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
        <Descriptions.Item label="IsActive">{user.isActive.toString()}</Descriptions.Item>
        <Descriptions.Item label="Create at">
          {user.createdAt}
        </Descriptions.Item>
      </Descriptions>
      <Button
        type="primary"
        style={{ marginLeft: 'auto', width: 'fit-content', display: 'block', marginTop: '20px' }}
        onClick={showModal}
      >Change Password
      </Button>

      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >

          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[{ required: true, message: 'Please input your old password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: 'Please input your New Password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Re- New Password"
            name="reNewPassword"
            rules={[{ required: true, message: 'Please input your Re- New Password!' },
            () => ({
              validator(_, value) {
                var pass = form.getFieldValue("newPassword")
                if (value !== pass) {
                  return Promise.reject('Re-enter New Password is not match new password!')
                }
                return Promise.resolve()
              }
            })
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button style={{ marginLeft: '20px' }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Profile