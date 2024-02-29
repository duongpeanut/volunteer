import { Button, Form, Input, Select, message, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormAddItem from './FormAddItem';
import "./ManageEventDetail.scss"
import { SearchEventByIdApi, UpdateEventApi } from '../../../Apis/EventApi';

const { Option } = Select
const ManageEventDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  useEffect(() => {
    SearchEventByIdApi(id)
      .then((res => {
        setEvent(res.data.event[0])
      }))
  }, [])

  if (!event) {
    return <Spin />
  }

  const onFinish = (values) => {
    const newE = {
      _id: id,
      ...values,
      orgCondition: values.orgCondition.map(e => {
        return {
          name: e.first,
          parameter: e.last
        }
      }),
      timelines: values.timelines.map(e => {
        return {
          name: e.first,
          time: e.last
        }
      })
    }
    UpdateEventApi(newE)
      .then(() => {
        message.success("Update event thành công")
      })
      .catch(() => {
        message.error("Update event thất bại!")
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='event_detail_manager'>
      <p style={{ fontSize: '25px', textAlign: 'center' }}>Edit Event</p>
      <Form
        className='form'
        name="basic"
        // labelCol={{ span: 6 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="orgId"
          name="orgId"
          rules={[{ required: true, message: 'Please input your username!' }]}
          initialValue={event.orgId}
        >
          <Input />
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
          label="place"
          name="place"
          rules={[{ required: true, message: 'Please input your username!' }]}
          initialValue={event.place}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="description"
          rules={[
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
          initialValue={event.description}
        >
          <Input.TextArea showCount maxLength={500} rows={4} />
        </Form.Item>
        <Form.Item
          name="fee"
          label="fee"
          rules={[
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
          initialValue={event.fee}
        >
          <Input />
        </Form.Item>

        <FormAddItem event={event} />
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

export default ManageEventDetail