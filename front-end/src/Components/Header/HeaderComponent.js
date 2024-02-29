import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import "./HeaderComponent.scss"
import { Modal, Dropdown, Button, Menu } from 'antd';
import Login from '../Login/Login';
import Register from '../Register/Register';

const { SubMenu } = Menu;
const HeaderComponent = (props) => {
    const [loginIsShow, setLoginIsShow] = useState(0)
    const [navbar, setNavbar] = useState(true);
    const [current, setCurrent] = useState(window.location.href.split("/")[3])
    const [showButtonBars, setshowButtonBars] = useState(false)
    const [click, setClick] = useState(false)

    useEffect(() => {

        handleResize()
        if (current !== '') {
            setNavbar(false)
        }
        else {
            setNavbar(true)
        }
    }, [current, showButtonBars])

    const handleResize = () => {
        if (window.innerWidth <= 960) {
            setshowButtonBars(true);
        } else {
            setshowButtonBars(false);
            setClick(false)
        }
    }
    window.addEventListener("resize", handleResize)
    const handleClick = (e) => {
        setLoginIsShow(e);
    }

    const changeBackground = () => {
        if (window.location.href.split("/")[3] === "") {
            if (window.scrollY >= 90) {
                setNavbar(false)
            }
            else {
                setNavbar(true)
            }
        }
    };

    const clickMenuHandle = () => {
        setCurrent(window.location.href.split("/")[3])
    }


    window.addEventListener('scroll', changeBackground);
    const handleCancel = () => {
        setLoginIsShow(0);
    };

    const Logouthandle = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        props.setUser(null)
    }
    const menu = () => {
        if (props.user) {
            if (props.user.role === 'volunteer') {
                return (
                    <Menu>
                        <Menu.Item key={1}><Link to="profile"><span>Thông tin cá nhân</span></Link></Menu.Item>
                        <Menu.Item key={2}><span>Bài viết của tôi</span></Menu.Item>
                        <Menu.Item key={3}><span>Quyên góp</span></Menu.Item>
                        <SubMenu title="Sự kiện" key={4}>
                            <Menu.Item key={3.1}>Đang tham gia</Menu.Item>
                            <Menu.Item key={3.2}>Đã tham gia</Menu.Item>
                        </SubMenu>
                        <Menu.Item key={6} onClick={Logouthandle}><span>Đăng xuất</span></Menu.Item>
                    </Menu>
                )
            }
            else if (props.user.role === 'organization') {
                return (
                    <Menu>
                        <Menu.Item key={6}><Link to="profile"><span>Thông tin tổ chức</span></Link></Menu.Item>
                        <SubMenu title="Sự kiện" key={7}>
                            <Menu.Item key={3.1}>Đang lên lịch</Menu.Item>
                            <Menu.Item key={3.2}>Đã hoàn thành</Menu.Item>
                        </SubMenu>
                        <Menu.Item key={8} onClick={Logouthandle}><span>Đăng xuất</span></Menu.Item>
                    </Menu>
                )
            }
            else if (props.user.role === 'admin') {
                return (
                    <Menu>
                        <Menu.Item key={6}><Link to="profile"><span>Thông tin tổ chức</span></Link></Menu.Item>
                        <Menu.Item key={6}><Link to="admin/user"><span>Quản lý người dùng</span></Link></Menu.Item>
                        <Menu.Item key={6}><Link to="admin/blog"><span>Quản lý blogs</span></Link></Menu.Item>
                        <Menu.Item key={6}><Link to="admin/event"><span>Quản lý events</span></Link></Menu.Item>
                        <Menu.Item key={6}><Link to="admin/donate"><span>Quản lý donate</span></Link></Menu.Item>
                        <Menu.Item key={8} onClick={Logouthandle}><span>Đăng xuất</span></Menu.Item>
                    </Menu>
                )
            }
        }
        return (
            <Menu>
                <Menu.Item key={1} onClick={() => handleClick(1)}><span>Đăng nhập</span></Menu.Item>
                <Menu.Item key={2} onClick={() => handleClick(2)}><span>Đăng ký</span></Menu.Item>
            </Menu>
        )
    };
    return (
        <div className='header_container'>
            <nav
                className={navbar ? (click ? 'menu navbar_active mobile' : 'navbar_active menu') : (click ? 'menu mobile' : 'menu')}
                onClick={clickMenuHandle}
            >
                <li className='logo'>
                    <Link to="/"><img src='/images/favicon-32x32.png' /> <span>Sunflower</span> </Link>
                </li>
                <li className={current === "" ? 'normal_menu_active  normal_menu' : 'normal_menu'} style={{ display: showButtonBars && !click ? 'none' : '' }}>
                    <Link to="/">Trang chủ</Link>
                </li>
                <li key="2" className={current === "blog" ? 'normal_menu_active  normal_menu' : 'normal_menu'} style={{ display: showButtonBars && !click ? 'none' : '' }}>
                    <Link to="/blog">Blog của tình nguyện viên</Link>
                </li>
                <li key="3" className={current === "event" ? 'normal_menu_active  normal_menu' : 'normal_menu'} style={{ display: showButtonBars && !click ? 'none' : '' }}>
                    <Link to="/event">Sự kiện</Link>
                </li>

                <li style={{ margin: '0 20px' }} className="dropdown">
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <span>{props.user ? props.user.username : "Bạn chưa đăng nhập"} <i className="fas fa-angle-down"></i></span>
                    </Dropdown>
                </li>
                <li style={{ color: 'white', fontSize: '25px', cursor: 'pointer', display: showButtonBars ? '' : 'none' }} onClick={() => setClick(!click)}>
                    <i className={!click ? 'fas fa-bars' : 'fas fa-times'} />
                </li>
            </nav>

            <Modal title="Đăng nhập" visible={loginIsShow === 1} onCancel={handleCancel} footer={null} width={'60%'} centered className='modal'>
                <Login loginIsShow={loginIsShow} setLoginIsShow={setLoginIsShow} setUser={props.setUser} />
            </Modal>
            <Modal title="Đăng ký" visible={loginIsShow === 2} onCancel={handleCancel} footer={null} width={'80%'} centered className='modal'>
                <Register loginIsShow={loginIsShow} setLoginIsShow={setLoginIsShow} />
            </Modal>
        </div>
    )
}

export default HeaderComponent