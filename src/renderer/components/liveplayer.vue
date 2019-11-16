<template>
  <div class="h5videowrapper h5container">
    <video class="h5video" :id="videoid" autoplay webkit-playsinline playsinline></video>
    <div class="h5controls" style="display:none padding:0px">
      <button class="btn vidbuttion pull-right" @click="FullScreen($event)">
        <icon type="fullscreen" />
      </button>
      <button class="btn vidbuttion pull-right" @click="CloseVideo($event)">
        <icon type="close" />
      </button>
    </div>
  </div>
</template>

<script>
import "../assets/js/adapter.js";
import {
  H5sPlayerWS,
  H5sPlayerHls,
  H5sPlayerRTC,
  H5sPlayerAudBack
} from "../assets/js/h5splayer.js";
import { H5siOS, H5sPlayerCreate } from "../assets/js/h5splayerhelper.js";
import { Button, Icon } from "ant-design-vue";
export default {
  name: "liveplayer",
  props: ["h5id", "h5videoid"],
  data() {
    return {
      videoid: this.h5videoid,
      h5handler: undefined, //视频内容
      currtoken: undefined,
      ptzshow: false,
      proto: "RTC",
      Shoutwheatclass: "mdi mdi-microphone-off",
      tokenshou: "",
      v2: undefined //视频内容
    };
  },
  components: {
    Button,
    Icon
  },
  activated() {
    //console.log(this.h5id, "activated");
  },
  deactivated() {
    //console.log(this.h5id, "deactivated");
  },
  beforeDestroy() {
    //console.log(this.h5id, "beforeDestroy");
    if (this.h5handler != undefined) {
      this.h5handler.disconnect();
      delete this.h5handler;
      this.h5handler = undefined;
    }
    this.currtoken = undefined;
  },
  destroyed() {
    //console.log(this.h5id, "destroyed");
  },
  mounted() {
    //console.log(this.h5id, "mount");
    var $container = $("#" + this.h5id);
    var $video = $container.children("video");
    var videodom = $container.children("video").get(0);
    var $controls = $container.children(".h5controls");
    var $rtcbutton = $controls.children(".rtcbutton");

    let _this = this;
    this.$root.bus.$on("liveplay", function(token, streamprofile, id) {
      if (_this.h5id != id) {
        return;
      }
      _this.PlayVideo(token, streamprofile);
      _this.tokenshou = token;
    });

    this.$root.bus.$on("liveplayproto", function(proto) {
      _this.proto = proto;
      //储存
      localStorage.setItem("proto", _this.proto);
      //console.log("liveplayproto", _this.proto);
    });

    // control visibility
    $container.on("mouseover mouseout touchstart touchmove", function(e) {
      $controls.css("display", e.type === "mouseout" ? "none" : "block");
      //$controls.css("display", e.type === "touchend" ? "none" : "block");
    });
  },
  methods: {
    PlayVideo(token, streamprofile) {
      if (this.h5handler != undefined) {
        this.h5handler.disconnect();
        delete this.h5handler;
        this.h5handler = undefined;
      }
      this.currtoken = token;
      console.log("play ", token);
      console.log("play ", streamprofile);
      var root = process.env.API_ROOT;
      var wsroot = process.env.WS_HOST_ROOT;
      if (root == undefined) {
        root =
          window.location.protocol +
          "//" +
          this.$store.state.face.root +
          window.location.pathname;
      }
      if (wsroot == undefined) {
        wsroot = this.$store.state.face.root;
      }
      console.log(this.h5videoid)
      let conf = {
        videoid: this.h5videoid,
        protocol: 'http:', //http: or https:
        host: wsroot, //localhost:8080
        streamprofile: streamprofile, // {string} - stream profile, main/sub or other predefine transcoding profile
        rootpath: "/", // '/'
        token: token,
        hlsver: "v1", //v1 is for ts, v2 is for fmp4
        session: token //session got from login
      };
      var $container = $("#" + this.h5id);
      var $controls = $container.children(".h5controls");
      var $rtcbutton = $controls.children(".rtcbutton");

      if (this.proto == "RTC" || H5siOS() === true) {
        $rtcbutton.css("display", "block");
        this.h5handler = new H5sPlayerRTC(conf);
      } else {
        $rtcbutton.css("display", "none");
        this.h5handler = new H5sPlayerWS(conf);
      }

      this.h5handler.connect();
    },
    CloseVideo(event) {
      var $container = $("#" + this.h5id);
      var $controls = $container.children(".h5controls");
      var $rtcbutton = $controls.children(".rtcbutton");
      if (this.h5handler != undefined) {
        $rtcbutton.css("display", "none");
        this.h5handler.disconnect();
        delete this.h5handler;
        this.h5handler = undefined;
        this.$message.info("关闭成功");

        $("#" + this.h5videoid)
          .get(0)
          .load();
        $("#" + this.h5videoid).get(0).poster = "";
      }
    },
    FullScreen(event) {
      var elem = $("#" + this.h5id).get(0);
      //var elem = $("#videoPanel");
      console.log("panelFullScreen", event);
      if (
        document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled
      ) {
        if (
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
        ) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
          console.log("========  updateUIExitFullScreen");
          this.updateUIExitFullScreen();
        } else {
          console.log("panelFullScreen3");

          if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
          } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
          } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
          }
        }
      } else {
        console.log("Fullscreen is not supported on your browser.");
      }
    },
    updateUIExitFullScreen() {
      if (
        !document.fullscreenElement &&
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
      ) {
        $('div[name="flex"]').height(this.contentHeight / this.rows);
      }
    }
  }
};
//fill scale-down
</script>

<style scoped>
.h5video {
  object-fit: fill;
}

.h5videowrapper {
  padding: 0px;
  height: 100%;
  width: 100%;
}

video {
  width: 100%;
  height: 100%;
}

.vidbuttion {
  height: 24px;
  width: 24px;
  padding: 0px;
  margin: 0px;
  margin-left: 5px;
  opacity: 0.6;
}

.vidbuttion:hover {
  /*background-color: #3c8dbc;*/
  cursor: pointer;
  color: rgb(187, 184, 184);
}

.ptzbutton {
  height: 24px;
  width: 24px;
  padding: 0px;
  margin: 0px;
  opacity: 1;
  background: rgba(255, 255, 255, 0.3);
}

.ptzbuttonnone {
  height: 24px;
  width: 24px;
  padding: 0px;
  margin: 0px;
  margin-right: 0px;
  opacity: 0;
  background: rgba(255, 255, 255, 0);
}

.ptzbutton:hover {
  /*background-color: #3c8dbc;*/
  cursor: pointer;
  color: rgb(187, 184, 184);
}

.h5container {
  position: relative;
  display: inline-block;
}
.h5controls {
  background-color: rgba(255, 255, 255, 0.3);
  padding: 0px;
  box-sizing: content-box;
  z-index: 10000;
  width: 100%;
  text-align: right;
  display: none;
  position: absolute;
  top: 0px;
}

.rtcbutton {
  display: none;
}

.h5container > .h5controls {
  position: absolute;
  top: 0;
  background: rgba(255, 255, 255, 0.3);
  padding: 0px;
  box-sizing: content-box;
  z-index: 10000;
  width: 100%;
  display: none;
}
.h5container > .ptzcontrols {
  position: absolute;
  bottom: 0;
  background: rgba(255, 255, 255, 0);
  padding: 0px;
  box-sizing: content-box;
  z-index: 11000;
  width: 100%;
  display: none;
}
</style>
