/**
 * Remotecall
 *
 * IMPORTANT NOTE: This file is licensed only for use in providing the RSUPPORT services,
 *
 * @author Choi,jaehee(jaehee-choi@rsupport.com)
 * @copyright © 2015 RSUPPORT. All rights Reserved.
 *
 */

$(function(){

  var $options
    , $message
    , $winCount = 0
    , $lossCount = 0
    , $tieCount = 0
    , $moveCount = 0
    , $emptyFunction = function(){};

  $options = ['rock', 'paper', 'scissors'];

  // for IE7
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
     for (var i = (start || 0), j = this.length; i < j; i++) {
       if (this[i] === obj) { return i; }
     }
     return -1;
    }
  }
  if (window.console === undefined) {
    console = {
      log: $emptyFunction, info: $emptyFunction, warn: $emptyFunction, error: $emptyFunction
    };
  }

  $('button').click(function(e) {
    var $this = $(this)
      , $yourRps = $this.attr('id')
      , $play = play($yourRps);

    //$('button').removeClass();
    $this.addClass($play);
    $('.result').empty().html('<div class="animated fadeOutUp">' + $message + '</div>');
  });

  function selectionRps(player, rps) {
    console.log(player + 'Selection ==> ', rps);

    var $com = $('.'+player);
    $com.attr('src', 'assert/images/'+ player +'_'+ rps +'.png');

  }
  function play($yourSelection) {
    var $winners = {
      rock: ['scissors'],
      paper: ['rock'],
      scissors: ['paper']
    };

    var $cpuPlays = randomPlay($options);

    selectionRps('you', $yourSelection);

    if ($yourSelection === $cpuPlays) {
      $message = 'tied with ' + $yourSelection;
      $moveCount++;
      $tieCount++;
      recordScore('tie', $yourSelection, $cpuPlays);
      return 'tie';
    }

    // Check if CPU won
    if($winners[$cpuPlays].indexOf($yourSelection) > -1) {
      $message = $yourSelection + ' lost against ' + $cpuPlays;
      $moveCount++;
      $lossCount++;
      recordScore('loss', $yourSelection, $cpuPlays);
      return 'loss';
    }

    // Check if player won
    if($winners[$yourSelection].indexOf($cpuPlays) > -1) {
      $message = $yourSelection + ' beat ' + $cpuPlays;
      $moveCount++;
      $winCount++;
      recordScore('win', $yourSelection, $cpuPlays);
      return 'win';
    }
    return 'none';
  }

  function randomPlay($arr) {
    var cpuSelection = $arr[Math.floor(Math.random() * $arr.length)];
    selectionRps('com', cpuSelection);
    return cpuSelection;
  }

  function recordScore($type, $player, $cpu) {
    //$('aside').prepend('<div class="history-item ' + $type + '"><i class="fa fa-hand-' + $player + '-o"></i><i class="fa fa-hand-' + $cpu + '-o"></i></div>');
    $('.scoreboard .win span').text($winCount);
    $('.scoreboard .tie span').text($tieCount);
    $('.scoreboard .loss span').text($lossCount);
    $('.scoreboard .move span').text($moveCount);
  }
});