<template>
<div class="logger-view">
  <div class="logger-input"><input type="text" placeholder="Input Logger Pattern" /></div>
  <div class="logger-tab">
    <div class="logger-tab-item" :class="tabItemClass[index]" v-for="(logger, index) in loggers" :data-index="index" @click="changeItem">
      {{ logger.name }}
    </div>
  </div>
  <div class="logger-container">
    <div class="logger">
      <div class="logger-card">
        <div class="logger-content">
          <div class="info-panel">
            <div class="total">
              <p>TOTAL</p>
              <p>{{ loggers[activeItem].data.length }}</p>
            </div>
            <div class="logger-filter">
              <input placeholder="Filter">
            </div>
          </div>
          <table>
            <tbody>
              <tr v-if="loggers[activeItem].data" v-for="line in loggers[activeItem].data">
                <td class="status">{{ line.status }}</td>
                <td class="url">{{ line.url }}</td>
                <td class="flex-column">
                  <div class="date">
                    <img src="/static/clock.svg">
                    <p>{{ line.date }}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { findDataOnParent, findParentByClassName, findAllSiblings } from '../util'

export default {
  name: 'LoggerView',
  data () {
    return {
      activeItem: 0,
      loggers: [
        {
          name: 'Logger-1',
          data: [
            {
              url: 'http://www.baidu.com/gasfguiassgfysdgfuysdgfuysgfuygsduyfgusdyfgusdfyguysdgfsduyfg',
              date: '2017-04-03 14:23:23',
              requestHeader: {'User-Agent': '123-456'},
              responseHeader: {'Accept': 'all'},
              status: 200
            }
          ]
        },
        {
          name: 'Logger-2',
          data: []
        },
        {
          name: 'Logger-3',
          data: []
        },
        {
          name: 'Logger-4',
          data: []
        }
      ]
    }
  },
  computed: {
    /* eslint-disable eqeqeq */
    tabItemClass () {
      return this.loggers.map((currentValue, index) => {
        if (index == this.activeItem) {
          return 'active'
        } else {
          return null
        }
      })
    }
  },
  methods: {
    expandLogger (e) {
      let logger = findParentByClassName(e.target, 'logger')
      let restLoggers = findAllSiblings(logger)
      console.log(restLoggers)
      // TODO: hind restLoggersm, make logger full of container
      // loggerCard.style.transition = 'all .5s linear'
      // loggerCard.style.height = '100%'
    },
    changeItem (e) {
      let index = findDataOnParent(e.target, 'index')
      this.activeItem = index
    }
  }
}
</script>

<style lang="sass">
.logger-view {
  display: flex;
  flex-direction: column;
  .logger-input {
    height: 5vh;
    input {
      width: 20%;
      padding: 10px;
      border: none;
      border-bottom: solid 2px rgba(255, 255, 255, 1);
      transition: border 0.3s;
      background-color: rgba(0, 0, 0, 0);
      color: white;
      &:focus {
        border-bottom: solid 2px #969696;
      }
    }
  }
  .logger-tab {
    display: flex;
    color: white;
    box-sizing: border-box;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
    height: 5vh;
    .logger-tab-item {
      box-sizing: border-box;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      transition: background-color .3s linear;
      border-radius: 10px;
      margin-right: 0.2rem;
    }
    .active {
      background-color: white;
      color: black;
    }
  }
  .logger-container {
    height: 90vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-top: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    .info-panel {
      display: flex;
      align-items: center;
      .total {
        p {
          font-family: 'Noto Serif', serif;
          margin: 0;
          padding: 0;
        }
        margin: 0.5rem;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 5rem;
        width: 5rem;
        color: white;
        background-color: rgba(255, 187, 0, 0.7);
      }
      .logger-filter {
        box-sizing: border-box;
        padding-left: 1rem;
        input {
          width: 20rem;
          padding: 10px;
          border: none;
          border-bottom: solid 2px rgba(255, 255, 255, 1);
          transition: border 0.3s;
          background-color: rgba(0, 0, 0, 0);
          color: white;
          length: 100%;
          &:focus {
            border-bottom: solid 2px #969696;
          }
        }
      }
    }
    .logger {
      transition: all .5s linear;
      height: 100%;
      box-sizing: border-box;
      padding: 0.5rem;
      .logger-card {
        background-image: url(/static/table-bg.jpg);
        background-position: center;
        background-size: cover;
        height: 100%;
        border-radius: 10px;
        display: flex;
        .logger-content {
          flex: 4;
          table {
            font-size: 0.8rem;
            background-color: rgba(0, 0, 0, 0.4);
            //background-color: #89AFC5;
            // table-layout: fixed;
            width: 100%;
            height: inherit;
            // border-collapse: collapse;
            display: flex;
            flex-direction: column;
            tbody {
              display: block;
              overflow: auto;
              width: 100%;
              font-family: 'Noto Serif', serif;
              font-weight: 100;
              color: white;
              tr {
                &:nth-child(even) {
                  background-color: rgba(42, 49, 50, 0.9);
                }
                &:nth-child(odd) {
                  background-color: rgba(51, 107, 135, 0.8);
                }
                box-sizing: border-box;
                display: flex;
                align-items: center;
                .status {
                  font-family: 'Noto Serif', serif;
                  font-weight: 800;
                  font-size: 2rem;
                  box-sizing: border-box;
                  padding-left: 1rem;
                  padding-right: 1rem;
                }
                .url {
                  width: 50%;
                  font-size: 0.8rem;
                  word-break: break-all;
                }
                .date {
                  display: flex;
                  align-items: center;
                  img {
                    width: 2rem;
                    height: 2rem;
                    margin-right: 0.5rem;
                  }
                }
              }
            }
          }
        }
      }
    }
    .logger-grid {
      width: 33%;
      height: 20rem;
      box-sizing: border-box;
      padding: 0.5rem;
      .logger-card-grid {
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 1rem;
        &:hover {
          box-shadow: 1px 1px 8px 0px white;
        }
        .logger-header-grid {
          border-radius: 1rem 1rem 0 0;
          box-sizing: border-box;
          padding: 0.3rem;
          font-size: 1.2rem;
          background-color: steelblue;
          text-align: center;
        }
      }
    }
  }
}
</style>
