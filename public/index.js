/* global Vue, VueRouter, axios */

var HomePage = {
    template: "#home-page",
    data: function() {
      return {
        message: "Welcome to Vue.js!",
        tasks: []
      };
    },
    // this is like the componentDidMount
    created: function() {
        axios.get("/v1/tasks").then(function(response) {
            this.tasks = response.data;
        }.bind(this));
    },
    methods: {},
    computed: {}
};

var router = new VueRouter({
    routes: [
        { path: "/", component: HomePage }
    ],
    scrollBehavior: function(to, from, savedPosition) {
      return { x: 0, y: 0 };
    }
});
  
var app = new Vue({
    el: "#vue-app",
    router: router
});  