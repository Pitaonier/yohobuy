
window.onload=function() {
    // document.getElementById("shu").onFocus = function () {
    //     document.getElementById("shu").value = "";
    // }
    // document.getElementById("shu").onblur = function () {
    //     document.getElementById("shu").value = "万款潮品 已降价！ 最后一天";
    // }
    let Banner_bottom = getTag(".Banner_bottom")[0];
    let li = Banner_bottom.children;
    for(let i = 0 ; i < li.length ;i++) {
        li[i].setAttribute("index",i);
        li[i].onmouseenter = function() {
            // let index = this.getAttribute("index");
            // li[index].lastElementChild.style.opacity = ".5";
            this.lastElementChild.style.opacity = "0";
        }
        li[i].onmouseleave = function(){
            let clearTime  =setInterval(function(){
                this.lastElementChild.style.opacity = ".8";
            },3000);
            clearInterval(clearTime);
        }
    }

//淡入淡出
    autoPlay();
    getTag("#Banner_top").onmouseover = function(){
        stopPlay();
    }
    getTag("#Banner_top").onmouseout = function(){
        autoPlay();
    }
    getTag("#Banner_bottom").onmouseover = function(){
        stopPlay();
    }
    getTag("#Banner_bottom").onmouseout = function(){
        autoPlay();
    }
    for(let i = 0;i<li.length;i++){
        li[i].onmouseover = function(){
            goImg(this.getAttribute("index"));
        }
    }
    //点击事件
    getTag(".addBtn")[0].onclick=function(){
        let index;
        for(let i=0;i<Banner_bottom.children.length;i++){
            if(Banner_bottom.children[i].lastElementChild.style.opacity==0){
                index = i;
                break;
            }
        }
        chaceReduce(index);
    }
//关闭按钮
    getTag("#close").onclick=function(){
        getTag ("#vanish").style.display="none";
    }


}

//淡入淡出轮播图
let myTimer=null;
let currIndex=0;

//运动
function autoPlay(){
    if(myTimer!=null){
        return;
    }
    myTimer = setInterval(function(){
            let outIndex=currIndex;
            currIndex++;
            if(currIndex<0 || currIndex>=8){
                currIndex=0;
            }
            showImg(currIndex,outIndex);
        },3000);
}
// //停止播放
function stopPlay(){
    clearInterval(myTimer);
    myTimer=null;
}
function goImg(index){
    //一、数据处理
    let outIndex = currIndex;
    currIndex = index;

    if(currIndex>=8 || currIndex<0){
        currIndex=0;
    }

//     //二、外观呈现
    showImg(currIndex,outIndex);
}
// //显示指定的图片
let imgDoms = getTag(".Banner_top")[0].children;
function showImg(inIndex,outIndex) {
    if (inIndex === outIndex){
        return;
    }
    if (inIndex < 0 || inIndex > 8) {
        return;
    }
    if (outIndex < 0 || outIndex > 8) {
        return;
    }
    for (let i = 0; i < imgDoms.length; i++) {
        currIndex--;
        if (currIndex < 0) {
            currIndex = 7;
        }
        if (currIndex > 7) {
            currIndex = 0;
        }
        fadeInOut(imgDoms, imgDoms[inIndex], imgDoms[outIndex], 100);
//改下面的图片
        let Banner_bottom = getTag(".Banner_bottom")[0];
        let li = Banner_bottom.children;
        for (let i = 0; i < li.length; i++) {
            li[i].lastElementChild.style.opacity = ".8";
        }
        li[inIndex].lastElementChild.style.opacity = "0";
    }
}
//点击切换图片
function chaceAdd(index){
    let currIndex =index;
    for(let i=0;i<imgDoms.length;i++){
        currIndex++;
        if(currIndex<0){
            currIndex=7;
        }
        if(currIndex>7){
            currIndex=0;
        }
    }
}
function chaceReduce(){
    let index;
    for(let i=0;i<Banner_bottom.children.length;i++){
        if(Banner_bottom.children[i].lastElementChild.style.opacity==0){
            index = i;
            break;
        }
    }
    let currIndex =index;
    outIndex=currIndex-1;
    showImg(currIndex,outIndex);
}

//悬浮
window.onscroll=function(){
    let dDomScroll = document.documentElement.scrollTop || document.body.scrollTop ;
    if(dDomScroll>=50){
        document.getElementById("windowDown").style.display="block";
    }else{
        document.getElementById("windowDown").style.display="none";
    }
}




function getTag(id) {
    if(id.indexOf(".")>-1){
        return document.getElementsByClassName(id.substr(1));
    }if(id.indexOf("#")>-1){
        return document.getElementById(id.substring(1));
    }else {
        return document.getElementsByClassName(id);
    }
}