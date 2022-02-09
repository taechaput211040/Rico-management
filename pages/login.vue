<template>
  <div class="loginpage">
    <div class="background">
      <div class="shape"></div>
      <div class="shape"></div>
    </div>
    <form>
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
body {
  background-size: cover !important ;
  background: url("https://image.smart-ai-api.com/public/thongtest/loginbg.png");
}
.loginpage {
  *,
  *:before,
  *:after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .background {
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
  .background .shape {
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
  }
  .shape:first-child {
    background: linear-gradient(#1845ad, #23a2f6);
    left: -80px;
    top: -80px;
  }
  .shape:last-child {
    background: linear-gradient(to right, #ff512f, #f09819);
    right: -30px;
    bottom: -80px;
  }
  form {
    height: 520px;
    width: 400px;
    background-color: rgba(255, 255, 255, 0.13);
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 50px 35px;
  }
  form * {
    font-family: "Poppins", sans-serif;
    color: #000000;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }
  form h3 {
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
  }

  label {
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
  }
  input {
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 11px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    border: 1px solid black;
    font-weight: 300;
  }
  ::placeholder {
    color: #000000;
  }
  button {
    margin-top: 50px;
    width: 100%;
    background-color: #000000;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
  }
  .social {
    margin-top: 30px;
    display: flex;
  }
  .social div {
    background: red;
    width: 150px;
    border-radius: 3px;
    padding: 5px 10px 10px 5px;
    background-color: rgba(255, 255, 255, 0.27);
    color: #eaf0fb;
    text-align: center;
  }
  .social div:hover {
    background-color: rgba(255, 255, 255, 0.47);
  }
  .social .fb {
    margin-left: 25px;
  }
  .social i {
    margin-right: 4px;
  }
}
</style>
