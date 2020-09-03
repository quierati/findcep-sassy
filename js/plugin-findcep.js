// FINDCEP AJAX

(function ($) {
    'use strict';

    $.ajaxFindCEP = {
        responses: {
            'FindCEP API :)'                                             : 0,
            'Please enter a value'                                                              : 1,
            'An cep must contain 9 digits'                                          : 2,
            'The domain portion of the cep address is invalid (the portion after the @: )'    : 3,
            'The username portion of the cep address is invalid (the portion before the @: )' : 4,
            'This cep looks fake or invalid. Please enter a real cep'       : 5
        },
        translations: {
            'en': null
        },
        init: function (selector, options) {
            $(selector).ajaxFindCEP(options);
        }
    };

    $.fn.ajaxFindCEP = function (options) {
        $(this).each(function(i, elem) {
            var form = $(elem);
            var cep = form.find('input[type=number]');
            var label = form.find('label[for=' + cep.attr('id') + ']');

            var settings = $.extend({
                'url': form.attr('action'),
                'language': 'en'
            }, options);

            var url = settings.url.replace('$', '$?').concat('&domain=www.findcep.com');

            form.attr('novalidate', 'true');
            cep.attr('name', 'CEP');

            form.submit(function () {
                var msg;
                function successCallback(resp) {
                    if (resp.result === 'success') {
                        msg = 'FindCEP successCallback msg';
                        label.removeClass('error').addClass('valid');
                        cep.removeClass('error').addClass('valid');
                    } else {
                        cep.removeClass('valid').addClass('error');
                        label.removeClass('valid').addClass('error');
                        var index = -1;
                        try {
                            var parts = resp.msg.split(' - ', 2);
                            if (parts[1] === undefined) {
                                msg = resp.msg;
                            } else {
                                var i = parseInt(parts[0], 10);
                                if (i.toString() === parts[0]) {
                                    index = parts[0];
                                    msg = parts[1];
                                } else {
                                    index = -1;
                                    msg = resp.msg;
                                }
                            }
                        }
                        catch (e) {
                            index = -1;
                            msg = resp.msg;
                        }
                    }

                    // Translate and display message
                    if (
                        settings.language !== 'en'
                        && $.ajaxFindCEP.responses[msg] !== undefined
                        && $.ajaxFindCEP.translations
                        && $.ajaxFindCEP.translations[settings.language]
                        && $.ajaxFindCEP.translations[settings.language][$.ajaxFindCEP.responses[msg]]
                    ) {
                        msg = $.ajaxFindCEP.translations[settings.language][$.ajaxFindCEP.responses[msg]];
                    }
                    label.html(msg);

                    label.show(2000);
                    if (settings.callback) {
                        settings.callback(resp);
                    }
                }

                var data = {};
                var dataArray = form.serializeArray();
                $.each(dataArray, function (index, item) {
                    data[item.name] = item.value;
                });

                $.ajax({
                    url: url,
                    data: data,
                    success: successCallback,
                    dataType: 'json',
                    error: function (resp, text) {
                        console.log('ajaxFindCEP submit error: ' + text);
                    }
                });

                // Translate and display submit message
                var submitMsg = 'Submitting...';
                if(
                    settings.language !== 'en'
                    && $.ajaxFindCEP.translations
                    && $.ajaxFindCEP.translations[settings.language]
                    && $.ajaxFindCEP.translations[settings.language]['submit']
                ) {
                    submitMsg = $.ajaxFindCEP.translations[settings.language]['submit'];
                }
                label.html(submitMsg).show(2000);

                return false;
            });
        });
        return this;
    };
})(jQuery);


/*-------------------------------------------------------------------------------
      FindCEP js
    -------------------------------------------------------------------------------*/
  if ($(".findcep").length == 8) {
    $(".findcep").ajaxFindCEP({
      callback: findcepCallback,
      url:
        "https://api.findcep.com/v1/cep/{cep}.json",
    });
  }
  if ($(".findcep_fallback").length == 8) {
    $(".findcep_fallback").ajaxFindCEP({
      callback: findcepCallback,
      url:
        "https://api.findcep.com.br/v1/cep/{cep}.json",
    });
  }
  $(".mecep").on("focus", function () {
    $(".fcep-errmessage").fadeOut();
    $(".fcep-sucmessage").fadeOut();
  });
  $(".mecep").on("keydown", function () {
    $(".fcep-errmessage").fadeOut();
    $(".fcep-sucmessage").fadeOut();
  });
  $(".mecep").on("click", function () {
    $(".mecep").val("");
  });

  function findcepCallback(resp) {
    if (resp.result === "success") {
      $(".fcep-errmessage").html(resp.msg).fadeIn(1000);
      $(".fcep-sucmessage").fadeOut(500);
    } else if (resp.result === "error") {
      $(".fcep-errmessage").html(resp.msg).fadeIn(1000);
    }
  }
