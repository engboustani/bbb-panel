<template>
  <div class="login-form">
    <div class="control-group" :class="{ 'form-group--error': $v.fullname.$error }">
      <input
        type="text"
        class="login-field"
        placeholder="نام بازدیدکننده"
        id="login-name"
        v-model.trim="$v.fullname.$model"
      />
      <label class="login-field-icon fui-user" for="login-name"></label>
      <div class="error" v-if="!$v.fullname.required">* فیلد باید پر شود!</div>
      <div
        class="error"
        v-if="!$v.fullname.minLength"
      >* نام باید بلندتر از {{$v.fullname.$params.minLength.min}} حرف باشد.</div>
    </div>

    <a class="btn btn-primary btn-large btn-block" href="#" v-on:click="join">ورود</a>
    <a class="btn-light btn-primary btn-large btn-block" href="#">ورود ارائه‌دهنده</a>
  </div>
</template>

<script>
import { required, minLength, between } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      fullname: ""
    };
  },
  props: {
    id: String
  },
  methods: {
    join: function() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$axios
          .$post(`/rooms/join`, {
            meetingID: this.id,
            fullname: this.fullname
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
    fullname: {
      required,
      minLength: minLength(4)
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