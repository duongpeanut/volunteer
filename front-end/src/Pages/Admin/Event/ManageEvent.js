import { Table, Popconfirm, message, Tooltip, Image, Spin } from 'antd';
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import AddEvent from './AddEvent';
import { GetAllEventsApi, DeleteEventApi } from '../../../Apis/EventApi';

const ManageEvent = () => {
  const [currentRow, setCurrentRow] = useState([])
  const [events, setEvents] = useState(null)
  const [isLoad, setIsLoad] = useState(true)

  useEffect(() => {
    GetAllEventsApi()
      .then((res) => {
        setEvents(res.data.events)
      })
    setIsLoad(false)
  }, [])

  if (isLoad || events === null) {
    return <Spin style={{ marginTop: '100px' }} />
  }
  const confirm = () => {
    DeleteEventApi(currentRow._id)
      .then(res => {
        var newE = events.filter(e => {
          return e._id !== currentRow._id
        })
        setEvents(newE)
        message.success("Xóa event thành công")
      })
      .catch(() => {
        message.error("Xóa thất bại")
      })
  }

  const cancel = () => {
    message.error('Yêu cầu xóa đã bị hủy');
  }
  const columns = [
    {
      title: 'id',
      dataIndex: '_id',
    },
    {
      title: 'orgId',
      dataIndex: 'orgId',
    },
    {
      title: 'photo',
      dataIndex: 'photo',
      ellipsis: {
        showTitle: false,
      },
      render: photo => (
        <Image
          width={100}
          src={photo}
        />
      ),
    },
    {
      title: 'Name Event',
      dataIndex: 'nameEvent',
      ellipsis: {
        showTitle: false,
      },
      render: nameEvent => (
        <Tooltip placement="topLeft" title={nameEvent}>
          {nameEvent}
        </Tooltip>
      ),
    },
    {
      title: 'state',
      dataIndex: 'state',
      ellipsis: {
        showTitle: false,
      },
      render: state => (
        <Tooltip placement="topLeft" title={state}>
          {state}
        </Tooltip>
      ),
    },
    {
      title: 'description',
      dataIndex: 'description',
      ellipsis: {
        showTitle: false,
      },
      render: description => (
        <Tooltip placement="topLeft" title={description}>
          {description}
        </Tooltip>
      ),
    },
    {
      title: 'timelines',
      dataIndex: 'timelines',
      ellipsis: {
        showTitle: false,
      },
      render: timelines => (
        <Tooltip placement="topLeft" title={<ul>
          {timelines.map((time, index) => (
            <li key={index}>{JSON.stringify(time)}</li>
          ))}
        </ul>}>
          Timelines...
        </Tooltip>
      ),
    },
    {
      title: 'orgConditions',
      dataIndex: 'orgConditions',
      ellipsis: {
        showTitle: false,
      },
      render: orgConditions => (
        <Tooltip placement="topLeft" title={
          <ul>
            {orgConditions.map((time, index) => (
              <li key={index}>{JSON.stringify(time)}</li>
            ))}
          </ul>
        }>
          Org conditions...
        </Tooltip>
      ),
    },
    {
      title: 'fee',
      dataIndex: 'fee',
      ellipsis: {
        showTitle: false,
      },
      render: fee => (
        <Tooltip placement="topLeft" title={fee}>
          {fee}
        </Tooltip>
      ),
    },
    {
      title: 'Action',
      fixed: 'right',
      width: 110,
      render: () => <>
        <Link to={currentRow._id ? currentRow._id : ""} >Edit</Link> |
        <Popconfirm
          title="Are you sure to delete this event?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <span style={{ color: 'red', cursor: 'pointer' }}>Delete</span>
        </Popconfirm>

      </>,

    },
  ];

  return (
    <div style={{ marginTop: '100px' }} >
      <AddEvent setEvents={setEvents} events={events} />
      <Table
        dataSource={events}
        columns={columns}
        pagination={{ defaultPageSize: '5', pageSizeOptions: [5, 10, 15], onShowSizeChange: 'true' }}
        rowKey="_id"
        scroll={{ x: 800 }}
        onRow={(record, rowIndex) => {
          return {
            onMouseMove: () => { setCurrentRow(record) },
          };
        }}
      />
    </div>
  )
}
export default ManageEvent