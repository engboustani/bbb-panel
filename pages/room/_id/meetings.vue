<template>
  <div class="card">
    <div class="card-body">
        <ComponentRoomHeader :id="id" />

        <div class="row pt-3">
          <div class="col-sm">
        <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action" v-for="meeting in room.meetings" v-bind:key="meeting._id">
    <div class="d-flex w-100 justify-content-between">
      <small>{{ meeting.created | moment('jYYYY/jMM/jDD hh:mm') }}</small>
    </div>
    <p class="mb-1">در حال برگذاری</p>
  </a>
</div>

          </div>

        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const isUUID = require("is-uuid");

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
    return $axios.get(`/rooms/meeting/${params.id}/meetings`).then(res => {
      return { room: res.data, id: params.id };
    });
  },
};
</script>

<style>
</style>
