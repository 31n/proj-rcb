const image = new Image();
var canvas = document.getElementById('preview');
var ctx = canvas.getContext('2d');

function previewImage(obj) {
    var fileReader = new FileReader();
    fileReader.onload = (function () {

        // var image = new Image();
        image.src = fileReader.result;
        image.onload = (function () {
            // canvas.width = image.width;
            // canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);
            
        });
    });
    fileReader.readAsDataURL(obj.files[0]);
}

function setBG() {
    ctx.beginPath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 890, canvas.height);
}

function setFrame(member) {
    const frame = new Image();
    switch (member) {
        case "103kaho":
            frame.src = "https://pbs.twimg.com/media/FwqR7kzaEAU6NFL.png";
            break;
        case "103tsuzuri":
            frame.src = "https://pbs.twimg.com/media/F_EGWVCWwAA2p-h.png";
            break;
        case "103kozue":
            frame.src = "https://pbs.twimg.com/media/Fyl3vp7WIAIJRRv.png";
            break;
        case "103rurino":
            frame.src = "https://pbs.twimg.com/media/F4yaNb9XsAAHbE-.png";
            break;
        case "103megumi":
        case "103sayaka":
            frame.src = "https://img.biz.ne.jp/info/2005301_if1.png";
            break;
    }
    frame.onload = function () {
        ctx.drawImage(frame, 0, 0, 890, 501);
    }
}

const slider = document.getElementById('zoomSlider');
const cb = document.getElementById("showFrame");
const mb = document.getElementById("member");

slider.value = 1;
// 倍率の最小・最大値
slider.min = 0.01;
slider.max = 1.5;
// 粒度
slider.step = 'any';

// スライダーが動いたら拡大・縮小して再描画する
slider.addEventListener('input', e => {
    // 一旦クリア 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 倍率変更
    const scale = e.target.value;
    ctx.scale(scale, scale);
    console.log(scale);
    // 再描画
    ctx.drawImage(image, 0, 0);
    // 変換マトリクスを元に戻す
    ctx.scale(1 / scale, 1 / scale);

    if (cb.checked) {
        setFrame(mb.value);
    }
});

mb.addEventListener('change', e => {
    if (cb.checked) {
        setFrame(mb.value);
    }
});

function Exp() {
    var png = canvas.toDataURL();
    document.getElementById('out').src = png;
}

