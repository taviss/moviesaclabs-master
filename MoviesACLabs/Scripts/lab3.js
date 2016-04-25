
$("#movie_add").click(function () {
    var mv = $("#movie_name").val();
    $("#movie_list").append("<li>" + mv + " <button class='movie_delete'>Delete</button></li>");
    $.ajax({
        type: "POST",
        url: "save.php",
        data: mv,

        success: function () {
            console.log("Test");
        }
    });
})

$(document).on("click", ".movie_delete", function () {
    $(this).parent().remove();
});

$("#movie_form").submit(function () {

    return false;
})

$("#load").click(function () {
    $.ajax({
        url: "Data/movies.txt",
        dataType: "text",
        success: function (data) {
            var darr = data.split("'");
            console.log(darr);
            console.log(["test1", "test2"]);
            $.each(darr, function (value) {
                $("#movie_list").append("<li>" + value + " <button class='movie_delete'>Delete</button></li>");
            });
        }
    });
});