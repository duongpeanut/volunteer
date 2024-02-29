import CardItem from "../../Components/Card/Card"
import { useEffect, useState } from "react"
import { Row, Col, Input, Spin, Empty, Pagination } from 'antd';
import { GetAllBlogApi, SearchBlogByNameApi } from "../../Apis/BlogApi";
import "./Blog.scss"
const Blog = (props) => {
    const { Search } = Input;
    const [blogs, setBlogs] = useState(null)
    const [pageParams, setPageParams] = useState({
        pageSize: 5,
        total: 0,
        current: 1
    })

    useEffect(() => {
        GetAllBlogApi()
            .then(res => {
                setBlogs(res.data.posts)
                setPageParams({ ...pageParams, total: res.data.posts.length })
                if (props.isHome) {
                    setPageParams({ ...pageParams, pageSize: res.data.posts.length > 10 ? 10 : res.data.posts.length })
                }
            })
    }, [])

    const search = (values) => {
        SearchBlogByNameApi({ name: values })
            .then((res) => {
                setBlogs(res.data.post)
                setPageParams({ ...pageParams, total: res.data.post.length })
                if (props.isHome) {
                    setPageParams({ ...pageParams, pageSize: res.data.post.length > 10 ? 10 : res.data.post.length })
                }
            })

    }

    if (!blogs) {
        return <Spin />
    }
    if (blogs.length === 0) {
        return (
            <div style={{ padding: '20px', margin: '100px auto 0 auto', width: '80%' }}>
                <div className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1 style={{ minWidth: '10%' }}>Các Blog</h1>
                    <Search placeholder="input search text" onSearch={search} enterButton style={{ maxWidth: '50%' }} />
                </div>
                <Empty />)
            </div>
        )
    }

    const data = []
    const setStep = () => {
        if (!props.isHome) {
            var step = (pageParams.current - 1) * pageParams.pageSize + pageParams.pageSize
            if (step > pageParams.total) {
                step = pageParams.total
            }
            return step
        }
        return blogs.length > 10 ? 10 : blogs.length
    }

    for (var i = (pageParams.current - 1) * pageParams.pageSize; i < setStep(); i++) {
        data.push(
            <Col
                xs={{ span: 24, offset: 0 }}
                sm={{ span: 10, offset: 0 }}
                lg={{ span: 6, offset: 0 }}
                xl={{ span: 4, offset: 0 }}
                style={{ marginTop: '20px' }}
                key={blogs[i]._id}
            >
                <CardItem
                    type="blog"
                    path={blogs[i]._id}
                    label={blogs[i].title}
                    src={blogs[i].photo}
                    text={blogs[i].content.substring(0, 100) + "..."}
                />
            </Col>
        )
    }
    return (
        <div className='cards' style={{ marginTop: "100px", padding: '20px' }}>
            <div className="header" style={{ display: 'flex', width: '80%', margin: '0 auto', display: props.isHome ? 'none' : 'flex' }}>
                <h1 style={{ width: '70%' }}>Các Blog</h1>
                <Search placeholder="input search text" onSearch={search} enterButton width={30} />
            </div>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <Row gutter={1} align="middle" justify="center">
                        {data}
                    </Row>
                </div>
            </div>

            <Pagination
                style={{ width: 'fit-content', margin: '20px auto', display: props.isHome ? 'none' : 'block' }}
                defaultCurrent={1}
                total={blogs.length}
                pageSize={5}
                onChange={(e) => {
                    setPageParams({ ...pageParams, current: e })
                }}
            />
        </div>
    )
}

export default Blog