# mobile-programming-public

기존 TodoContents, TodoFooter, TodoHeader, TodoInput, TodoList, TodoLogin, TodoSearch 컴포턴트 구성에서  

MainPage, AddReport, RecommandList, ReportList, TodoLogin의 구성으로 바꿈

1. 첫 접속 시 TodoLogin에서 이메일 및 비밀번호 등록 (이후에는 쿠키가 남아서 자동 로그인 됨)
2. TodoLogin에서 MainPage로 이동
3. 3개의 페이지 이동 버튼 (AddReport, RecommandList, ReportList)
4. 모든 페이지에서 작업이 끝나면 MainPage로 돌아오는 형식

AddReport - 빈칸에 입력 후 이메일과 함께 DB로 전송하는 식으로 구성 => DB에 전송이 안됐음
RecommandList - 추천결과 조회 => ㅠㅜ
ReportList - 기존 작성결과 조회 => ㅠㅜ
