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
      state.weatherList = l.forecast
      state.city = l.city
      state.ganmao = l.ganmao
      state.wendu = l.wendu
    })
</script>

<template>
  <div>
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
        {{item.fengli.replace('<![CDATA[', '').replace(']]>', '')}}
      </li>
    </ul>
  </div>

</template>

<style scoped>
  .weather_list li {
    display: flex;
  }
</style>
