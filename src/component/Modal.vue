<template>
  <transition name='modal'>
    <div class='modal-container' @click='close' v-show='show'>
      <div class='modal-content' @click.stop>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: "modal",
  props: ["show"],
  methods: {
    close: function() {
      this.$emit("close");
    }
  },
  mounted: function() {
    document.addEventListener("keydown", e => {
      if (this.show && e.keyCode == 27) {
        this.close();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.modal-container {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  -webkit-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #484848;
  padding: 24px;
}

.modal-container > .modal-content {
  width: auto;
  background-color: #fff;
  border-radius: 8px;
  -webkit-box-shadow: 0 3px 10px 1px rgba(41, 49, 89, 0.15);
  box-shadow: 0 3px 10px 1px rgba(41, 49, 89, 0.15);
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  padding: 24px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-content,
.modal-leave-active .modal-content {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

