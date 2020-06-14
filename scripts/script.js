var router = new VueRouter({
    mode: 'history',
    routes: []
});

Vue.use(VueMeta);

Vue.directive('scroll', {
inserted: function (el, binding) {
        let f = function (evt) {
        if (binding.value(evt, el)) {
            window.removeEventListener('scroll', f)
        }
        }
        window.addEventListener('scroll', f)
    }
})

Vue.component('video-player', {
    props: ["linkTo"],
    template:'<div style="padding:56.25% 0 0 0;position:relative;"><iframe :src="linkTo" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div>'
})

Vue.component('app-header', {
    props: ["title"],
    data: function () {
      return {
        // dataTitle: title,
      }
    },
    template:
    `
    <div class="header-wrap">
        <div class="header-cont">
            <button @click="this.app.toggleMenu()">
                <span class="material-icons">menu</span>
            </button>
            <span><a href="/" >{{title}}</a></span>
        </div>
    </div>
    `
})

Vue.component('nav-menu', {
    props: ['menuState','items'],
    data: function () {
      return {
        // menuItems: props.items,
      }
    },
    template:
    `<div :class="{'menu-wrap': true, 'menu-open': menuState}">
        <div class="menu-header">
            <h2>Where to?</h2>
            <button @click="this.app.toggleMenu()"><span class="material-icons">close</span></button>
        </div>            
        <ul>
            <li v-for="(item, index) in items">
                <a :href="'/#' + item.link" @click="this.app.toggleMenu()" :key="index + '_menu_item'" >
                    {{item.name}}
                </a>
            </li>
        </ul>
    </div>`
})

Vue.component('project', {
    props: ['project_prop'],
    data: function () {
        return {

        }
    },
    template: `
        <div class="card-wrap">
            <a :href="'?projectId=' + project_prop.id" class="card-link" v-if="project_prop.linkTo == undefined" ></a>
            <a :href="project_prop.linkTo" class="card-link" v-else target="_blank"></a>
            <div class="card">
                <div class="img-wrap">
                    <div class="img-filter"></div>
                    <div class='proj-img' :style='{backgroundImage : "url(." + project_prop.previewImg + ")"}'></div>
                    <div class="labels">
                        <h3>{{project_prop.platform}}</h3>
                        <h3 v-if="project_prop.linkTo != undefined">Link</h3>
                    </div>
                </div>
                <div class='proj-cont'>
                    <h1>{{project_prop.name}}</h1>
                    <p>{{project_prop.shortDes}}</p>
                </div>
            </div>
        </div>            
    `,

    mounted() {
        console.log(this.project)
    }
})

var app = new Vue({
    el: '#app',
    router,
    data: {
        date: "",
        selectedPage: "home",
        menuState: 0,
        selectedProject: 0,
        projects:[],
        appName: "Hello, I'm Dor",
        contacts:[
            {
                "name":"linkedin",
                "url":"https://www.linkedin.com/in/dortal/"
            },
            {
                "name":"email",
                "url":"mailto:dortaldt@gmail.com"
            },
            {
                "name":"github",
                "url":"https://github.com/dortaldt"
            },
            {
                "name":"instagram",
                "url":"https://www.instagram.com/ux_learnings/"
            }

        ],
        menuItems: [{"name":"Works","link":"works"},{"name":"about me","link":"about"}, {"name":"let's talk","link":"talk"}]
    },
    mounted() {
        var projects = window.projects
        this.projects = projects

        if(this.$route.query.projectId != undefined && this.$route.query.projectId < this.projects.length) {
        this.selectedProject = this.$route.query.projectId
        this.selectedPage = "project"
        } else {
            selectedPage= "home"
        }

        var d = new Date();
        this.date = d.getFullYear();
    },
    methods: {
        linkTo: function(id){
            this.selectedPage = "project"
            console.log('click')
        },
        toggleMenu: function(){
            if(this.menuState){
                this.menuState = 0
            } else {
                this.menuState = 1
            }
            console.log(this.menuState)
        },
        smoothScroll: function(link){
            // const index = 0;
            // var slected_item = this.menuItems[index].name
            document.querySelector('#' + link).scrollIntoView({ 
                behavior: 'smooth' 
            });
        },
    }
})

function sendEvent(name){
    gtag('event', name, {'method': 'Google'});
}