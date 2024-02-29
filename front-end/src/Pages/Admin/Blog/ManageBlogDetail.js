import { Button, Form, Input, Switch, message, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./ManageBlogDetail.scss"
import { UpdateBlogByIdApi, SearchBlogByIdApi } from '../../../Apis/BlogApi';

const ManageBlogDetail = () => {
  const [event, setEvent] = useState(null)
  const [form] = Form.useForm()
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    SearchBlogByIdApi(id)
      .then(res => {
        setEvent(res.data.post[0])
      })
  }, [id])
  if (!event) {
    return <Spin />
  }


  const onFinish = (values) => {
    var newBlog = { ...values, _id: id }
    UpdateBlogByIdApi(newBlog)
      .then((res) => {
        console.log(res)
      })
    message.success("success")
  };
  const onSelectedChange = (checked) => {
    form.setFieldsValue({
      on: checked ? 1 : 0
    });
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='blog_detail_manager' >
      <p style={{ fontSize: '25px', textAlign: 'center' }}>Edit Blog</p>
      <Form
        className='form'
        form={form}
        name="basic"
        labelCol={{ span: 6 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="volunteerId"
          name="volunteerId"
          rules={[{ required: true, message: 'Please input your username!' }]}
          initialValue={event.volunteerId._id}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="photo"
          name="photo"
          rules={[{ required: true, message: 'Please input your username!' }]}
          initialValue={event.photo}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="content"
          name="content"
          rules={[{ required: true, message: 'Please input your username!' }]}
          initialValue={event.content}
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
          initialValue={event.title}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="isDisplay"
          name="isDisplay"
        >
          <Switch onChange={onSelectedChange} defaultChecked={event.isDisplay} />
        </Form.Item>

        <Form.Item className='button_submit'>
          <div style={{ display: 'flex' }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button style={{ marginLeft: '10px' }} onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ManageBlogDetail