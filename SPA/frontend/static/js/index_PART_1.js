// 1 router
const router = async () => {

    const routes = [
        { path: "/", view: () => console.log('Vue du dashboard')},
        { path: "/posts", view: () => console.log('Vue du posts')},
        { path: "/settings", view: () => console.log('Vue du settings')},
    ]

    // 2 match function
    const potentialMatches = routes.map(route => {
        return{
            route: route,
            isMatch: location.pathname === route.path
        }
    })


    //console.log(potentialMatches)

    //3
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if(!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    }

    console.log(match);

}

//4
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}


document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href)
        }
    })
    router();
});

