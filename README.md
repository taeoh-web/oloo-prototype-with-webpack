## oloo-prototype-with-webpack
oloo-prototype을 이용해서 챗봇 어플리케이션을 개발할 예정입니다    
어플리케이션은 아래와 같이 3개의 레이어 계층으로 나눕니다 

  - Common Layer : 공통적으로 사용하는 기능들을 정의
  - Component Layer : 시각적으로 보여지는 컴포넌트를 생성합니다
  - Service Layer : 비즈니스 로직을 담당합니다 


레이어 계층별로 파일로 생성하여 개발을 진행하기에는 
비즈니스 요구가 증가함에 따라 코드가 방대해지고 관리가 어려운 이슈가 발생할 것으로 보입니다    

Layer내부의 모듈들을 분리하고 webpack을 이용해서 번들파일 생성해서 서비스를 구축하도록 하겠습니다   
프로토타입에서는 챗봇에서 회원초대 서비스를 개발한다고 가정하겠습니다    
이 패턴으로 지속적으로 서비스를 확장합니다 

- Common Layer : 공통기능 계층  
  - API Module : API 통신담당 
  - Util Module : 유틸리티 모음 
  - Widget Module : 컴포넌트의 공통 작업담당 
- Component Layer
  - Bubble Module : 챗봇 버블 생성 
  - Button Module : 챗봇 버튼 생성  
  - InviteCard Module : 챗봇 초대장 생성 
- Service Layer 
  - InviteMemver : 회원초대 서비스 

