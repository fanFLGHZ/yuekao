/*
 * @Author: mikey.樊国庆 
 * @Date: 2019-04-08 10:07:10 
 * @Last Modified by: mikey.樊国庆
 * @Last Modified time: 2019-04-08 12:12:15
 */
define(["mui", "BScroll"], function(mui, BScroll) {
    let BS = null;
    let [a, b] = [
        [],
        []
    ];
    let skip;
    let limit;
    let page = 1; //页码
    let box = [...document.querySelectorAll(".kk>div")];
    let up = document.querySelector(".up");
    let fa = document.querySelector(".fa");

    function init() {
        BS = new BScroll(".content");
        mui.init();
        render(0, 10);
        addEvent();
    }

    function render(s, l) {
        mui.ajax("/app/getData", {
            data: {
                skip: s,
                limit: l
            },
            type: "post",
            success: function(data) {
                if (data.code === 1) {
                    renderData(waterFull(data.data));
                }
            }
        })
    }

    function renderData(data) {
        data.forEach((ite, i) => {
            box[i].innerHTML = ite.map((val, index) => {
                if (index < box[i].id) {
                    return;
                }
                box[i].id = index + 1;
                return `<dl>
                            <dt><img src="${val.img}" alt="" style="height:${val.h}px"></dt>
                            <dd>
                                <h6>${val.title}</h6>
                                <p>${val.jie}<span class="type">${val.type}</span></p>
                            </dd>
                        </dl>`;
            }).join("");
        });
        BS.refresh();
    }

    function waterFull(data) {
        data.forEach(item => {
            if (!a.length) {
                a.push(item);
                return;
            } else if (!b.length) {
                b.push(item);
            }
            if (a.reduce((s, l) => s + l.h, 0) < b.reduce((s, l) => s + l.h, 0)) {
                a.push(item);
            } else {
                b.push(item);
            }
        });
        return [a, b];
    }
    //事件绑定
    function addEvent() {
        BS.on("scroll", function() {
            if (this.y <= this.maxScrollY) {
                up.innerHTML = "释放加载";
            } else {
                up.innerHTML = "上拉加载";
            }
        });
        BS.on("scrollEnd", function() {
            if (up.innerHTML == "释放加载") {
                page++;
                skip = (page - 1) * 10;
                limit = 10;
                render(skip, limit);
            }
        });
        //发布
        fa.addEventListener("tap", faClick);
    }

    function faClick() {
        location.href = "./js/souce/login.html";
    }
    init();
});