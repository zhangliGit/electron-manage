<template>
  <div class="home qui-fx" id="show" :style="{height:height+'px'}">
    <a-modal title="设置" v-model="setTag" @ok="setTag=false" width="1280px" :footer="null">
      <a-button type="primary" style="margin:0 0 10px 0" @click="addTag=true">添加</a-button>
      <submit-form
        ref="form"
        :title="title"
        v-model="addTag"
        :form-data="addEp"
        @submit-form="submitForm"
      ></submit-form>
      <div id="table" class="wrap-table qui-fx-f1" style="height:600px">
        <a-table
          :scroll="{y: this.$tools.setScroll('table')}"
          :pagination="false"
          :rowKey="(record) => record.id"
          :columns="columns"
          :dataSource="eqList"
        >
          <template slot="img" slot-scope="text">
            <img
              :src="text"
              style="width: 100px; height: 100px; margin:0 auto; display:block; background-color:#ccc"
              alt
            />
          </template>
          <template slot="action" slot-scope="text, record">
            <a-tag @click="delList(record)" color="#ccc">删除</a-tag>
          </template>
        </a-table>
      </div>
    </a-modal>
    <div class="title">
      <h1>全品文教人脸识别系统</h1>
    </div>
    <div class="left" :style="{height:(height-170)+'px'}">
      <div class="time">
        <span>{{date}}</span>
        <span>{{time}}</span>
      </div>
      <div class="top">
        <div class="video">
          <div id="videoPanel">
            <div name="flex" class="videoColor" v-for="r in rows" :key="r">
              <div
                calss="videoflexitem"
                style="flex:1; border:1px solid black;"
                name="flex"
                v-for="c in cols"
                @contextmenu.prevent="stopVideo($event)"
                @click="videoClick(r,c,$event)"
                :key="c"
              >
                <v-liveplayer v-bind:id="'h'+r+c" :h5id="'h'+r+c" :h5videoid="'hvideo'+r+c"></v-liveplayer>
              </div>
            </div>
          </div>
        </div>
        <div class="state set qui-fx-jsb qui-fx-jc">
          <set-menu :set-label="setLabel"></set-menu>
          <a-button type="primary" style="margin:5px 10px 0 0" @click="set">设置</a-button>
        </div>
      </div>
      <div class="bottom scrollNews1">
        <div class="state">
          <span>实时抓拍照片</span>
        </div>
        <ul class="list" style="white-space: nowrap;">
          <li v-for="(item,i) in 10" :key="i" :style="{height:(height-180)*0.2 - 20+'px'}">
            <img src alt />
          </li>
        </ul>
      </div>
    </div>
    <div class="right qui-page" :style="{height:(height-150)+'px'}">
      <div class="state">
        <span>实时抓拍与底库照片相似度对比</span>
      </div>
      <scroll-list ref="scrollList">
        <div class="box qui-fx-ver scrollNews" :style="{height:(height-180 - 20)+'px'}">
          <ul class="list">
            <li v-for="i in 5" :key="i" :style="{height:((height-210)/5-20)+'px'}">
              <div class="shoot">
                <img src alt />
              </div>
              <div class="mid">
                <div class="cont">
                  <img :src="cont" alt />
                </div>
              </div>
              <div class="shoot">
                <img src alt />
              </div>
            </li>
          </ul>
        </div>
      </scroll-list>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: "序号",
    dataIndex: "index",
    width: "10%",
    customRender: (text, row, index) => {
      return index + 1;
    },
    align: "center"
  },
  {
    title: "视频流地址",
    dataIndex: "strUrl",
    width: "50%",
    align: "center"
  },
  {
    title: "账号",
    dataIndex: "strUser",
    width: "15%",
    align: "center"
  },
  {
    title: "密码",
    dataIndex: "strPasswd",
    width: "15%",
    align: "center"
  },
  {
    title: "操作",
    width: "10%",
    dataIndex: "action",
    scopedSlots: {
      customRender: "action"
    },
    align: "center"
  }
];
import moment from "moment";
import cont from "../assets/img/cont.png";
import ScrollList from "../components/ScrollList";
import SubmitForm from "../components/SubmitForm";
import Liveplayer from "../components/liveplayer";
import SetMenu from "../components/SetMenu";
import { Button } from "ant-design-vue";
import $ from "jquery";
import "../assets/js/adapter.js";
import "../assets/js/h5splayer.js";
import { H5siOS, H5sPlayerCreate } from "../assets/js/h5splayerhelper.js";
export default {
  name: "home",
  data() {
    return {
      moment,
      cont,
      rows: 1,
      cols: 1,
      selectCol: 1,
      selectRow: 1,
      height: 800,
      width: 0,
      title: "添加设备",
      photoList: [],
      contrastList: [],
      time: "",
      date: "",
      wsUrl: "",
      ipAddress: "",
      currentIp: "",
      addEp: [
        {
          value: "strIp",
          type: "input",
          label: "摄像机IP",
          required: true,
          initValue: "",
          placeholder: "请输入摄像机IP地址"
        },
        {
          value: "strUrl",
          type: "input",
          label: "视频流地址",
          required: true,
          initValue: "",
          placeholder: "请输入设备视频流地址"
        },
        {
          value: "strUser",
          type: "input",
          label: "账户",
          required: true,
          initValue: "",
          placeholder: "请输入设备账户名"
        },
        {
          value: "strPasswd",
          type: "input",
          label: "密码",
          required: true,
          initValue: "",
          placeholder: "请输入设备密码"
        }
      ],
      setLabel: [
        {
          list: [],
          value: "ip",
          type: "select",
          label: "设备",
          placeholder: "",
          change: this.changeIp,
          select: this.changeIp
        },
        {
          list: [
            {
              key: "1",
              val: "一分屏"
            },
            {
              key: "4",
              val: "四分屏"
            }
          ],
          value: "panel",
          type: "select",
          label: "分屏",
          placeholder: "一分屏",
          change: this.changeScreen
        }
      ],
      proto: "RTC",
      contentHeight: "",
      contentWidth: "",
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
        token: "token",
        iconclass: "iconclass"
      },
      chooseScreen: 1,
      addTag: false,
      setTag: false,
      eqList: [],
      columns,
      ipList: []
    };
  },
  components: {
    ScrollList,
    SetMenu,
    "v-liveplayer": Liveplayer,
    Button,
    SubmitForm
  },
  created() {},
  mounted() {
    this.getUrl();
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    setInterval(this.updateTime, 1000);
    this.updateUI();
    this.loadtest();
  },
  methods: {
    //设置
    set() {
      this.setTag = true;
    },
    submitForm(obj) {
      console.log(obj);
      this.addRTSP(
        obj.strIp,
        obj.strIp,
        obj.strUrl,
        obj.strUser,
        obj.strPasswd
      );
    },
    //添加设备源
    addRTSP(name, token, url, user, password) {
      let _this = this;
      var req = {
        name,
        session: this.$store.state.face.session,
        token,
        url,
        user,
        password
      };
      this.$store
        .dispatch("AddSrcRTSP", req)
        .then(result => {
          if (result.status == 200) {
            this.$message.info("添加成功");
          }
        })
        .catch(error => {
          console.log("AddSrcRTSP failed", error);
          if (error.bStatus) {
            this.$message.success("添加成功");
            this.$refs.form.confirmLoading = false;
            this.$tools.goNext(() => {
              this.loadtest();
              this.$refs.form.form.resetFields();
              this.addTag = false;
            });
          } else {
            this.$message.info("添加失败");
          }
        });
    },
    //切换视频流IP
    changeIp(value) {
      console.log(this.setLabel[0].list[value].val);
      this.currentIp = value;
      let _this = this;
      let vid = "h" + _this.$data.selectRow + _this.$data.selectCol;
      console.log(vid);
      _this.$root.bus.$emit(
        "liveplay",
        this.setLabel[0].list[value].token,
        "main",
        vid
      );
    },
    //选择屏幕
    changeScreen(value) {
      let _this = this;
      if (value === "1") {
        this.chooseScreen = 1;
        this.changePanel("1|1");
      } else if (value === "4") {
        this.chooseScreen = 4;
        this.changePanel("2|2");
        if (this.ipList.length > 1) {
          _this.$nextTick(function() {
            _this.$root.bus.$emit(
              "liveplay",
              this.ipList[1].token,
              "main",
              "h12"
            );
            if (this.ipList.length > 2) {
              _this.$nextTick(function() {
                _this.$root.bus.$emit(
                  "liveplay",
                  this.ipList[2].token,
                  "main",
                  "h21"
                );
                if (this.ipList.length > 3) {
                  _this.$nextTick(function() {
                    _this.$root.bus.$emit(
                      "liveplay",
                      this.ipList[3].token,
                      "main",
                      "h22"
                    );
                  });
                }
              });
            }
          });
        }
      }
    },
    //切换分屏
    changePanel(data) {
      let cols = data.split("|")[1];
      let rows = data.split("|")[0];
      let _this = this;
      Object.assign(this.$data, {
        rows: parseInt(rows),
        cols: parseInt(cols)
      });
      this.$nextTick(function() {
        $('div[name="flex"]').height(_this.contentHeight / rows);
      });
    },
    //加载视频流地址列表
    loadtest() {
      var req = {
        session: this.$store.state.face.session
      };
      let url = "http://192.168.1.162:9090/api/v1/GetSrcWithoutDevice";
      $.ajax({
        type: "get",
        url: url,
        data: req,
        success: res=> {
          console.log("success", res);
          this.eqList = res.src;
          this.ipList = [];
          if (this.eqList.length === 0) {
            return;
          }
          this.eqList.forEach((ele, index) => {
            ele.id = index;
            this.ipList.push({
              key: index,
              token: ele.strToken,
              val: ele.strUrl.split("@")[1].split("/")[0]
            });
          });
          this.setLabel[0].list = this.ipList;
          this.setLabel[0].placeholder = this.ipList[0].val;
          console.log(123, this.ipList);
          this.$tools.goNext(() => {
            this.$root.bus.$emit("liveplayproto", this.proto);
            let vid = "h" + this.selectRow + this.selectCol;
            console.log(this.ipList[0].token);
            this.$root.bus.$emit("liveplay", this.ipList[0].token, "main", vid);
          });
        },
        error: err=> {
          console.error(err);
        }
      });
       /* this.$store
        .dispatch("GetSrcWithoutDevice", req)
        .then(result => {
          if (result.status == 200) {
            var data = result.data;
            console.log(123, data);
            this.eqList = data.src;
          }
        })
        .catch(error => {
          console.log("GetSrc failed", error);
          this.eqList = error.src;
          this.ipList = [];
          if(this.eqList.length===0){
            return
          }
          this.eqList.forEach((ele, index) => {
            ele.id = index;
            this.ipList.push({
              key: index,
              token: ele.strToken,
              val: ele.strUrl.split("@")[1].split("/")[0]
            });
          });
          this.setLabel[0].list = this.ipList;
          this.setLabel[0].placeholder = this.ipList[0].val;
          console.log(123, this.ipList);
          this.$tools.goNext(() => {
            this.$root.bus.$emit("liveplayproto", this.proto);
            let vid = "h" + this.selectRow + this.selectCol;
            console.log(this.ipList[0].token);
            this.$root.bus.$emit("liveplay", this.ipList[0].token, "main", vid);
          });
        }); */
    },
    //删除设备流
    delEq(token) {
      var req = {
        session: this.$store.state.face.session,
        token
      };
      this.$store
        .dispatch("DelSrc", req)
        .then(result => {
          if (result.status == 200) {
            var data = result.data;
            console.log(123, data);
          }
        })
        .catch(error => {
          console.log("GetSrc failed", error);
          if (error.bStatus) {
            this.$message.success("删除成功");
            this.$tools.goNext(() => {
              this.loadtest();
            });
          } else {
            this.$message.success("删除失败");
          }
        });
    },
    delList(record) {
      this.$tools.delTip("确定删除吗", () => {
        this.delEq(record.strToken);
      });
    },
    //分屏画布
    updateUI() {
      $(".content").innerHeight(
        $(".content-wrapper").innerHeight() -
          $(".content-header").outerHeight() -
          $(".main-header").innerHeight()
      );
      //$('div[name="flex"]').height(($(".content").height() - 50) / this.rows);
      this.contentHeight = (this.height - 170) * 0.75 - 60;
      $('div[name="flex"]').height(this.contentHeight / this.rows);
      //this.contentHeight = $(document.body).height()*0.8;
      let _this = this;
      if (H5siOS() === true) {
        $(".h5video").prop("controls", true);
      }
    },
    //全屏
    updateUIEnterFullScreen() {
      $('div[name="flex"]').height(screen.height / this.rows);
    },
    //退出全屏
    updateUIExitFullScreen() {
      if (
        !document.fullscreenElement &&
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
      ) {
        $('div[name="flex"]').height(this.contentHeight / this.rows);
      }
    },
    //选择视频屏幕
    videoClick(r, c, $event) {
      this.selectCol = c;
      this.selectRow = r;
      console.log(r, c);
      if (
        $($event.target)
          .parent()
          .hasClass("videoClickColor")
      ) {
        $($event.target)
          .parent()
          .removeClass("videoClickColor");
      } else {
        $('#videoPanel div[class*="videoClickColor"]').removeClass(
          "videoClickColor"
        );
        $("#videoPanel>div")
          .eq(r - 1)
          .children("div")
          .eq(c - 1)
          .addClass("videoClickColor");
      }
    },
    stopVideo(event) {
      return;
    },
    //人脸识别推流
    getUrl() {
      this.$store.dispatch("getWsUrl").then(res => {
        this.wsUrl = res.data;
        this.initSocket();
      });
    },
    //电子时钟
    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    updateTime() {
      let cd = new Date();
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getDate(), 2);
    },
    //处理延迟
    openTime() {
      let _this = this;
      this.timeTag = setInterval(function() {
        if (_this.photoList.length > 0) {
          _this.scrollNews($(".scrollNews"));
          _this.scrollNews1($(".scrollNews1"));
        }
      }, 600);
    },
    initSocket() {
      let _this = this;
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持WebSocket");
      } else {
        let socket = new WebSocket(`${this.wsUrl}`);
        socket.onopen = () => {
          console.log("Socket 已打开");
          let req = {
            ipAddress: this.ipAddress
          };
          socket.send(JSON.stringify(req));
          _this.openTime();
        };
        socket.onmessage = msg => {
          var msgData = msg.data;
          var obj = JSON.parse(msgData);
          console.log(obj);
          if (obj.snapImgBase64) {
            this.photoList.unshift({
              photo: obj.snapImgBase64,
              name: obj.userName,
              type: obj.threshold
            });
            if (obj.photoBase64 && obj.threshold > 0.8) {
              this.contrastList.unshift({
                photo: obj.snapImgBase64,
                name: obj.userName,
                savePhoto: obj.photoBase64,
                simi: obj.threshold * 100 + "%"
              });
            }
          }
        };
        socket.onclose = function(ev) {
          console.error("Socket已关闭3");
        };
        socket.onerror = function(ev) {
          console.error("Socket发生了错误2");
        };
      }
    },
    scrollNews(obj) {
      var $self = obj.find("ul");
      var lineHeight = $self.find("li:first").height();
      if (this.contrastList.length === 0) {
        return;
      }
      $self.css({
        marginTop: -lineHeight
      });
      $self
        .prepend(
          $(`<li style="height:${(this.height - 210) / 5 - 20}px">
          <div class="shoot"><img src="data:image/jpeg;base64,${
            this.contrastList[0].photo
          }"></img></div>
            <div class="mid">
            <div class="cont">
                <img src="${this.cont}" alt="">
                <span>${
                  this.contrastList[this.contrastList.length - 1].simi
                }</span></div>
            </div>
            <div class="shoot">
            <img src="data:image/jpeg;base64,${
              this.contrastList[this.contrastList.length - 1].savePhoto
            }"></img>
            </div>
          </li>`)
        )
        .animate(
          {
            marginTop: 0 + "px"
          },
          500,
          "swing"
        );
      this.contrastList =
        this.contrastList.length > 1 ? [this.contrastList.pop()] : [];
    },
    scrollNews1(obj) {
      var $self = obj.find("ul");
      var lineWidth = $self.find("li:first").width();
      if (this.photoList.length === 0) {
        return;
      }
      $self.css({
        marginLeft: -lineWidth
      });
      $self
        .prepend(
          $(`
        <li style="height:${(this.height - 180) * 0.2 - 20}px;">
        <img src="data:image/jpeg;base64,${this.photoList[0].photo}" alt="">
        ${
          this.photoList[0].type < 0.74
            ? ' <span class="err">陌生人</span>'
            : ""
        }
    </li>
        `)
        )
        .animate(
          {
            marginLeft: 0 + "px"
          },
          500,
          "swing"
        );
      this.photoList = this.photoList.length > 1 ? [this.photoList.pop()] : [];
    }
  }
};
</script>
<style lang="less" scoped>
@import "../assets/css/show.css";
</style>