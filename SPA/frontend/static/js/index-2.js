// 7
import Dashboard from "./views/Dashboard.js"
import Settings from "./views/Settings.js"
import Posts from "./views/Posts.js"


const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
const getParams = match => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
 // console.log(Array.from(match.route.path.matchAll(/:(\w+)/g)));
  //return {};
  
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
}

// 1 router
const router = async () => {

    console.log()

    const routes = [
        { path: "/", view: Dashboard },
        { path: "/posts", view: Posts },
        { path: "/settings", view: Settings},
    ]

    // 2 match function
    const potentialMatches = routes.map(route => {
        //8.1 console.log(route.path);
        //8.2console.log(location.pathname);
        console.log(pathToRegex("posts/:id")); 
        return{
            route: route,
            isMatch: location.pathname === route.path
        }
    })

    //3
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if(!match) {
        match = {
            route: routes[0],
            //isMatch: true
            result: [location.pathname]
        }
    }
    console.log(match);
 
    //8
    const view = new match.route.view();

    

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

