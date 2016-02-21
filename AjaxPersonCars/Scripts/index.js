$(function () {

    $.get('/home/getallpeople', function(people) {
        people.forEach(addPersonToTable);
    });

    $("#addPerson").on('click', function() {
        $(".addPersonModal").modal();
    });

    $(".savePerson").on('click', function() {
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();

        $.post("/home/addperson", {
                firstName: firstName,
                lastName: lastName
            }, function(person) {
                addPersonToTable(person);
                $(".addPersonModal").modal('hide');
                clearModals();
        });
    });

    function addPersonToTable(person) {
        var html = new EJS({ url: '/content/templates/person-row.html' }).render(person);
        var row = $(html);
        $("#personsTable").append(row);
    }
    
    $("#personsTable").on('click', '.addCar', function () {
        var personId = $(this).data('personid');
        $(".addCarModal").data('personid', personId);
        $(".addCarModal").modal();
    });

    $(".saveCar").on('click', function () {
        var personId = $(".addCarModal").data('personid');
        var make = $("#make").val();
        var model = $("#model").val();
        var year = $("#year").val();

        $.post("/home/addcar", {
            personId: personId,
            make: make,
            model: model,
            year: year
        }, function() {
            $(".addCarModal").modal('hide');
            clearModals();
        });
    });

    $("#personsTable").on('click', '.viewCars', function() {
        var personId = $(this).data('personid');
        $.post("/home/getcarsforperson", { personId: personId }, function (cars) {
            $(".car-table tr:gt(0)").remove();
            var template = new EJS({ url: '/content/templates/car-row.html' });
            cars.forEach(function(car) {
                var html = template.render(car);
                var row = $(html);
                $(".car-table").append(row);
            });

            $(".viewCarsModal").modal();
        });
    });

    $("#personsTable").on('click', '.deletePerson', function() {
        var personId = $(this).data('personid');
        var row = $(this).parent().parent();
        $.post("/home/deleteperson", { personId: personId }, function() {
            row.remove();
        });
    });

    function clearModals() {
        $(".modal input").val('');
    }

});