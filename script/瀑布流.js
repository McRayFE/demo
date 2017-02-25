window.onload=function(){
   imgLocation("container","box");
}
var imgData={"data":[{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"}]};
//监听滚动条
window.onscroll=function(){
     if(checkFlag("container","box")){
        var cparent=document.getElementById("container");
        for(var i=0;i<imgData.data.length;i++){
        	var ccontent=document.createElement("div");
        	ccontent.className="box";
        	cparent.appendChild(ccontent);
        	var boximg=document.createElement("div");
        	boximg.className="imgBox";
        	ccontent.appendChild(boximg);
        	var img=document.createElement("img");
        	img.src="images/"+imgData.data[i].src;
        	boximg.appendChild(img);
        }
        imgLocation("container","box");//对新加入的图片继续调用imgLocation函数
     }
}
function checkFlag(parent,content){
	var cparent=document.getElementById(parent);
	var ccontent=getChildElement(cparent,content);
	var lastContentHeight=ccontent[ccontent.length-1].offsetTop;//得到最后一张图片的顶部高度
	var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;//得到滚动的高度
	var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;//得到屏幕的高度
	if(scrolltop+pageHeight>lastContentHeight){
		return true;
	}
}
function imgLocation(parent,content){
	//将parent下所有content取出
	var cparent=document.getElementById(parent);
	var ccontent = getChildElement(cparent,content);
	var imgWidth=ccontent[0].offsetWidth;//获得图片的宽度
    var cols=Math.floor(document.documentElement.clientWidth / imgWidth);//获得浏览器一行可以容纳的图片数
    cparent.style.cssText="width:"+imgWidth*cols+"px;margin:0 auto";//通过style.cssText来改变元素的样式
    //确定位置
    var BoxHeightArr=[];
    //判断一排中的最小位置
    for(var i=0;i<ccontent.length;i++){
    	if(i<cols){
    		BoxHeightArr[i]=ccontent[i].offsetHeight;//只存入一行的高度
    	} else{
    		var minHeight=Math.min.apply(null,BoxHeightArr);
    		var minIndex=getminheightLocation(BoxHeightArr,minHeight);
    		ccontent[i].style.position="absolute";
    		ccontent[i].style.top=minHeight+"px";
            ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
            BoxHeightArr[minIndex]=BoxHeightArr[minIndex]+ccontent[i].offsetHeight;//改变原来最小高度图片的高度
    	}
    }
}
//得到高度最小图片的位置
function getminheightLocation(BoxHeightArr,minHeight){
	for(var i=0;i<BoxHeightArr.length;i++){
		if(BoxHeightArr[i]==minHeight){
			return i;
		}
	}
}
//获得图片的个数
function getChildElement(parent,content){
	var contenArr=[];
	var allContent = parent.getElementsByTagName("*");
	for(var i=0;i<allContent.length;i++){
		if(allContent[i].className==content){
			contenArr.push(allContent[i]);
		}
	}
	return contenArr;
}