let index=0;
function colorchange(){
    let color=["black","white"]
    document.getElementsByTagName("body")[0].style.background= color[index++];
    document.getElementsByTagName("body")[0].style.transition="all 1s";
    if(index>color.length-1)
    index=0;
}

