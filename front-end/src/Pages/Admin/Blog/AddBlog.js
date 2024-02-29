import { AppstoreAddOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Switch, Input, message } from "antd"
import { useState } from 'react';
import { CreateBlogApi } from '../../../Apis/BlogApi';
const AddBlog = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    const newBlog = { ...values, volunteerId: JSON.parse(localStorage.getItem("user"))._id }
    CreateBlogApi(newBlog)
      .then((res) => {
        var newList = [...props.blogs]
        newList.push(res.data.post)
        props.setBlogs(newList)
        setIsModalVisible(false);
        message.success("Thêm blog thành công")
      })
      .catch(() => {
        message.error("Thêm blog thất bại")
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (

    <div>
      <Button
        type="primary"
        shape="round"
        icon={<AppstoreAddOutlined />}
        onClick={showModal}
        style={{ margin: '0 20px 20px auto', display: 'block', width: 'fit-content', marginBottom: '20px' }}>
        Add Blog
      </Button>
      <Modal title="Add Blog" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form
          className='form'
          name="basic"
          style={{ width: '100%' }}
          labelCol={{ span: 5 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="photo"
            name="photo"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="content"
            name="content"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="title"
            rules={[
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="isDisplay"
            name="isDisplay"
            valuePropName='checked'
          >
            <Switch />
          </Form.Item>

          <Form.Item className='button_submit' style={{ marginLeft: 'auto', display: 'block', width: 'fit-content' }}>
            <div style={{ display: 'flex' }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button style={{ marginLeft: '10px' }} onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
export default AddBlog