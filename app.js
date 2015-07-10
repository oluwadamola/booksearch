$(document).ready(function () // only begin once page has loaded
{ 
    $("#txtBookSearch").autocomplete(
    {
        source: function (request, response) {
            $.ajax({
                url: "https://www.googleapis.com/books/v1/volumes?printType=books&q="+ encodeURIComponent(request.term),
                dataType: "json",
                data: "searchterm=" + request.term,
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.Name,
                            value: item.Name
                        };
                    }));
                }});
        },
        minLength: 2,
        select: function (event, ui) {
            log(ui.item ? "Selected: " + ui.item.label : "Nothing selected, input was " + this.value);
        },
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });
});
