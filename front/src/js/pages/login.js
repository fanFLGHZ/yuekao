define(["mui"], function(mui) {
    let btn = document.querySelector(".btn");

    function init() {
        mui.init();
        bindClick();
    }

    function bindClick() {
        btn.addEventListener("tap", addEvent);
    }

    function addEvent() {
        let userVal = document.querySelector("#user").value.trim();
        let inpTVal = document.querySelector(".inpT").value.trim();
        let inpCVal = document.querySelector(".inpC").value.trim();
        console.log(userVal, inpTVal, inpCVal)
        mui.ajax("/app/addData", {
            data: {
                name: userVal,
                type: inpTVal,
                jie: inpCVal
            },
            type: "post",
            success: function(data) {
                alert(data.msg);

            }
        });
    }
    init();
});