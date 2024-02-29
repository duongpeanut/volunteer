import axios from "axios"
const URL = 'http://localhost:3001/api/user/'


export const GetAllUserApi = async () => {
  const result = await axios.get(URL + 'all_user', {
    headers: {
      'content-type': 'application/json'
    }
  })
  return result
}

export const GetUserByIdApi = async (id) => {
  const result = await axios.get(URL + 'search/' + id, {
    headers: {
      'content-type': 'application/json'
    }
  })
  return result
}

export const UpdateUserApi = async (user) => {
  const result = await axios.put(URL + 'update/' + user._id, user, {
    headers: {
      'content-type': 'application/json'
    }
  })
  return result
}
export const DeleteUserApi = async (id) => {
  const result = await axios.delete(URL + id, {
    headers: {
      'content-type': 'application/json'
    }
  })
  return result
}