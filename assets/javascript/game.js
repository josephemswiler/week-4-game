(function () {

    // Variables:

    var charArr = ["ken", "ehonda", "ryu", "dhalsim", "zangief", "vega"];
    var selected = false;
    var selectedChar;
    var vsChar;
    var battleOn = false;
    var hpVs = $('.hp-vs').data('value');
    var hpSelected = $('.hp-selected').data('value');
    var hp;
    var winner;
    var loser;

    // Characters:

    function Player(name, hitPoints, attackMax) {
        this.name = name;
        this.hitPoints = hitPoints;
        this.attackMax = attackMax;
      }

      var playerKen = new Player("Ken", 90, 65);
      var playerEhonda = new Player("Ehonda", 150, 85);
      var playerRyu = new Player("Ryu", 90, 55);
      var playerDhalsim = new Player("Dhalsim", 60, 45);
      var playerZangief = new Player("Zangief", 200, 75);
      var playerVega = new Player("Vega", 80, 95);

    // Functions:

    function fadeStartScreen() {
        $('.start-screen-btn')
            .animate({
                opacity: 0
            }, 500, function () {
                $(this).hide();
                $('.main-title').hide();
            });

        $('.start-screen')
            .animate({
                opacity: 0
            }, 500, function () {
                $(this).hide();
            });

        $('.title-img')
            .animate({
                height: "100vh",
                opacity: 0
            }, 500, function () {
                $(this).hide();
            });
    } // /fadeStartScreen

    function loadCharacterScreen() {
        $('.character-show')
            .css({
                "visibility": "visible",
                "display": "flex"
            })
            .animate({
                opacity: 1
            }, 1500);
        $('.character-screen')
            .css({
                "visibility": "visible",
                "display": "block"
            })
            .animate({
                opacity: 1
            }, 1500);
        $('.fight-btn')
            .animate({
                opacity: 1
            }, 500, function () {
                $(this).show();
            });
    } // /loadCharacterScreen

    function pickChar(el) {
        if (selected === true) {

            charArr.push(selectedChar);

            selected = false;

        }

        $('.selected-character').html(el.html());

        $('.fight-btn-wrapper')
            .css({
                "visibility": "visible",
                "display": "flex"
            })

        var theClass = el.attr('class');

        var subStr = theClass.substr(theClass.indexOf(' ') + 1, theClass.length - theClass.indexOf(' '))

        for (var i = 0; i < charArr.length; i++) {

            if (charArr[i] === subStr) {

                selectedChar = charArr.splice(i, 1);

                selectedChar = selectedChar.join('')

                vsChar = charArr[Math.floor(Math.random() * charArr.length)];

                $('.vs-character').html($("." + vsChar + "").html())

                $('.selected-name').text(selectedChar);

                $('.vs-name').text(vsChar);

                selected = true;

            }
        }
    } // /pickChar

    function loadFighters() {
        var selectedFighter = '<img src="assets/images/' + selectedChar + '-fight-left.png" alt="' + selectedChar + '">';
        var vsFighter = '<img src="assets/images/' + vsChar + '-fight-right.png" alt="' + vsChar + '">';

        $('.selected-char').html(selectedFighter);
        $('.vs-char').html(vsFighter);

        $('.hp-selected-name').html(selectedChar);
        $('.hp-vs-name').html(vsChar);
    } // /loadFighters

    function fadeCharScreen() {
        $('.character-show')
            .animate({
                opacity: 0
            }, 500, function () {
                $(this).hide();
            });
        $('.fight-btn')
            .animate({
                opacity: 0
            }, 500, function () {
                $(this).hide();
            });

        $('.character-screen')
            .animate({
                opacity: 0
            }, 500, function () {
                $(this).hide();
            });
    } // /fadeCharScreen

    function loadFightScreen() {
        /*
        var backgrounds = ["bg-1", "bg-2", "bg-3", "bg-4"];
        var bg = Math.floor(Math.random() * backgrounds.length)
        console.log(backgrounds[bg])
        var randBackground = '../images/' + backgrounds[bg] + '.gif';
        $('.fight-screen').css( "background-image", 'url(' + randBackground + ')');
        */
        $('.fight-show')
            .css({
                "visibility": "visible",
                "display": "flex"
            })
            .animate({
                opacity: 1
            }, 1500);
        $('.fight-screen')
            .css({
                "visibility": "visible",
                "display": "block",
            })
            .animate({
                opacity: 1
            }, 1500);

        battleOn = true;
    } // /loadFightScreen

    function loadGameOver() {
        $('.hp-bar')
            .animate({
                opacity: 0
            }, 500, function () {
                $(this)
                    .empty()
                    .html('<div class="col-12 game-over">GAME OVER<span class="winner"> ' + winner + ' WINS!</span></div>')
                    .animate({
                        opacity: 1
                    }, 500)
            });
        $('.attack-btn')
            .animate({
                opacity: 0
            }, 500, function () {
                $(this).hide();
                $('.reset-btn')
                    .css({
                        "visibility": "visible",
                        "display": "block"
                    })
                    .animate({
                        opacity: 1
                    }, 500);
            });
    } // /loadGameOver

    function resetScreen() {
        $('.reset-btn')
            .animate({
                opacity: 0
            }, 500)
            .css({
                "visibility": "hidden",
                "display": "none"
            });
        $('.fight-show')
            .animate({
                opacity: 0
            }, 500, function () {
                $(this).hide();
            });
        $('.fight-screen')
            .animate({
                opacity: 0
            }, 500, function () {
                $(this).hide();
            });
        $('.hp-bar')
            .empty()
            .html('<div class="col-5 hp-selected-bar"><div class="hp-selected" data-value="100"></div></div><div class="col-2 ko">KO</div><div class="col-5 hp-vs-bar"><div class="hp-vs" data-value="100"></div></div>');
        $('.attack-btn')
            .show()
            .animate({
                opacity: 1
            }, 500);

        battleOn = true;

        hpVs = 100;

        hpSelected = 100;

        $('.vs-character').empty();

        $('.vs-name').empty();

        selected = false;

    } // /resetScreen

    function recordLoser() {
        $("." + loser)
            .empty()
            .html('<img src="assets/images/' + loser + '-bw.png" alt="' + loser + '">')
            .addClass('inactive')

        for (var i = 0; i < charArr.length; i++) {

            if (charArr[i] === loser) {

                charArr.splice(i, 1);
                selectedChar = "";
                charArr.push(winner);                //here
            }
        }
    } // /recordLoser

    function calcAttack() {

        battleOn = true;
        var attackedChar;
        var whoAttacked = Math.round(Math.random());
        if (whoAttacked) {
            attackedChar = $('.hp-vs');
            hp = hpVs;
        } else {
            attackedChar = $('.hp-selected');
            hp = hpSelected;
        };

        if (hp <= 0) {
            //GAME OVER
            battleOn = false;
        }

        var hit = Math.round(Math.random() * hp);

        hp = hp - hit;

        if (hp <= 10) {
            hp = 0;
        }

        attackedChar
            .css({
                "width": hp + "%",
                "visibility": "visible"
            })
            .data('value', hp);

        if (hp === 0) {

            battleOn = false;

            loadGameOver();
        }

        if (whoAttacked) {
            hpVs = hp;
            winner = selectedChar;
            loser = vsChar;
        } else {
            hpSelected = hp;
            winner = vsChar;
        };

    }

    // Event Handlers:
        
    $('.start-screen-btn').click(function () {

        fadeStartScreen();

        loadCharacterScreen();

    }); // /click start-screen-btn

    $('.char-box').click(function () {
        if ($(this).hasClass('inactive')) {
            return;
        } else {
            pickChar($(this));
        }
    }) // /click char-box

    $('.fight-btn').click(function () {

        if (!selected) {
            return; //here
        }

        fadeCharScreen();

        loadFightScreen();

        loadFighters();

    }) // /click fight-btn

    $('.attack-btn').click(function () {
        if (battleOn) {
            calcAttack();
        }
    }) // /click attack-btn

    $('.reset-btn').click(function () {

        resetScreen();

        recordLoser();

        loadCharacterScreen();

        console.log(charArr);
    }) // /click reset-btn

    //init values, global counters, values that need to be reset in a function that can be run to restart game, run the function onload

    //run game

    //inital screen = play game button

    //onclick of play game button, curtain out from center show characters

    //hover square over character sqaure w/ name at bottom

    //onclick of character, show full character on left w/ YOU CHOOSE + charaName, and
    //show fight button, onclick of fight button show CPU CHOOSES + charaName on right after, and
    //curtain out from center to show fight screen, fade in characters

    //show attack button, onclick one character shakes if hit and HP goes down

    //if one character HP = 0, GAME OVER and display who won alert, add win count, play again button


    //event listeners

    //reset

}()); // /function