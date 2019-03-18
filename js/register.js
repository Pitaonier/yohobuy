//悬浮
window.onscroll=function(){
    let dDomScroll = document.documentElement.scrollTop || document.body.scrollTop ;
    if(dDomScroll>=50){
        document.getElementById("windowDown").style.display="block";
    }else{
        document.getElementById("windowDown").style.display="none";
    }
}

window.onload=function(){
    // 手机号
    $("#telephone").blur(function(){
        let reg =/^[1-9]\d{10}$/;
        if(reg.test($(this).val())){
            $.get("../PHP/phonenumber.php", { "telephone": $(this).val()},
                function(data ){
                    if( data== "1"){
                        $("#hint").html("该手机号码可以注册");
                    }else{
                        $("#hint").html("该手机号码已被注册");
                    }
                });
        }else{
            $("#hint").html("请输入正确的手机号");
        }
    })
    // 密码
    $("#passwords").blur(function(){
        var arr=document.getElementById("passwords").value;
        //1、长度6个字符以上
        if(arr.length<6){
            alert("密码长度不能小于6位");
            return;
        }else{
            var hasAbc=false;
            for(i in arr){
                var code=arr.charCodeAt(arr[i]);
                if((code>=97 &&code<=122) ||(code>=65 &&code<=90)){
                    hasAbc=true;
                    $(".light_one").css("background","red");
                    break;
                }
            }
            if(hasAbc!=true){
                alert("密码中需包含字母");
                return;
            }
            //2、必须包含数字
            var hasNum=false;
            for(i in arr){
                var code=arr.charCodeAt(arr[i]);
                if(code>48 &&code<57){
                    hasNum=true;
                    $(".light_two").css("background","yellow");
                    break;
                }
            }
            if(hasNum!=true){
                alert("密码中需包含数字");
                return;
            }
            //3、特殊字符
            var zifu=['@','#','$','&'];
            var haszifu=false;
            for(var i=0;i<arr.length;i++){
                if(zifu.indexOf(arr.charAt(i))>-1){
                    haszifu=true;
                    $(".light_three").css("background","green");
                    break;
                }
            }
            if(haszifu!=true){
                alert("密码中需包含特殊字符");
                return;
            }
        }
    })
}
    // function passwords(){
    //     var arr=document.getElementById("passwords").value;
    //     //1、长度6个字符以上
    //     if(arr.length<6){
    //         alert("密码长度不能小于6位");
    //         return;
    //     }
    //     //2、必须包含字母
    //     var hasAbc=false;
    //     for(i in arr){
    //         var code=arr.charCodeAt(arr[i]);
    //         if((code>=97 &&code<=122) ||(code>=65 &&code<=90)){
    //             hasAbc=true;
    //             break;
    //         }
    //     }
    //     if(hasAbc!=true){
    //         alert("密码中需包含字母");
    //         return;
    //     }
    //     //2、必须包含数字
    //     var hasNum=false;
    //     for(i in arr){
    //         var code=arr.charCodeAt(arr[i]);
    //         if(code>48 &&code<57){
    //             hasNum=true;
    //             break;
    //         }
    //     }
    //     if(hasNum!=true){
    //         alert("密码中需包含数字");
    //         return;
    //     }
    //     //3、特殊字符
    //     var zifu=['@','#','$','&'];
    //     var haszifu=false;
    //     for(var i=0;i<arr.length;i++){
    //         if(zifu.indexOf(arr.charAt(i))>-1){
    //             haszifu=true;
    //             break;
    //         }
    //     }
    //     if(haszifu!=true){
    //         alert("密码中需包含特殊字符");
    //         return;
    //     }
    // }


function getTag(id) {
    if(id.indexOf(".")>-1){
        return document.getElementsByClassName(id.substr(1));
    }if(id.indexOf("#")>-1){
        return document.getElementById(id.substring(1));
    }else {
        return document.getElementsByClassName(id);
    }
}