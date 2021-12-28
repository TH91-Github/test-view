import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
  // namespaced : module! - 모듈화되어 사용될 수 있다는 것을 명시
  namespaced: true,
  // state : data - 취급해야 하는 데이터 (상태)
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),
  // getters : computed! - 계산된 데이터를 만들어내는 방식
  getters: {

  },
  // 변이 
  mutations: {
    updateState(state, payload) {
      // ['movies', 'message', loading]
      // Object.keys() 속성의 이름들만 가지고 새로운 배열 데이터를 만들어 준다
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
        // 아래와 같이 된다는 의미
        // state.movies = payload.movies
        // state.message = paload.message
      })
    },
    resetMovies(state) {
      state.movies = []
      state.message = _defaultMessage 
      state.loading = false
    }
  },
  // 비동기
  actions: {
    // Search.vue에서 데이터를 전송 받는다 
    // context 의 commit 만 사용하기에 {commit} 라고 적는다 
    // {commit} 대신에 context를 적고  아래 commit 사용된 부분을 context.commit 라고 적어주는 것과 동일하다
    async searchMovies({ state, commit }, payload) {// 매개변수 명칭은 변경 가능하다
      if (state.loading) { // searchMovies 동작이 여러번 실행 되는것을 막는다
        return
      }
      commit('updateState', {
        message: '', // 위 Search for the movie title! 메시지를 초기화
        loading: true
      })

      try{
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })
        const { Search, totalResults } = res.data
        commit('updateState', {
          // mutations의 updateState - payload로 전달
          // lodash 패키지에서 _uniqBy를 통해 중복되는 배열 값을 제거
          // _uniqBy(배열, 중복 되는 아이디)
          movies: _uniqBy(Search, 'imdbID')
        })
        console.log(totalResults) // 데이터 총 개수
        console.log(typeof totalResults) // 데이터 타입

        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)

        // 추가 요청!
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            if (page > payload.number / 10) {  //number -> Search number 데이터 
              break
            }
            const res = await _fetchMovie({
              ...payload,
              page  // page : page  속성 이름과 데이터 이름이 같다면 한쪽 생략
            })
            const { Search } = res.data
            commit('updateState', {
              // ... 전개 : 기존에 데이터를 전개 해주고 그 뒤에 Search 데이터를 새롭게 이어준다 
              movies: [
                ...state.movies,
                ..._uniqBy(Search, 'imdbID')
              ]
            })
          }
        }
      } catch (message){ // 에러가 있을 경우
        commit('updateState',{
          //movies : [], // 초기화
          message // message : message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({state, commit}, payload){
      if(state.loading) return
      
      commit ('updateState', {
        theMovie:{},
        loading:true
      })
      try {
        const res = await _fetchMovie(payload)
        commit('updateState',{
          theMovie: res.data
        })
      } catch (error) {
        commit('updateState',{
          theMovie: {}
        })
      } finally{
        commit ('updateState', {
          loading: false
        })
      }

    }
  }
}
function _fetchMovie(payload){
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = '7035c60c'
  const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` // id 값이 있으면
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((res) => {
        if (res.data.Error) { // 정상 응답이지만 검색에 대한 키 값이 없어 데이터를 정상적으로 못 받을 때
          reject(res.data.Error) 
        }
        resolve(res)
      })
      .catch((err) => {
        reject(err.message)
      })
  })
}