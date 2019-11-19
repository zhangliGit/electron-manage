<template>
  <div id="app" class="qui-page qui-fx-ver">
    <a-modal title="发现新版本" :maskClosable = "false" :closable="false" v-model="versionTag" @ok="downApp" okText="更新" cancelText="下次再说">
      <p>1. 整体用户体验优化</p>
      <p>2. 修改已知bug</p>
      <p>3. 新增版本更新记录功能</p>
    </a-modal>
    <a-modal :footer="null" :closable="false" title="新版本下载中, 请稍等..." :maskClosable = "false" v-model="updateTag">
      <div class="qui-fx-jc">
        <a-progress type="circle" :percent="percent" />
      </div>
    </a-modal>
    <div class="header qui-fx-ac qui-fx-jsb">
      <div class="qui-fx-f1 qui-fx-ac" style="-webkit-app-region: drag; height: 50px">
        <img :src="logo" class="logo" alt="">全品文教项目发布管理系统V2.0
      </div>
      <div class="icon-rit">
        <span>
          <a-popover title="菜单">
            <template slot="content">
              <div class="down-menu">
                <p>历史版本</p>
                <p>检查更新</p>
              </div>
            </template>
            <i class="iconfont icongengduo-2" style="font-size: 12px"></i>
          </a-popover>
        </span>
        <span @click="min">
          <i class="iconfont iconminimum" style="font-size: 12px"></i>
        </span>
        <span @click="max"><i class="iconfont iconzuidahua" style="font-size: 12px"></i></span>
        <span @click="close"><i class="iconfont iconguanbi2" style="font-size: 12px"></i></span>
      </div>
    </div>
    <div class="qui-fx-f1 qui-fx">
      <div class="slide">
        <ul>
          <li @click="changeMenu(index, menu.path)" v-for="(menu, index) in menuList" :key="index" :class="['qui-fx-ac-jc', {'act': index === currentIndex}]">
            <i :class= "'iconfont ' + menu.icon"></i>
            <div>{{ menu.name }}</div>
          </li>
        </ul>
      </div>
      <div class="qui-fx-f1 qui-fx main-box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapState, mapMutations } from 'vuex'
import logo from '@a/img/logo.png'
export default {
  name: "project-mange",
  data () {
    return {
      updateTag: false,
      versionTag: false,
      percent: 0,
      logo,
      currentIndex: 0,
      menuList: [
        {
          path: '',
          name: '公众号',
          icon: 'icongongzhonghaoguanli'
        },
        {
          path: 'protal',
          name: '管理平台',
          icon: 'iconpingtaijicaidan'
        },
        {
          path: 'system',
          name: '业务系统',
          icon: 'iconxitongyunwei'
        }
      ]
    }
  },
  computed: {
    ...mapState('manage', [
      'total'
    ])
  },
  created() {
    ipcRenderer.send("checkForUpdate");
    ipcRenderer.on("message", (event, text) => {
      if (text === '检测到新版本，正在下载……') {
      }
    });
    ipcRenderer.on("downloadProgress", (event, progressObj) => {
      this.percent = progressObj.percent || 0;
    });
    ipcRenderer.on("isUpdateNow", () => {
      this.versionTag = true
    });
  },
  methods: {
    ...mapMutations('manage', [
      'updateState'
    ]),
    downApp () {
      ipcRenderer.send("isUpdateNow");
    },
    min () {
      ipcRenderer.send('min')
    },
    max () {
      ipcRenderer.send('max')
    },
    close () {
      ipcRenderer.send('close')
    },
    changeMenu (index, path) {
      this.currentIndex = index
      this.$router.push(`/${path}`)
    }
  }
};
</script>

<style lang="less">
  .header {
    height: 50px;
    padding: 0 10px;
    color:#fff;
    background: #444
  }
  .logo {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
  .icon-rit {
    span {
      margin-left: 15px;
      cursor: pointer;
    }
  }
  .down-menu {
    p {
      cursor: pointer;
    }
  }
  .slide {
    width: 100px;
    background-color:#444;
    li {
      cursor: pointer;
      height: 100px;
      color:#fff;
      border-bottom: 1px #444 solid;
      box-shadow: inset 0px -2px 2px #333;
      &.act {
        background-color: #fff;
        color: #333;
      }
      i {
        font-size: 22px;
      }
    }
  }
  .main-box {
    margin-left: 2px
  }
</style>
