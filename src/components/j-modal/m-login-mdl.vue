<style lang="scss">
  .m-login-mdl {
    .header {
      color: #333;
      text-align: left;
      .title {
        font-size: 16px;
      }
    }

    .body {
      .third-login {
        text-align: center;
        .title {
          margin-bottom: 10px;
        }
        .qq {
          margin-right: 10px;
        }
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
</style>

<template>
  <Modal v-model="show" width="400" class="m-login-mdl"
         @on-visible-change="onVisible">
    <p slot="header" class="header">
      <span class="header--title">登陆</span>
    </p>
    <div class="body">
      <Form :label-width="60">
        <FormItem label="昵称：">
          <Input v-model="user.name" placeholder="请输入昵称"></Input>
        </FormItem>
        <FormItem label="邮箱：">
          <Input v-model="user.email" placeholder="请输入邮箱"></Input>
        </FormItem>
      </Form>
      <div class="third-login">
        <div class="title">第三方登录</div>
        <a href="javascript:;" class="qq" @click="openQQ">
          <img src="/static/images/avatar/qq.png" alt="QQ">
        </a>
        <a href="javascript:;" class="github" @click="openGithub">
          <img src="/static/images/avatar/github.png" alt="github">
        </a>
      </div>
    </div>
    <div slot="footer">
      <Button type="text" size="large" @click.native="show = false">取消</Button>
      <Button type="primary" size="large" @click.native="save">注册</Button>
    </div>
  </Modal>
</template>

<script>
  import store from '@/vuex';
  import {mapMutations, mapGetters} from 'vuex';

  export default {
    name: "m-works-mdl",
    store,
    data() {
      return {
        show: true,
        user: {
          name: '',
          email: ''
        }
      }
    },
    methods: {
      ...mapMutations({
        setUserInfo: 'app/SET_USER_INFO'
      }),
      openQQ() {
        window.open('https://graph.qq.com/oauth2.0/authorize?client_id=101454722&response_type=token&scope=all&redirect_uri=http://api.jrucker.cn/qq/oauth/callback', 'oauth2Login_10000' ,'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes');
      },
      openGithub() {
        let auth = window.open("http://api.jrucker.cn/github/login", "_blank", "height=600,width=800,toolbar=no, menubar=no, scrollbars=no");
        let timer = setInterval(async () => {

          //检测打开的窗口是否关闭
          let visitor_id = this.$Global.getCookie('visitor_id');
          if (auth.closed) {
            clearInterval(timer)
          }
          if (visitor_id) {
            auth.close();
            clearInterval(timer);

            let res = await this.$api.mainInterface.getUser({visitor_id});
            let {code, data = {}} = res.data;
            if (code === 200) {
              this.setUserInfo({
                name: data.name,
                avatar_url: data.avatar_url
              });

              this.onVisible(false)
            }
          }
        }, 500)
      },
      /**
       * 关闭弹窗
       * @param value
       */
      onVisible(value) {
        value || this.$jDynamic.hide({component: 'mLoginMdl'})
      },
      async save() {
        let res = await this.$api.mainInterface.registerUser({
          name: this.user.name,
          email: this.user.email
        });

        let {code, data, msg} = res.data;
        if (code === 200) {
          this.$Message.info('成功！');
          this.setUserInfo({
            name: data.name,
            avatar_url: data.avatar_url
          });

          this.$Global.setCookie('visitor_id', data._id, '7d', '/');
          this.onVisible(false);

          return false;
        }

        this.$Message.info(msg)
      }
    }
  }
</script>
