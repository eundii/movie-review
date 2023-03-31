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

### 1) HOME

