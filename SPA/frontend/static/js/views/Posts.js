import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(){
        super()
        this.setTitle("Dashboard")
    }

    async getHtml(){

        async function getData(url){
            const response = await fetch(url)
            return response.json()
        }

        const data = await getData('/static/js/views/posts.json')

        let listPosts = "<ul>"
        for(let i in data){
            listPosts +="<li>"+data[i]["title"]+"</li>"
        }
        listPosts += "</ul>"
        return `
            <h1>Posts</h1>
        `+listPosts
    }
}