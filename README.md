# mobile-programming-seoultech  
## book report progressive web application. 

We implemented frontend on firebase with vue js and backend on private server with node js express and mongodb.
You can add, receive your book_report, also get recommended book list extracted by text mining (simple tf-idf). 


# frontend
기존 TodoContents, TodoFooter, TodoHeader, TodoInput, TodoList, TodoLogin, TodoSearch 컴포턴트 구성에서  

MainPage, AddReport, RecommandList, ReportList, TodoLogin의 구성으로 바꿈
TodoLogin(firebase 호스팅 및 authentication 이용) -> MainPage(라우팅으로 page 이동, 메인 페이지) -> AddReport (독후감 작성 페이지, 서버에 전송), ReportList (유저가 작성했던 모든 독후감 요청), RecommandList(유저가 작성했던 독후감을 바탕으로 백엔드 서버 api가 텍스트 마이닝 후 클라이언트로 전송)  

# backend API
Cloud Platform : vultr, Language : nodejs, Framework : express, Databse : mongoDB으로 구성  
http method를 이용한 CRUD  
파이썬으로 작성된 텍스트 마이닝 모델 코드파일을 js에 import  
클라이언트 요청에 맞추어 response (독후감 저장, 독후감 기록 송출, 추천 도서 목록 송출)


# deploy 과정
git clone  
npm install  
vue add pwa  
npm install vue-router@3  
npm install firebase  
https://console.firebase.google.com/?hl=ko 들어가서 프로젝트 만들기. 
프로젝트 내부 들어가서 "웹앱에 firebase 추가하기". 
앱이름 -> firebase 호스팅 클릭 -> 앱등록 -> firebase sdk 등록 코드가 나오는데 const firebaseConfig 변수 값만 복사해서 main.js에 const firebaseConfig 변수 값에 붙여넣기. 
firebase 프로젝트 내부 페이지 옆이나 메인을 보면 authentication이 있는데 쭉 들어가서 '이메일/비밀번호?' 누르고 '사용설정'토글 활성화 (이메일 링크 토글은 x). 
npm install -g firebase-tools  
firebase init  
목록이 많이나오는데, hosting(뭐가 엄청 김) 부분에 스페이스(체크)하고 엔터  
existing에 엔터. 
입력하는 항들이 나오는데 차례로 입력하고 엔터 반복 (1. dist 입력 후 엔터 2. Yes 입력 후 엔터 3. No 입력 후 엔터). 
npm run build  
firebase deploy (authentication이 있어서 firebase serve 써도 메인페이지 못들어감)  
재 배포시 => npm run build -> firebase deploy 
