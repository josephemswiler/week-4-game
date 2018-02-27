(function () {

    // Variables:

    var charArr = ["ken", "ehonda", "ryu", "dhalsim", "zangief", "vega"];
    var charObjArr = [];
    var selected = false;
    var selectedChar;
    var vsChar;
    var selectedObject = {};
    var vsObject = {};
    var battleOn = false;
    var hpVs = $('.hp-vs').data('value');
    var hpSelected = $('.hp-selected').data('value');
    var hp;
    var lastAttack;
    var selectedHpTotal;
    var vsHpTotal;
    var hpTotal;
    var winner;
    var loser;
    var maxHit;
    var firstAttack = true;

    // Characters:

    function Player(name, hitPoints, attackMax) {
        this.name = name;
        this.hitPoints = hitPoints;
        this.attackMax = attackMax;
        charObjArr.push(this);
    }

    var playerKen = new Player("Ken", 120, 65);
    var playerEhonda = new Player("Ehonda", 150, 85);
    var playerRyu = new Player("Ryu", 110, 75);
    var playerDhalsim = new Player("Dhalsim", 60, 45);
    var playerZangief = new Player("Zangief", 200, 55);
    var playerVega = new Player("Vega", 70, 155);

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
        $('body')
            .css({
                "background": "#000177"
            })
    } // /loadCharacterScreen

    function capFirst(string) {
        var letters = string.split('');
        letters[0] = letters[0].toUpperCase();
        var joined = letters.join('');
        return joined;
    } // /capFirst

    function pickChar(el) {
        if (selected === true) {

            charArr.push(selectedChar);

            selected = false;

        }

        $('.selected-character').html(el.html());

        $('.play-again')
            .css({
                "visibility": "hidden",
            })

        $('.fight-btn-wrapper')
            .css({
                "visibility": "visible"
            })

        var theClass = el.attr('class');

        var subStr = theClass.substr(theClass.indexOf(' ') + 1, theClass.length - theClass.indexOf(' '))

        for (var i = 0; i < charArr.length; i++) {

            if (charArr[i] === subStr) {

                selectedChar = charArr.splice(i, 1);

                selectedChar = selectedChar.join('')

                vsChar = charArr[Math.floor(Math.random() * charArr.length)];

                $('.vs-character').html($("." + vsChar).html())

                for (var j = 0; j < charObjArr.length; j++) {
                    if (charObjArr[j].name === capFirst(selectedChar)) {
                        selectedObject = Object.assign({}, charObjArr[j]);
                    }
                    if (charObjArr[j].name === capFirst(vsChar)) {
                        vsObject = Object.assign({}, charObjArr[j]);
                    }
                }

                $('.selected-name').text(selectedChar.toUpperCase());

                $('.selected-hp').text(selectedObject.hitPoints);

                $('.selected-current-hp').text(selectedObject.hitPoints);

                $('.selected-max').text(selectedObject.attackMax);

                $('.selected-last').text(0);

                $('.vs-name').text(vsChar.toUpperCase());

                $('.vs-hp').text(vsObject.hitPoints);

                $('.vs-current-hp').text(vsObject.hitPoints);

                $('.vs-max').text(vsObject.attackMax);

                $('.vs-last').text(0);

                $('.stats').css({
                    "visibility": "visible"
                })

                selected = true;

            }
        }
    } // /pickChar

    function loadFighters() {
        var selectedFighter = '<img src="assets/images/' + selectedChar + '-fight-left.png" alt="' + selectedChar + '">';
        var vsFighter = '<img src="assets/images/' + vsChar + '-fight-right.png" alt="' + vsChar + '">';

        $('.selected-char').html(selectedFighter);
        $('.vs-char').html(vsFighter);

        $('.hp-selected-name').html(selectedChar.toUpperCase());
        $('.hp-vs-name').html(vsChar.toUpperCase());
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

        var backgrounds = ["bg-1", "bg-2", "bg-3", "bg-4"];
        var bg = Math.floor(Math.random() * backgrounds.length)
        var randBackground = 'assets/images/' + backgrounds[bg] + '.gif';
        $('.fight-screen').css("background-image", 'url(' + randBackground + ')');

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
                    .html('<div class="col-12 game-over">GAME OVER<span class="winner"> ' + winner.toUpperCase() + ' WINS!</span></div>')
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

        $('.selected-name').empty();

        battleOn = true;

        hpVs = 100;

        hpSelected = 100;

        $('.vs-character').empty();

        $('.vs-name').empty();

        selected = false;

        playerKen.hitPoints = 120;
        playerEhonda.hitPoints = 150;
        playerRyu.hitPoints = 110;
        playerDhalsim.hitPoints = 60;
        playerZangief.hitPoints = 200;
        playerVega.hitPoints = 70;

    } // /resetScreen

    function recordLoser() {

        $('.selected-character').empty();

        $('.fight-btn-wrapper')
            .css({
                "visibility": "hidden"
            });
        $('.play-again')
            .css({
                "visibility": "visible"
            });

        $('.stats')
            .css({
                "visibility": "hidden"
            })

        if (loser === selectedChar) {

            charArr.push(loser);
        } else if (loser === vsChar) {

            charArr.push(winner);

            $("." + loser)
                .empty()
                .html('<img src="assets/images/' + loser + '-bw.png" alt="' + loser + '">')
                .addClass('inactive')
            for (var i = 0; i < charArr.length; i++) {

                if (charArr[i] === loser) {

                    charArr.splice(i, 1);
                }
            }
        }

    } // /recordLoser

    function grabTotals() {
        vsHpTotal = vsObject.hitPoints;
        selectedHpTotal = selectedObject.hitPoints;
        firstAttack = false;
    }

    function calcAttack() {

        var attackedChar;
        var attackedCharHp;
        var attackerLast;

        var whoAttacked = Math.round(Math.random());

        if (firstAttack) {
            grabTotals();
        }

        if (whoAttacked) {
            attackedChar = $('.hp-vs');
            attackedCharHp = $('.vs-current-hp');
            attackedLast = $('.selected-last');
            hp = vsObject.hitPoints;
            maxHit = selectedObject.attackMax;
            hpTotal = vsHpTotal;
        } else {
            attackedChar = $('.hp-selected');
            attackedCharHp = $('.selected-current-hp');
            attackedLast = $('.vs-last');
            hp = selectedObject.hitPoints;
            maxHit = vsObject.attackMax;
            hpTotal = selectedHpTotal;
        };

        var hit = Math.round(Math.random() * maxHit);

        hp = hp - hit;

        if (hp <= 10) {
            hp = 0;
            hit += 10;
        }

        if (hp > hpTotal) {
            hp = hpTotal;
        }

        var endingHp = Math.floor((hp / hpTotal) * 100);

        attackedChar
            .css({
                "width": endingHp + "%",
                "visibility": "visible"
            })
            .data('value', hp);

        attackedLast
            .text(hit);

        attackedCharHp
            .text(hp);

        if (whoAttacked) {
            vsObject.hitPoints = hp;
            winner = selectedChar;
            loser = vsChar;

        } else {
            selectedObject.hitPoints = hp;
            winner = vsChar;
            loser = selectedChar;
        };

        if (hp === 0) {
            firstAttack = true;
            battleOn = false;
            loadGameOver();
        }

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

        recordLoser();

        loadCharacterScreen();

        resetScreen();

    }) // /click reset-btn

}()); // /function