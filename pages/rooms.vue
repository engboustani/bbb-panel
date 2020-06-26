<template>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col">
            <ul class="nav nav-pills mb-3 p-0" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-home"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >همه</a>
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
                >فعال‌ها</a>
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
                <nuxt-link to="/newroom"
                  class="nav-link active"
                  id="pills-home-tab"
                >ساخت جدید</nuxt-link>
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
<paginate
  :page-count="20"
  :prev-text="'قبلی'"
  :next-text="'بعدی'"
  :container-class="'pagination justify-content-center'"
  :page-class="'page-item'"
  :page-link-class="'page-link'"
  :prev-class="'page-item'"
  :prev-link-class="'page-link'"
  :next-class="'page-item'"
  :next-link-class="'page-link'" v-if="0">
</paginate>

<div class="card bg-light mb-3" v-if="rooms.length == 0">
  <div class="card-body">
    <h5 class="card-title">شما روم ندارید</h5>
    <p class="card-text">آیا میخواهید یک روم جدید بسازید؟</p>
    <nuxt-link to="/newroom"
                   class="btn btn-primary active" role="button" 
                >ساخت جدید</nuxt-link>
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
