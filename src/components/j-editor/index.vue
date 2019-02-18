<style lang="scss" scoped>
  .j-editor {
    .edit-box {
      color: #17181a;
      border: 1px solid #f1f1f1;
      border-radius: 3px;
      outline: 0;
      width: 100%;
      resize: none;
      min-height: 60px;
      padding: 5px;
      background-color: #fff;
      overflow-y: auto;
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
        display: flex;
        .login {
          margin-left: 10px;
          .in {
            vertical-align: text-bottom;
          }
        }
        .user-info {
          margin-left: 10px;
          display: flex;
          align-items: center;
          .avatar {
            width: 19px;
            height: 19px;
          }
          .name {
            margin-left: 5px;
          }
          .out {
            margin-left: 5px;
          }
        }
        .box {
          color: #027fff;
          cursor: pointer;
          .happy {
            font-size: 14px;
            vertical-align: text-bottom;
          }
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
    <textarea
      :class="[{'focused':show_focused},'edit-box']"
      v-model="innerText"
      @focus="focus"
      @keyup.ctrl.enter="submit"
      :placeholder="placeholder">
    </textarea>

    <div class="action-box" v-if="show_focused">
      <div class="emoji">
        <div class="box" @click="emojiToggle">
          <Icon type="android-happy" class="happy"></Icon>
          表情
          <j-emoji v-model="emoji" @on-select="onSelect"></j-emoji>
        </div>

        <div class="login" v-if="showUser && !get_user_info.name">
          <a href="javascript:;" @click="onLogin">登陆
            <Icon type="log-in" class="in"></Icon>
          </a>
        </div>

        <div class="user-info" v-if="showUser && !!get_user_info.name">
          <img :src="get_user_info.avatar_url" class="avatar" alt="">
          <span class="name">{{get_user_info.name}}</span>
          <a href="javascript:;" class="out" @click="loginOut">退出</a>
        </div>

      </div>
      <div class="submit">
        <span class="intro">Ctrl + Enter</span>
        <button :disabled="!disabled" class="btn" @click="submit">评论</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex';
  import mLoginMdl from '@/components/j-modal/m-login-mdl';
  import jEmoji from '../j-emoji';

  export default {
    name: "index",
    components: {
      jEmoji
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      editable: {
        type: Boolean,
        default: true
      },
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
      },
      showUser: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      ...mapGetters({
        get_user_info: 'app/get_user_info',
      })
    },
    data() {
      return {
        innerText: this.value,
        isLocked: false,
        show_focused: this.focused,
        disabled: false,
        show_action: this.action,
        emoji: false
      }
    },
    watch: {
      innerText(val) {
        this.disabled = val !== '';
        this.$emit('input', val)
      },
      value(val) {
        this.innerText = val;
      },
    },
    async mounted() {
      const v = this.innerText;
      if (v) {
        this.disabled = this.innerText !== '';
      }
      let visitor_id = this.$Global.getCookie('visitor_id');

      if (!visitor_id) {
        return false;
      }
      let res = await this.$api.mainInterface.getUser({visitor_id});
      let {code, data = {}} = res.data;
      if (code === 200) {
        this.setUserInfo({
          name: data.name,
          avatar_url: data.avatar_url
        });
      }
    },
    methods: {
      ...mapMutations({
        setUserInfo: 'app/SET_USER_INFO'
      }),
      /*登出*/
      loginOut() {
        this.setUserInfo({name: '', avatar_url: ''});
        this.$Global.delCookie('visitor_id');
        QC.Login.signOut()
      },
      emojiToggle() {
        this.emoji = true
      },
      onLogin() {
        this.$jDynamic.show({
          component: 'mLoginMdl',
          render: (h) => {
            return h(mLoginMdl)
          }
        })
      },
      onSelect(val) {
        this.innerText += val;
      },
      input() {
        const v = this.$el.querySelector('.edit-box').innerHTML;
        this.$emit('input', v);
      },
      focus(e) {
        this.show_focused = true;
        this.show_action = true;
        this.isLocked = true;
        this.$emit('on-focus', e)
      },
      blur(e) {
        this.isLocked = false;
        this.$emit('on-blur', e)
      },
      submit() {
        this.$emit('on-submit', this.value);
      }
    }
  }
</script>
