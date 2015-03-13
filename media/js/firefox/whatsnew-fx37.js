/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

;(function($) {

    'use strict';

    var $main = $('main');
    var $container = $('.tab-panel');
    var $smsForm = $('#sms-form');
    var $smsFormHeading = $('#send-sms > .inner-wrapper > h3');
    var $smsThankYou = $('.sms-form-thank-you');
    var $smsInput = $('#number');

    var $emailForm = $('#newsletter-form');
    var $emailThankYou = $('#newsletter-form-thankyou');
    var $emailInput = $('#id_email');

    $('.toggle > ul > li > a').on('click', function(e) {
        e.preventDefault();
        var id = e.target.id;

        // set the min height of the container should the newsletter
        // have been expanded to avoid content jump.
        $container.css('min-height', $container.height());

        if (id === 'tab-sms') {
            $main.attr('data-active', 'sms');
        } else if (id = 'tab-email') {
            $main.attr('data-active', 'email');
        }
    });

    $smsForm.on('submit', function(e) {
        e.preventDefault();
        var action = $smsForm.attr('action');
        $.post(action, $smsForm.serialize())
            .done(function(data) {
                // TODO make this fancier like email one
                if (data.success) {
                    $smsFormHeading.hide();
                    $smsForm.hide();
                    $smsThankYou.show();
                } else if (data.error) {
                    $smsForm.find('.error').html(data.error).show();
                }
            })
            .fail(function() {
                $smsForm.find('.error').show();
            });
    });

    $smsThankYou.find('.send-another').on('click', function(e) {
        e.preventDefault();
        $smsInput.val('');
        $smsThankYou.hide();
        $smsFormHeading.show();
        $smsForm.show();
        $smsInput.focus();
    });

    $emailThankYou.find('.send-another').on('click', function(e) {
        e.preventDefault();
        $emailInput.val('');
        $emailThankYou.hide();
        $emailForm.show();
        $emailInput.focus();
    })


})(window.jQuery);
