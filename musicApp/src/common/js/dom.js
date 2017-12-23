/**
 * Created by Administrator on 2017/11/3 0003.
 */
export function addClass (el,className){//el：元素  className：带新增的样式类名
  if(hasClass(el,className)){
    return 0;
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className =  newClass.join(' ');
}


//判断是否拥有某个样式类
export  function hasClass(el,className){
  let reg= new RegExp('(^|\\s)'+className+'(\\s|$)');
  return reg.test(el.className)
}


//或去属性值
export function getData(el,name,val){
  const prefix = 'data-';
  name = prefix+name;
  if(val){
    return el.setAttribute(name,val);
  }
  else{
    return el.getAttribute(name)
  }

}



/**
* 样式前缀
* */
let elementStyle = document.createElement('div').style;

let vendor =(()=>{
  let transformNames={
    webkit:'webkitTransform',
    Moz:'MozTransform',
    O:'OTransform',
    ms:'msTransform',
    standard:'transform'
  };
  for (let key in transformNames){
    if(elementStyle[transformNames[key]]!==undefined){
      return key;
    }
  };
  return false;

})();

export function prefixStyle(style){
  if(vendor ===false){
    return false;
  }
  if(vendor ==='standard'){
    return style
  }

  return vendor+ style.charAt(0).toUpperCase()+style.substr(1);
}
