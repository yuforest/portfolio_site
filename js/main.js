//文字を打つように表示
$(function() {
    var txt = "Yuta Omori"
    var txtArr = txt.split("");
    var count = 0;

    var txtCount = function() {
        var timer = setTimeout(txtCount, 250);
        $('.header-name').append(txtArr[count]);
        count++;
        if (count == txtArr.length) {
            clearTimeout(timer);
        }
    }

    txtCount();

});

$(function() {
    var txt = "Portfilio Site"
    var txtArr = txt.split("");
    var count = 0;

    var txtCount = function() {
        var timer = setTimeout(txtCount, 250);
        $('.header-lead').append(txtArr[count]);
        count++;
        if (count == txtArr.length) {
            clearTimeout(timer);
        }
    }

    txtCount();

});

//About欄をスライドで表示
$(function() {
  $(".slideEffect.animation-normal").css("opacity", "0");
  $(window).scroll(function (){
    $(".slideEffect.animation-normal").each(function(){
      var contentPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      var parcentage = $(this).text();

      if (scroll > contentPos - windowHeight + windowHeight*0.5/5){
        $(this).css({
          'opacity': '1'
        });

      } else {
        $(this).css({
          'opacity': '0'
        });
      }
    });
  });
});


//ハンバーガーメニューの表示
$(function() {
    $('.navToggle').click(function() {
        $(this).toggleClass('active');

        if ($(this).hasClass('active')) {
            $('.globalNavi').addClass('active');
            $('.headernav').addClass('active');
        } else {
            $('.globalNavi').removeClass('active');
            $('.headernav').addClass('active');
        }
    });
});

//ページ内リンクを滑らかにスクロール
$('a[href^="#"]').click(function() {
  //デフォルトのイベントをキャンセル
  event.preventDefault();
  //アンカーの値を取得
  var href = $(this).attr("href");

  //移動先となる要素を取得
  var target = $(href == "#" || href == "" ? 'html' : href);

  //移動先の位置を取得する
  var targetY = target.offset().top;
  console.log(targetY);
  //animateで移動
  $('body,html').animate({scrollTop: targetY}, 500, 'swing');
  return false;
});




var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var imgCnt = 25;          // 描画する画像の数
var objCnt = 1;
var aryImg = [];          // 画像の情報を格納
var aryObj = [];
var cvsw = 1200;          // canvasタグに指定したwidth
var cvsh = 700;           // canvasタグに指定したheight
var imgBaseSizeW = 15;    // 画像の基本サイズ横幅
var imgBaseSizeH = 18.5;  // 画像の基本サイズ立幅
var aspectMax = 1.5;      // アスペクト比計算時の最大値
var aspectMin = 0.5;      // アスペクト比計算時の最小値
var speedMax = 2;         // 落下速度の最大値
var speedMin = 0.5;       // 落下速度の最小値
var angleAdd = 4;         // 画像角度への加算値

function calculateSpeedX(){
  var calculatedSpeedX = Math.random()*20-10;
  if (calculatedSpeedX <= 0){
    return calculatedSpeedX -= 5;
  }else {
    return calculatedSpeedX += 5;
  }
}

// 画像の読み込み
var img = new Image();
// img.src = "http://www.otwo.jp/blog/demo/canvas/images/sakura.png";
img.src = "./images/sakura.png"
img.onload = flow_start;



// 画像のパラメーターを設定
function setImages(){
  var aspect = 0;
  for(var i = 0;i < imgCnt;i++){
    // 画像サイズに掛けるアスペクト比を0.5~1.5倍でランダムで生成
    aspect = Math.random()*(aspectMax-aspectMin)+aspectMin;
    aryImg.push({
      "posx": Math.random()*cvsw,   // 初期表示位置x
      "posy": Math.random()*cvsh,   // 初期表示位置y
      "sizew": imgBaseSizeW*aspect, // 画像の横幅
      "sizeh": imgBaseSizeH*aspect, // 画像の縦幅
      "speedy": Math.random()*(speedMax-speedMin)+speedMin, // 画像が落ちていく速度
      "angle": Math.random()*360,   // 角度
    });
  }
  for(var i = 0;i < objCnt;i++){
    aryObj.push({
      "posx": Math.random()*cvsw,   // 初期表示位置x
      "posy": Math.random()*cvsh,   // 初期表示位置y
      "sizew": 10, // 画像の横幅
      "sizeh": 5, // 画像の縦幅
      "speedy": Math.random()*(10-3)+speedMin, // 画像が落ちていく速度
      "speedx": Math.random()*20-10, //画像が移動する速度
      "angle": Math.random()*360,   // 角度
    });
  }

}

// 描画、パラメーターの更新
var idx = 0;
var cos = 0;
var sin = 0;
var rad = Math.PI / 180;

function flow(){
  ctx.clearRect(0,0,cvsw,cvsh);
  // for(idx = 0;idx < imgCnt;idx++){
  //   aryImg[idx].posy += aryImg[idx].speedy;
  //   aryImg[idx].angle += Math.random()*angleAdd;
  //   cos = Math.cos(aryImg[idx].angle * rad);
  //   sin = Math.sin(aryImg[idx].angle * rad);
  //   ctx.setTransform(cos, sin, sin, cos, aryImg[idx].posx, aryImg[idx].posy);
  //   ctx.drawImage(img, 0, 0 , aryImg[idx].sizew , aryImg[idx].sizeh);
  //   ctx.setTransform(1, 0, 0, 1, 0, 0);
  //   // 範囲外に描画された画像を上に戻す
  //   if(aryImg[idx].posy >= cvsh){
  //     aryImg[idx].posy = -aryImg[idx].sizeh;
  //   }
  // }

  for(idx = 0;idx < objCnt ;idx++){
    aryObj[idx].posy += aryObj[idx].speedy;
    aryObj[idx].posx += aryObj[idx].speedx;
    // aryObj[idx].angle += Math.random()*angleAdd;
    // cos = Math.cos(aryImg[idx].angle * rad);
    // sin = Math.sin(aryImg[idx].angle * rad);
    // ctx.setTransform(cos, sin, sin, cos, aryImg[idx].posx, aryImg[idx].posy);
    // ctx.drawImage(img, 0, 0 , aryImg[idx].sizew , aryImg[idx].sizeh);
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.beginPath();
    ctx.fillStyle = 'rgb(255, 255, 255)'
    ctx.arc(aryObj[idx].posx, aryObj[idx].posy, 1, 0, Math.PI*2, true);
    ctx.fill();
    // 範囲外に描画された画像を上に戻す
    if(aryObj[idx].posy >= cvsh){
      aryObj[idx].posy = -aryObj[idx].sizeh;
      aryObj[idx].speedx = Math.random()*(10-3)+speedMin;
      aryObj[idx].speedx = Math.random()*20-10
      // sleep(5000);

    }else if (aryObj[idx].posx >= cvsw+10){
      aryObj[idx].posx = Math.random()*cvsw;
      aryObj[idx].posy = -aryObj[idx].sizeh;
      aryObj[idx].speedx = Math.random()*(10-3)+speedMin;
      aryObj[idx].speedx = Math.random()*20-10
      // sleep(5000);

    }else if (aryObj[idx].posx <= -10){
      aryObj[idx].posx = Math.random()*cvsw;
      aryObj[idx].posy = -aryObj[idx].sizeh;
      aryObj[idx].speedx = Math.random()*(10-3)+speedMin;
      aryObj[idx].speedx = Math.random()*20-10
      // sleep(5000);
    }
  }




}

function flow_start(){
  setImages();
  setInterval(flow, 30);
}

$(function(){
  $('.effect div').css("opacity","0");
  $(window).scroll(function (){
    $(".effect").each(function(){
      var contentPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      var parcentage = $(this).text();

      if (scroll > contentPos - windowHeight + windowHeight*0.5/5){
        $(this).css("opacity","1");
        $(this).css("width", parcentage + "%");
      } else {
        $(this).css("opacity","0" );
        $(this).css("width", "0%");
      }
    });
  });
});
