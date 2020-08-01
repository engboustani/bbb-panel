<template>
        <ul class="nav nav-tabs">
  <li class="nav-item">
    <nuxt-link class="nav-link" :class="{ 'active': $route.name == 'room-id' }" :to="{name: 'room-id', params: { id: id } }">مشخصات</nuxt-link>
  </li>
  <li class="nav-item">
    <nuxt-link class="nav-link" :class="{ 'active': $route.name == 'room-id-meetings' }" :to="{name: 'room-id-meetings', params: { id: id } }">جلسات</nuxt-link>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">مخزن</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">حذف</a>
  </li>
</ul>
</template>

<script>
export default {
    props: { id: String }
}
</script>

<style>

</style>