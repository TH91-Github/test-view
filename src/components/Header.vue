<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div 
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <RouterLink 
          :to="nav.href"
          active-class="active"
          :class="{ active: isMatch(nav.path) }"
          class="nav-link">
          {{nav.name}}
        </RouterLink>
        <!-- isMatch 반환된 값이 트루 일경우 active 활성화 -->
      </div>
    </div>
    <div class="user" 
    @click="toAbout()"> 
      <img 
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>
<script>
import Logo from '~/components/Logo'
export default {
  components : {
    Logo
  },
  data(){
    return{
      navigations:[
        {
          name:'Search',
          href:'/'
        },
        {
          name:'Movie',
          href:'/movie/tt4520988',
          path:/^\/movie/ // '/movie' 로 시작하는 경우에
        },
        {
          name:'About',
          href:'/about'
        }
      ]
    }
  },
  computed: {
    image() { // /store/about.js state-> about-> 이미지 경로 가져오기 
      return this.$store.state.about.image
    },
    name() {
      return this.$store.state.about.name
    }
  },
  methods: {
    isMatch(path){ // 일치여부에 따라 true / false를 반환
      if (!path) return false
      return path.test(this.$route.fullPath)
    },
    toAbout() {  // 다른 페이지로 이동을 하게 한다
      this.$router.push('/about')   // push 라는 메소드를 통해 페이지를 이동할수도 있다
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";
header{
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo{
    margin-right:40px;
  }
  .user{
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: .4s;
    &:hover {
      background-color: darken($gray-200, 10%)
    }
    img {
      width: 100%;
    }
  }
  @include media-breakpoint-down(sm){
    .nav {
      display:none;
    }
  }
}
</style>