//HTML이 완전히 로딩되고 시작
document.addEventListener('DOMContentLoaded', () => {

    //가장 먼저 배열을 만들어서 메모리 카드에 사용할 카드 각 2장씩 저장합니다. 즉 6개의 팀 로고 2개씩 전체 12개 팀 배열에 저장
    const cardArray = [
        {
            name: 'cherries',
            img: 'assets/cherries.png'
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

    //카드의 순서를 섞어줍니다.
    cardArray.sort(() => 0.5 - Math.random());

    /*
    querySelector는 선택한 첫 번째 요소를 찾는다.
    클래스 grid를 가지고 있는 첫 번째 녀석을 grid에 저장.
    같은 방법으로 result, foundTeam 도 변수에 저장
    */
    var grid = document.querySelector('.grid');
    var result = document.querySelector('#result');
    var foundTeam = document.querySelector('#foundTeam');

    //밑에 사용할 변수들 입니다.
    var cardChosen = [];
    var cardChosenId = [];
    var cardsWon = [];

    //판을 만드는 함수
    function createBoard() {
        //위에서 만든 카드배열 만큼 반복
        for (let i = 0; i < cardArray.length; i++) {

            //img요소 즉 img 태그를 만들어주는 코드
            var card = document.createElement('img');
            card.classList.add('card');

            //만든 img요소에 기본 카드의 공 이미지를 만들어주고, 아이디(i)를 순서대로 넣어준다
             card.setAttribute('src', 'assets/bg.png');
            card.setAttribute('id', i);

            //위에서 img 태그 만들어서, 주소 넣어주고, 아이디 넣어줬지만 이제는 진짜 html에 넣어줄시간
            grid.appendChild(card);

            //카드가 클릭되면 flipCard 함수를 실행하라!
            card.addEventListener('click', flipCard);
        }
    }

    //밑에 함수 중 flipCard 함수부터 보면 편합니다. 2장의 카드가 같은지 다른지 알아보자는 함수
    function checkForMatch() {
        //querySelector에 All을 붙여서 모든 img 요소(태그)를 가져온다
        let cards = document.querySelectorAll('img');

        //2개의 카드가 저장됬겠죠 cardChosen과 cardChosen 변수에 저장된 2장의 카드의 id 순서대로 저장
        let optionOneId = cardChosenId[0];
        let optionTwoId = cardChosenId[1];

        // 2장의 카드가 들어와서, 같은 팀 이름이면 실행됩니다.
        if (cardChosen[0] === cardChosen[1]) {
            // foundTeam은 뭐라고 했죠? 그죠 매치시킨 팀이에요 2장이 같으니까 밑에 찾은 팀 이름을 적어줍니다. 골 넣었다고도 외쳐주고요
            // cardChosen[0]을 한 이유는 cardChosen에는 같은 팀이름이 ['팀이름', '팀이름'] 있어서에요
            //foundTeam.textContent = 'Goaaaaaaaaal! ' + cardChosen[0].toUpperCase() + ' Scor' + 'ed!';
            foundTeam.textContent = '성공! ' + cardChosen[0].toUpperCase() + ' 카드를 찾았습니다.'
            // 맞춘 팀을 cardsWon 변수에 저장 2개 팀을 맞추면 [['팀이름1', '팀이름1'], ['팀이름2', '팀이름2']] 이렇게
            // 저장되있겠죠
            cardsWon.push(cardChosen);

            //선택된 2장의 팀이 달랐을 경우
        } else {
            //간단합니다, 2장의 카드를 다시 공 이미지로 변경
            cards[optionOneId].setAttribute('src', 'assets/bg.png');
            cards[optionTwoId].setAttribute('src', 'assets/bg.png');

            //2장의 이미지에 클래스를 바꿔서 백그라운드 변경하기
            // cards[optionOneId].classList.add('back').removeClass('front');
            // cards[optionTwoId].classList.add('back').removeClass('front');
        }

        //결과에는 cardsWon의 길이를 넣어주면 점수가 되죠.
        result.textContent = cardsWon.length;

        // 맨~~처음 12장의 팀을 배열에 저장했죠. 2장씩 짝을 맞추는 거니까 반을 나누면 점수랑 같아집니다. 같으면 result에 축하한다고 변경
        if (cardsWon.length === cardArray.length / 2) {
            result.textContent = '모든 카드를 찾았습니다!';
        }

        // 2장의 카드가 맞던, 틀리던 선택된 카드의 배열을 리셋해줍니다.
        cardChosen = [];
        cardChosenId = [];

    }

    //flipCard 함수는 카드를 돌려보는 기능을 해준다.
    function flipCard() {
        // 카드 아이디를 저장할 변수를 만들어주고 id를 넣어준다. this 추가설명 위에서 '클릭되면 flipCard를 실행하라'라고 했을 때 그
        // 클릭된 친구가 여기로 넣어오고 그 친구의 id를 저장하는 거에요
        var cardId = this.getAttribute('id');

        //앞에서 미리 만들어놓은 배열에 지금 들어온 아이디를 가진 팀의 이름을 넣어주기
        cardChosen.push(cardArray[cardId].name);

        //그리고 그 팀의 순번(id)도 넣어주기
        cardChosenId.push(cardId);

        //또 this로 클릭된 이 카드의 src 주소를 공 이미지 -> 선택된 팀 이미지로 변경
        this.setAttribute('src', cardArray[cardId].img);
        //this.classList.add('front').removeClass('back');

        //2개의 카드가 선택됬다면 틀렸는지 맞았는지 알아볼 시간
        if (cardChosen.length === 2) {
            //0.5초 뒤에 2개가 같은 카드인지 아닌지 판별하는 checkForMatch 함수 실행
            setTimeout(checkForMatch, 500);
        }
    }

    //판을 만들어 주는 이 함수를 적어주지 않으면 아무것도 일어나지 않아요
    createBoard();
})