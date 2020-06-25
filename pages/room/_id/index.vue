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
            v-model="room.name"
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
            value="30"
            v-model="observerLimit"
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
        <button type="submit" class="btn btn-primary">بروزسانی</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const isUUID = require('is-uuid');

export default {
  data: function() {
    return {
      id: '',
      room: {}
    }
  },
    validate ({ params }) {
    // Must be a number
    return isUUID.v4(params.id)
  },
  asyncData ({ $axios, params }) {
    return $axios.get(`/rooms/meeting/${params.id}`)
      .then((res) => {
        return { room: res.data, id: params.id }
      })
  },

};
</script>

<style>
</style>
