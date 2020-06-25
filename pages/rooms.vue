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
<ComponentListRooms
  :listData="rooms"
  :size="10"
  :current="currentPage"
 />
   <el-pagination
    layout="prev, pager, next"
    :total="rooms.length"
    @current-change="handleCurrentChange">
  </el-pagination>

<div class="card bg-light mb-3" v-if="rooms.length == 0">
  <div class="card-body">
    <h5 class="card-title">شما روم ندارید</h5>
    <p class="card-text">آیا میخواهید یک روم جدید بسازید؟</p>
    <button type="button" class="btn btn-primary">ساخت</button>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data: function() {
    return {
      rooms: [],
      loading: true,
      currentPage: 1
    }
  },
  asyncData ({ $axios, params }) {
    return $axios.get(`/rooms`)
      .then((res) => {
        return { rooms: res.data }
      })
  },
  methods: {
      handleCurrentChange(val) {
        this.currentPage = val;
      }

  }
};
</script>

<style>
</style>
