import $ajax from "../../utils/ajax-serve";
import apiList from "../../api/index";

/**
 * @description 处理请求成功后返回Promise方便vue界面处理数据
 * @param {res} 返回结果
 */
function resultBack(res) {
  return new Promise(resolve => {
    resolve(res);
  });
}

const state = {
  main: 0,
  user: {},
  token: null,
  title: "",
  lang: "ch",
  rtc: "RTC",
  tour: "RTC",
  root:'192.168.1.162:9090',
  session:'CANPOINT'
};

const mutations = {
  DECREMENT_MAIN_COUNTER(state) {
    state.main--;
  }
};
const actions = Object.create(null);
for (const key in apiList) {
  //console.log(apiList[key])
  const url = apiList[key].split("#")[0];
  const type = apiList[key].split("#")[1];
  const isLoad = apiList[key].split("#")[2] === undefined;
  actions[key] = async function({ commit, state }, params = {}) {
    // 是否显示加载提示
    console.log(params);
    const reqType = type === "getUrl" ? "get" : type;
    const isGetUrl = type === "getUrl";
    const res = await $ajax[reqType](
      {
        url: isGetUrl || type === "del" ? url + "/" + params : url,
        params: isGetUrl ? {} : params
      },
      isLoad
    );
    return resultBack(res);
  };
}

//console.log(actions)
export default {
  state,
  mutations,
  actions
};
