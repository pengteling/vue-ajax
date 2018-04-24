<template>
  <div>
    App
  </div>
</template>
<script>
import axios from 'axios'
import jsonp from 'jsonp'
export default {
  created(){
    // axios.get("/data/Musiclist.js")
    // axios.get("https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=26&_=1524574885579")
    axios.get("http://music.henshui.com/api/musicList.js?!234")
      .then((res)=>{
        console.log(res.data)
      })
    // jsonp("https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&nobase64=1&musicid=213470055&songtype=0&_=1524575282324&jsonpCallback=jsonp1",  (err,data)=>{
    //   console.log(data)
    // })

    //Promise.all()
    // axios.all([] ).then()
    // fetch("/data/Musiclist.js").then(res=>res.text()).then(res => {
    //   console.log(res);
    // })
  }
  
}
</script>
