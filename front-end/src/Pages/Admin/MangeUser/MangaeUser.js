import { GetAllUserApi,DeleteUserApi } from "../../../Apis/UserApi"
import { Table, Popconfirm, message, Spin } from 'antd';
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
const ManageUser = () => {
  const [users, setUsers] = useState(null)
  const [currentRow, setCurrentRow] = useState([])
  useEffect(() => {
    GetAllUserApi()
      .then((res) => {
        setUsers(res.data)
      })
  }, [])

  if (!users) {
    return <Spin />
  }

  const confirm = () => {
    DeleteUserApi(currentRow.id)
      .then(() => {
        message.success("Xóa user thành công")
      })
      .catch(() => {
        message.error("Xóa user thất bại")
      })

    message.success('Xóa thành công');
  }

  const cancel = () => {
    message.error('Yêu cầu xóa đã bị hủy');
  }


  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'IsActive',
      dataIndex: 'isActive',
      render: isActive => (isActive.toString())
    },
    {
      title: 'Create At',
      dataIndex: 'createdAt',
    },
    {
      title: 'Update At',
      dataIndex: 'updatedAt',
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 120,
      render: () => <>
        <Link to={currentRow._id ? currentRow._id : ""} >Edit</Link> |
        <Popconfirm
          title="Are you sure to delete this user?"
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
    <div style={{ marginTop: '100px' }}>
      <Table
        dataSource={users}
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

export default ManageUser