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
var attackPower = pAp;
var playerHP = pHp;
var defenderHP = dHp;
var defenderCP = dCp;
var defenderName = '';


$('#reset').hide();
$('#attack h4').text("SELECT YOUR TEST SUBJECT");

var load = ['load/GLaDOS_00_part1_entry-1.wav', 'load/GLaDOS_10_part1_entry-2.wav', 'load/GLaDOS_coop_hub_track05.wav', 'load/GLaDOS_coop_vault_intro01.wav', 'load/GLaDOS_mp_hub_return01a.wav', 'load/GLaDOS_mp_hub_return02a.wav', 'load/GLaDOS_mp_hub_return03a.wav']

var winS = ['winS/GLaDOS_01_part1_entry-1.wav', 'winS/GLaDOS_02_part1_entry-2.wav', 'winS/GLaDOS_02_part1_success-1.wav', 'winS/GLaDOS_03_part1_entry-2.wav', 'winS/GLaDOS_14_part1_entry-1.wav', 'winS/GLaDOS_botcoop_intro05.wav', 'winS/GLaDOS_dlc1_leaderboard01.wav', 'winS/GLaDOS_dlc1_leaderboard02.wav', 'winS/GLaDOS_dlc1_leaderboard03.wav', 'winS/GLaDOS_dlc1_leaderboard04.wav', 'winS/GLaDOS_dlc1_leaderboard06.wav', 'winS/GLaDOS_dlc1_leaderboard23.wav', 'winS/GLaDOS_epilogue23.wav', 'winS/GLaDOS_escape_02_spheredestroy4-06.wav', 'winS/GLaDOS_generic_security_camera_destroyed-5.wav', 'winS/GLaDOS_mp_coop_doors04.wav', 'winS/GLaDOS_mp_coop_paint_longjump_intro08.wav']

var winA = ['winA/GLaDOS_03_part1_success-1.wav', 'winA/GLaDOS_04_part1_success-1.wav', 'winA/GLaDOS_05_part1_success-1.wav', 'winA/GLaDOS_15_part1_into_the_fire-1.wav', 'winA/GLaDOS_15_part1_Partyspeech-2.wav', 'winA/GLaDOS_15_part1_Partyspeech-3.wav', 'winA/GLaDOS_coop_test_chamber_oneplayer37.wav', 'winA/GLaDOS_dlc1_leaderboard16.wav', 'winA/GLaDOS_dlc1_leaderboard20.wav', 'winA/GLaDOS_dlc1_leaderboard22.wav', 'winA/GLaDOS_escape_00_part1_nag16-1.wav', 'winA/GLaDOS_mp_coop_fling_1end03.wav', 'winA/GLaDOS_mp_coop_radarroomend.wav', 'winA/GLaDOS_mp_coop_wall_intro03.wav', 'winA/GLaDOS_testchambermisc19.wav']

var pick = ['pick/GLaDOS_00_part1_entry-3.wav', 'pick/GLaDOS_botcoop_intro01.wav', 'pick/GLaDOS_botcoop_intro09.wav', 'pick/GLaDOS_dlc1_leaderboard07.wav', 'pick/GLaDOS_escape_02_spheredestroy1-01.wav', 'pick/GLaDOS_gladosbattle_xfer06.wav', 'pick/GLaDOS_dlc1_leaderboard04.wav', 'pick/GLaDOS_03_part1_entry-2.wav']

var loss = ['loss/GLaDOS_05_part1_nag4-1.wav', 'loss/GLaDOS_05_part1_nag5-1.wav', 'loss/GLaDOS_10_part1_success-1.wav', 'loss/GLaDOS_11_part1_entry-3.wav', 'loss/GLaDOS_15_part1_into_the_fire-4.wav', 'loss/GLaDOS_dlc1_leaderboard13.wav', 'loss/GLaDOS_epilogue29.wav', 'loss/GLaDOS_escape_02_spheredestroy3-07.wav', 'loss/GLaDOS_escape_02_spheredestroy4-07.wav', 'loss/GLaDOS_escape_02_spheredestroy4-09.wav', 'loss/GLaDOS_faithplategarbage06.wav', 'loss/GLaDOS_mp_coop_catapult_1end03.wav', 'loss/GLaDOS_mp_coop_come_along06.wav', 'loss/GLaDOS_mp_coop_confidencenotslow01.wav', 'loss/GLaDOS_mp_coop_humanresourcedeath01.wav', 'loss/GLaDOS_mp_coop_humanresourcedeath02.wav', 'loss/GLaDOS_mp_death05.wav', 'loss/GLaDOS_mp_death06.wav', 'loss/GLaDOS_mp_death08.wav', 'loss/GLaDOS_mp_death18.wav', 'loss/GLaDOS_mp_death20.wav']



var playSounds = function(sounds) {
    var index = Math.floor(Math.random() * (sounds.length)),
        thisSound = "./assets/audio/" + sounds[index];

    $("#audio").html("<audio autoplay><source src=\"" + thisSound + "\" type=\"audio/wav\"><embed src=\"" + thisSound + "\" hidden=\"true\" autostart=\"true\" /></audio>");
}


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
    playSounds(pick);
    $('.btn').appendTo("#enemies");
    $('.btn').addClass("enemies");
    $(self).appendTo("#you");
    $(self).removeClass("enemies");
    $(self).addClass("player");
    $("#you").children().prop('disabled', true);
    pHp = parseInt($(".player").attr("hp"), 10);
    pAp = parseInt($(".player").attr("ap"), 10);
    $('#attack h4').text("SELECT AN OPPONENT TEST SUBJECT");
    $('#attack').addClass("disabled");
    $('#attack').removeClass("goBtn");
    player = 1;

}

function pickOpp() {
    $('.defender').appendTo("#enemies");
    $('.defender').addClass("enemies");
    $('.defender').removeClass("defender");
    $(self).appendTo("#you");
    $(self).addClass("defender");
    $(self).removeClass("enemies");
    dHp = parseInt($(".defender").attr("hp"), 10);
    dCp = parseInt($(".defender").attr("cp"), 10);
    $('#attack h4').text("TEST");
    $('#attack').addClass("goBtn");
    $('#attack').removeClass("disabled");
    defenderName = $(".defender h2").text();
    opp = 1;
}



$('#attack').on("click", function() {
    if (playerCount !== 1 && oppCount !== 3) {
        if (player + opp === 2) {
            attckCounter++
            attackPower = (attckCounter * pAp);
            defenderHP = (dHp - attackPower);
            playerHP = (pHp - dCp);
            $(".report1").text("You attacked " + defenderName + " for " + attackPower + " damage.");
            $(".report2").text(defenderName + " attacked you for " + dCp + " damage.");
            dHp = defenderHP;
            pHp = playerHP;
            $('.defender h3').text(defenderHP);
            $('.player h3').text(playerHP);
            if (defenderHP <= 0) {
                $(".report1").text(" ");
                $(".report2").text("You have defeted " + defenderName + ".");
                oppDie();

            }
            if (playerHP <= 0) {
                $(".report1").text(" ");
                $(".report2").text(defenderName + " has defeted you.");
                playerDie();
            }
        }
    }
});


function playerDie() {
    playSounds(loss);
    playerCount++;
    $('.player').appendTo("#dead");
    $('.player').addClass("dead");
    $('.player').removeClass("player");
    $('#attack h4').text("YOU LOSE");
    $('#attack').addClass("disabled");
    $('#attack').removeClass("goBtn");
    $('#reset').show();


}

function oppDie() {
    oppCount++;
    $('.defender').appendTo("#dead");
    $('.defender').addClass("dead");
    $('.defender').removeClass("defender");
    if (oppCount === 3) {
        playSounds(winA);
        $('#attack h4').text("YOU WIN");
        $('#attack').addClass("disabled");
        $('#attack').removeClass("goBtn");
        $('#reset').show();
    } else {
        playSounds(winS);
        $('#attack').addClass("disabled");
        $('#attack').removeClass("goBtn");
        $('#attack h4').text("SELECT A NEW OPPONENT");
        opp = 0;
    }

}

$('#reset').on("click", function() {
    location.reload();
});
playSounds(load);
