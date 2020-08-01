<template>
  <div class="card">
    <div class="card-body">
        <h2>داشبورد</h2>
          <div class="row">
    <div class="col-sm">
<div class="card">
  <div class="card-body">
    <h5>روم‌های فعال</h5>
    <h3 class="text-left">20</h3>
  </div>
</div>
    </div>
    <div class="col-sm">
<div class="card">
  <div class="card-body">
    <h5>تعداد بازدیدها</h5>
    <h3 class="text-left">324</h3>
  </div>
</div>
    </div>
    <div class="col-sm">
<div class="card">
  <div class="card-body">
    <h5>ذخیره‌شده‌ها</h5>
    <h3 class="text-left">10</h3>
  </div>
</div>
    </div>
  </div>
  <div class="row pt-3">
    <div class="col-sm">
    <div class="card">
      <div class="card-body">
        <line-chart v-if="showLine" :data="data" :options="options" height="100%" />
      </div>
    </div>
    </div>
  </div>

    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
    mounted () {
    this.showLine = true // showLine will only be set to true on the client. This keeps the DOM-tree in sync.
  },  

  data: function() {
    return {
      showLine: false,
          data: {
        labels: ['قرمز', 'آبی', 'زرد', 'سبز', 'بنفش', 'نارنجی'],
        datasets: [{
            label: 'بازدید هفتگی',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
                legend: {
            labels: {
                // This more specific font property overrides the global property
                fontFamily: "Vazir, tahoma, Arial, sans-serif"
            }
        }

    }

    }
  },
  methods: {
          fillData () {
        this.linedata = this.getRandomInt();
      },
    getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
  }
}
</script>

<style>
</style>
