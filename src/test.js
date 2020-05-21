var s = "12321"

var isPalindrome = function(x) {
    let str = x.toString();
    let revStr = '';
    revStr = str.split("").reverse().join("");
    if(revStr === str){
        return true
    }else{
        return false
    }
};
var result = isPalindrome(s);
console.log("result: "+result);
