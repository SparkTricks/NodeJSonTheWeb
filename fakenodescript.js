alert("I load?")
document.addEventListener("DOMContentLoaded",function(e){
    // Load the save
    // for now, just alert the info
    // alert(localStorage.getItem("files"))
    // alert(localStorage.getItem("filesText"))
    // alert(localStorage.getItem("currentFile"))
    // Alright! That's working! Now we load everything! Just in case, let's place a trycatch block.
    try {
        files = localStorage.getItem("files").split("򙦙") // u+99999
        filesText = localStorage.getItem("filesText").split("򙦙") // u+99999
        currentFile = parseInt(localStorage.getItem("currentFile"))
        // Alright, since it's working, we just set everything up!
        // But, if we have an error, we don't set it up! Good.
        deleteFile("index.js")
        for(let file of files){
            createFile(file,true)
        }
        showFile(files[currentFile])
    } catch (e) {
        alert(e)
    }
})
setInterval(function(){
    saveFile()
}, 3000);
let files = ["index.js"]
let errorShown = false;
let currentFile = 0;
let filesText = [""]
document.cookie = "test=hello; Secure"
function run(string=""){
    // check which file extension it is
    switch(files[currentFile].split(".")[1]){
        case "js":
            try{
                filesText[currentFile] = document.querySelector("#node").value//.replaceAll("\n","<br>");
                let program = document.querySelector("#node").value
                if(string != ""){
                    eval(string)
                }else{
                    eval(program)
                }
            }catch(e){
                alert(e)
            }
            break;
        case "css":
            // set stylesheet to current page?
        document.head.innerHTML+=`<style>
            ${filesText[currentFile]}
        </style>`
            break;
        case "html":
            let a = document.createElement("a")
            a.innerHTML = "Preview your page"
            a.id="preview"
            // a.onclick = function(){
            //     alert('hello?');
            //     try{
            //         window.open(`data:text/html,${filesText[currentFile]}<button style='position: absolute;bottom: 0;right: 0;' onclick='window.close()'>Close</button>`,'')
            //     }catch(e){
            //         alert(e)
            //     }
            // }
            a.href = `data:text/html,${filesText[currentFile]}<button style='position:absolute;bottom:0;right:0;' onclick='window.close()'>Close</button>`
            a.target = "_blank"
            document.querySelector("#logger").appendChild(a)
        break;
    }
    try{

        
    }catch(e){
        alert(e)
    }
}
console.log = function(message){
    let logger = document.querySelector('#logger')
    let p = document.createElement('p')
    p.style= "text-overflow: '...';"
    p.innerHTML = message
    logger.appendChild(p)
}
console.log(document.querySelector(":root").getPropertyValue("--sidebar-width"))

function require(required=""){
    if(required.includes("noEX")){
        console.log(`ModuleError: Module not found: ${required}`)
        errorShown = true;
    }else{
        return eval(`new ${required.replace("node:","")}`)
    }
}
function example(){
    try{
        document.querySelector("#node").value = `console.log("Hello World!")`
    }catch(e){
        alert(e)
    }
}
function nodeClear(type="all"){
try{
    switch (type) {
        case "all":
            document.querySelector("#node").value = ""
            document.querySelectorAll("#logger *").forEach(function(element){
                element.remove()
            });
            break;
        case "console":
            document.querySelectorAll("#logger *").forEach(function(element){
                element.remove()
            });
            break;
        case "program":
            document.querySelector("#node").value = "";
            break;
        default:
            break;
    }
}catch(e){
    alert(e)
}
}
function createFile(name,noNew = false;){
    try{
    if(noNew && (files.includes(name)||name == ""||name == undefined)){
        alert(`did not create file ${name}`)
        // There is already a file. Return.
        return;
    }
    let fileDiv = document.createElement('div')
    fileDiv.id = "fileDiv"
    fileDiv.oncontextmenu = function(e){
        deleteFile(name,e)
    }
    //fileDiv.parent = document.querySelector("#sidebar #files")
    let file = document.createElement("img")
    file.src="profile picture.jpg"
    file.id="file"
    //file.parent = fileDiv
    let label = document.createElement("label")
    label.id="fileLabel"
    label.for="file"
    //label.parent = fileDiv
    label.innerHTML = name
    label.class=name.replaceAll('.',"")
    let button = document.createElement("button")
    button.id="fileButton"
    button.onclick=function(){
        showFile(name)
    }
    button.ondblclick = function(){
        renameFile(name)
    }
    document.querySelector("#sidebar #files").appendChild(fileDiv)
    fileDiv.appendChild(file)
    fileDiv.appendChild(label)
    fileDiv.appendChild(button)
    if(!noNew){
        files.push(name)
    // create a new element for the file
        filesText.push("")
    }
    }catch(e){
        alert(e)
    }
    checkFiles()
}
function showFile(name){
    document.querySelector("#node").value = filesText[files.indexOf(name)]
    currentFile = files.indexOf(name)
    document.querySelector("#fileCurrent").innerHTML = `Current File:<br>${files[currentFile]??"None"}`
}
function addFile(){
    let fileName = prompt("Please enter the name of the file.")
    createFile(fileName)
}
function saveFile(){
    let file = files[currentFile]
    // save file
    filesText[currentFile] = document.querySelector("#node").value
    document.querySelector("#saveFile").innerHTML = ""
    let i = document.createElement("i")
    i.innerHTML = "💾"
    document.querySelector("#saveFile").appendChild(i)
    // Save to cookies
    //document.cookie = `files=${files}; filesText=${filesText}; currentFile=${currentFile}`
    try {
        localStorage.setItem('files',files.join("򙦙")) // u+99999
        localStorage.setItem("filesText",filesText.join("򙦙")) // u+99999
        localStorage.setItem("currentFile",currentFile)
    } catch (e) {
        alert(e)
    }
    setTimeout(function(){
        document.querySelector("#saveFile").innerHTML = "💾"
    }, 250);
}
function fileThings(name,content){
    createFile(name)
    filesText[files.indexOf(name)] = content;
    showFile(name)
    document.querySelector("#run").click()
    document.querySelector("#preview").click()
}
function renameFile(name){
    let newName = prompt('Please enter the new name of the file.')
    try{
        document.querySelector(`.${name.replaceAll(".",'')}`).parentElement.innerHTML = `
        <img id="file" src="profile picture.jpg">
        <label id="fileLabel" class="${name.replaceAll(".",'')}" for="file">${newName}</label>
        <button id="fileButton" ondblclick="renameFile('${newName}')" onclick="showfile('${newName}')"></button>`
        files[files.indexOf(name)] = newName
        alert(`${files} .${newName.replaceAll(".",'')}`)
    }catch(e){
        alert(e)
    }
}
function deleteFile(name,e){
    if(e){
        e.preventDefault()
    }
    if(confirm("Would you like to delete this file?")){
        if(confirm(`Are you SURE you want to delete this file?
Once you delete this file, all its data will be lost!`)){
            try{
            //alert(e.target.parentElement.querySelector("#fileLabel").innerHTML)
            if(e){
                e.target.parentElement.remove()
            }
            filesText.pop(files[files.indexOf(name)])
            files.pop(files[files.indexOf(name)])
            }catch(error){
                alert(error)
            }
        }
    }
    checkFiles()
}
function checkFiles(){
    if(files.length == 0){
        document.querySelector("#not-sidebar").style.display = "none"
        showFile("")
    }else{
        document.querySelector("#not-sidebar").style.display = ""
        showFile(files[0])
    }
}
alert("i have loaded")