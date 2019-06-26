<template>
  <div class="media">
    <div class="media-counter">
      <div v-for="(_, $index) in items"
        :key="$index"
        :class="['dot', {active: $index === currentIndex }]">
      </div>
    </div>

    <div style="position: relative">
      <ul class="media-items">
        <li v-for="(item, $index) in items"
            :key="$index"
            v-show="$index === currentIndex">
          <img v-if="item.media_type === 1" :src="item.url" alt="" class="graph-image">
          <video v-else :src="item.url" class="graph-video" controls></video>
        </li>
      </ul>

      <!-- controls -->
      <button @click="previous" v-if="currentIndex > 0" class="previous">
        <div class="icon-button">
          <i class="chevron-left"></i>
        </div>
      </button>
      <button @click="next" v-if="currentIndex < items.length-1" class="next">
        <div class="icon-button">
          <i class="chevron-right"></i>
        </div>
      </button>
    </div>

    <div class="download">
      <a :href="items[currentIndex].url" download>Download</a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MediaList',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    currentIndex: 0,
  }),
  methods: {
    next() {
      this.currentIndex = this.currentIndex + 1;
    },
    previous() {
      this.currentIndex = this.currentIndex - 1;
    },
  },
};
</script>


<style lang="scss">

  button {
    border: 0;
    outline: 0;
    cursor: pointer;
  }

  .media {
    margin: 16px auto;
    max-width: 300px;
  }

  @media only screen and (min-width: 768px) {
    .media {
      max-width: 500px;
    }
  }

  .media-items {
    list-style: none;
    position: relative;
  }

  .media-counter {
    text-align: center;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;

    .dot {
      height: 8px;
      width: 8px;
      border: 1px solid #222;
      border-radius: 50%;
      margin-right: 4px;
    }

    .dot.active {
      background: #222;
    }
  }

  .download {
    margin-top: 14px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    & a {
      padding: 8px 16px;
      background: #fff;
      box-shadow: 0 2px 4px rgba(22,22,22,.2);
      border-radius: 3px;
      color: inherit;
      font-weight: 500;
      font-size: 16px;
      letter-spacing: 1px;
      transition: .3s ease;

      &:hover {
        box-shadow: 0px 5px 52px rgba(22,22,22,.4)
      }
    }
  }

  .icon-button {
    display: flex;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: #fff;
    position: relative;
    box-shadow: 0px 2px 10px rgba(22,22,22,.2);

    & i {
      display: inline-block;
      width: 6px;
      height: 6px;
      position: absolute;
      top: (20px - 6px)/2;

    }

    .chevron-right {
      border-right: 1.2px solid #bbb;
      border-bottom: 1.2px solid #bbb;
      transform: rotate(-45deg);
      left: (20px - 8px) / 2;
    }

    .chevron-left {
      border-left: 1.2px solid #bbb;
      border-bottom: 1.2px solid #bbb;
      transform: rotate(45deg);
      right: (20px - 8px) / 2;
    }
  }

  .previous, .next {
    position: absolute;
    padding: 16px 8px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    display: inline-block;
  }

  .previous {
    left: 0;
  }

  .next {
    right: 0;
  }

  .graph-video, .graph-image {
    height: auto;
    width: 100%;
  }
</style>
