const videoApi = {
  getVideo: 'http://192.168.1.162:9090/api/v1/GetDeviceSrc#get',   //获取设备源
  GetSrcWithoutDevice:'http://192.168.1.162:9090/api/v1/GetSrcWithoutDevice#get',  //测试机舱
  AddSrcRTSP:'http://192.168.1.162:9090/api/v1/AddSrcRTSP#get',  //添加RTSP设备源
  DelSrc:'http://192.168.1.162:9090/api/v1/DelSrc#get',  //删除设备源
}

for (const val in videoApi) {
  videoApi[val] = `${videoApi[val]}`
}
export default videoApi