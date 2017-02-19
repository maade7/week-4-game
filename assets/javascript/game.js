var player = 0;
var opp = 0;
var self;
var pHp;
var pAp;
var dHp;
var dCp;
var attckCounter = 0;
var playerCount = 0;
var oppCount = 0;
$('#reset').hide();
$('#attack h4').text("SELECT A SHIP");


$('.btn').on("click", function() {
    // console.log($(this).find('h2').text());
    // console.log($(this).attr("hp"));
    // console.log($(this).attr("ap"));
    // console.log($(this).attr("cp"));
    self = this;

    if (player === 0) {
        pickPlayer();
    } else {
        pickOpp();
    }
});

function pickPlayer() {

    $('.btn').appendTo("#enemies");
    $(self).appendTo("#you");
    $(self).removeClass("btn");
    $(self).addClass("player");
    $('.btn').addClass("enemies");
    $("#you").children().prop('disabled', true);
    pHp = parseInt($(".player").attr("hp"), 10);
    pAp = parseInt($(".player").attr("ap"), 10);
    $('#attack h4').text("SELECT A TARGET");
    player = 1;

}

function pickOpp() {
    $('.defender').appendTo("#enemies");
    $('.defender').addClass("enemies");
    $('.defender').removeClass("defender");
    $(self).appendTo("#defender");
    $(self).addClass("defender");
    $(self).removeClass("enemies");
    dHp = parseInt($(".defender").attr("hp"), 10);
    dCp = parseInt($(".defender").attr("cp"), 10);
    $('#attack h4').text("ATTACK");
    opp = 1;
}

var attackPower = pAp;
var playerHP = pHp;
var defenderHP = dHp;
var defenderCP = dCp;

$('#attack').on("click", function() {
    if (playerCount !== 1 || oppCount !== 3) {
        if (player + opp === 2) {
            attckCounter++
            attackPower = (attckCounter * pAp);
            defenderHP = (dHp - attackPower);
            playerHP = (pHp - dCp);
            console.log('attackPower ' + attackPower);
            console.log("defenderHP " + defenderHP);
            console.log("playerHP " + playerHP);
            dHp = defenderHP;
            pHp = playerHP;
            $('.defender h3').text(defenderHP);
            $('.player h3').text(playerHP);
            if (defenderHP <= 0) {
                oppDie();

            }
            if (playerHP <= 0) {
                playerDie();

            }


        }
    }
});


function playerDie() {
    $('.player').appendTo("#dead");
    $('.player').addClass("dead");
    $('.player').removeClass("player");
    $('#attack h4').text("YOU LOSS");
    $('#reset').show();
    playerCount++;

}

function oppDie() {
    $('.defender').appendTo("#dead");
    $('.defender').addClass("dead");
    $('.defender').removeClass("defender");
    if (oppCount === 3) {
        $('#attack h4').text("YOU WIN");
        $('#reset').show();
    } else {
        $('#attack h4').text("SELECT A NEW TARGET");
        opp = 0;
        oppCount++;
    }

}

$('#reset').on("click", function() {
    location.reload();
});
