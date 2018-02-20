/* global Vue, VueRouter, axios */

var HomePage = {
    template: "#home-page",
    data: function() {
      return {
        message: "Welcome to Vue.js!",
        tasks: [],
        newTask: {text: ""}
      };
    },
    // this is like the componentDidMount
    created: function() {
        axios.get("/v1/tasks").then(function(response) {
            this.tasks = response.data;
        }.bind(this));
    },
    methods: {
        createTask: function() {
            axios.post('/v1/tasks', this.newTask).then(function(response) {
                this.tasks.push(response.data);
                this.newTask = {text: ""};
            }.bind(this));
        },
        updateTask: function(task) {
            var taskIndex = this.tasks.indexOf(task);
            axios.patch("/v1/tasks/" + task.id, task).then(function(response) {
                this.tasks[taskIndex] = task.data;
            }.bind(this));
        }
    },
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