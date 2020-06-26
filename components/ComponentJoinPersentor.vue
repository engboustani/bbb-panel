<template>
        <div>
        <div class="control-group" :class="{ 'form-group--error': $v.email.$error }">
            <input type="email" class="login-field" value="" placeholder="ایمیل ارائه‌دهنده" id="login-name" v-model.trim="$v.email.$model">
            <label class="login-field-icon fui-user" for="login-name"></label>
                  <div class="error" v-if="!$v.email.required">* فیلد باید پر شود!</div>
      <div
        class="error"
        v-if="!$v.email.email"
      >* ایمیل صحیح نمی‌باشد.</div>

        </div>

        <div class="control-group" :class="{ 'form-group--error': $v.password.$error }">
            <input type="password" class="login-field" value="" placeholder="رمز عبور" id="login-pass" v-model.trim="$v.password.$model">
            <label class="login-field-icon fui-lock" for="login-pass"></label>
                  <div class="error" v-if="!$v.password.required">* فیلد باید پر شود!</div>
        </div>

        <a class="login-link" href="#">رمزتان را گم کرده‌اید؟</a>
        <a class="btn btn-primary btn-large btn-block" href="#" v-on:click="join">ورود</a>
        </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  props: {
    id: String
  },
  methods: {
    join: function() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$axios
          .$post(`/rooms/join`, {
            type: 'persentor',
            meetingID: this.id,
            fullname: this.email,
            password: this.password
          })
          .then(response => {
            console.log(response);
            window.location.href = response.url;
          })
          .catch(error => {
            if (this.$axios.isCancel(error)) {
              console.log("Request canceled", error);
            } else {
              // handle error
            }
          });
      }
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  }
};
</script>

<style>
.error {
  color: #b90000;
    font-size: 0.9rem;
    padding-top: 5px;
}
</style>