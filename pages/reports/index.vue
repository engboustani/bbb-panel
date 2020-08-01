<template>
    <div class="card">
    <div class="card-body">
        <h2>گزارشات</h2>

        <div class="row pt-3">
          <div class="col-sm">
            <h5 class="text-center">ساعات فعالیت روم‌ها</h5>
            <pie-chart v-if="showLine" :data="data" :options="options" height="50%" width="100%" />
          </div>
          <div class="col-sm">
            <h5 class="text-center">بازدید روم‌ها</h5>
            <doughnut-chart v-if="showLine" :data="data" :options="options" height="50%" width="100%" />
          </div>
        </div>
        <div class="row pt-3">
          <div class="col-sm">
            <h4>آخرین جلسات <nuxt-link to="/reports/meeting"><i class="fas fa-link"></i></nuxt-link></h4>
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
                    <div class="col-sm">
            <h4>آخرین حضورها <i class="fas fa-link"></i></h4>
        <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action" v-for="attendance in attendances" v-bind:key="attendance._id">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{attendance.name}}</h5>
      <small>{{ attendance.created | moment('jYYYY/jMM/jDD hh:mm') }}</small>
    </div>
    <p class="mb-1">وارد روم {{attendance.meeting.parent.name}} شد.</p>
    <small>در نقش میهمان</small>
  </a>
</div>

          </div>

        </div>
    </div>
  </div>

</template>

<script>
export default {
    mounted () {
    this.showLine = true // showLine will only be set to true on the client. This keeps the DOM-tree in sync.
  },  

  data: function() {
    return {
      meetings: [],
      attendances: [],
      showLine: false,
          data: {
        labels: ['قرمز', 'آبی', 'زرد', 'سبز', 'بنفش', 'نارنجی'],
            datasets: [{
        data: [10, 20, 30, 40 ,50 , 60],
                    backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],

    }],

    },
    options: {
                legend: {
                  display: false,
            labels: {
                // This more specific font property overrides the global property
                fontFamily: "Vazir, tahoma, Arial, sans-serif"
            }

        },
        tooltips: {
          _bodyFontFamily: "Vazir, tahoma, Arial, sans-serif",
          rtl: true
        }
    }

    }
  },
  asyncData ({ $axios, params }) {
    return $axios.get(`/reports`)
      .then((res) => {
        return { meetings: res.data.meetings, attendances: res.data.attendance }
      })
  },

}
</script>

<style>

</style>