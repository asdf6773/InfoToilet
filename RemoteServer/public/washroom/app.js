$(document).ready(function() {
    $("#file").on("change", function(e) {
        var files = $(this)[0].files;
        var fileName = e.target.value.split('\\').pop();
        $("#label_span").text(fileName);
    })
})
