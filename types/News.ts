export interface News {
  title: string;
  journal?: string;
  content: string;
  date: string;
  imageSrc?: string;
  url: string;
}

export const MOCK_NEWS: News[] = [
  {
    title: '"印 사상 최대 규모"…현대차, 인도 증시 화려한 데뷔',
    journal: "비즈워치",
    content:
      "현대자동차 인도법인(HMIL)이 마침내 인도 증권시장에 신규 상장했다. 현대차가 인도에서 사업을 시작한 지 꼬박 28년 만이다. 현대차에 인도는 중요한 시장이다. 전 세계 세 번째로 큰 자동차 시장이자, 중동 등 신흥 시장으로 사업을 확장하는 차원에서 지리적 이점이 있는 곳이다.",
    date: "2024-10-22",
    imageSrc:
      "https://imgnews.pstatic.net/image/648/2024/10/22/0000029948_001_20241022152310175.jpg?type=w860",
    url: "https://n.news.naver.com/mnews/article/648/0000029948",
  },
  {
    title: '당국 압박에 180도 달라진 두산…"직접적 주주환원 가능" 강조',
    journal: "서울경제",
    content:
      "[서울경제] 두산밥캣(241560)을 두산로보틱스(454910) 자회사로 편입하는 사업 재편안을 재추진하기로 한 두산(000150)그룹이 개편 작업의 필요성을 상세히 기술하고 직접적인 주주 환원이 가능하다는 점을 연거푸 강조하며 이전과는 180도 다른 태도를 보였다. 금융당국이 증권신고서에 부족함이 있으면 무제한 정정 요구를 하겠다는 등 거센 압박을 이어오자 시장의 요구에 맞춰 추진배경 등을 적극 보완한 것으로 풀이된다.",
    date: "2024-10-22",
    imageSrc:
      "https://imgnews.pstatic.net/image/011/2024/10/22/0004405577_001_20241022153817139.jpg?type=w860",
    url: "https://n.news.naver.com/mnews/article/011/0004405577",
  },
  {
    title:
      "'카카오게임즈 EB 투자' NH헤지운용, 크래프톤 주가 '꿈틀'에 촉각 [fn마켓워치]",
    journal: "파이낸셜뉴스",
    content:
      "[파이낸셜뉴스] NH헤지자산운용이 보유하던 카카오게임즈 교환사채(EB)를 크래프톤 주식과 맞바꿨다. 교환주식인 크래프톤에 대한 성장성을 높이 본 것으로 풀이된다. 22일 금융투자업계에 따르면 NH자산운용은 지난 9월 19일과 27일 양일간 80억원 상당의 카카오게임즈 EB를 크래프톤 주식과 교환한 것으로 나타났다.",
    date: "2024-10-22",
    url: "https://n.news.naver.com/mnews/hotissue/article/014/0005256778?type=series&cid=1089712",
  },
];
