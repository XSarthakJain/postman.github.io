let parameterBox = document.getElementById("parameterBox");
let JsonBox = document.getElementById("JsonBox");
// Initially paramterBox will hide
parameterBox.style.display = "none";

// Initially Alert Display none
let alert = document.getElementsByClassName("alert")[0];
alert.style.display = "none";

let requestParameter = document.getElementById("requestParameter");
requestParameter.addEventListener("change",()=>{
    if(requestParameter.value == "Json"){
        JsonBox.style.display = "block";
        parameterBox.style.display = "none";
    }
    else{
        JsonBox.style.display = "none";
        parameterBox.style.display = "block";
    }
});

// Utility function to convert String to DOM
function connversionStringtoDOM(string){
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.firstElementChild;
}

// if the user click on + button than add new parameter box
let addParamsCount = 1;
let addParameter1 = document.getElementById("addParameter1");
addParameter1.addEventListener("click",()=>{
    param = document.getElementById("moreParameter");
    let str = `<div class="row container">
                    <div class="col-lg-5 col-md-5 col-sm-5 col-5">
                        <input type="text"  class="form-control" placeholder="key" id="parameterKey${addParamsCount}">
                    </div>
                    <div class="col-lg-5 col-md-5 col-sm-5 col-5">
                        <input type="text" class="form-control" placeholder="value" id="parameterValue${addParamsCount}">
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                         <button class="btn btn-primary deleteParameter">-</button>
                    </div>
                </div>`;
    // to add DOM Element
    param.append(connversionStringtoDOM(str));

    // delete element when we click
    let deleteParameter = document.getElementsByClassName("deleteParameter");
    for(item of deleteParameter){
        item.addEventListener("click",(e)=>{
            e.target.parentElement.parentElement.remove();
        })
    }
    addParamsCount ++;
});

// if the user click on submit button
let paramsSubmission = document.getElementById("paramsSubmission");
paramsSubmission.addEventListener("click",()=>{
    let yourResponseult = document.getElementById("yourResponse");
    yourResponse.innerText = "please wait.....";

    let url = document.getElementById("url").value;
    let requestType = document.getElementById("requestType").value;
    let contentType = document.getElementById("requestParameter").value;

    if(url!=undefined){
    // Save url in History 
        let localStorageUrl = localStorage.getItem("urls");
        if(localStorageUrl==null){       
            temp = []   
            localStorage.setItem("urls",JSON.stringify(temp));
        }
        
        let localHistory = JSON.parse(localStorage.getItem("urls"))
        localHistory.push(url);
        localStorage.setItem("urls",JSON.stringify(localHistory));
        let historyUrlSection = document.getElementById("historyUrlSection");
        showHistory();

        // Show History link in Text Box
        let historyElement = document.getElementsByClassName("historyElement");
        Array.from(historyElement).forEach((ele)=>{
            ele.addEventListener("click",()=>{
                let url = document.getElementById("url");
                url.value = ele.innerText;
            });
        });

    

    // if content type is parameter
    if(contentType === "Parameter"){
        data = {}
        for(i=0;i<addParamsCount;i++){
            if(document.getElementById(`parameterKey${i}`)){
                key  = document.getElementById(`parameterKey${i}`).value;
                value  = document.getElementById(`parameterValue${i}`).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
        
    }
    else{
        data = document.getElementById("requestJsonText").value;
    }
    
    // Get Request
    if(requestType == "GET"){
        // add paramter along with url
        if(data){
        data = JSON.parse(data);
        url +="?";
        for(key in data){
            url+=`${key}=${data[key]}&`;
        }
        if(url.endsWith("&")){
            url = url.slice(0,-1);
        }}
        console.log("Url ======= ",url);

        fetch(url).then((response)=>response.text()).then((data)=>{
            document.getElementById("yourResponse").value = data;
        }).catch((ele)=>{
            alert.classList.add("alert-danger");
            alert.firstElementChild.innerText = "Error : Something went wrong";
            alert.style.display = "block";
        });
    }
    else{
        // Post Request
        console.log("data",data,url);
        params = {
            method : "post",
            headers : {
                'Content-Type':'application/json; charset=UTF-8'
            },
            body:data
        }
        fetch(url,params).then((response)=>{
            return response.json();
        }).then((data)=>{
            document.getElementById("yourResponse").value=`${JSON.stringify(data)}`;
        }).catch((ele)=>{
            alert.classList.add("alert-danger");
            alert.firstElementChild.innerText = "Error : Something went wrong";
            alert.style.display = "block";
        });
    }
    }
    
});

// Show History
let showHistory = ()=>{
    let historyUrlSection = document.getElementById("historyUrlSection");
    historyUrlSection.innerHTML = "";
    let str="";
    let historyUrl = JSON.parse(localStorage.getItem("urls"));
    if(historyUrl){
    Array.from(historyUrl).forEach((ele)=>{
        str+=`<span class="historyElement">${ele}</span>`;
        
    });
    let div = document.createElement("div");
    div.className = "historyLink";
    div.innerHTML = str;
    historyUrlSection.append(div);
    }
}


// Click Clear All
let clearAll = document.getElementsByClassName("clearAll");
clearAll[0].addEventListener("click",()=>{
    localStorage.clear();
    showHistory();
    alert.classList.add("alert-success");
    alert.firstElementChild.innerText = "Success : Clear history";
    // alert.firstElementChild.nextElementSibling.innerText = "Clear History";
    alert.style.display = "block";

});

// Search History
let historySearch = document.getElementById("historySearch");
let historyElement = document.getElementsByClassName("historyElement");
historySearch.addEventListener("input",()=>{
    Array.from(historyElement).forEach((ele)=>{
        if((ele.innerText).toLowerCase().includes(historySearch.value.toLowerCase())){
            ele.style.display = "block";
        }
        else{
            ele.style.display = "none";
        }
    })
})

// Initially call Automatically
showHistory();

// Show History link in Text Box
historyElement = document.getElementsByClassName("historyElement");
Array.from(historyElement).forEach((ele)=>{
    ele.addEventListener("click",()=>{
        let url = document.getElementById("url");
        url.value = ele.innerText;
    });
});