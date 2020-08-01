<template>
  		<div class="login-screen">
			<div class="app-title">
				<h1>ورود</h1>
			</div>

  <div class="login-form">
    <form @submit.prevent="userLogin">
      <div class="control-group">
        <input type="text" class="login-field" placeholder="نام کاربری" v-model="login.username" />
      </div>
      <div class="control-group">
        <input type="password" class="login-field" placeholder="رمز عبور" v-model="login.password" />
      </div>
      <div>
        <button class="btn btn-primary btn-large btn-block" type="submit">ورود</button>
      </div>
    </form>
  </div>
  		</div>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      login: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.login
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
