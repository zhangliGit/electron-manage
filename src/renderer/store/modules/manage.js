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
};

const mutations = {
  updateState (state, data) {
    state[data.key] = data.data
  }
};
const actions = Object.create(null);
for (const key in apiList) {
  const url = apiList[key].split("#")[0];
  const type = apiList[key].split("#")[1];
  const isLoad = apiList[key].split("#")[2] === undefined;
  actions[key] = async function({ commit, state }, params = {}) {
    // 是否显示加载提示
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

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
