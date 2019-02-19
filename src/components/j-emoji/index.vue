<style lang="scss" scoped>
  @import "./styles/emoji.css";

  .emoji-box /deep/ {
    position: absolute;
    margin-top: 15px;
    z-index: 100;
    .close {
      position: absolute;
      right: 5px;
      top: 5px;
      width: 25px;
      cursor: pointer;
      height: 25px;
      line-height: 25px;
      text-align: center;
    }
    .emoji {
      width: 280px;
      background: #fff;
      padding-bottom: 10px;
      box-shadow: 0 5px 20px 0 rgba(0, 0, 0, .16);
      border-radius: 2px;
      .triangle {
        position: absolute;
        top: -10px;
        left: 10%;
        width: 0;
        height: 0;
        transform: translate(-50%, -50%);
        border: .8rem solid transparent;
        border-bottom-color: #fff;
      }
      .emoji-controller {
        padding: 5px 10px;;
        overflow: hidden;
        li {
          float: left;
          width: 47px;
          font-size: 12px;
          line-height: 36px;
          cursor: pointer;
          text-align: center;
          position: relative;
          &.active::after {
            content: '';
            width: 100%;
            height: 1px;
            background: #0689dd;
            left: 0;
            bottom: 0;
            position: absolute;
          }
        }
      }
      .emoji-container {
        height: 200px;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
        padding: 0 10px 10px 10px;
        li {
          padding: 5px;
          a {
            float: left;
            overflow: hidden;
            height: 31px;
            transition: all ease-out .2s;
            border-radius: 4px;
            &:hover {
              background-color: #f2f2f2;
            }
            span {
              display: inline-block;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  @media screen and(max-width: 767px) {
    .emoji {
      width: 95%
    }
  }
</style>

<template>
  <div class="emoji-box" v-if="visible">
    <a class="close" href="javascript:;" @click="onClose" @touchstart="onClose">
      <Icon type="close-round"></Icon>
    </a>
    <div class="emoji">
      <div class="triangle"></div>
      <ul class="emoji-controller">
        <li
          v-for="(pannel,index) in pannels"
          @click="changeActive(index)"
          :class="{'active': index ===activeIndex}">
          {{pannel}}
        </li>
      </ul>
      <ul class="emoji-container">
        <li
          v-for="(emojiGroup, index) in emojis"
          style="padding: 0"
          :key="index"
          v-if="index === activeIndex">
          <a href="javascript:;" v-for="(emoji, index) in emojiGroup" :key="index" @click="selectItem(emoji)">
            <span class="emoji-item" :title="emoji" :class="'sprite-' + getPureName(emoji)"></span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import data from './emoji-data'

  export default {
    name: "j-emoji",
    props: {
      value: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        visible: this.value,
        emojiData: data,
        pannels: ['表情'], // '自然', '物品', '地点', '符号'
        activeIndex: 0
      }
    },
    watch: {
      value(val) {
        this.visible = val;
      },
      visible(val) {
        this.$emit('input', val)
      }
    },
    methods: {
        onClose() {
        this.visible = false;
      },
      changeActive(index) {
        this.activeIndex = index
      },
      getPureName(name) {
        return name.replace(/:/g, '')
      },
      selectItem(emoji) {
        this.$emit('on-select', emoji);
        this.visible = false;
      }
    },
    computed: {
      emojis() {
        return this.pannels.map(item => {
          return Object.keys(this.emojiData[item]) //返回所有emoji的键值组成的数组
        })
      }
    }
  }
</script>
