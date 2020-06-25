<template>
  		<div class="login-screen">
			<div class="app-title">
				<h1>ورود</h1>
				<h5>{{room.name}}</h5>
			</div>
  <div class="login-form">

			<ComponentJoinObserver :id="id" v-if="!typelogin" />
      <ComponentJoinPersentor :id="id" v-else />
      <a class="btn-light btn-primary btn-large btn-block" v-on:click="changeType">{{ typelogin ? 'ورود شرکت‌کننده' : 'ورود ارائه‌دهنده' }}</a>
  </div>

		</div>
</template>

<script>
const isUUID = require('is-uuid');

export default {
  layout: 'login',
  data: function() {
    return {
      id: '',
      room: {},
      typelogin: 0
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
  methods: {
    changeType: function() {
      this.typelogin = !this.typelogin
    }
  }
}
</script>

<style>

</style>