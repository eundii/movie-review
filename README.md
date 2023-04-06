# Eundii Movie 🎥

추천 영화 리스트를 보여주고 원하는 영화를 찾아서 찜하거나 평가할 수 있는 기능을 React로 구현한 반응형 사이트 입니다.

## 🔖 초기 셋팅

### 1) API 사용

영화 정보 데이터베이스를 사용할 수 있는 오픈 API인 <a href="https://developers.themoviedb.org/3/getting-started/introduction">TMDB API</a>를 사용하였습니다. 

개인 API KEY 발급 후 프로젝트 root에 .env 파일 생성해서 관리하였습니다.
API 호출 할 때, 개인 key를  process.env.REACT_APP_TMDB 로 접근해 사용했습니다.

<strong>⚠️개인 API KEY를 .env로 관리하는 이유 : </strong><br>
개인의 API Key로는 1분에 100개까지의 request 전송이 가능한 Rate Limit (속도 제한)이 존재하기 때문입니다. 개인의 할당량을 보장받기 위해서는 API Key를 공개된 저장소에 배포/업로드 하지 않는 것을 권장합니다.<br>
.gitignore에 .env가 설정되어 있으므로, 소스코드를 github에 업로드 하더라도 .env 파일은 공개된 저장소에 업로드 되지 않습니다.

### 2) SCSS Modules 사용

CSS 클래스 중첩을 신경쓰지 않고 className을 작성하기 위하여 사용하였습니다.
reset.scss, value.scss만 global scope로 적용되도록 사용하고 나머지는 모두 컴포넌트 별로 scss를 관리하도록 하였습니다.


## 💻 기능 구현

### 1) HOME (메인)

- useEffect에서 axios를 이용하여 인기, 최신상영, 탑랭킹 영화 리스트 API를 요청하여 데이터를 불러오고 useState로 만든 data를 통해 상태를 관리함.
- 각각의 리스트는 homeList 컴포넌트를 따로 만들어서 data(배열)를 전달함.
- homeList 컴포넌트는 react-slick 라이브러리를 사용하여 slider를 구현함.
- 배열data는 map 함수를 통해 각각의 item 으로 뿌려서 이미지, title, date등을 보여주게 함.
- react-router-dom의 useNavigate를 이용하여 해당 item의 영화 고유 id를 받아 파라미터로 전달 - 상세페이지로 이동하게 함.

### 2) MOVIE DETAIL (영화 상세)

- useParam으로 전달받은 영화 id 파라미터를 이용하여 API 호출함.
- 영화 상세 정보, 출연진, 비슷한 영화 데이터를 받아오고 데이터를 뿌려서 해당 영화 정보를 보여주게 구현.
- 존재하지 않는 영화 id를 받아올 경우 useNavigate를 이용하여 홈으로 돌아가게 함.
- 북마크 기능을 위해 useState로 active를 만들어서 로컬스토리지에 해당 영화 정보가 저장되어있으면 true, 아니면 false 가 되도록 useEffect에서 먼저 호출 / 클릭시 토글되도록 함.
- 북마크 기능은 app.js 에서 구현하고 context로 전달하여 상세페이지에서도 사용할 수 있도록 함.

### 3) Bookmark (북마크)

- 북마크 기능 구현은 app.js에서 관리
- useReducer를 이용하여 reducerBookmark를 생성 (init, create, remove) / 로컬스토리지에 bookmarks 에 변경된 값을 저장할 수 있게 함.
- app.js에서 useEffect로 처음 랜더링 될 때 로컬스토리지에서 bookmarks가 있다면 reducer init 으로 처음 초기 값을 셋팅함.
- create는 오늘 날짜, 해당 영화 정보를 받아서 객체를 만들고, 이를 기존 북마크 데이터 배열과 합쳐서 북마크 리스트를 생성함.
- remove는 해당 영화 아이디를 받아와서 filter 함수를 이용해 기존 북마크 데이터 배열에서 해당 아이디 영화를 제외한 나머지를 새로 배열로 만듬.
- create, remove 함수는 context를 통해 전역으로 전달할 수 있게 하고 영화 상세 페이지와 북마크 리스트에 전달하여 함수를 호출할 수 있게 함.

### 4) Search (검색)

- 검색 input에서 useRef를 이용하여 현재 입력된 값을 받고 검색버튼 클릭 or 엔터 입력 시 해당 값을 useNavigate를 통해 쿼리문으로 전달 함.
- 검색 리스트가 출력될 페이지에서 useSearchPrams를 이용하여 쿼리를 받아온 뒤 API 호출로 검색 리스트를 불러 온 뒤 리스트 구현.
- 각각의 영화는 id를 받아 useNavigate를 이용하여 상세 페이지로 이동할 수 있게 함.
    
