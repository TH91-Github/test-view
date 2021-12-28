import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'  
import About from './About'
import NotFound from './NotFound'


export default createRouter({
  // history를 Hash, History 2가지 모드로 구분을 할 수 있다.
  // Hash 모드
  // https://google.com/#/search : 특정한 주소 부분에 도메인 옆에 #를 붙여준다
  // 해쉬모드는 새로 고침했을 때 도메인이 새로고침 되어 해당 페이지가 찾을 수 없다는 말을 방지하기 위해 사용
  history: createWebHashHistory(),
  scrollBehavior(){
    return { top: 0}
  },
  // pages
  routes: [
    {
      // path: / 의미 : https://google.com 만 입력하였을 때 https://google.com/ 로 되어 메인페이지의 component 사용하겠다는 의미 
      path: '/',
      component: Home
    },
    {
      path: '/movie/:id',  // id 는 hello 또는 마음대로 바꿀 수 있음
      component: Movie
    },
    {
      // path: '/about' 의 경우 https://google.com/about 에 접근하여 해당 component를 사용하겠다는 의미
      path: '/about',
      component: About
    },
    {
      path: '/:notFound(.*)', // notFound 임의 지정
      component: NotFound
    }
  ]
})
