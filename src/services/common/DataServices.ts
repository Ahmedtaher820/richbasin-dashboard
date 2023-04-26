import axios from 'axios'
import router from "../../router/index"
import {
  ERR_403,
  NOT_FOUND_CODE,
  SERVER_CODE,
  SUBSCRIPTION_ENDS,
  UNAUTHORIZED_CODE,
  VALIDATION_CODE,
  PAGE_EXPIRED
} from "../../constants"
const instance = axios.create({
    baseURL:'https://teal-cloudy-trout.cyclic.app/api',
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
})
instance.interceptors.response.use((response:any)=>{
    if (response.status === UNAUTHORIZED_CODE) {
        router.push({path:'/login'})
        return
      }
      return response
    },
    (error) => {
        if (error.response.status === UNAUTHORIZED_CODE || error.response.status === PAGE_EXPIRED) {
          localStorage.clear()
          router.push({ name: 'login'})
          return
        }
        else if (error.response.status === NOT_FOUND_CODE) {
            router.push({ path: '/'})
          
        }
        else if (error.response.status === SUBSCRIPTION_ENDS) {
          window.location.href = import.meta.env.VITE_PAYMENT_URL
        }
        else if (error.response.status === ERR_403) {
          //console.log('yes')
          window.location.href = '/welcome'
        }
        const errorData = error.response.data
        if (error.response.status === VALIDATION_CODE) { throw { ...errorData } }
    
        // eslint-disable-next-line no-throw-literal
        throw { ...errorData }
      },
)
export default instance