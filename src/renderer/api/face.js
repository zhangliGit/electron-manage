import hostEnv from './host-env'
const faceApi = {
  getList: 'http://192.168.2.247:3000/mock/40/getIndex#post',
  getDetail: 'http://192.168.2.247:3000/mock/40/detail#get'
}

for (const val in faceApi) {
  faceApi[val] = `${hostEnv}${faceApi[val]}`
}
export default faceApi