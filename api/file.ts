import axios from "axios";

const fileApi = {
  upload:(formFile: FormData)=> axios.post<string>('','')
}
export default fileApi;