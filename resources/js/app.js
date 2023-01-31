/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
import {
    Button,
    HasError,
    AlertError,
    AlertErrors,
    AlertSuccess
} from 'vform/src/components/bootstrap5';
import Swal from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Vue from 'vue';
import VueProgressBar from 'vue-progressbar'
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
// 'vform/src/components/bootstrap4'
// 'vform/src/components/tailwind'

Vue.component(Button.name, Button)
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component(AlertErrors.name, AlertErrors)
Vue.component(AlertSuccess.name, AlertSuccess)
Vue.component('product-component', require('./components/ProductComponent.vue').default);
Vue.component('pagination', require('laravel-vue-pagination'));
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 * 
 * 
 */
Vue.use(VueProgressBar, {
    color: 'rgb(2, 117, 216)',
    failedColor: 'red',
    height: '2px'
});
Vue.use(Loading);
Vue.use(Swal)

const app = new Vue({
    el: '#app',

});
