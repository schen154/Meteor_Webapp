Template.select.rendered = function() {
    $(".select").chosen({
        display_disabled_options: true,
        display_selected_options: true,
        disable_search_threshold: 10,
        no_results_text: "Oops, nothing found!",
        height: "25%",
        width: "35%"
    });
};

Template.results.rendered = function() {
    $('#view').on('click', function () {
        var $btn = $(this).button('loading')
    });

    $('#copy').on('click', function () {
        var $btn = $(this).button('loading')
    });

    $('#error').on('click', function () {
        var $btn = $(this).button('loading')
    })
};

Template.monitor.rendered = function(){

};



Template.monitor.rendered = function() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    var state = 'resume';
    $('#button_pause').on('click', function () {
        if(state=='resume'){
            state = 'pause';
            $(this.i).attr('class', "fa fa-play");
        }
        else if(state=='pause'){
            state = 'resume';
            $(this.i).attr('class', "fa fa-pause");
        }
    });
}
