/* global Vue, VueRouter, axios */

var HomePage = {
    template: "#home-page",
    data: function() {
      return {
        message: "Welcome Home",
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
        },
        deleteTask: function(task) {
            var taskIndex = this.tasks.indexOf(task);
            axios.delete("/v1/tasks/" + task.id).then(function(response) {
                this.tasks.splice(taskIndex, 1);
            }.bind(this));
        }
    },
    computed: {}
};

var WatPage = {
    template: "#wat-page",
    data: function() {
      return {
        message: "You did WAT now?"
      };
    },
    // this is like the componentDidMount
    created: function() {
        // axios.get("/v1/tasks").then(function(response) {
        //     this.tasks = response.data;
        // }.bind(this));
    },
    methods: {},
    computed: {}
};

var router = new VueRouter({
    routes: [
        { path: "/", component: HomePage },
        { path: "/wat", component: WatPage}
    ],
    scrollBehavior: function(to, from, savedPosition) {
      return { x: 0, y: 0 };
    }
});
  
var app = new Vue({
    el: "#vue-app",
    router: router
});  