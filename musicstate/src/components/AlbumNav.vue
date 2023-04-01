<template>
  <div class="LabelBox">
    <ul>
      <li
        :class="choiceWhere === index ? 'action' : ''"
        @click="isChoiceType(list, index)"
        v-for="(list, index) in lists"
        :key="index"
      >
        {{ list.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AlbumNav",
  props: {
    lists: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      choiceWhere: 0, //地区
    };
  },
  methods: {
    isChoiceType(list, index) {
      this.choiceWhere = index;
       // 全局事件总线
    this.$bus.$emit("type", list);
    },
  },
  mounted() {
   
  },
  created() {

  },
  // 销毁傀儡==》全局事件总线 type
  beforeCreate(){
    this.$bus.$off("type");
  }
};
</script>

<style scoped>
.LabelBox {
  margin: auto;
}
.LabelBox ul {
  display: block;
}
.LabelBox ul li:nth-child(1) {
  margin-left: 0px;
  margin-right: 25px;
}
.LabelBox ul li {
  display: inline-block;
  /* width: 55px; */
  padding: 0 10px;
  height: 26px;
  margin-left: 10px;
  text-align: center;
  line-height: 26px;
}
.action {
  color: white;
  background-color: #83b164;
}
</style>
