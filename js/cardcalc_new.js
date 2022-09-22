function preventDefaults(e){
    e.preventDefault()
    e.stopPropagation()
}

function highlight(e){
    dropArea.classList.add('highlight')
}

function unhighlight(e){
    dropArea.classList.remove('active')
}

function handleDrop(e){
    let dt = e.dataTransfer
    let files = dt.files
    handleFiles(files)
}

function handleFiles(files){
    files = [...files]
    files.forEach(previewFile)
}

function previewFile(file){
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = async function() {
        let img = document.createElement('img');
        img.src = reader.result;
        img.setAttribute('filename',file.name);
        document.getElementById('gallery').appendChild(img);
    }
}

let loadedScript = []
async function loadJavascript(name){
    if(!loadedScript.includes(name)){
        let scriptElement = document.createElement('script');
        scriptElement.src = `${name}.js`;
        document.head.appendChild(scriptElement);

        await new Promise(r => {
            scriptElement.onload = r
            loadedScript.push(name);
        })
    }
}

function wideCheck(){
    let firstImg = document.querySelectorAll('#gallery > img')[0];

    let canvas = document.createElement('canvas');
    canvas.width = firstImg.naturalWidth;
    canvas.height = firstImg.naturalHeight;
    canvas.getContext('2d').drawImage(firstImg, 0, 0, firstImg.naturalWidth, firstImg.naturalHeight);

    let topPixelData = canvas.getContext('2d').getImageData(firstImg.naturalWidth/2, 0,                         1, 10).data;
    let botPixelData = canvas.getContext('2d').getImageData(firstImg.naturalWidth/2, firstImg.naturalHeight-10, 1, 10).data;

    let topPixel = 0;
    let botPixel = 0;
    for (let i = 0, n = topPixelData.length; i < n; i += 4) {
        topPixel += topPixelData[i+0] + topPixelData[i+1] + topPixelData[i+2];
        botPixel += botPixelData[i+0] + botPixelData[i+1] + botPixelData[i+2];
    }

    return topPixel + botPixel == 0 ? true : false;
}

// ************************ Drag and drop ***************** //
let dropArea = document.getElementById("drop-area");

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false);

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)   
    document.body.addEventListener(eventName, preventDefaults, false)

    if(eventName in ['dragenter','dragover']){
        dropArea.addEventListener(eventName, highlight, false)
    }else{
        dropArea.addEventListener(eventName, unhighlight, false)
    }
})

function alert(txt, dura){
    Toastify({
        text: txt,
        position: "center",
        gravity: "bottom",
        duration: dura,
        close: false
    }).showToast();
}

document.querySelector("#matchstart").addEventListener('click', async function(){
    if(document.querySelectorAll('#gallery > img').length == 0){
        alert("인식할 이미지를 선택해 주세요.", 3000);
        return;
    }
    if([1051,1411].includes(document.querySelectorAll('#gallery > img')[0].naturalHeight)){
        alert("[창 모드] 스크린샷 이미지 입니다.\n[전체 창 모드] 또는 [전체 화면]으로 설정을 바꿔주시고 다시 시도해 주세요.", 5000)
        return;
    }
    if(document.querySelectorAll('#gallery > img')[0].naturalHeight > 1440){
        alert("현재 FHD(1920x1080), QHD(2560x1440)만 지원하고있습니다. 죄송합니다.",5000)
        return;
    }
    if(wideCheck()){
        alert("21:9 비율 이미지입니다. 16:9 비율로 바꿔 다시 시도해 주세요.",5000)
        return;
    }

    this.style.display="none";
    document.querySelector('#drop-area').style.display="none";
    document.querySelector('#helpbtn').style.display = 'none';
    document.querySelector('#matchstatus').style.display = '';
    document.querySelector('#matchingment').textContent = '필요 작업 진행중...(환경에 따라 최대 30초 소요)';
    document.querySelector('#notice').style.display = "none";

    await loadJavascript('js/cardocr');
});

document.querySelector('#finishyes').addEventListener('click', async function(){
    //카드 수동 추가
    if(document.querySelector("#cardpushzone").childElementCount >= 1){
        cardpushlength = document.querySelector("#cardpushzone").childElementCount;
        for (let i = 0; i < cardpushlength; i++) {
            hasCardDeck[document.querySelector(`#cardname${i}`).value] = [parseInt(document.querySelector(`#cardstar${i}`).value),parseInt(document.querySelector(`#cardqty${i}`).value)]
        }
    }
    await loadJavascript('js/cardcalcul');
    await cardsetcalcstart();
    document.querySelector('#bonusdamageBtns > button:nth-child(1)').click();
}, false)

document.querySelector('#finishno').addEventListener('click', function(){
    alert('조건에 맞춰 다시 해주시거나 그래도 안되시면 sjssj7777@naver.com로 인식하기로 한 사진을 보내주세요')
});

let hasCardDeck = {};
if(getCookie('savecarddeck') != ''){
    (async ()=>{
        getCVal = '{"' + getCookie('savecarddeck') + '}';
        getCVal = getCVal.replace(/:/gi,'":');
        getCVal = getCVal.replace(/],/gi,'],"');
        getCVal = getCVal.replace(/],"}/gi,']}');

        cObject = JSON.parse(getCVal);

        await loadJavascript('js/cardeffect_new');

        for (let i = 0; i < Object.keys(cObject).length; i++) {
            cNum = Object.keys(cObject)[i]
            hasCardDeck[Object.keys(cardgrade)[Object.keys(cObject)[i]]] = cObject[cNum];
        }

        await loadJavascript('js/cardcalcul');
        cardsetcalcstart();
    })();
}