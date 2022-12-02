<template>
  <div class="bg-page">
    <loading-page v-if="isLoading"></loading-page>
    <form class="login font-weight-bold">
      <img
        src="https://image.smart-ai-api.com/public/Rico-main-resite/mockup_rico.png"
        class="img-mockup"
      />
      <div class="my-3 text-center  header-login">
        <img
          src="https://image.smart-ai-api.com/public/Rico-main-resite/logo.png"
        />
        <h2>WELCOME TO RICO</h2>
        <h4>กรอกข้อมูลเพื่อเข้าสู่ระบบ</h4>
      </div>
      <label>Username</label>
      <input
        type="text"
        class="username"
        placeholder="Username"
        v-model="username"
      />

      <label>Password</label>
      <input
        class="password"
        type="password"
        placeholder="Password"
        @keyup.enter="auth"
        v-model="password"
      />
      <span class="font-weight-bold">AGENT</span>
      <input
        class="agentkey"
        placeholder="AGENT KEY"
        v-model="agentkey"
        @keyup.enter="auth"
        id="KEY"
      />
      <div class="action_login">
        <v-btn
          class="btn_login mx-auto"
          width="230px"
          rounded
          dark
          @click="auth"
          >Log In</v-btn
        >
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import LoadingPage from "../components/LoadingPage.vue";
export default {
  components: { LoadingPage },
  layout: "blank",
  data() {
    return {
      isLoading: false,
      username: "",
      password: "",
      agentkey: ""
    };
  },
  async mounted() {
    if (localStorage.getItem("key")) {
      this.$router.push("/");
    }
  },
  methods: {
    ...mapMutations("auth", [
      "set_login",
      "setTFAdata",
      "serTfa_credential",
      "setVerify",
      "set_data_secret"
    ]),
    ...mapActions("auth", ["login", "getLockdown"]),
    async auth() {
      this.isLoading = true;
      let formData = {
        username: this.username,
        password: this.password,
        agent: this.agentkey
      };
      try {
        const response = await this.login({
          username: this.username,
          password: this.password,
          agentkey: this.agentkey
        });
        await this.setTFAdata(formData);
        // console.log(response.data);

        if (response.tfa_status) {
          if (response.verify) {
            console.log(response.verify, "verify");
            await this.setVerify(response.verify);
          } else {
            await this.setVerify(false);
          }

          await this.serTfa_credential(response);
          console.log("hohp");
          await this.$router.push("/LoginTFA");
        } else if (!response.tfa_status) {
          if (response.token) {
            await this.set_login(response);

            if (!response.menu_permission) {
              this.$router.push("/test");
            } else {
              this.$router.push("/redirect");
            }
          }
        }
        if (response.setting) {
          await this.set_data_secret(response.setting);
        }
      } catch (err) {
        console.log(err);
      }
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss">
.username {
  background: url("https://image.smart-ai-api.com/public/Rico-main-resite/round-account-button-with-user-inside.png")
    no-repeat left;
  background-position: 8px 3px;
  background-size: 32px;
}
.password {
  background: url("https://image.smart-ai-api.com/public/Rico-main-resite/padlock.png")
    no-repeat left;
  background-position: 8px 3px;
  background-size: 32px;
}
.agentkey {
  background: url("https://image.smart-ai-api.com/public/Rico-main-resite/key.png")
    no-repeat left;
  background-position: 8px 3px;
  background-size: 30px;
}
.header-login {
  img {
    width: 211px;
    height: auto;
    margin-bottom: 10px;
  }
  margin-bottom: 29px;
  text-align: center !important;
  h4 {
    color: gray !important;
  }
}
$greenSeaweed: rgba(2, 128, 144, 1);
$blueQueen: rgba(69, 105, 144, 1);
$redFire: rgba(244, 91, 105, 1);

// Fonts

@media only screen and (max-width: 600px) {
  .login {
    width: 90%;
    transform: translate(0, 0);
  }
}
@media only screen and (min-width: 600px) {
  .login {
    width: 95%;
    transform: translate(0, 0);
  }
}
@media only screen and (min-width: 1023px) {
  .login {
    width: 95%;
    padding: 30px 140px 43px 140px !important;
    transform: translate(0, 0);
  }
  .img-mockup {
    display: inherit !important;
    position: absolute;
    left: -256px;
    top: 0;
    width: 400px;
  }
}
.img-mockup {
  display: none;
}
.login {
  background-color: white;
  padding: 30px 100px 26px 101px;
  border-radius: 25px;
  position: relative;
  /* top: 50%; */
  /* left: 50%; */
  margin: auto;
  max-width: 800px;
  transform: translate(0, 250px);
  transition: transform 300ms, box-shadow 300ms;
  font-weight: bold !important;
  box-shadow: 0px 4px 20px 16px rgb(0 0 0 / 18%), 0 10px 10px rgb(0 0 0 / 11%);
}
::placeholder {
  color: rgb(75, 75, 75);
  opacity: 1; /* Firefox */
}
.login {
  input {
    display: block;
    width: 100%;
    margin: 10px 0px;
    height: 38px;
    background-color: rgb(185 185 185 / 41%) !important;
    border: none;
    box-sizing: border-box;
    border-radius: 49px;
    padding-right: 10px;
    color: rgb(0, 0, 0);
    width: 100%;
    font-size: 16px;
    padding-left: 46px;
    padding-right: 33px;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    &:focus-visible {
      border: none;
    }
  }
}

@keyframes wawes {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.feedback {
  position: absolute;
  margin-top: -25px;

  color: #ff4242;
}
@media (min-width: 767.98px) {
  .bg-page {
    background-image: url("https://image.smart-ai-api.com/public/Rico-main-resite/bgdy.jpg");
    min-height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
  }
}
@media (max-width: 320.98px) {
  .bg-page {
    background-image: url("https://image.smart-ai-api.com/public/Rico-main-resite/bgmb.jpg");
    min-height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
  }
  .section_logo {
    width: 100%;
    text-align: center;
    z-index: 15;
    position: relative;
    bottom: -6px;
    text-align: center;
  }
  .login {
    margin-top: 0px !important;
    width: 95%;
    padding: 30px 30px 30px 30px !important;
  }
}
@media (max-width: 767.98px) and (min-width: 321px) {
  .bg-page {
    background-image: url("https://image.smart-ai-api.com/public/Rico-main-resite/bgmb.jpg");
    min-height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
  }
  .section_logo {
    width: 100%;
    text-align: center;
    z-index: 15;
    position: relative;
    bottom: -15px;
  }
  .login {
    margin-top: 30px;
    transform: translate(0, 145px);
    padding: 30px 30px 30px 30px !important;
  }
}
button:hover {
  background-color: #ffffff;
}
.btn-register {
  z-index: 20;
  color: #000000;
  width: 100px;
  background: white;
  font-size: medium;
  border-radius: 40px;
  border: 3px solid #76650c;
  box-shadow: 0px 4px 7px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);
  &:hover {
    opacity: 0.7;
  }
}

.btn_login {
  background: linear-gradient(
    to bottom right,
    #0374ff 0%,
    #3f4fd4 100%
  ) !important;
  font-weight: bold !important;
  color: rgb(255, 255, 255);
}
.action_login {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
