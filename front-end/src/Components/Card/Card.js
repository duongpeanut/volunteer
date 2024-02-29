import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import "./Card.scss"
function CardItem(props) {
    return (
        <>
            <li className='cards__item'>
                <Link className='cards__item__link' to={"/" + props.type + "/" + props.path}>
                    <figure className='cards__item__pic-wrap' data-category={props.label}>
                        <img
                            className='cards__item__img'
                            alt='Event Image'
                            src={props.src}
                        />
                    </figure>
                    <div className='cards__item__info'>
                        <h5 className='cards__item__text'>{props.text}</h5>
                        <Button type="link" style={{ marginLeft: 'auto', width: 'fit-content', display: props.type === "event" ? 'block' : 'none' }}>Đăng ký</Button>
                    </div>
                </Link>
            </li>
        </>
    );
}

export default CardItem;