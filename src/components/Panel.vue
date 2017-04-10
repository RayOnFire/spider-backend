<template>
<div class="control-panel">
  <keep-alive>
    <component :is="currentView"></component>
  </keep-alive>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import StartView from './StartView'
import LoggerView from './LoggerView'

export default {
  name: 'Panel',
  component: {
    LoggerView
  },
  computed: {
    ...mapState([
      'currentView'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentView'
    ])
  },
  mounted () {
    this.setCurrentView({view: LoggerView})
  }
}
</script>

<style lang="sass">
.control-panel {
  flex: 5;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
