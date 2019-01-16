<style lang="scss" scoped>
  .j-editor {
    .edit-box {
      color: #17181a;
      border: 1px solid #f1f1f1;
      border-radius: 3px;
      outline: 0;
      min-height: 40px;
      padding: 10px;
      background-color: #fff;
      overflow: hidden;
      user-select: all;
      &:empty:before {
        content: attr(placeholder);
        color: gray;
      }
      &.focused {
        border-color: #007fff;
      }
    }
    .action-box {
      display: flex;
      align-items: center;
      margin-top: 10px;
      .emoji {
        .box {
          color: #027fff;
          cursor: pointer;
        }
      }
      .submit {
        flex: 0 0 auto;
        margin-left: auto;
        .intro {
          color: #c2c2c2;
          margin-right: 8px;
          font-size: 13px;
        }
        .btn {
          flex: 0 0 auto;
          margin-left: auto;
          border: 0;
          outline: 0;
          padding: 6px 16px;
          font-size: 14px;
          color: #fff;
          background-color: #027fff;
          border-radius: 2px;
          transition: background-color .3s, color .3s;
          cursor: pointer;
          &:disabled {
            cursor: default;
            opacity: .4;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="j-editor">
    <div
      :class="[{'focused':show_focused},'edit-box']"
      contenteditable="true"
      @paste="paste"
      @input="input"
      @focus="focus"
      @blur="blur"
      @keyup.ctrl.enter="submit" :placeholder="placeholder">
    </div>
    <div class="action-box" v-if="show_focused">
      <div class="emoji">
        <div class="box">
          <img src=""> 表情
        </div>
      </div>
      <div class="submit">
        <span class="intro">Ctrl + Enter</span>
        <button :disabled="!disabled" class="btn">评论</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: {
      value: String,
      focused: {
        type: Boolean,
        default: false
      },
      action: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: '输入评论...'
      }
    },
    data() {
      return {
        html: '',
        show_focused: this.focused,
        disabled: false,
        show_action: this.action
      }
    },
    watch: {
      value(v) {
        if (v !== this.html) {
          console.log(999)
          this.$el.querySelector('.edit-box').innerHTML = v;
        }
      }
    },
    mounted() {
      const v = this.value;
      if (v) {
        this.$el.querySelector('.edit-box').innerHTML = v;
        this.html = v
      }

      document.addEventListener('click', this.onClick)
    },
    methods: {
      onClick(e) {
        if (!this.$el.contains(e.target)) {
          this.show_focused = false;
          this.show_action = false;
        }
      },
      paste(e) {
        e.preventDefault();
        const html = e.clipboardData.getData('text/html');
        document.execCommand('insertHTML', false, html);
        this.input()
      },
      input() {
        const v = this.$el.querySelector('.edit-box').innerHTML;
        this.html = v;

        this.disabled = v !== '';
        this.$emit('input', v)
      },
      focus(e) {
        this.show_focused = true;
        this.show_action = true;
        this.$emit('on-focus', e)
      },
      blur(e) {
        this.$emit('on-blur', e)
      },
      submit() {
        this.$emit('on-submit', this.html);
        console.log(this.html)
      }
    },
    destroyed() {
      document.removeEventListener('click', this.onClick)
    }
  }
</script>
