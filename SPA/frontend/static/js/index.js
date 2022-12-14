// 7
import Dashboard from "./views/Dashboard.js"
import Settings from "./views/Settings.js"
import Posts from "./views/Posts.js"
//10.1
import PostView from "./views/PostView.js"

//9
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
//10
const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
   // console.log(Array.from(match.route.path.matchAll(/:(\w+)/g)));
    //return {};
    
      return Object.fromEntries(keys.map((key, i) => {
          return [key, values[i]];
      }));
  }; 

// 1 router
const router = async () => {


    const routes = [
        { path: "/", view: Dashboard },
        { path: "/posts", view: Posts },
        { path: "/settings", view: Settings},
        //10.2
        { path: "/post-view/:id", view: PostView},
    ]

    // 2 match function
    const potentialMatches = routes.map(route => {
        return{
            route: route,
            //9.1
            result: location.pathname.match(pathToRegex(route.path))
        }
    })

   //9.4 console.log(potentialMatches);

    //9.2
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

   
    
    if(!match) {
        match = {
            route: routes[0],
            //9.3
            result: [location.pathname]
        }
       //9.4 - console.log(match.result);
    }

    //10.2
    const view = new match.route.view(getParams(match));
    //10.5 console.log(getParams(match))

    document.querySelector("#app").innerHTML = await view.getHtml();
}

//4
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

//6
window.addEventListener("popstate", router);

//5
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href)
        }
    })
    router();
});

