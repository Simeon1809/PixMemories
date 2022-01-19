$(function () {
    console.log("document ready");
    $(document).on("click", ".edit-product-button", function () {
        console.log("you just clicked button number: " + $(this).val());

        // store the product Id number
        var productID = $(this).val();

        $.ajax({
            type: 'json',
            data: {
                "id": productID
            },
            url: '/Product/ShowOneProductJSON',
            success: function (data) {
                console.log(data)
                //Fill in the input fields in the modal

                $("#modal-input-id").val(data.id);
                $("#modal-input-name").val(data.name);
                $("#modal-input-price").val(data.price);
                $("#modal-input-description").val(data.description);
            }

        })
    });

    $("#save-button").click(function () {

        var Product = {
            "Id": $("#modal-input-id").val(),
            "Name": $("#modal-input-name").val(),
            "Price": $("#modal-input-price").val(),
            "Description": $("#modal-input-description").val(),
        };
        console.log("saves...");
        console.log(Product);

        $.ajax({
            type: 'json',
            data: Product,
            url: '/Product/ProcessEditReturnPartial',
            success: function (data) {
                console.log(data)
                //Save the updated product record in the database using controller

                $("#card-number-" + Product.Id).html(data).hide().fadeIn(2000);
            }

        })
    });
})