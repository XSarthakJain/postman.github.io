let parameterBox = document.getElementById("parameterBox");
let JsonBox = document.getElementById("JsonBox");
// Initially paramterBox will hide
parameterBox.style.display = "none";

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
let addParamsCount = 0;
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

