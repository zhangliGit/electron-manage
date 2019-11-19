const manageApi = {
  moduleList: 'http://192.168.2.247:3000/mock/40/moduleList#get'
}

for (const val in manageApi) {
  manageApi[val] = `${manageApi[val]}`
}
export default manageApi