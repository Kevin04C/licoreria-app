import axios from 'axios'

const licoreriaApi = axios.create({
  baseURL: '/api'
})

export default licoreriaApi
