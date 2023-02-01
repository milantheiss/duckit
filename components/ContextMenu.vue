<template>
  <div class="fixed z-50 outline-none cursor-pointer text-lg rounded-lg drop-shadow-md bg-white" v-show="show"
    :style="style" ref="contextRef" tabindex="0" @blur="close">
    <slot></slot>
  </div>
</template>
<script setup>
// import useClickOutside from "@/composables/useClickOutside.js"
const contextRef = ref(null);

//const { onClickOutside } = useClickOutside();

const show = ref(false);
const _data = ref(undefined); // data to be passed to context menu
const left = ref(0) // left position
const top = ref(0) // top position

function close() {
  show.value = false;
  left = 0;
  top = 0;
}

function open(evt, data) {
  evt.preventDefault()

  _data.value = data;

  contextRef.value.focus()


  // updates position of context menu 
  left.value = evt.pageX || evt.clientX;
  top.value = evt.pageY || evt.clientY;

  show.value = true;
}

onClickOutside(contextRef, (event) => {
  if (show.value === true) {
    close();
  }
});

// get position of context menu
const style = computed(() => {
  return {
    top: top.value + 'px',
    left: left.value + 'px',
  };
});

defineExpose({
  open,
  close,
  data: _data
})
</script>