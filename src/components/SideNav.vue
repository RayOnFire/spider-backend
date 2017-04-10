<template>
<nav class="side-nav">
  <div class="nav-header">AIODASHBOARD</div>
  <ul class="tree-view">
    <li class="tree-item" v-for="(item, index) in treeItems" :data-index="index" @click="loggerView">
      <div>
        <img v-if="item.icon" :src="item.icon">
        {{ item.name }}
      </div>
      <transition name="fade">
        <ul v-if="item.subItems && item.showSub" class="subitem-list">
          <li v-for="subItem in item.subItems" class="subitem-list-item">
            <img v-if="subItem.icon" :src="subItem.icon">
            <div>{{ subItem.name }}</div>
          </li>
        </ul>
      </transition>
    </li>
  </ul>
</nav>
</template>

<script>
import { findDataOnParent } from '../util'

export default {
  name: 'SideNav',
  data () {
    return {
      treeItems: [
        {
          name: 'Spiders',
          icon: '/static/spider.svg'
        },
        {
          name: 'Loggers',
          icon: '/static/logger.svg',
          showSub: false,
          subItems: [
            {
              name: 'Main',
              icon: '/static/spider.svg'
            }
          ]
        },
        {
          name: 'Server',
          showSub: false,
          subItems: [
            {
              name: 'Status',
              icon: '/static/server-status.svg'
            }
          ],
          icon: '/static/server.svg'
        }
      ]
    }
  },
  methods: {
    loggerView (e) {
      let index = findDataOnParent(e.target, 'index')
      if (this.treeItems[index].subItems) {
        this.treeItems[index].showSub = !this.treeItems[index].showSub
      }
    }
  }
}
</script>

<style lang="sass">
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.side-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-family: 'Noto Serif', serif;
  .nav-header {
    font-family: 'Fjalla One', sans-serif;
    font-size: 1.8rem;
    box-sizing: border-box;
    padding: 1rem;
    background-color: indigo;
    color: white;
  }
  .tree-view {
    list-style: none;
    margin: 0;
    box-sizing: border-box;
    padding-left: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: darkslateblue;
    flex: 1;
    .tree-item {
      img {
        width: 3rem;
        height: 3rem;
        margin-right: 1rem;
      }
      div {
        &:nth-child(1) {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding-left: 1rem;
          padding-right: 1rem;
          padding-top: 1rem;
          padding-bottom: 1rem;
          background-color: darkslateblue;
        }
      }
      font-size: 1.2rem;
      box-sizing: border-box;
      color: white;
      .subitem-list {
        list-style: none;
        box-sizing: border-box;
        padding-left: 0;
        padding-top: 1rem;
        padding-bottom: 1rem;
        background-color: midnightblue;
        .subitem-list-item {
          img {
            margin-right: 0.3rem;
          }
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 2.5rem;
            height: 2.5rem;
          }
        }
      }
    }
  }
}
</style>
