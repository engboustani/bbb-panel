<template>
    <div class="card">
    <div class="card-body">
        <h2>جلسات</h2>

        <div class="row pt-3">
          <div class="col-sm">
        <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action" v-for="meeting in meetings" v-bind:key="meeting._id">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1"><i class="fas fa-play-circle"></i> {{ meeting.parent.name }}</h5>
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
export default {
  data: function() {
    return {
      meetings: [],
    }
  },
  asyncData ({ $axios, params }) {
    return $axios.get(`/meetings`)
      .then((res) => {
        return { meetings: res.data }
      })
  },

}
</script>

<style>

</style>