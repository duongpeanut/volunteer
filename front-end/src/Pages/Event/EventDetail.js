import { useParams } from "react-router-dom"
import { Button, Image, Tag, Timeline,Spin } from "antd"
import { ClockCircleOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react"
import "./EventDetail.scss"
import { SearchEventByIdApi } from "../../Apis/EventApi";

const EventDetail = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [isLoad, setIsLoad] = useState(true)

  useEffect(() => {
    SearchEventByIdApi(id)
      .then(res => {
        setEvent(res.data.event[0])
      })
    setIsLoad(false)
  }, [])

  if (isLoad || event === null) {
    return <Spin style={{ marginTop: '100px' }} />
  }

  return (
    <div className="event_detail_container" >
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 >{event.nameEvent}</h1>
        <Button type="primary">Đăng ký</Button>
      </div>
      <Tag color="#87d068">Địa điểm: {event.place}</Tag>
      <p style={{ marginTop: '20px' }}>
        {event.description}
      </p>
      <div className="image">
        <Image
          src={event.photo}
        />
      </div>
      <p style={{ margin: '20px 0' }}>
        <b>Trạng thái: </b>{event.state}
      </p>
      <div>
        <p><b style={{ margin: '20px 0' }}>Timelines: </b></p>
        <Timeline>
          {event.timelines.map((time, index) => (
            <Timeline.Item dot={<ClockCircleOutlined className="timeline-clock-icon" />} color="red" key={index}>
              {time.name}: {time.time}
            </Timeline.Item>
          ))}
        </Timeline>
      </div>

      <div>
        <p><b style={{ margin: '20px 0' }}>OrgConditions: </b></p>
        <Timeline>
          {event.orgConditions.map((time, index) => (
            <Timeline.Item color="green" key={index}>
              {time.name}: {time.parameter}
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
      <p style={{ margin: '20px 0' }}>
        <b>Lệ phí: </b>{event.fee}
      </p>
    </div >


  )
}
export default EventDetail