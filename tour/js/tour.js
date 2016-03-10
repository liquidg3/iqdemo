(function ($) {

    if (!$) {
        throw new Error('We need jQuery to work... yo.');
    }

    var endpoint = 'tour/data/reps.json',
        hash = window.location.hash || '#default',
        vslides = {
            navTransitionDelay: 1000,
            navTransitionDelays: [2000],
            showDelay: 500,
            //hotspotClass: 'hvr-grow-shadow',
            sets: [
                {slides: ['tour/slides/introduction/from-the-ground-up.html','tour/slides/introduction/iq-is-built-differently.html','tour/slides/introduction/everything-a-merchant-needs.html']},
                {element:  '#bar-pie', slides: ['tour/slides/graphs/check-your-daily-activity.html']},
                {element:  '#sales-rep', slides: ['tour/slides/get-started/get-started.html']}
            ]
        };

    $(document).ready(function () {

        //drop in content
        $.get(endpoint).then(function (data) {

            var rep = data[hash.substr(1)];

            if (!rep) {
                alert('Invalid URL');
                return;
            }

            populate_rep(rep);

            //wait a sec for the image to load (I should really listen to the onload of the image element, but
            //i doubt anyone will notice on the front end i cheated =)
            setTimeout(function () {

                $('.salesContact').animate({opacity: 1});

            }, 1000);

        }, function (err) {
            alert('Could not find ' + endpoint);
        });

        //configure some of them vslides
        $('body').vslides(vslides).start();

    });


    function populate_rep(rep) {

        for (var key in rep) {
            var value = rep[key],
                selector = '.rep_' + key;

            $(selector).html(value);

        }

        //special for email and image
        if (rep.email) {
            $('.rep_email').attr('href', 'mailto:' + rep.email);
        }

        if (rep.photo) {
            $('.rep_photo').attr('src', rep.photo);
        }


    }


})(typeof jQuery !== 'undefined' ? jQuery : false);