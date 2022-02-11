<template>
  <div class="bg-page">
    <form class="login">
      <h3>Login Here</h3>

      <label>Username</label>
      <input type="text" placeholder="Email or Phone" v-model="username" />

      <label>Password</label>
      <input type="password" placeholder="Password" v-model="password" />
      <label>AGENT</label>
      <input placeholder="AGENT KEY" v-model="agentkey" id="KEY" />
      <v-btn class="btn_sty" @click="login">Log In</v-btn>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  layout: "blank",
  data() {
    return {
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
    ...mapActions("auth", {
      auth: "login"
    }),
    async login() {
      try {
        const response = await this.auth({
          username: this.username,
          password: this.password,
          agentkey: this.agentkey
        });
        console.log(response.data);
        if (response.data.key) {
          this.$router.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss">
$greenSeaweed: rgba(2, 128, 144, 1);
$blueQueen: rgba(69, 105, 144, 1);
$redFire: rgba(244, 91, 105, 1);

// Fonts
$fontAsap: "Kanit", sans-serif;

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

.login {
  background-color: white;
  padding: 30px 30px 30px 30px;
  border-radius: 25px;
  position: relative;
  /* top: 50%; */
  /* left: 50%; */
  margin: auto;
  max-width: 800px;
  transform: translate(0, 75%);
  transition: transform 300ms, box-shadow 300ms;

  box-shadow: 0px 4px 17px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 11%);
}
::placeholder {
  color: rgb(75, 75, 75);
  opacity: 1; /* Firefox */
}

input {
  font-family: "Kanit", sans-serif;
  display: block;
  width: 100%;
  margin: 10px 0px;
  height: 38px;
  background: rgb(185 185 185 / 41%);
  border: none;
  box-sizing: border-box;
  border-radius: 12px;
  padding-right: 10px;
  color: white;
  width: 100%;
  font-size: 16px;
  padding-left: 20px;
  padding-right: 20px;
  -webkit-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  &:focus-visible {
    border: none;
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

a {
  text-decoration: none;
  color: rgba(white, 0.6);
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 12px;
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
  .section_logo {
    width: 100%;
    text-align: center;
    z-index: 15;
    position: relative;
    bottom: -120px;
    text-align: center;
    .logo {
      margin: 0 auto;
      // position: absolute;
      width: 180px;
      height: 180px;
      border-radius: 50%;
      letter-spacing: 1.2px;
      font-size: 28px;
      /* top: -200px; */
      // top: 100px;
      display: flex;
      // right: 43%;
      overflow: initial;
      margin: 0 auto 30px;
      z-index: 100;
      cursor: pointer;
      filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5));
      align-items: center;
      justify-content: center;

      .img-logo {
        height: auto;
        max-height: 187px;
      }
    }
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
    margin-top: 30px;
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
    transform: translate(0, 30%);
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
.vue-form-wizard .wizard-nav-pills {
  display: none !important;
}
.wizard-progress-with-circle {
  display: none !important;
}
.wizard-header {
  display: none !important;
}
.card-bonus {
  background: hsla(0, 0%, 100%, 0.25098);
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 10px;
  height: 100%;
  cursor: pointer;
  transition: transform 0.3s;
  box-shadow: 0 0 0 #ffffff !important;
}
.card-bonus:hover {
  transform: translateY(-1rem);
  box-shadow: 0 0.5rem 2rem #ffffff !important;
  transition: transform 0.3s;
}
.btn_promotion {
  width: 100px;
}
.lighten1 {
  position: absolute;
  left: -182px;
  z-index: -1;
  top: 0px;
}
.lighten2 {
  position: absolute;
  right: -183px;
  z-index: -1;
  top: 0px;
}
</style>
