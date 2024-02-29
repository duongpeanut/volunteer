import axios from "axios"
const URL = 'http://localhost:3001/api/events/'


export const GetAllEventsApi = async () => {
  const result = await axios.get(URL + 'list-event', {
    headers: {
      'content-type': 'application/json'
    }
  })
  return result
}

export const SearchEventsApi = async (eventName) => {
  const result = await axios.post(URL + 'search', eventName, {
    headers: {
      'content-type': 'application/json'
    }
  })
  return result
}
export const SearchEventByIdApi = async (id) => {
  const result = await axios.get(URL + 'searchbyid/' + id, {
    headers: {
      'content-type': 'application/json'
    }
  })
  return result
}
export const CreateEventApi = async (event) => {
  const result = await axios.post(URL + 'new', event, {
    headers: {
      'content-type': 'application/json'
    }
  })
  return result
}
export const DeleteEventApi = async (eventId) => {
  const result = await axios.delete(URL + eventId, {
    headers: {
      'content-type': 'application/json'
    }
  })
  return result
}

export const UpdateEventApi = async (event) => {
  const result = await axios.put(URL + "/" + event._id, event, {
    headers: {
      'content-type': 'application/json'
    }
  })
  return result
}