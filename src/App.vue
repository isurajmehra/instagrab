<template>
  <div id="app">
    <header class="header">
      <nav>
         <a href="#" class="logo">Instagrab</a>
      </nav>
    </header>
    <main class="main">
      <Loader v-if="loading"/>
      <div class="form">
        <form @submit.prevent="submitForm">
          <div>
            <input
              v-model="url"
              type="text"
              ref="urlInput"
              placeholder="https://www.instagram.com/p/BFnmHd8NYTo"
              required="required"
              @focus="handleFocus"
              @input="handleInput">
          </div>
        </form>
      </div>
      <div v-if="error" class="error">
        <h2>Ooops...!</h2>
        <p v-html="error"></p>
      </div>
      <div class="result" v-if="items.length">
        <MediaList :items="items"/>
      </div>
    </main>
    <footer class="credit">
      <p>Built with 💗 by <a href="https://twitter.com/ibenddrules" target="_blank">One regular irregular 👽</a></p>
    </footer>
  </div>
</template>

<script>
import MediaList from '@/components/MediaList.vue';
import Loader from '@/components/Loader.vue';

import getPosts from './instagram';

export default {
  name: 'app',
  components: {
    MediaList,
    Loader,
  },
  data: () => ({
    url: '',
    items: [],
    error: null,
    loading: false,
  }),
  computed: {
    validUrl() {
      const regex = /^(((https?):\/\/)?([w|W]{3}\.)+instagram.com\/p\/[a-zA-Z0-9-_]+)\/.*/;
      return regex.test(this.url) ? this.url.match(regex)[1] : null;
    },
  },
  methods: {
    handleInput() {
      if (this.validUrl) {
        this.items = [];
        getPosts(this.validUrl).then((items) => {
          this.items = items;
          this.url = '';
          // blur input
          this.$refs.urlInput.blur();
        }).catch(() => null); // fail silently
      }
    },

    handleFocus() {
      this.error = null;
    },

    submitForm() {
      if (this.validUrl) {
        this.loading = true;
        this.items = [];
        getPosts(this.validUrl).then((items) => {
          this.items = items;
          this.url = '';
        }).catch(() => {
          this.error = 'Something went wrong 😰. Make sure the instagram post is available,<br> double check your internet connection, then try again.';
        });
      } else {
        this.error = 'Not a valid Instagram url 😒';
      }

      this.loading = false;
      // blur input
      this.$refs.urlInput.blur();
    },
  },
};
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    display: flex;
    line-height: 1.5;
    font-size: 15px;
    min-height: 100vh;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .header {
    max-width: 960px;
    padding: 23px 16px 60px;
    width: 100%;
    margin: 0 auto;
  }

  .main {
    flex: 1;
    max-width: 720px;
    margin: 0 auto;
    width: 100%;
    padding: 0 16px;
  }

  .logo {
    font-size: 18px;
  }

  input[type="text"] {
    border: 0;
    padding: 18px 24px;
    font-size: 16px;
    font-family: inherit;
    width: 100%;
    font-weight: 400;
    border-radius: 7px;
    display: block;
    color: inherit;
    text-align: center;
    box-shadow: 0 2px 4px rgba(20,20,20,.1);
    transition: .3s ease;

    &:hover {
      box-shadow: 5px 20px 60px rgba(20, 20, 20, .1);
    }

    &::placeholder {
      color: #ccc;
      font-weight: 400;
    }
  }

  .form {
    margin: 10px 0 60px;
  }

  .error {
    margin-top: 45px;
    text-align: center;

    & h2 {
      font-weight: 300;
      font-size: 24px;
      margin-bottom: 5px;
    }

    & p {
      font-size: 16px;
      color: #e7554a;
    }
  }
  .credit {
    text-align: center;
    font-size: 12px;
    padding: 30px 0 20px;

    a {
      color: green;
    }
  }
</style>
