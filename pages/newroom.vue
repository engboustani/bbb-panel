<template>
  <div class="card">
    <div class="card-body">
        <h2>افزودن روم</h2>
      <form>
        <div class="form-group">
          <label for="roomName">نام روم</label>
          <input
            type="text"
            class="form-control form-control-lg"
            id="roomName"
            aria-describedby="nameHelp"
            placeholder="کلاس آنلاین..."
            :class="{ 'is-invalid': $v.room.name.$error }"
            v-model.trim="$v.room.name.$model"
          />
          <small
            id="nameHelp"
            class="form-text text-muted"
          >We'll never share your email with anyone else.</small>
        </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">پیام خوش‌آمد</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="room.description"></textarea>
          <small
            id="nameHelp"
            class="form-text text-muted"
          >با نوشتن {name} میتوانید نام روم را جایگذینش کنید.</small>
  </div>
  <div class="form-row">
        <div class="form-group col-md-6">
          <label for="roomCount">تعداد بازدیدکننده</label>
          <input
            type="number"
            class="form-control"
            id="roomCount"
            :class="{ 'is-invalid': $v.room.observerLimit.$error }"
            v-model.trim="$v.room.observerLimit.$model"
          />

        </div>
        <div class="form-group col-md-6">
            <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck" v-model="room.recordOption">
            <label class="form-check-label" for="gridCheck">
                قابلیت دخیره سازی
            </label>
            </div>

        </div>
      </div>
        <a class="btn btn-primary" href="#" v-on:click="postNewRoom">ثبت</a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { required, minLength, between } from "vuelidate/lib/validators";

export default {
      data: function() {
    return {
      id: '',
      room: {
          name: '',
          description: '',
          observerLimit: 30,
          recordOption: false
      }
    }
  },

    methods: {
        postNewRoom: function() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$axios
          .$post(`/rooms`, this.room)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
              console.log(error);
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
          room: {
            name: {
                required,
                minLength: minLength(4)
            },
            observerLimit: {
                required
            }
          }
  }

};
</script>

<style>
</style>
