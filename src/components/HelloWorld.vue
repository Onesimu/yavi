<script setup lang="ts">
  import { ref, reactive } from 'vue'

  const state = reactive({
    citylist: [],
    weatherList: [],
    city: '石家庄',
    ganmao: '',
    wendu: ''
  })

  fetch('/data.js').then(r => r.json()).then(r => {
    state.citylist = r.flat()
  })

  const search = e => {
    const city = (e && e.target.value) ? e.target.value : state.city
    fetch('http://wthrcdn.etouch.cn/weather_mini?city=' + city).then(r => r.json())
      .then(r => {
        if (r.status != 1000) return alert(r.desc)
        const l = r.data
        l.yesterday.fengxiang = l.yesterday.fx
        l.yesterday.fengli = l.yesterday.fl
        l.forecast.unshift(l.yesterday)
        l.forecast.forEach(it => it.fengli = it.fengli.replace('<![CDATA[', '').replace(']]>', ''))
        state.weatherList = l.forecast

        state.city = l.city
        state.ganmao = l.ganmao
        state.wendu = l.wendu
      })
  }
  search()


  // axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" + c).then(function(message) {
  //   state.weatherList = message.data.data.forecast
  // })
</script>

<template>
  <div id="g1">
    <h1>天气预报</h1>
    <div>
      <input class="ui-input ui-input-search" placeholder="请键入或选择城市" list="citylist" @change="search">
      <datalist id="citylist">
        <option v-for="it of state.citylist" :value="it"></option>
      </datalist>
    </div>

    <div id="g2">
      {{state.city}}
      {{state.wendu}}
      {{state.ganmao}}
    </div>

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
    
    <router-link to="/about">关于我们</router-link>
  </div>

</template>

<style scoped>
  #g1 {
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  #g2 {
    margin: 20px auto;
  }
  .weather_list li {
    display: flex;
    justify-content: center;
  }
</style>
