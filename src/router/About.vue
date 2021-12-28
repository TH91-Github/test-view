<template>
  <div class="about">
    <div class="photo">
      <Loader 
        v-if="imageLoading"
        absolute />
      <img 
      :src="image"
      :lat ="nae" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Loader from '~/components/Loader'

export default {
  components:{
    Loader
  },
  data(){
    return {
      imageLoading: true
    }
  },
  computed: {
    // mapState 헬퍼 store/의 about 모듈 안에 있는 상태를 배열로 등록
    ...mapState('about', [ 
      'image',
      'name',
      'email',
      'blog',
      'phone'
    ])
  },
  mounted(){
    this.init()
  },
  methods:{
    async init() {
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/scss/main";

.about {
  text-align:center;
  .photo{
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 1px solid $gray-300;
    border-radius:50%;
    box-sizing:border-box;
    background-color: $gray-200;
    position:relative;
    img{
      width:100%;
    }
  }
  .name {
    font-size: 40px;
    font-family: "Oswald", snas-serif;
    margin-bottom: 20px;
  }
}

</style>
