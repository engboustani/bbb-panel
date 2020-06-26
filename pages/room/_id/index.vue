<template>
  <div class="card">
    <div class="card-body">
      <form>
        <div class="form-group">
          <label for="roomID">شناسه روم</label>
          <h5 id="roomID">{{room.meetingID}}</h5>
        </div>
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
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            v-model="room.description"
          ></textarea>
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
              <input
                class="form-check-input"
                type="checkbox"
                id="gridCheck"
                v-model="room.recordOption"
              />
              <label class="form-check-label" for="gridCheck">قابلیت دخیره سازی</label>
            </div>
          </div>
        </div>
        <a class="btn btn-primary active" role="button" v-on:click="updateRoom">بروزسانی</a>
        <a class="btn btn-danger active" role="button" v-on:click="deleteRoom">حذف</a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const isUUID = require("is-uuid");
import { required, between } from "vuelidate/lib/validators";

export default {
  data: function() {
    return {
      id: "",
      room: {}
    };
  },
  validate({ params }) {
    // Must be a number
    return isUUID.v4(params.id);
  },
  asyncData({ $axios, params }) {
    return $axios.get(`/rooms/meeting/${params.id}`).then(res => {
      return { room: res.data, id: params.id };
    });
  },
  methods: {
    updateRoom: function() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$axios
          .$put(`/rooms/${this.id}`, this.room)
          .then(response => {
            console.log(response);
            this.$notify({
              group: "foo",
              type: "success",
              title: "بروزرسانی انجام شد",
              text: `روم ${this.room.name} بروزرسانی شد.`
            });
          })
          .catch(error => {
            console.log(error);
            if (this.$axios.isCancel(error)) {
              console.log("Request canceled", error);
            } else {
              // handle error
            }
                    this.$notify({
          group: "foo",
          type: "error",
          title: "مشکل در درخواست",
          text: `مشکلی در ارتباط شما به وجود آمده است لطفا بعدا امتحان فرمایید.`
        });

          });
      } else {
        this.$notify({
          group: "foo",
          type: "error",
          title: "فیلدها مشکل دارد",
          text: `از صحت کل فیلدها اطمینان حاصل کنید و دوباره تلاش کنید.`
        });
      }
    },
    deleteRoom: function() {
      this.$modal.show("dialog", {
        title: "Alert!",
        text: "You are too awesome",
        buttons: [
          {
            title: "Deal with it",
            handler: () => {
              alert("Woot!");
            }
          },
          {
            title: "", // Button title
            default: true, // Will be triggered by default if 'Enter' pressed.
            handler: () => {} // Button click handler
          },
          {
            title: "Close"
          }
        ]
      });
    }
  },
  validations: {
    room: {
      name: {
        required
      },
      observerLimit: {
        required,
        between: between(5, 70)
      }
    }
  }
};
</script>

<style>
</style>
