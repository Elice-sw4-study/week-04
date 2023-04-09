//HTML이 완전히 로딩되고 시작
document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        {
            name: 'cherries', //카드의 이름
            img: 'assets/cherries.png' //카드에 들어갈 이미지 주소
        }, {
            name: 'cherries',
            img: 'assets/cherries.png'
        }, {
            name: 'lemon',
            img: 'assets/lemon.png'
        }, {
            name: 'lemon',
            img: 'assets/lemon.png'
        }, {
            name: 'grapes',
            img: 'assets/grapes.png'
        }, {
            name: 'grapes',
            img: 'assets/grapes.png'
        }, {
            name: 'orange',
            img: 'assets/orange.png'
        }, {
            name: 'orange',
            img: 'assets/orange.png'
        }, {
            name: 'pineapple',
            img: 'assets/pineapple.png'
        }, {
            name: 'pineapple',
            img: 'assets/pineapple.png'
        }, {
            name: 'watermelon',
            img: 'assets/watermelon.png'
        }, {
            name: 'watermelon',
            img: 'assets/watermelon.png'
        }
    ]

    //카드의 순서를 섞어주기
    cardArray.sort(() => 0.5 - Math.random());
    var grid = document.querySelector('.grid');
    var result = document.querySelector('#result');
    var foundTeam = document.querySelector('.findCard');
    var restart = document.querySelector('.actions > button');

    //변수 선언
    var cardChosen = [];
    var cardChosenId = [];
    var cardsWon = [];

    //판을 만드는 함수
    function createBoard() {
        //위에서 만든 카드배열 만큼 반복
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('div'); //카드 생성
            card.classList.add('card', 'back'); //생성된 카드에 클래스 추가
            
            //만든 기본 카드 아이디(i)를 순서대로 넣어준다
            card.setAttribute('id', i);
            grid.appendChild(card);
            card.addEventListener('click', flipCard);
        }
    }

    //같은 카드인지 판별하는 함수
    function checkForMatch() {
        //let cards = document.querySelectorAll('*[class]');
        let cards = document.querySelectorAll('.card:not(.won)');

        //cardChosen과 cardChosen 변수에 저장된 2장의 카드의 id 순서대로 저장
        let optionOneId = cardChosenId[0];
        let optionTwoId = cardChosenId[1];

        // 카드의 이름이 같을 경우 = 같은 id값.
        if (cardChosen[0] === cardChosen[1]) {
            foundTeam.textContent = '성공! ' + cardChosen[0].toUpperCase() + ' 카드를 찾았습니다.'
            cardsWon.push(cardChosen);
        } else {
            //선택된 2장의 id가 다를 경우
            //2장의 이미지에 클래스를 바꿔서 백그라운드 변경하기
            cards[optionOneId].classList.remove('front');
            cards[optionOneId].classList.add('back');
            cards[optionOneId].style.backgroundImage = "";
            cards[optionTwoId].classList.remove('front');
            cards[optionTwoId].classList.add('back');
            cards[optionTwoId].style.backgroundImage = "";
        }
        result.textContent = cardsWon.length;
        if (cardsWon.length === cardArray.length / 2) {
            result.textContent = '모든 카드를 찾았습니다!';
        }
        //결과에 상관없이 선택된 카드의 배열을 리셋.
        cardChosen = [];
        cardChosenId = [];
    }

    //flipCard 함수: 카드를 뒤집는 함수
    let selectedCards = [];
    function flipCard() {
        var cardId = this.getAttribute('id');
        cardChosen.push(cardArray[cardId].name);
        cardChosenId.push(cardId);

        //this로 클릭된 이 카드의 이미지 바꿔주기
        this.classList.toggle('front');
        this.classList.toggle('back');
        this.style.backgroundImage = `url(${cardArray[cardId].img})`;

        //2개의 카드가 선택됬다면 틀렸는지 맞았는지 
        if (cardChosen.length === 2) {
            //0.5초 뒤에 2개가 같은 카드인지 아닌지 판별하는 checkForMatch 함수 실행
            setTimeout(checkForMatch, 500);
        }
    }
    function refreshPage() {
        location.reload();
    }
    
    // 리스너 추가
    restart.addEventListener('click', refreshPage);
    createBoard();
})