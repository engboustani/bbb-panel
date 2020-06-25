<template>
  <ul class="list-group">
    <li
      class="list-group-item list-group-item-action"
      v-for="room in reversedList"
      v-bind:key="room._id"
    >{{room.name}}</li>
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
  }
};
</script>

<style>
</style>