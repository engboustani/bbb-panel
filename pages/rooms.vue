<template>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-home"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >فعال‌ها</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-profile-tab"
                  data-toggle="pill"
                  href="#pills-profile"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >همه</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-contact-tab"
                  data-toggle="pill"
                  href="#pills-contact"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >ذخیره‌شده‌ها</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="pills-home-tab"
                >ساخت جدید</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col">
<div class="spinner-border text-secondary" role="status">
  <span class="sr-only">Loading...</span>
</div>
<ul class="list-group">
  <li class="list-group-item list-group-item-action" v-for="room in rooms" v-bind:key="room._id">{{room.name}}</li>
</ul>
<div class="card bg-light mb-3">
  <div class="card-body">
    <h5 class="card-title">شما روم ندارید</h5>
    <p class="card-text">آیا میخواهید یک روم جدید بسازید؟</p>
    <button type="button" class="btn btn-primary">ساخت</button>
  </div>
</div>
<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item disabled">
      <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  layout: 'default',
  data: function() {
    return {
      rooms: []
    }
  },
  asyncData ({ $axios, params }) {
    return $axios.get(`/rooms`)
      .then((res) => {
        return { rooms: res.data }
      })
  }
};
</script>

<style>
</style>
