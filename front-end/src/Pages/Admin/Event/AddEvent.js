import { AppstoreAddOutlined } from '@ant-design/icons';
import { Button, Modal, Form, message, Input } from "antd"
import FormAddItem from './FormAddItem';
import { useState } from 'react';
import { CreateEventApi } from '../../../Apis/EventApi';

const AddEvent = (props) => {
  const [form] = Form.useForm();
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
    var newEvent = {
      orgId: JSON.parse(localStorage.getItem("user"))._id,
      nameEvent: values.nameEvent,
      photo: values.photo,
      place: values.place,
      description: values.description,
      fee: values.fee,
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
    CreateEventApi(newEvent)
      .then(res => {
        var newEv = [...props.events]
        newEv.push(res.data.newEvent)
        props.setEvents(newEv)
        message.success("Tạo event thành công!")
        form.resetFields()
        setIsModalVisible(false);
      })
      .catch(() => {
        message.error("Thêm event gặp lỗi!")
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
        Add Event
      </Button>
      <Modal title="Add Event" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          className='form'
          style={{ width: '100%' }}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name event"
            name="nameEvent"
            rules={[{ required: true, message: 'Please input your nameEvent!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="photo"
            name="photo"
            rules={[{ required: true, message: 'Please input your photo!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="place"
            name="place"
            rules={[{ required: true, message: 'Please input your place!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="description"
            rules={[
              {
                required: true,
                message: 'Please input your description!',
              },
            ]}
          >
            <Input.TextArea showCount maxLength={500} rows={4} />
          </Form.Item>
          <Form.Item
            name="fee"
            label="fee"
            rules={[
              {
                required: true,
                message: 'Please input your fee!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <FormAddItem />
          <Form.Item className='button_submit'>
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
export default AddEvent