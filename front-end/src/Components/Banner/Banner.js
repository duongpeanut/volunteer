import { Button,Modal } from "antd"
import "./Banner.scss"
import Register from "../Register/Register"
import { useState } from "react"
const Banner = () => {
    const [loginIsShow, setLoginIsShow] = useState(0)
    const handleCancel = () => {
        setLoginIsShow(0);
    }
    const handleClick = () => {
        setLoginIsShow(1);
    }
    return (
        <div className='hero-container' style={{ background: 'url("/images/img-home-2.jpg")' }}>

            <h1>“The smallest act of kindness is worth more than the grandest intention.”</h1>
            <p>Oscar Wilde</p>
            <div className='hero-btns'>
                <Button
                    type="primary"
                    size="large"
                >
                    Quyên góp
                </Button>
                <Button
                    size="large"
                    style={{ marginLeft: '10px' }}
                    onClick={handleClick}
                >
                    Đăng ký thành viên
                </Button>
            </div>
            <Modal title="Đăng ký" visible={loginIsShow} onCancel={handleCancel} footer={null} width={800} centered>
                <Register loginIsShow={loginIsShow} setLoginIsShow={setLoginIsShow} />
            </Modal>
        </div >
    )
}

export default Banner