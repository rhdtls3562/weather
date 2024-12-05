document.addEventListener("DOMContentLoaded", function () {
  let temp = document.querySelector("#temp");
  let place = document.querySelector("#place");
  let wind = document.querySelector("#wind");
  let des = document.querySelector("#des");
  let imgWrap = document.querySelector("#imgWrap"); // 사용자 정의 이미지가 표시될 <img> 태그

  // 기본 도시명
  let cityname = "Seoul"; // 기본값으로 서울
  let API_Key = "4c3b36af7a449b6adbfe082063f6144c";

  // 도시명 한글 매핑
  const cityMapping = {
    Seoul: "서울",
    Busan: "부산",
    Daegu: "대구",
    Incheon: "인천",
    Gwangju: "광주",
  };

  // 날씨 아이콘에 맞는 사용자 정의 이미지 경로
  const iconMapping = {
    "01d": "img/맑음.png", // 맑은 날
    "02d": "img/살짝구름.png", // 구름 조금
    "03d": "img/구름.png", // 흐린 날
    "04d": "img/구름많음.png", // 매우 흐린 날
    "09d": "img/비.png", // 비 오는 날
    "10d": "img/비.png", // 비 오는 날 (주간)
    "11d": "img/번개.png", // 천둥 번개
    "13d": "img/눈.png", // 눈 오는 날
    "50d": "img/안개.png", // 안개
    // 야간
    "01n": "img/맑음.png",
    "02n": "img/살짝구름.png",
    "03n": "img/구름.png",
    "04n": "img/구름많음.png",
    "09n": "img/비.png",
    "10n": "img/비.png",
    "11n": "img/번개.png",
    "13n": "img/눈.png",
    "50n": "img/안개.png",
  };

  // 초기 날씨 정보 가져오기
  fetchWeather(cityname);

  // 도시 조회 버튼 클릭 시
  document.querySelector("#searchBtn").addEventListener("click", function () {
    let cityInput = document.querySelector("#city").value;
    cityname = cityInput; // 사용자가 입력한 도시로 변경
    fetchWeather(cityname);
  });

  // 날씨 정보 가져오는 함수
  function fetchWeather(cityname) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_Key}&units=metric&lang=kr`
    )
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          alert("날씨 데이터를 가져오는 데 실패했습니다.");
          return null;
        }
      })
      .then(function (data) {
        if (data) {
          let koreanCityName = cityMapping[data.name] || data.name;
          temp.textContent = `${data.main.temp}°C`;
          place.textContent = koreanCityName;
          wind.textContent = `${data.wind.speed} m/s`;
          des.textContent = data.weather[0].description;

          // 날씨 아이콘 코드 가져오기
          let icon = data.weather[0].icon;

          // 콘솔로 아이콘 코드 확인
          console.log("아이콘 코드:", icon);

          // 사용자 정의 이미지 선택 (아이콘 코드에 맞는 이미지 경로)
          let sun = iconMapping[icon] || "img/기본.png"; // 기본 이미지 경로 설정

          // 사용자 정의 이미지 설정
          imgWrap.src = sun; // 이미지 표시
        }
      })
      .catch(function (error) {
        console.error("날씨 데이터를 가져오는 데 오류가 발생했습니다.", error);
      });
  }
});
