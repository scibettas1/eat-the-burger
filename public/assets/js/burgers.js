$(document).ready(function () {
//grabs the infor from the mysql database
  $.ajax("/burgers", {
    type: "GET"
  }).then(function (data) {

    var burgers = data.burgers;
    var length = burgers.length;

    for (var i = 0; i < length; i++) {

      var text = "Devour"
      var element = $("#not_devoured");
      var button = "btn-primary devour"

      if (burgers[i].devoured) {
        text = "Delete";
        element = $("#devoured");
        button = "btn-danger delete"
      }
//styles burgers and devour buttons and renders them to the page
    var burgerNew = "<div class='row'><div class='col-md-9 text-center burgerName'>"+burgers[i].id+". "+burgers[i].burger_name+"</div><div class='col-md-3 text-center'><button type='button' class='btn "+button+"' data-id='"+burgers[i].id+"'>"+text+"</button></div></div>"

      element.append(burgerNew)

    }
  })
});