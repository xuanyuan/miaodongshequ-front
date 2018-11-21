<template>
  <div id="app" class="app">
    <div class="app-container">
      <div class="nav">
        <div class="nav-container">
          <div class="logo">
            <a href="/" class="icon">
              <img src="../assets/images/logo.png"></a>
            <a href="/">
              <div class="text">
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">
                    每日编程技巧
                  </font>
                </font>
              </div>
            </a></div>
          <ul class="links">
            <li><a href="/blog">
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">博客</font>
                </font>
              </a></li>
          </ul>
        </div>
      </div>
      <div class="lander page">
        <div class="hero">
          <a id="subscribe" class="anchor"></a>
          <Modal :show="showSuccessModal" :type="'success'">
            <div class='subscribe-modal'>
              <strong>Success!</strong>
              <br />
              <br />
              <p>
                只有一件事：要开始接收邮件，我们需要验证您的电子邮件地址。
              </p>
              <p>
                您可以<b>查看您的电子邮件以获取验证链接</b>吗？ 谢谢！
              </p>
              <p>
                谢谢订阅！ 我们希望您喜欢我们的日常编程问题。
              </p>
              <button class='green' @click="redirectToSubscribe(email)">我验证了我的电子邮件地址!</button>
            </div>
          </Modal>

          <Modal :show="showErrorModal" :type="'error'" @close="showErrorModal = false">
            <div class='subscribe-modal'>
              <strong>Error!</strong>
              <br />
              <br />
              <p>{{ errorMessage }}</p>
              <p v-if='errorMessage === "You are already enrolled to Daily Coding Problem!"'>
                您应该已收到我们的验证邮件。如果您没有收到，请点击下方以重新收到您的电子邮件。
              </p>
              <p v-if='!this.errors.first("email")'>
                否则，请通过<a href='mailto:z_dianjun@163.com?Subject=Hello!' target='_top'>z_dianjun@163.com</a>与我们联系，让我们知道发生了什么。
              </p>
              <button v-if='errorMessage === "You are already enrolled to Daily Coding Problem!"' class='green' @click="resendVerificationEmail()">
                重新发送验证电子邮件
              </button>
              <button @keyup.esc="showErrorModal = false" class='green' @click="showErrorModal = false">Close</button>
            </div>
          </Modal>
          <header>
            <font style="vertical-align: inherit;">
              <font style="vertical-align: inherit;">
                订阅我们
              </font>
            </font>
          </header>
          <div class="cta-container">
            <form @submit.prevent='getSub' class="email-input">
              <input type="text" placeholder="输入您的邮箱..." required="required" name="email" data-vv-validate-on="none" autocomplete="off" class="email" v-validate='"required|email"' data-vv-id="1" v-model="email" aria-required="true" aria-invalid="false">
              <button class="cta dark">
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">
                    订阅每日编程技巧
                  </font>
                </font>
              </button>
            </form>
            <p class="disclaimer">
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">
                  没有垃圾邮件。</font>
                <font style="vertical-align: inherit;">轻松取消订阅。
                </font>
              </font>
            </p>
          </div>
        </div>
        <div class="sample-questions">
          <header>
            <font style="vertical-align: inherit;">
              <font style="vertical-align: inherit;">
                编程技巧实例
              </font>
            </font>
          </header>
          <div class="question">

            <div class="question-container">
              <div class="question-content">
                <p>
                  arrayMax 返回数组中的最大值。
                  <br>
                  arrayMin 返回数组中的最小值。
                </p>
                <p>
                  将Math.max()与扩展运算符 (...) 结合使用以获取数组中的最大值。
                  <br>
                  将Math.min()与扩展运算符 (...) 结合使用以获取数组中的最小值。
                </p>
                <p>
                  const arrayMax = arr => Math.max(...arr);
                  // arrayMax([10, 1, 5]) -> 10
                  <br>
                  const arrayMin = arr => Math.min(...arr);
                  // arrayMin([10, 1, 5]) -> 1
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="enter-email">
          <a href="#subscribe"><button class="cta mobile">
              <strong>输入邮箱</strong> 订阅JavaScript每日编程技巧
            </button></a></div> <br> <br> <br>
      </div>
      <footer class="footer">
        <div class="copyright">
          <ul>
            <li><a href="/" class="copyright">© 秒懂社区 2018</a></li>
          </ul>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import Modal from "./Modal.vue";
export default {
  name: "home",
  components: {
    Modal
  },
  data() {
    return {
      showErrorModal: false,
      showSuccessModal: false,
      errorMessage: null,
      email: "",
      count: null
    };
  },
  methods: {
    showModal(type) {
      this.showErrorModal = true;
    },
    async resendVerificationEmail() {
      let email = this.email;
      const res = await fetch("/api/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      });
      let body = await res.json();
      if (body.error) {
        this.errorMessage = body.message;
        this.showErrorModal = true;
      } else {
        this.redirectToInvite(email);
      }
    },
    async getSub(planType) {
      // TODO: check email is valid.
      let email = this.email;

      // const referrer = cookieManager.getRef()
      const res = await fetch("/v1/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          planType,
          email
          // referrer,
        })
      });
      if (!res.ok) {
        console.log(res);
        this.errorMessage = res.statusText;
        this.showErrorModal = true;
        return;
      }
      let body = await res.json();
      if (body.error || this.errors.first("email")) {
        this.errorMessage = body.message;
        if (this.errors.first("email")) {
          this.errorMessage = this.errors.first("email");
        }
        this.showErrorModal = true;
      } else {
        this.showSuccessModal = true;
      }
    },
    redirectToSubscribe(email) {
      const encodedEmail = encodeURIComponent(email);
      // const referrer = cookieManager.getRef();
      if (referrer) {
        this.$router.push(`subscribe?email=${encodedEmail}&ref=${referrer}`);
      } else {
        this.$router.push(`subscribe?email=${encodedEmail}`);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.nav {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 24px;
  position: absolute;
  top: 0;
  z-index: 2;
  background: #fff;
  left: 0;
  right: 0;
  border-bottom: 2px solid #f1f1f1;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.nav > .nav-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  max-width: 960px;
}

.nav > .nav-container > .logo {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.nav > .nav-container > .logo .text {
  margin-left: 24px;
  font-size: 22px;
  color: #555555;
}

.nav > .nav-container > .logo .text:hover {
  text-decoration: underline;
}

.nav > .nav-container > .logo > a.icon {
  background: #2ab380;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 58px;
  height: 58px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.nav > .nav-container > .logo > a.icon > img {
  width: 100%;
}

.nav > .nav-container > ul.links {
  list-style-type: none;
  padding: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.nav > .nav-container > ul.links > li {
  display: inline;
}

.nav > .nav-container > ul.links > li > a {
  font-size: 22px;
  letter-spacing: 0.75px;
}

.nav > .nav-container > ul.links > li > a.blog {
  margin-right: 48px;
}

.nav > .nav-container > ul.links > li > a.premium {
  font-weight: 600;
}

footer.footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background: #fff;
  position: absolute;
  bottom: 0;
  z-index: 2;
  left: 0;
  right: 0;
  border-top: 2px solid #f1f1f1;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

footer.footer > .footer-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 24px;
  width: 100%;
}

footer.footer > .footer-container > .logo {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

footer.footer > .footer-container > .logo > a {
  background: #2ab380;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 58px;
  height: 58px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

footer.footer > .footer-container > .logo > a > img {
  width: 14px;
}

footer.footer > .footer-container > ul.links {
  list-style-type: none;
  padding: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

footer.footer > .footer-container > ul.links > li {
  display: inline;
}

footer.footer > .footer-container > ul.links > li > a {
  font-size: 22px;
}

footer.footer > .footer-container > ul.links > li > a.blog {
  margin-right: 48px;
}

footer.footer > .footer-container > ul.links > li > a.premium {
  font-weight: 600;
}

footer.footer > .copyright {
  padding: 24px;
  border-top: 2px solid #f1f1f1;
  color: #555555;
  width: 100%;
}

footer.footer > .copyright > ul {
  list-style-type: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0;
  line-height: 36px;
}

footer.footer > .copyright > ul > li > a {
  color: #555555;
}

@media (min-width: 960px) {
  footer.footer > .footer-container {
    padding: 24px 0;
    width: 960px;
  }

  footer.footer > .copyright > ul {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  footer.footer > .copyright > ul > li {
    margin-right: 24px;
  }

  footer.footer > .copyright > ul > li:last-child {
    margin-right: 0;
  }
}

@charset "UTF-8";

* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
  -webkit-appearance: none;
}

header {
  font-family: "tos", "Apple Garamond", "Baskerville", "Times New Roman",
    "Droid Serif", "Times", "Source Serif Pro", serif;
  letter-spacing: 0.5px;
}

code {
  border-radius: 4px;
  font-family: Consolas, monaco, "SF Mono", "Monaco", "Inconsolata", "Fira Mono",
    "Droid Sans Mono", "Source Code Pro", monospace;
}

pre {
  white-space: pre-wrap;
}

.strikeout {
  position: relative;
  opacity: 0.5;
  margin-left: -50px;
  font-size: 22px;
}

.strikeout::after {
  border-bottom: 2px solid #2ab380;
  border-radius: 2px;
  content: "";
  left: 0;
  margin-top: calc(1px / 2 * -1);
  position: absolute;
  right: 0;
  top: 50%;
}

@font-face {
  font-family: "Computer Modern Serif";
  src: url(/static/fonts/cmunrm.b4fe383.eot);
  src: url(/static/fonts/cmunrm.b4fe383.eot?#iefix) format("embedded-opentype"),
    url(/static/fonts/cmunrm.6650fdd.woff) format("woff"),
    url(/static/fonts/cmunrm.01643be.ttf) format("truetype"),
    url(/static/img/cmunrm.5927a6b.svg#cmunrm) format("svg");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Computer Modern Serif";
  src: url(/static/fonts/cmunti.dcc4660.eot);
  src: url(/static/fonts/cmunti.dcc4660.eot?#iefix) format("embedded-opentype"),
    url(/static/fonts/cmunti.0e8efcc.woff) format("woff"),
    url(/static/fonts/cmunti.86153f0.ttf) format("truetype"),
    url(/static/img/cmunti.32fb6a6.svg#cmunti) format("svg");
  font-weight: normal;
  font-style: italic;
}

@font-face {
  font-family: "Computer Modern Serif Bold";
  src: url(/static/fonts/cmunbi.c4ddc26.eot);
  src: url(/static/fonts/cmunbi.c4ddc26.eot?#iefix) format("embedded-opentype"),
    url(/static/fonts/cmunbi.b2129d3.woff) format("woff"),
    url(/static/fonts/cmunbi.cd9c040.ttf) format("truetype"),
    url(/static/img/cmunbi.521ed56.svg#cmunbi) format("svg");
  font-weight: bold;
  font-style: italic;
}

@font-face {
  font-family: "Ionicons";
  src: url(/static/fonts/ionicons.19e65b8.eot);
  src: url(/static/fonts/ionicons.19e65b8.eot?#iefix)
      format("embedded-opentype"),
    url(/static/fonts/ionicons.2c159d0.woff) format("woff"),
    url(/static/fonts/ionicons.dd4781d.ttf) format("truetype"),
    url(/static/img/ionicons.28df6ee.svg?#Ionicons) format("svg");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "tos";
  src: url(/static/fonts/tos-bold.4e7bbb7.eot);
  src: url(/static/fonts/tos-bold.4e7bbb7.eot?#iefix)
      format("embedded-opentype"),
    url(/static/fonts/tos-bold.c3dcc7a.woff) format("woff"),
    url(/static/fonts/tos-bold.1f8aae2.ttf) format("truetype");
  font-weight: bold;
  font-style: italic;
}

button {
  background: none;
  padding: 15px 24px;
  border: none;
  outline: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif !important;
  -webkit-transition: all 150ms ease-in-out;
  transition: all 150ms ease-in-out;
  border-radius: 4px;
  background: #ffce38;
  color: #6e5817;
  font-weight: 600;
  font-size: 18px;
}

button:hover {
  cursor: pointer;
  -webkit-transform: translateY(-1px);
  transform: translateY(-1px);
}

button a {
  color: #fff;
  -webkit-transition: all 150ms ease-in-out;
  transition: all 150ms ease-in-out;
}

button.big {
  font-size: 26px;
  padding: 18px 32px;
}

button.cta {
  -webkit-box-shadow: 0px 3px 0px 0px #e7ba2f;
  box-shadow: 0px 3px 0px 0px #e7ba2f;
  margin: 24px 0;
}

button.cta:hover {
  -webkit-transform: translateY(-1px);
  transform: translateY(-1px);
}

button.cta.dark {
  -webkit-box-shadow: 0px 3px 0px 0px #6e5817;
  box-shadow: 0px 3px 0px 0px #6e5817;
}

button.green {
  background: #2ab380;
  color: #fff;
  -webkit-box-shadow: 0px 3px 0px 0px #1b7554;
  box-shadow: 0px 3px 0px 0px #1b7554;
}

button.gray {
  background: #a6a6a6;
  color: #fff;
  -webkit-box-shadow: 0px 3px 0px 0px #737373;
  box-shadow: 0px 3px 0px 0px #737373;
}

button.gray:hover {
  -webkit-transform: translateY(-1px);
  transform: translateY(-1px);
}

input {
  border: none;
  outline: none;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif !important;
  -webkit-transition: all 150ms ease-in-out;
  transition: all 150ms ease-in-out;
  height: 50px;
  border-radius: 4px;
  -webkit-transition: all 150ms ease;
  transition: all 150ms ease;
  font-size: 18px;
  color: #111;
  padding: 0 24px;
}

input:focus {
  color: #000;
}

input::-webkit-input-placeholder {
  color: #777;
}

input:-ms-input-placeholder {
  color: #777;
}

input::-ms-input-placeholder {
  color: #777;
}

input::placeholder {
  color: #777;
}

div.mini-toastr {
  top: 0;
  right: 0;
  left: 0;
}

div.mini-toastr > .mini-toastr__notification {
  background-color: #2ab380;
  cursor: pointer;
  padding: 24px;
  margin: 0;
  opacity: 0.8;
  color: #fff;
  border-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  width: 300px;
  width: 100%;
  text-align: center;
  line-height: 26px;
  font-size: 16px;
}

div.mini-toastr
  > .mini-toastr__notification
  > .mini-toastr-notification__title {
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 18px;
}

.app {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  position: relative;
  min-height: 100%;
}

.app .selectable {
  -webkit-touch-callout: all;
  /* iOS Safari */
  -webkit-user-select: all;
  /* Safari */
  /* Konqueror HTML */
  -moz-user-select: all;
  /* Firefox */
  -ms-user-select: all;
  /* Internet Explorer/Edge */
  user-select: all;
  /* Chrome and Opera */
}

.app pre {
  font-size: 0.8em;
}

.app .badge {
  -ms-flex-item-align: center;
  align-self: center;
}

.app .badge > span {
  color: white;
  font-size: 15px;
  font-weight: 700;
  background: #ffce38;
  border: 2px solid #ffce38;
  border-radius: 5px;
  padding: 2px;
}

.app .badge.green span {
  background: #2ab380;
  border: 2px solid #2ab380;
}

.app > .app-container {
  width: 960px;
  margin-top: calc(108px);
  margin-bottom: calc(194px);
  height: calc(100% - ((108px + 24px) + (calc(194px + 24px))));
}

.app > .app-container.no-nav {
  margin-top: 24px;
}

.app > .app-container.no-nav > .nav {
  display: none;
}

@media (min-width: 960px) {
  .app > .app-container {
    margin-top: calc(108px + 24px);
    margin-bottom: calc(86px + 24px);
    min-height: calc(100vh - ((108px + 24px) + (calc(86px + 24px))));
  }
}

.page {
  min-height: calc(100vh - ((108px + 24px) + (calc(194px + 24px))));
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 0 24px;
}

.page.center {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

@media (min-width: 960px) {
  .page {
    padding: 0;
    min-height: calc(100vh - ((108px + 24px) + (calc(86px + 24px))));
  }
}

.hero {
  background: #2ab380;
  padding: 48px 24px;
  color: #fff;
}

.hero > a.anchor {
  top: 0px;
}

.hero > header {
  font-family: "tos", "Apple Garamond", "Baskerville", "Times New Roman",
    "Droid Serif", "Times", "Source Serif Pro", serif;
  font-size: 35px;
}

.hero > p.slogan {
  font-size: 24px;
  font-weight: 300;
  margin: 24px 0 0;
  line-height: 36px;
}

.hero > .cta-container {
  margin-top: 48px;
}

.hero > .cta-container > form.email-input > span.email-error {
  width: 100%;
  margin-bottom: 12px;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  display: inline-block;
  text-align: center;
  font-weight: 600;
}

.hero > .cta-container > form.email-input > input.email {
  width: 100%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  text-align: center;
}

.hero > .cta-container > form.email-input > button.cta {
  width: 100%;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin: 0;
}

.hero > .cta-container > p.disclaimer {
  margin: 12px 0 0;
  text-align: center;
  font-size: 0.8em;
}

@media (min-width: 400px) {
  .hero > header {
    font-size: calc(36px + (41.599999999999994 * (100vw - 400px) / 624));
  }
}

@media (min-width: 836px) {
  .hero > header {
    text-align: center;
    font-size: 48px;
  }

  .hero > p.slogan {
    text-align: center;
  }

  .hero > .cta-container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .hero > .cta-container > input.email {
    width: auto;
    width: 400px;
    text-align: left;
    border-radius: 4px;
  }

  .hero > .cta-container > button.cta {
    width: auto;
    border-radius: 4px;
    margin-top: 12px;
  }
}

@media (min-width: 960px) {
  .hero {
    margin: 0;
  }
}

.subscribe-modal p {
  line-height: 30px;
}

.subscribe-modal > button {
  margin-top: 24px;
}

.success-stories {
  padding: 48px 24px 24px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.success-stories > header {
  font-size: 24px;
  text-align: center;
  margin-bottom: 88px;
}

.success-stories > .testimonial-container > .testimonial {
  background: #fff;
  border-radius: 8px;
  padding: 64px 24px 24px;
  position: relative;
  margin-bottom: 64px;
}

.success-stories > .testimonial-container > .testimonial:last-child {
  margin-bottom: 24px;
}

.success-stories > .testimonial-container > .testimonial > img.avatar {
  top: -40px;
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  left: calc(50% - 40px);
}

.success-stories > .testimonial-container > .testimonial > .company {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-bottom: 24px;
}

.success-stories
  > .testimonial-container
  > .testimonial
  > .company
  > span.name {
  font-size: 18px;
  font-weight: 500;
}

.success-stories
  > .testimonial-container
  > .testimonial
  > .company
  > span.slash {
  color: #ccc;
  margin: 0 12px;
  font-weight: 700;
}

.success-stories > .testimonial-container > .testimonial > .company > img {
  height: 20px;
}

.success-stories
  > .testimonial-container
  > .testimonial
  > .company
  > img.google {
  height: 18px;
}

.success-stories > .testimonial-container > .testimonial > p {
  color: #555555;
  line-height: 24px;
  font-size: 14px;
}

.success-stories > .testimonial-container > .testimonial > p > span.emoji {
  font-style: normal;
}

.success-stories > button.cta {
  margin: 48px 0 24px;
}

@media (min-width: 960px) {
  .success-stories {
    padding: 48px 0 24px;
  }

  .success-stories > .testimonial-container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 100%;
  }

  .success-stories > .testimonial-container > .testimonial {
    margin-bottom: 24px;
    width: 304px;
  }

  .success-stories > .testimonial-container > .testimonial > p {
    text-align: center;
    line-height: 28px;
    font-size: 15px;
  }
}

.how-it-works {
  padding: 48px 24px 24px;
  background: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 24px;
}

.how-it-works .badge {
  margin-top: -4px;
  margin-left: 8px;
  position: relative;
  top: 1px;
}

.how-it-works > header {
  font-size: 24px;
  text-align: center;
  margin-bottom: 48px;
}

.how-it-works > .steps-container {
  width: 85%;
  margin-bottom: 24px;
}

.how-it-works > .steps-container > .step {
  margin-bottom: 48px;
}

.how-it-works > .steps-container > .step:last-child {
  margin-bottom: 0;
}

.how-it-works > .steps-container > .step > header {
  font-size: 24px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif !important;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  letter-spacing: 0.5px;
}

.how-it-works > .steps-container > .step > header > span.number {
  color: #555555;
  margin-right: 12px;
  font-weight: 500;
  font-size: 12px;
  border: 2px solid #ccc;
  border-radius: 50%;
  padding: 3px 0 0 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  text-align: center;
  width: 24px;
  height: 24px;
  display: inline-block;
}

.how-it-works > .steps-container > .step > p {
  font-size: 19px;
  color: #555555;
  line-height: 30px;
  padding: 12px 0 0 37px;
}

@media (min-width: 960px) {
  .how-it-works {
    border-radius: 4px;
  }
}

.sample-questions {
  padding: 48px 24px 24px;
  background: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.sample-questions > header {
  font-size: 24px;
  text-align: center;
  margin-bottom: 48px;
}

.sample-questions > .question {
  margin-bottom: 24px;
}

.sample-questions > .question > .asked-by {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-bottom: 24px;
  color: #888;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 14px;
}

.sample-questions > .question > .asked-by > img.stripe {
  height: 25px;
  padding-top: 1px;
  padding-bottom: 1px;
}

.sample-questions > .question > .question-container {
  padding: 24px;
  border-radius: 4px;
  background: #fbfbfb;
  border: 2px solid #f1f1f1;
}

.sample-questions > .question > .question-container > .question-content {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  font-family: "Computer Modern Serif";
  font-size: 19px;
  line-height: 30px;
  margin: 0 0 24px;
}

.sample-questions
  > .question
  > .question-container
  > .question-content
  p:last-child {
  margin-bottom: 0;
}

.sample-questions > .question > .question-container > .question-content > ul {
  margin-bottom: 24px;
}

@media (min-width: 960px) {
  .sample-questions {
    border-radius: 4px;
  }
}

.enter-email {
  text-align: center;
}

.lander {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding: 0;
}

.lander > header {
  width: 100%;
  text-align: center;
  font-size: 24px;
  text-align: center;
  margin: 48px 0 24px;
}

.lander > .pricing-boxes > .pricing-container {
  padding-bottom: 0;
}

.verify {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start !important;
  -ms-flex-pack: start !important;
  justify-content: flex-start !important;
  text-align: center;
}

.verify > .container > .click-here {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

@media (min-width: 960px) {
  .verify {
    -webkit-box-pack: center !important;
    -ms-flex-pack: center !important;
    justify-content: center !important;
  }
}

.unsubscribe {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start !important;
  -ms-flex-pack: start !important;
  justify-content: flex-start !important;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
}

@media (min-width: 960px) {
  .unsubscribe {
    -webkit-box-pack: center !important;
    -ms-flex-pack: center !important;
    justify-content: center !important;
  }
}

.subscribe-hero {
  background: #2ab380;
  padding: 48px 24px;
  color: #fff;
  margin: 0 24px;
}

.subscribe-hero > header {
  font-family: "tos", "Apple Garamond", "Baskerville", "Times New Roman",
    "Droid Serif", "Times", "Source Serif Pro", serif;
  font-size: 48px;
  margin: 24px 0 0;
}

.subscribe-hero > p.slogan {
  font-size: 24px;
  font-weight: 300;
  line-height: 36px;
}

.subscribe-hero > .cta-container {
  margin-top: 48px;
}

.subscribe-hero > .cta-container > a > button.cta {
  width: 100%;
  border-radius: 4px;
  margin: 0;
}

.subscribe-hero > .cta-container > a.disclaimer {
  color: #fff;
  margin: 12px 0 0;
  text-align: center;
  display: block;
}

@media (min-width: 836px) {
  .subscribe-hero > header {
    text-align: center;
  }

  .subscribe-hero > p.slogan {
    text-align: center;
  }

  .subscribe-hero > .cta-container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .subscribe-hero > .cta-container > a > button.cta {
    width: 600px;
  }
}

@media (min-width: 960px) {
  .subscribe-hero {
    margin: 0;
  }
}

.subscribe-modal p {
  line-height: 30px;
}

.subscribe-modal > button {
  margin-top: 24px;
}

.notification {
  width: 100%;
  background: #fff;
  right: 0;
  left: 0;
  top: 0;
  text-align: center;
  border-bottom: 2px solid #f1f1f1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  line-height: 26px;
  height: auto;
  display: none;
  padding: 0 62px;
  z-index: 4;
}

.notification.show {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.notification.error {
  border-bottom: 2px solid red;
}

.notification.error i {
  color: red;
}

.notification.error header {
  color: red;
}

.notification.success {
  border-bottom: 2px solid #3ed29b;
}

.notification.success i {
  color: #3ed29b;
}

.notification.success header {
  color: #3ed29b;
}

.notification > header {
  padding: 24px 24px 12px;
  font-size: 24px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif !important;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  letter-spacing: 0.5px;
}

.notification > p {
  margin-top: 12px;
  margin-bottom: 24px;
  font-size: 19px;
  color: #555555;
  line-height: 30px;
}

.notification > .close {
  color: #555555;
  padding: 24px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.notification > .close:hover {
  cursor: pointer;
}

.subscribe > .disclaimer {
  padding: 0 48px;
  color: #959595;
  font-size: 13px;
  text-align: center;
  line-height: 20px;
}

.press > p {
  margin: 16px 0;
}

.cover-letter-cta {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 1em;
  text-align: center;
}

.v-spinner {
  /*	  font-size: 10px; 

    width: 60px;
    height: 40px;*/
  /*margin: 25px auto;*/
  text-align: center;
}

.v-spinner .v-clip {
  -webkit-animation: v-clipDelay 0.75s 0s infinite linear;
  animation: v-clipDelay 0.75s 0s infinite linear;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;

  display: inline-block;
}

@-webkit-keyframes v-clipDelay {
  0% {
    -webkit-transform: rotate(0deg) scale(1);
    transform: rotate(0deg) scale(1);
  }

  50% {
    -webkit-transform: rotate(180deg) scale(0.8);
    transform: rotate(180deg) scale(0.8);
  }

  100% {
    -webkit-transform: rotate(360deg) scale(1);
    transform: rotate(360deg) scale(1);
  }
}

@keyframes v-clipDelay {
  0% {
    -webkit-transform: rotate(0deg) scale(1);
    transform: rotate(0deg) scale(1);
  }

  50% {
    -webkit-transform: rotate(180deg) scale(0.8);
    transform: rotate(180deg) scale(0.8);
  }

  100% {
    -webkit-transform: rotate(360deg) scale(1);
    transform: rotate(360deg) scale(1);
  }
}
</style>  