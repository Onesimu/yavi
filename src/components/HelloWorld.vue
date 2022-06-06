<script setup lang="ts">
  import { ref, reactive } from 'vue'

  const state = reactive({
    weatherList: [],
    city: '',
    ganmao: '',
    wendu: ''
  })

  fetch('http://wthrcdn.etouch.cn/weather_mini?city=北京').then(r => r.json())
    .then(r => {
      const l = r.data
      console.log(l)
      l.yesterday.fengxiang = l.yesterday.fx
      l.yesterday.fengli = l.yesterday.fl
      l.forecast.unshift(l.yesterday)
      l.forecast.forEach(it => it.fengli = it.fengli.replace('<![CDATA[', '').replace(']]>', ''))
      state.weatherList = l.forecast
      
      state.city = l.city
      state.ganmao = l.ganmao
      state.wendu = l.wendu
    })

  // axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" + c).then(function(message) {
  //   that.city = c;
  //   that.forecasts = message.data.data.forecast;
  // })
</script>

<template>
  <div id="g1">
    <input list="citylist">
    <datalist id="citylist">
      <option value="Afghanistan 阿富汗"></option>
      <option value="Albania 阿尔巴尼亚"></option>
      <option value="Algeria 阿尔及利亚"></option>
      <option value="Andorra 安道尔共和国"></option>
      <option value="Angola 安哥拉"></option>
    </datalist>

    {{state.city}}
    {{state.wendu}}C
    {{state.ganmao}}
    <ul class="weather_list">
      <li v-for="item of state.weatherList">
        {{item.date}}
        {{item.type}}
        {{item.high}}
        {{item.low}}
        {{item.fengxiang}}
        {{item.fengli}}
      </li>
    </ul>
  </div>

</template>

<style scoped>
  #g1 {
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .weather_list li {
    display: flex;
  }
</style>
