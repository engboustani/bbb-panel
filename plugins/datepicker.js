import Vue from 'vue';
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
if (process.client) {
    Vue.component('DatePicker', VuePersianDatetimePicker);
}