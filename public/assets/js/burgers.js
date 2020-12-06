// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $.ajax("/burgers", {
    type: "GET"
  }).then(function(data) {
    var not_devouredEl = $("#not_devoured");
    var devouredEl = $("#devoured");

    var burgers = data.burgers;
    var len = burgers.length;

    for (var i = 0; i < len; i++) {
      var new_elem =
        "<div class='row'><div class='col-md-9 text-center burgerName'>" +
        burgers[i].id + 
        ". "+burgers[i].burger_name + "</div><div class='col-md-3 text-center'>";

      if (burgers[i].devoured) {
        new_elem +=
        "<button class='btn delete-burger' data-id='" +
        burgers[i].id +
        "'>Delete</button></li>";
      } else {
        new_elem += 
        "<button class='btn devour-burger' data-id='" +
        burgers[i].id +
        "'>Devour</button></li>";
      }

      new_elem += "</button>";



      if (burgers[i].devoured) {
        devouredEl.append(new_elem);
      } else {
        not_devouredEl.append(new_elem);
      }
    }
  });

  $(document).on("click", ".devour-burger", function(event) {
    var id = $(this).data("id");

    var newDevourState = {
      devoured: 1
    };

    // Send the PUT request.
    $.ajax("/burgers/" + id, {
      type: "PUT",
      data: JSON.stringify(newDevourState),
      dataType:'json',
      contentType: 'application/json'
    }).then(function() {
      console.log("changed devour to true");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $("#burger-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
console.log("is this working")
    var newBurger = {
      burger_name: $("#burger_name")
        .val()
        .trim(),
      devoured: 0
    };

    // Send the POST request.
    $.ajax("/burgers", {
      type: "POST",
      data: JSON.stringify(newBurger),
      dataType:'json',
      contentType: 'application/json'
    }).then(function() {
      console.log("created new burger");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(document).on("click", ".delete-burger", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/burgers/" + id, {
      type: "DELETE"
    }).then(function() {
      console.log("deleted burger", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
