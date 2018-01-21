/**
 * Created by Administrator on 2018/1/17 0017.
 */
import {commonParams} from "./config"
import axios from "axios"

export function  getSongList(disstid){
  const url = "/api/getSongList";
  const data = Object.assign({},commonParams,{
    disstid:disstid,
    type:1,
    json:1,
    utf8:1,
    onlysong:0,
    //platform:"yqq",
    hostUin:0,
    needNewCode:1,
    g_tk:5381,
    format:'json',
  //  g_tk:5381,
    uin:0,
 //   format:json,
   // inCharset:utf-8,
   // outCharset:utf-8,
    notice:0,
   platform:'h5',
 //   needNewCode:1
    new_format:1,
    pic:500,
    //disstid:3645685762
  //  type:1
   // json:1
 //   utf8:1
 //   onlysong:0
    picmid:1,
    nosign:1,
    song_begin:0,
    song_num:15,

  });
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return  Promise.resolve(res.data)
  }).catch(err=>{
    console.log(err)
  })
}
