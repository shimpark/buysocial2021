//media query matches value
var mqWeb = window.matchMedia("screen and (min-width: 1200px)");
var mqNotWeb = window.matchMedia("screen and (max-width: 1199.98px)");
var mqPad = window.matchMedia("screen and (max-width: 991.98px)");
var mqMobile = window.matchMedia("screen and (max-width: 576.98px)");

$(document).ready(function () {
    //navigation event
    if (mqWeb.matches) {
        pcNav();
    }
    if (mqNotWeb.matches) {
        moNav();
    }
});

$(window).on("resize", function () {
    //media query matches value
    var mqWeb = window.matchMedia("screen and (min-width: 1200px)");
    var mqNotWeb = window.matchMedia("screen and (max-width: 1199.98px)");
    var mqPad = window.matchMedia("screen and (max-width: 991.98px)");
    var mqMobile = window.matchMedia("screen and (max-width: 576.98px)");

    //navigation event
    if (mqWeb.matches) {
        pcNav();
    }
    if (mqNotWeb.matches) {
        moNav();
    }
});

//open modal event
function openModal(modalID) {
    var modalArea = $(".modal-area");
    var thisModal = $("#" + modalID)

    $("body").addClass("full");
    modalArea.not(thisModal).hide();
    thisModal.fadeIn(250);
}
//close modal event
function closeModal(modalID) {
    var thisModal = $("#" + modalID)

    $("body").removeClass("full");
    thisModal.fadeOut(250);
}
//close modal event when click backgrouond
function closeBackmodal() {
    var modalArea = $(".modal-area");
    var modalWrap = $("[class^=modal-wrap__]");

    modalArea.on("click", function (e) {
        if (!$(e.target).closest(modalWrap).length) {
            $("body").removeClass("full");
            $(this).fadeOut(150);
        }
    });
}

//navigation event
function pcNav() {
    $("nav").show();
    $(".nav-menu-list__mo").hide();

    $(".nav-tit").mouseover(function () {
        $(".btm-hd").show();
    });
    $("header").mouseleave(function () {
        $(".btm-hd").hide();
    });
}
function moNav() {
    $("nav").hide();
    $(".nav-tgl-btn__mo").removeClass("active");

    $(".nav-tgl-btn__mo").off("click").on("click", function (e) {
        e.preventDefault();

        $(this).toggleClass("active");
        $("body").toggleClass("full");
        $("nav").toggle();
    });
    $(".nav-tit__mo").off("click").on("click", function (e) {
        e.preventDefault();

        $(".nav-menu-list__mo").not($(this).next(".nav-menu-list__mo")).slideUp(150);
        $(this).next(".nav-menu-list__mo").slideToggle(150);
    });
}

//toggle item event
function tglItem() {
    var cmnTglTit = $(".faq-list-tit-box, .cmn-tgl-tit");
    var cmnTglCont = $(".faq-list-txt, .cmn-tgl-cont");

    cmnTglTit.on("click", function () {
        cmnTglTit.not($(this)).removeClass("active");
        $(this).toggleClass("active");

        cmnTglCont.not($(this).next(cmnTglCont)).slideUp(250);
        $(this).next(cmnTglCont).slideToggle(250);
    });
}

//tab menu event
function tabMenu() {
    var tabMenu = $(".tab-menu");

    tabMenu.on("click", function () {
        tabMenu.not($(this)).removeClass("active");
        $(this).addClass("active");
    });
}

//main movie button event
function mainMovBtnSlider() {
    $(".mov-btn-slider").slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false
    });
}
function changeMov(thisMovBtn) {
    var movID = $(thisMovBtn).attr("data-movid");

    $(".mov-btn").not($(thisMovBtn)).removeClass("active");
    $(thisMovBtn).addClass("active");

    $("#mov").attr("src", "https://www.youtube.com/embed/" + movID);
}

//main close banner event (0629 zoe 추가)
function closeMainBnr(thisBnr) {
    $(thisBnr).parents("[class^='bnr-item__']").hide();
}

//event share event
function tglShare() {
    var tglEvShareBtn = $("[class^='ev-share-tglbtn__']");
    var evShareList = $("[class^='ev-share-sns-list__']");

    tglEvShareBtn.on("click", function (e) {
        e.preventDefault();
        $(this).next(evShareList).toggle();
    });
}

//consume test event
function consumeTest() {
    var consumeQuizEx = $(".consume-quiz-ex");

    consumeQuizEx.on("click", function () {
        var consumeQuizItem = $(this).parents(".consume-quiz-item");
        var consumeQuizItemST = consumeQuizItem.offset().top - $(".top-hd").outerHeight();

        $("html, body").animate({
            scrollTop: consumeQuizItemST
        }, 350);
    });

    $(".consume-quiz-result-btn").hide();

    $(".consume-quiz-ex input[type=radio]").on("click", function () {
        var totalConsumeQuizCount = 12;
        var chkConsumeQuizCount = $("input[type=radio]:checked").length;
        var selectedConsumeQuizCount = totalConsumeQuizCount - chkConsumeQuizCount;

        $("#selectedCount").text(selectedConsumeQuizCount);
        if (selectedConsumeQuizCount == 0) {
            $(".consume-quiz-result-btn").show();
            $(".consume-quiz-count").hide();
        }
    });

    $(".consume-quiz-result-btn").on("click", function () {
        var totalConsumeQuizCount = 12;
        var chkConsumeQuizCount = $("input[type=radio]:checked").length;
        var selectedConsumeQuizCount = totalConsumeQuizCount - chkConsumeQuizCount;

        if (selectedConsumeQuizCount > 0) {
            alert("모든 질문에 대해 답변해주세요.");
            return;
        }

        $(this).unbind("click");
        $(this).bind("click", function () {
            alert("검사 중입니다.");
        });

        var formJson = $("#form1").serializeFormJSON();
        $("#p").val(GetJsonToEncParam(formJson));
        $("#form2").attr("action", "/BuySocialDayConsume/TestSave");
        $("#form2").submit();
    });
}

//add & delete keyword event
function addDelKeyword() {
    $(".apply-keyword-item .add-btn").hide();

    $(".apply-keyword-item .del-btn").on("click", function (e) {
        e.preventDefault();

        $(this).parents(".form-el-box").hide();
        $(this).parents(".form-el-box").siblings(".add-btn").show();
    });
    $(".apply-keyword-item .add-btn").on("click", function (e) {
        e.preventDefault();

        $(this).hide();
        $(this).siblings(".form-el-box").show();
        $(this).siblings(".btn").show();
    });
}

//counter event
function txtCounter() {
    $(".keyup50").on("keyup", function () {
        var content = $(this).val();
        var counter = $(this).next().find(".count");

        counter.html(content.length + "/50자");
        if (content.length > 50) {
            $(this).val(content.substring(0, 50));
            counter.html("(50/50자)");
        }
    });
    $(".keyup100").on("keyup", function () {
        var content = $(this).val();
        var counter = $(this).next().find(".count");

        counter.html(content.length + "/100자");
        if (content.length > 100) {
            $(this).val(content.substring(0, 100));
            counter.html("(100/100자)");
        }
    });
}

//upload file name event
function uploadFileName() {
    $(".form-file").find("input[type='file']").change(function (e) {
        var fileName = e.target.files[0].name;
        $(this).parents().siblings(".form-input-txt").val(fileName);
    });
}