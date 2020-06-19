<template>
  		<div class="login-screen">
			<div class="app-title">
				<h1>ورود</h1>
				<h5>{{room.name}}</h5>
			</div>

			<ComponentJoinObserver :id="id" />
		</div>
</template>

<script>
const isUUID = require('is-uuid');

export default {
  layout: 'login',
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
  }

}
</script>

<style>

</style>