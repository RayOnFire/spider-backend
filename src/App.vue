<template>
  <div id="app">
    <side-nav></side-nav>
    <panel></panel>
  </div>
</template>

<script>
import SideNav from './components/SideNav'
import Panel from './components/Panel'
import store from './store'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'app',
  store,
  components: {
    SideNav,
    Panel
  },
  data () {
    return {
      socket: null,
      loggerList: []
    }
  },
  computed: {
    ...mapState([
      'socket'
    ])
  },
  methods: {
    ...mapMutations([
      'setLoggerList',
      'setSocket',
      'updateLogger'
    ])
  },
  mounted () {
    let socket = new WebSocket('ws://127.0.0.1:8765')
    socket.onopen = (e) => {
      socket.send(JSON.stringify({type: 'getLoggerList'}))
      socket.send(JSON.stringify({type: 'subscribeLogger'}))
      this.setSocket({socket: socket})
    }
    socket.onmessage = (e) => {
      let obj = JSON.parse(e.data)
      console.log(obj)
      if (obj.type === 'loggerLine') {
        this.updateLogger(obj)
      } else if (obj.type === 'logger') {
      }
    }
  }
}
</script>

<style>
.flex-column {
  display: flex;
  flex-direction: column;
}
body {
  margin: 0;
  padding: 0;
}
#app:before {
  content: "";
  position: fixed;
  left: 0;
  right: 0;
  background-image: url('/static/bg.jpg');
  background-position: center;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  filter: blur(10px);
}

#app {
  height: 100vh;
  width: 100vw;
  display: flex;
}
</style>
