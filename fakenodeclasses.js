class fs{
    constructor(){

    }
    async readFileSync(){

    }
    readFile(fileName){
        if(filesText[files.indexOf(fileName)] != undefined){
            return filesText[files.indexOf(fileName)];
        }else{
            console.log(`Error: File not found: ${fileName}`)
        }
        
    }

}
class repl{
    constructor(){
        this.started = false
    }
    start(object = {}){
        this.started = true;
        return new noEXreplPrompt()
    }
}
class noEXreplPrompt{
    constructor(object){
        this.prompt = object.prompt
    }
    displayPrompt(){
        return 'hey wait you\'re not supposed to be importing this'
    }
    defineCommand(){

    }
}
class process{
    constructor(){

    }
    exit(){
       console.log("hey sorry but im not sure how to implement this") 
    }
}
class http{
    constructor(){

    }
    createServer(func = function(req,res){},port=8080){
        let a = document.createElement("a")
        a.innerHTML = "Preview your page"
        a.id="preview"
        a.href = `data:text/html,${func().replaceAll("\r","")}<button style="position:fixed;bottom:0;right:0;" onclick="window.close()">Close</button>`
        document.querySelector("#logger").appendChild(a)
    }
}
