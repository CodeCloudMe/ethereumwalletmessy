'use strict';

angular.module('copayApp.controllers').controller('sidebarController',
  function($rootScope, $timeout, lodash, profileService, configService, go, isMobile, isCordova) {
    var self = this;
    self.isWindowsPhoneApp = isMobile.Windows() && isCordova;
    self.walletSelection = false;

    // wallet list change
    $rootScope.$on('Local/WalletListUpdated', function(event) {
      self.walletSelection = false;
      self.setWallets();
    });

    $rootScope.$on('Local/ColorUpdated', function(event) {
      self.setWallets();
    });

    $rootScope.$on('Local/AliasUpdated', function(event) {
      self.setWallets();
    });


    self.signout = function() {
      profileService.signout();
    };

    self.switchWallet = function(selectedWalletId, currentWalletId) {
      if (selectedWalletId == currentWalletId) return;
      self.walletSelection = false;
      profileService.setAndStoreFocus(selectedWalletId, function() {});
    };

    self.toggleWalletSelection = function() {
      self.walletSelection = !self.walletSelection;
      if (!self.walletSelection) return;
      self.setWallets();
    };

    self.setWallets = function() {
      if (!profileService.profile) return;

      var config = configService.getSync();
      config.colorFor = config.colorFor || {};
      config.aliasFor = config.aliasFor || {};

      // Sanitize empty wallets (fixed in BWC 1.8.1, and auto fixed when wallets completes)
      var credentials = lodash.filter(profileService.profile.credentials, 'walletName');
      var ret = lodash.map(credentials, function(c) {
        return {
          m: c.m,
          n: c.n,
          name: config.aliasFor[c.walletId] || c.walletName,
          id: c.walletId,
          color: config.colorFor[c.walletId] || '#4A90E2',
        };
      });

      self.wallets = lodash.sortBy(ret, 'name');
    };

    self.setWallets();


    function sideStars() {
         "use strict";

         var canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d'),
            w = canvas.width = window.innerWidth,
            h = canvas.height = window.innerHeight,

            hue = 217,
            stars = [],
            count = 0,
            maxStars = 1400;

         // Thanks @jackrugile for the performance tip! http://codepen.io/jackrugile/pen/BjBGoM
         // Cache gradient
         var canvas2 = document.createElement('canvas'),
            ctx2 = canvas2.getContext('2d');
         canvas2.width = 100;
         canvas2.height = 100;
         var half = canvas2.width / 2,
            gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
         gradient2.addColorStop(0.025, '#fff');
         gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
         gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
         gradient2.addColorStop(1, 'transparent');

         ctx2.fillStyle = gradient2;
         ctx2.beginPath();
         ctx2.arc(half, half, half, 0, Math.PI * 2);
         ctx2.fill();

         // End cache

         function random(min, max) {
            if (arguments.length < 2) {
               max = min;
               min = 0;
            }

            if (min > max) {
               var hold = max;
               max = min;
               min = hold;
            }

            return Math.floor(Math.random() * (max - min + 1)) + min;
         }

         function maxOrbit(x, y) {
            var max = Math.max(x, y),
               diameter = Math.round(Math.sqrt(max * max + max * max));
            return diameter / 2;
         }

         var Star = function() {

            this.orbitRadius = random(maxOrbit(w, h));
            this.radius = random(60, this.orbitRadius) / 12;
            this.orbitX = w / 2;
            this.orbitY = h / 2;
            this.timePassed = random(0, maxStars);
            this.speed = random(this.orbitRadius) / 50000;
            this.alpha = random(2, 10) / 10;

            count++;
            stars[count] = this;
         }

         Star.prototype.draw = function() {
            var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
               y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
               twinkle = random(10);

            if (twinkle === 1 && this.alpha > 0) {
               this.alpha -= 0.05;
            } else if (twinkle === 2 && this.alpha < 1) {
               this.alpha += 0.05;
            }

            ctx.globalAlpha = this.alpha;
            ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
            this.timePassed += this.speed;
         }

         for (var i = 0; i < maxStars; i++) {
            new Star();
         }

         function animation() {
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 0.8;
            ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
            ctx.fillRect(0, 0, w, h)

            ctx.globalCompositeOperation = 'lighter';
            for (var i = 1, l = stars.length; i < l; i++) {
               stars[i].draw();
            };

            window.requestAnimationFrame(animation);
         }

         animation();
      };

      sideStars();

      

  });
