import { useParams } from "react-router-dom"
import { Image, Tag, Spin } from "antd"
import { useState, useEffect } from "react"
import "./BlogDetail.scss"
import { SearchBlogByIdApi, UpdateBlogByIdApi } from "../../Apis/BlogApi"
const BlogDetail = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [count, setCount] = useState(false)
  useEffect(() => {
    SearchBlogByIdApi(id)
      .then(res => {
        setBlog(res.data.post[0])
        setCount(res.data.post[0].favoriteCount)
      })
  }, [id])
  if (!blog) {
    return <Spin />
  }


  const tymHandle = () => {
    var newBlog = { ...blog, favoriteCount: count + 1 }
    setCount(count + 1)
    UpdateBlogByIdApi(newBlog)
      .then((res) => {
        console.log(res)
      })
  }

  return (
    <div className="blogDetail_container" >
      <h1 >{blog.title}</h1>
      <Tag color="#87d068">Create at: {blog.createdAt}</Tag>
      <p style={{ marginTop: '20px' }}>
        {blog.content}
      </p>
      <div className="image">
        <Image
          src={blog.photo}
        />
      </div>
      <div style={{ fontSize: '30px', cursor: 'pointer', marginTop: '10px' }} onClick={tymHandle}>
        <i style={{ color: 'red' }} className="fas fa-heart"></i>
        <span style={{ marginLeft: '10px' }}>{count}</span>
      </div>
    </div>
  )
}
export default BlogDetail