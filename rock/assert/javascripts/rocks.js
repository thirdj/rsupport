/**
 * Remotecall
 *
 * IMPORTANT NOTE: This file is licensed only for use in providing the RSUPPORT services.
 *
 * @author Choi,jaehee(jaehee-choi@rsupport.com)
 * @copyright © 2015 RSUPPORT. All rights Reserved.
 *
 */

$(function(){

  var rps = window.rps || {};
  var $emptyFunction = function(){};

  rps.counts = rps.counts || {};
  rps.options = rps.options || {};
  rps.methods = rps.methods || {};
  rps.message;

  rps.counts = {
    win: 0, loss: 0, tied: 0, move: 0
  };
  rps.options.set = ['rock', 'paper', 'scissors'];
  rps.methods = {
    selectionRps: function(argPlayer, argRps) {
      console.log(argPlayer + 'Selection ==> ', argRps);

      var _com = $('.'+argPlayer);
      _com.attr('src', 'assert/images/'+ argPlayer +'_'+ argRps +'.png');
    },
    play: function(argYourSelection) {
      var _winners = {
        rock: ['scissors'],
        paper: ['rock'],
        scissors: ['paper']
      },
      _cpuPlays = this.randomPlay(rps.options.set);

      this.selectionRps('you', argYourSelection);

      if (argYourSelection === _cpuPlays) {
        rps.message = 'tied with ' + argYourSelection;
        rps.counts.move++;
        rps.counts.tied++;
        this.recordScore('tied', argYourSelection, _cpuPlays);
        return 'tied';
      }

      // Check if CPU won
      if(_winners[_cpuPlays].indexOf(argYourSelection) > -1) {
        rps.message = argYourSelection + ' lost against ' + _cpuPlays;
        rps.counts.move++;
        rps.counts.loss++;
        this.recordScore('loss', argYourSelection, _cpuPlays);
        return 'loss';
      }

      // Check if player won
      if(_winners[argYourSelection].indexOf(_cpuPlays) > -1) {
        rps.message = argYourSelection + ' beat ' + _cpuPlays;
        rps.counts.move++;
        rps.counts.win++;
        this.recordScore('win', argYourSelection, _cpuPlays);
        return 'win';
      }
      return 'none';
    },
    randomPlay: function(argArr) {
      var _cpuSelection = argArr[Math.floor(Math.random() * argArr.length)];
      this.selectionRps('com', _cpuSelection);
      return _cpuSelection;
    },
    recordScore: function(argType, argPlayer, argCpu) {
      //$('aside').prepend('<div class="history-item ' + $type + '"><i class="fa fa-hand-' + $player + '-o"></i><i class="fa fa-hand-' + $cpu + '-o"></i></div>');
      $('.scoreboard .'+ argType +' span').text(rps.counts[argType]);
    }
  };

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
      , _yourRps = $this.attr('id')
      , _play = rps.methods.play(_yourRps);

    $this.addClass(_play);
    $('.result').empty().html('<div class="animated fadeOutUp">' + rps.message + '</div>');
  });

});