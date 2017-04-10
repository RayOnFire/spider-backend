import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    socket: null,
    loggerList: [],
    watchedLoggerList: [],
    loggers: {},
    tableHeaders: {},
    currentPage: '',
    latestLine: [],
    latestCount: 10,
    unreadCount: {},
    currentView: null
  },
  mutations: {
    setCurrentView (state, payload) {
      state.currentView = payload.view
    },
    setSocket (state, payload) {
      state.socket = payload.socket
    },
    setLoggerList (state, payload) {
      state.loggerList = payload.loggerList
    },
    updateLogger (state, payload) {
      let obj = JSON.parse(payload.data)
      if (state.loggers[payload.loggerName]) {
        state.loggers[payload.loggerName].push(obj)
      } else {
        state.loggers = Object.assign({}, state.loggers, {[payload.loggerName]: [obj]})
        state.tableHeaders = Object.assign({}, state.tableHeaders, {[payload.loggerName]: []})
        for (let k in obj) state.tableHeaders[payload.loggerName].push(k)
      }
      state.latestLine.splice(0, 0, {'loggerName': payload.loggerName, data: obj})
      if (state.latestLine.length > state.latestCount) state.latestLine.pop()
    }
  }
})
