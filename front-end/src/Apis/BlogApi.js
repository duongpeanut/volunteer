import axios from "axios"
const URL = 'http://localhost:3001/api/post/'


export const GetAllBlogApi = async () => {
  const result = await axios.get(URL + 'list-post', {
    headers: {
      'content-type': 'application/json'
    }
  })
  return result
}
export const CreateBlogApi = async (blog) => {
  const result = await axios.post(URL + 'new', blog, {
    headers: {
      'content-type': 'application/json'
    }
  })
  return result
}

export const SearchBlogByIdApi = async (id) => {
  const result = await axios.get(URL + 'search/' + id, {
    headers: {
      'content-type': 'application/json'
    }
  })
  return result
}
export const SearchBlogByNameApi = async (post) => {
  const result = await axios.post(URL + 'search', post, {
    headers: {
      'content-type': 'application/json'
    }
  })
  return result
}
export const DeleteBlogByIdApi = async (postId) => {
  const result = await axios.delete(URL + postId, {
    headers: {
      'content-type': 'application/json'
    }
  })
  return result
}

export const UpdateBlogByIdApi = async (blog) => {
  const result = await axios.put(URL + blog._id, blog, {
    headers: {
      'content-type': 'application/json'
    }
  })
  return result
}