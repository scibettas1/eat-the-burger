$(document).ready(function () {
  //grabs the infor from the mysql database
  $(function () {
    $.ajax("/burgers", {
      type: "GET"
    }).then(function (data) {
      var devouredEl = $("#devoured");
      var not_devouredEl = $("#not_devoured");

      var burgers = data.burgers;
      var len = burgers.length;

      for (var i = 0; i < len; i++) {
        var new_elem =
          "<div class='row'><div class='col-md-9 text-center burgerName'>" +
          burgers[i].id +
          ". " + burgers[i].burger_name +
          "</div><div class='col-md-3 text-center'><button class='btn btn-primary devour' data-id='" +
          burgers[i].id +
          "' data='" +
          burgers[i].devoured +
          "'>";

        if (burgers[i].devoured) {
          new_elem += "Delete";
        } else {
          new_elem += "Devour";
        }

        new_elem += "</button>";

        /* new_elem +=
          "<button class='' data-id='" +
          burgers[i].id +
          "'>DELETE!</button></li>"; */

        if (burgers[i].devoured) {
          devouredEl.append(new_elem);
        } else {
          not_devouredEl.append(new_elem);
        }
      }
    });
    $(document).on("click", ".devour", function (event) {
      var id = $(this).data("id");

      var newDevourState = {
        devoured: 1
      };

      // Send the PUT request.
      $.ajax("/burgers/" + id, {
        type: "PUT",
        data: JSON.stringify(newDevourState),
        dataType: 'json',
        contentType: 'application/json'
      }).then(function () {
        console.log("changed devour to true");
        // Reload the page to get the updated list
        location.reload();
      });
    });

    $(".create-form").on("submit", function (event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();

      var newBurger = {
        name: $("#burger_name")
          .val()
          .trim(),
        devoured: 0
      };
      
      // Send the POST request.
      $.ajax("/burgers", {
        type: "POST",
        data: JSON.stringify(newBurger),
        dataType: 'json',
        contentType: 'application/json'
      }).then(function () {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      });
    });

    $(document).on("click", ".delete-burger", function (event) {
      var id = $(this).data("id");

      // Send the DELETE request.
      $.ajax("/burger/" + id, {
        type: "DELETE"
      }).then(function () {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      });
    });
  });

});






  /* $.ajax("/burgers", {
    type: "GET"
  }).then(function (data) {

    var burgers = data.burgers;
    var length = burgers.length;

    for (var i = 0; i < length; i++) {

      var text = "Devour"
      var element = $("#not_devoured");
      var button = "btn-primary"

      if (burgers[i].devoured) {
        text = "Delete";
        element = $("#devoured");
        button = "btn-danger"
      }
      //styles burgers and devour buttons and renders them to the page
      var burgerNew = "<div class='row'><div class='col-md-9 text-center burgerName'>" + burgers[i].id + ". " + burgers[i].burger_name + "</div><div class='col-md-3 text-center'><button type='button' class='btn " + button + "' data-id='" + burgers[i].id + "'>" + text + "</button></div></div>"

      element.append(burgerNew)

    } */








