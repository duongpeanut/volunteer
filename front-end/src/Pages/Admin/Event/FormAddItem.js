import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';


const FormAddItem = (props) => {
  const tline = []
  const ocondition = []
  if (props.event) {
    props.event.timelines.forEach(time => {
      tline.push({ 'first': time.name, 'last': time.time })
    });

    props.event.orgConditions.forEach(time => {
      ocondition.push({ 'first': time.name, 'last': time.parameter })
    });
  }

  const onFinish = values => {
    console.log('Received values of form:', values);
  };
  return (
    <>
      <p>Timelines:</p>
      <Form.List name="timelines" initialValue={tline}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item style={{ width: '300px' }}>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Timelines
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <p>orgCondition:</p>
      <Form.List name="orgCondition" initialValue={ocondition}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item style={{ width: '300px' }}>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add OrgCondition
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  )
}
export default FormAddItem