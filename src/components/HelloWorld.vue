<script setup lang="ts">
  import { ref, reactive } from 'vue'

  const state = reactive({
    weatherList: []
  })

  fetch('http://wthrcdn.etouch.cn/weather_mini?city=北京').then(r => r.json())
    .then(r => {
      state.weatherList = r.data.forecast
    })
</script>

<template>
  <ul class="weather_list">
    <li v-for="item of state.weatherList">
      {{item.data}}
      {{item.high}}
      {{item.fengli}}
      {{item.low}}
      {{item.fengxiang}}
      {{item.type}}
    </li>
  </ul>
</template>

<style scoped>
  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }
</style>
