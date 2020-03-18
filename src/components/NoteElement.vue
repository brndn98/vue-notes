<script>
export default {
  name: "NoteElement",
  props: ["tag"],
  render(createElement) {
    return createElement("" + this.tag, this.$slots.default);
  }
};
</script>

<style>
</style>