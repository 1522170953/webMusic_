<template>
  <div class="Box">
    <el-row class="Box">
      <el-col :span="24"
        ><div class="grid-content bg-purple">
          <el-row class="H_L_header">
            <el-col :span="12"
              ><div
                :class="
                  action == '0'
                    ? 'action grid-content bg-purple'
                    : ' grid-content bg-purple'
                "
                @click="action = '0'"
              >
                二维码登录
              </div></el-col
            >
            <el-col :span="12"
              ><div
                :class="
                  action == '1'
                    ? 'action grid-content bg-purple-light'
                    : 'grid-content bg-purple-light'
                "
                @click="action = '1'"
              >
                验证码登录
              </div></el-col
            >
          </el-row>
        </div>
        <el-col :span="24"
          ><div class="grid-content bg-purple-light">
            <div class="qrCode" v-if="action == '0'">
              <div>
                <el-image
                  style="width: 200px; height: 200px"
                  :src="ewmUrl"
                  fit="cover"
                ></el-image>
              </div>
              <div><p>请使用网易云APP扫一扫</p></div>
              <div>
                <el-button type="success" @click="getEwmKey()">刷新</el-button>
              </div>
            </div>
            <div class="phone" v-if="action == '1'">
              <div class="Phone_box">
                <label for="Phone">手机号:</label><el-input
                      v-model="phone"
                      placeholder="请输入手机号"
                      id="Phone"
                    ></el-input>
              </div>
            </div></div
        ></el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getLoginEwmKeyAPI,
  getLoginEwmUrlAPI,
  getLoginEwmCheckInfoAPI,
  getLoginStatusAPI,
  accountInfoAPI
} from "@/api/index";
export default {
  name: "UserLogin",
  data() {
    return {
      action: "0",
      ewmUrl: "",
      phone: "",
      logEwmKey: "", //二维码 KEY
      timer: null, //定时器
    };
  },
  methods: {
    // 获取Key
    async getEwmKey() {
      // 获取KEY
      const logKeyRes = await getLoginEwmKeyAPI();
      console.log("二维码KEY:", logKeyRes);
      this.logEwmKey = logKeyRes.data.data.unikey;
      console.log("unikey:", this.logEwmKey);

      this.getEwmUrl(logKeyRes.data.data.unikey);

      return logKeyRes.data.data.unikey;
    },
    // 获取Url
    async getEwmUrl(key) {
      console.log("logEwmUrl:",key);
      let sum = key
      // 获取URL
      const logEwmUrl = await getLoginEwmUrlAPI(sum);
      console.log("logEwmUrl:", logEwmUrl);
      this.ewmUrl = logEwmUrl.data.data.qrimg;

      this.logEwmCheck(sum);

      return logEwmUrl.data.data.qrimg;
    },
    // 重复调用检测
    async logEwmCheck() {
      const logEwmCheckRes = await getLoginEwmCheckInfoAPI(this.logEwmKey);
      console.log("logEwmCheckRes：", logEwmCheckRes);

      if (logEwmCheckRes.data.code == 800) {
        clearInterval(this.timer);
        this.timer = null;
        alert("验证码过期！请刷新验证码！");
      } else if (logEwmCheckRes.data.code == 803) {
        clearInterval(this.timer);
        this.timer = null;
        localStorage.setItem("Ucookie", logEwmCheckRes.data.cookie);
        // 获取账号信息
        this.getAccountInfo(logEwmCheckRes.data.cookie);

        const userLoginStatc = await getLoginStatusAPI(logEwmCheckRes.data.cookie);
        localStorage.setItem("userInfo",JSON.stringify(userLoginStatc.data.data.profile));
        this.$router.push({ path: "/home" });
      } else {
        this.logCheck();
      }
    },

    // 定时器
    logCheck() {
      clearInterval(this.timer);
      this.timer = null;
      this.timer = setInterval(this.logEwmCheck, 5000);
    },

    // 获取账号信息
    async getAccountInfo(cookie){
      const accountInfo = await accountInfoAPI(cookie);
      localStorage.setItem("Uaccount",JSON.stringify(accountInfo.data.account))
      console.log("accounrInfo:",accountInfo);
    }
  },
  async created() {
    this.getEwmKey();
  },
};
</script>

<style scoped>
.Box {
  width: 100%;
  height: 100%;
  text-align: center;
}
.H_L_header {
  height: 55px;
  font-size: 24px;
}
.action {
  background-color: #83b164;
  color: white;
}
.Phone_box{
  width: 400px;
}
</style>
