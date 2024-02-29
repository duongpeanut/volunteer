import { Table, Popconfirm, message, Tooltip, Image, Spin } from 'antd';
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import AddBlog from './AddBlog';
import { GetAllBlogApi, DeleteBlogByIdApi } from '../../../Apis/BlogApi';


const ManageBlog = () => {
  const [blogs, setBlogs] = useState(null)
  const [currentRow, setCurrentRow] = useState([])

  useEffect(() => {
    GetAllBlogApi()
      .then(res => {
        setBlogs(res.data.posts)
      })
  }, [])

  if (!blogs) {
    return <Spin />
  }
  const confirm = () => {
    DeleteBlogByIdApi(currentRow._id)
      .then(() => {
        message.success("Xóa blog thành công")
        const newBlogs = blogs.filter(b => b._id !== currentRow._id)
        setBlogs(newBlogs)
      })
      .catch(() => {
        message.error('Xóa blog thất bại');
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
      title: 'volunteerId',
      dataIndex: 'volunteerId',
      render: volunteerId => (
        <span>{volunteerId._id}</span>
      )
    },
    {
      title: 'Photo',
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
      title: 'Title',
      dataIndex: 'title',
      ellipsis: {
        showTitle: false,
      },
      render: content => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
    },
    {
      title: 'Content',
      dataIndex: 'content',
      ellipsis: {
        showTitle: false,
      },
      render: content => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
    },
    {
      title: 'Create At',
      dataIndex: 'createdAt',
    },
    {
      title: 'Favorite Count',
      dataIndex: 'favoriteCount',
    },
    {
      title: 'Is Display',
      dataIndex: 'isDisplay',
      render: isDisplay => (
        <span>{isDisplay.toString()}</span>
      ),
    },
    {
      title: 'Action',
      fixed: 'right',
      width: 110,
      render: () => <>
        <Link to={currentRow._id ? currentRow._id : ""} >Edit</Link> |
        <Popconfirm
          title="Are you sure to delete this blog?"
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
      <AddBlog blogs={blogs} setBlogs={setBlogs} />
      <Table
        dataSource={blogs}
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
export default ManageBlog