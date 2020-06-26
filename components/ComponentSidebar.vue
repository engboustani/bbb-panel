<template>
  <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <nuxt-link to="/" class="nav-link" role="tab" :class="{ 'active': $route.path == '/' }"><i class="fas fa-tachometer-alt pl-2"></i>داشبورد</nuxt-link>
      <nuxt-link to="/rooms" class="nav-link" role="tab" :class="{ 'active': $route.path == '/rooms' }"><i class="fas fa-chalkboard pl-2"></i>روم‌ها<span class="badge badge-primary badge-pill" :class="{ 'badge-light': $route.path == '/rooms'}">14</span></nuxt-link>
      <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i class="fas fa-chart-line pl-2"></i>آمار</a>
      <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i class="fas fa-chalkboard-teacher pl-2"></i>ارائه‌دهندگان</a>
      <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false"><i class="fas fa-money-check-alt pl-2"></i>حسابداری</a>
      <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i class="fas fa-cogs pl-2"></i>تنظیمات</a>
      <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i class="fas fa-ticket-alt pl-2"></i>پشتیبانی</a>
      <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i class="fas fa-user pl-2"></i>پروفایل</a>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.badge {
  float: left;
}
</style>