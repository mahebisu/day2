// 最初は結果は消えている
$(".kekka_one").hide();

//今日の日付データを変数に格納
//変数は"today"とする
var today=new Date(); 

//年・月・日・曜日を取得
var year = today.getFullYear();
var month = today.getMonth()+1;
var week = today.getDay();
var day = today.getDate();
var week_ja= new Array("日","月","火","水","木","金","土");

// 各サウナに行った回数を計測する
const kaisu = [0,0,0,0,0,0];

// localstoregeのサウナ回数を呼び出す

    for(let i=0; i<6; i++){

        let snum = "s"+ i + "num";
        if (localStorage.getItem(snum)=== null) {
            kaisu[i] = 0;

        } else {
            kaisu[i] = localStorage.getItem(snum) ;

        };

        console.log("for内i回目の取得訪問回数は " + kaisu[i]);

        // 本当は下記の処理でサウナ訪問回数を変更したいができない
        // $(`.doreni_kaisu_num:eq(${i})`).text(kaisu[i]);
        $(".doreni_kaisu_num").eq(i).text(kaisu[i]);

    };
    console.log("リロード時の各回数は "+kaisu);


// localstrageに保存されているサウナの訪問履歴をJSONで記録する
    let saunarireki = []


    if (localStorage.getItem("saunarireki_key")=== null) {

        // 訪問履歴がない場合は履歴表を隠す
        $(".rireki").hide();

    } else {
        saunarireki = JSON.parse(localStorage.getItem("saunarireki_key") );
        console.log(saunarireki);

        for (let k = 0; k < saunarireki.length; k++) {

                $(".rireki_add").prepend(
                    `
                    <dt>${saunarireki[k].nichiji}</dt>
                    <dd>${saunarireki[k].basho}</dd>
                    `
                );
                
        }

    };


// 行くサウナを決めて、回数を１つ増やす

    // どこに行くかを決める
    var ransu1 = Math.random() * 6;
    var ransu2 = Math.floor(ransu1);
    console.log("決まった乱数は "+ransu2);

    if (ransu2 === 0) {
        var mokutekichi = "三越湯　サウナ";

    } else if(ransu2 === 1){
        var mokutekichi = "北欧　サウナ";

    }else if(ransu2 === 2){
        var mokutekichi = "吉の湯　サウナ";
        
    }else if(ransu2 === 3){
        var mokutekichi = "かるまる　サウナ";
        
    }else if(ransu2 === 4){
        var mokutekichi = "黄金湯　サウナ";
        
    }else if(ransu2 === 5){
        var mokutekichi = "アダムアンドイブ　サウナ";
        
    };
    console.log("目的地は "+mokutekichi);

// kekkahyojiの定義
    function kekkahyoji(){

        if (ransu2 === 0) {
            $(".kekka1").fadeIn(1000);
        } else if(ransu2 === 1){
            $(".kekka2").fadeIn(1000);
        }else if(ransu2 === 2){
            $(".kekka3").fadeIn(1000);
        }else if(ransu2 === 3){
            $(".kekka4").fadeIn(1000);
        }else if(ransu2 === 4){
            $(".kekka5").fadeIn(1000);
        }else if(ransu2 === 5){
            $(".kekka6").fadeIn(1000);
        };    

    };

// fuction snumplusの定義
    function snumplus(j){

        let snum = "s"+j+"num";

        if (localStorage.getItem(snum)=== null) {
            localStorage.setItem(snum,0);
        } else {
            kaisu[j] = localStorage.getItem(snum) ;
        };

        kaisu[j] ++;
        localStorage.setItem(snum,kaisu[j]);
        
        // 訪問履歴をJSONで記録する
        saunarireki.push(
            { "nichiji":`${month}月${day}日 (${week_ja[week]})`
            ,"basho" : mokutekichi.slice( 0, -4 ) });
        
        localStorage.setItem("saunarireki_key", JSON.stringify(saunarireki));    

    }

// クリックイベント
    $(document).on("click","#btn_id",function(){
        var imadoko = $("#naka").val();
        console.log(imadoko);
        var maplink = "https://www.google.com/maps/dir/?api=1&origin=" + imadoko + "&destination=" + mokutekichi + "&travelmode=transit&hl=ja";

        $("#nyuryoku_id , #doreni_id").slideUp(1000);
        $("#rireki").slideUp(200);

        $(".doreni_pic2 p").prepend(month+"月"+day+"日は<br>");

        // 定義したkekkahyoji functionを実行
        kekkahyoji();
    
        $(".kekka_a").attr("href",maplink);
        console.log("飛ぶリンクは"+maplink)

        // 定義したsnumplus funcitonを使う
        snumplus(ransu2);

    });

// ルーレット効果


    const ruretto = function ruretto(){
        let ransu_r =  Math.floor(Math.random() * 6);

        $(".doreni_pic").eq(ransu_r).css("border","solid 10px #fecc00");

        let modosu = function modosu(){
            $(".doreni_pic").eq(ransu_r).css("border","solid 6px #003580");
        };
    
        setTimeout(modosu,500);
        
    };

    setInterval(ruretto,500);
    setInterval(ruretto,1000);
    setInterval(ruretto,200);
