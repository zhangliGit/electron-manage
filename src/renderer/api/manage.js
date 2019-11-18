const faceApi = {
  getWsUrl: '/web/socket/getSocketUrl#get'
}

for (const val in faceApi) {
  faceApi[val] = `/wsUrl${faceApi[val]}`
}
export default faceApi