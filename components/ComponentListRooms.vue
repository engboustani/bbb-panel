<template>
  <ul class="list-group p-0">
    <li
      class="list-group-item list-group-item-action"
      v-for="room in reversedList"
      v-bind:key="room._id"
      
    >
    <div class="d-flex justify-content-between">
      <h5 class="mb-1">{{room.name}} <nuxt-link :to="`/room/${room.meetingID}`"><i class="fas fa-edit"></i></nuxt-link> <a href="#" v-on:click="$router.push({path: `/newroom`})"><i class="fas fa-clone"></i></a></h5>
      <small>{{ room.created | moment('jYYYY/jMM/jDD') }}</small>
    </div>
    <popper trigger="hover" :options="{placement: 'top'}">
    <div class="popper">
      ورود به روم
    </div>

    <a href="#" slot="reference" class="top text-dark" v-on:click="goJoinUrl(room.meetingID)">
      <i class="fas fa-sign-in-alt"></i>
    </a>  
  </popper>
    
    <i class="fas fa-record-vinyl text-danger"></i>
    <a href="#" v-clipboard:copy="getUrl(room.meetingID)" v-clipboard:success="onCopy" v-clipboard:error="onError"><i class="fas fa-clipboard text-primary"></i></a>
    <i class="fas fa-toggle-off text-secondary" v-if="1"></i>
    <i class="fas fa-toggle-on text-success" v-else></i>
     </li>
  </ul>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 10
    },
    current: {
      type: Number,
      required: false,
      default: 1
    }
  },
  computed: {
    // a computed getter
    reversedList: function() {
      // `this` points to the vm instance
      return this.listData.slice((this.current - 1) * this.size, this.current * this.size);
    }
  },
  methods: {
    onCopy: function (e) {
                  this.$notify({
              group: 'foo',
              type: 'success',
              title: 'کپی شد',
              text: `آدرس ورود روم در کلیپبرد شما دخیره گردید.`
            });

    },
    onError: function (e) {
                  this.$notify({
              group: 'foo',
              type: 'error',
              title: 'خطا',
              text: `مشکلی به وجود آمده است لطفا بعدا امتحان`
            });
    },
    getUrl: function (id) {
      return `/join/${id}`;
    },
    goJoinUrl: function (id) {
      window.location.href = `/join/${id}`;
    }
  }
};
</script>

<style>
</style>