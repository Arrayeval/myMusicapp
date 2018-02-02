/**
 * Created by Administrator on 2018/1/29 0029.
 */
import  storage from "good-storage"
const SEARCH_KEY ="__search__";
const SEARCH_MAX_LENGTH =15

function insertArray(arr,val,compare,maxLen){
  const index=arr.findIndex(compare);
  if(index ===0){//如果带插入数据在第一条，不需要做任何操作
    return
  }
  if (index>0){//如果不是在第一条，就需要删除，然后再插入
    arr.splice(index,1);
  }
  arr.unshift(val);
  if(maxLen && arr.length >maxLen){//大于15条就删除最后一条
    arr.pop();
  }
}

function deleteFromArray(arr,compare){
  const index = arr.findIndex(compare);
  if(index>-1){
    arr.splice(index,1)
  }
}


export function saveSearch(query){
    let searches =storage.get(SEARCH_KEY,[]);
    insertArray(searches,query,(item)=>{
      return item ===query;
    },SEARCH_MAX_LENGTH)
    storage.set(SEARCH_KEY,searches);
    return searches
}

export  function loadSearch(){
  return storage.get(SEARCH_KEY,[])
}

export function deleteSearch(query){
  let search =storage.get(SEARCH_KEY,[]);
  deleteFromArray(search,(item)=>{
    return item === query;
  });
  storage.set(SEARCH_KEY,search);
  return search;
}

export function clearSearch(){
  storage.remove(SEARCH_KEY);
  return [];
}
