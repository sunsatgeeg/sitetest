
var personcount = 8;
var price = 0;

function sliderevent(e){
    if(e.value == 0){
        return;
    }
    document.querySelector('#price').value = e.value;
    calc();
}

function othercountevent(e){
    personcount = parseInt(e.value);
    if(e.value == "" || e.value < 0){
        return;
    }
    if(personcount < 2){
        return; 
    }
    document.querySelectorAll('.personcount').forEach(function(f){
        f.classList.remove('active');
    });
    if(document.querySelector('#price').value == ""){
        return;
    }
    calc();
}

function priceeditevent(e){
    if(e.value == ""){
        return;
    }
    price = parseInt(e.value);
    calc();
}

function calc(){
    document.querySelector('#slider').value = document.querySelector('#price').value;

    price = document.querySelector('#price').value;
    var tax = Math.ceil(price * 0.05);
    document.querySelector('#tax').innerText = "- " + tax;
    document.querySelector('#tax').setAttribute('tooltipcontent', String(price) + " x 0.05");
    var distribution = parseInt((price-tax) / personcount);
    document.querySelector('#distribution').innerText = "- " + distribution;
    document.querySelector('#distribution').setAttribute('tooltipcontent', "" + String(price) + " - " + String(tax) + " = " + String(price - tax) + " ÷ " + String(personcount));
    var breakpoint = price - tax - distribution;
    document.querySelector('#breakpoint').innerText = breakpoint;
    document.querySelector('#breakpoint').setAttribute('tooltipcontent', String(price) + " - " + String(tax) + " - " + String(distribution));
    document.querySelector('#breakpoint').style.cursor = "pointer";
    var fairprice = parseInt(breakpoint*100/(110));
    document.querySelector('#fairprice').innerText = fairprice;
    document.querySelector('#fairprice').setAttribute('tooltipcontent', String(breakpoint) + " ÷ 1.1");
    document.querySelector('#fairprice').style.cursor = "pointer";
    var giveme = parseInt(fairprice*100/(110));
    document.querySelector('#giveme').innerText = giveme;
    document.querySelector('#giveme').setAttribute('tooltipcontent', String(fairprice) + " ÷ 1.1");
    document.querySelector('#giveme').style.cursor = "pointer";
}

document.addEventListener("DOMContentLoaded", function(){
    // target elements with the "draggable" class
    interact('#top')
        .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
            interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
            })
        ],
        // enable autoScroll
        autoScroll: true,

        listeners: {
            // call this function on every dragmove event
            move: dragMoveListener
        }
        })

    function dragMoveListener (event) {
        var target = event.target.offsetParent
        
        // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

        // translate the element
        target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

        // update the posiion attributes
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
    }

    // this function is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener

    if (getCookie("inputmethod") == "" || getCookie("inputmethod") == undefined){
        document.querySelectorAll('.btninputmethod button').forEach(function(e){
            e.classList.remove('active');
        })
        document.querySelector('#btnnone').classList.add('active');
        document.querySelector('.inputmethod').childNodes.forEach(function(e){
            if(e.nodeName == "#text"){
                return
            }
            e.style.display = "none";
        });
    }else{
        target = getCookie("inputmethod");

        document.querySelectorAll('.btninputmethod button').forEach(function(e){
            e.classList.remove('active');
        })
        document.querySelector("#btn" + target).classList.add('active');
        document.querySelector('.inputmethod').childNodes.forEach(function(e){
            if(e.nodeName == "#text"){
                return
            }
            e.style.display = 'none';
        });
        document.querySelector("#" + target).style.display = '';
    }

    document.querySelectorAll('.clickcount').forEach(function(e){
        e.addEventListener("click", function(){
            sumA = this.querySelector('#countvalue').innerText;
            sumB = document.querySelector('#price').value;
            if(sumB == ""){sumB = 0};

            document.querySelector('#price').value = parseInt(sumA) + parseInt(sumB);
            calc();
        });
    });

    document.querySelector('#slider').addEventListener('change', function(){
        sliderevent(this)
    });
    document.querySelector('#slider').addEventListener('mousemove', function(){
        sliderevent(this)
    });

    document.querySelectorAll('.btninputmethod button').forEach(function(e){
        e.addEventListener('click', function(){
            if(this.classList.contains("active")){
                return;
            }
            document.querySelectorAll('.btninputmethod button').forEach(function(f){
                f.classList.remove('active');
            })
            this.classList.add('active');
            setCookie("inputmethod", this.value, 365);

            document.querySelector('.inputmethod').childNodes.forEach(function(f){
                if(f.nodeName == "#text"){
                    return;
                }
                f.style.display = 'none';
            });
            document.querySelector('#' + this.value).style.display = '';
        });
    })

    var input_value = document.querySelector("#price");
    document.querySelectorAll(".calc").forEach(function(e){
        e.addEventListener('click', function(){
            var value = this.value;
            field(value);
        });
    });
    function field(value) {
        if(input_value.value == 0){
        input_value.value = "";
        }
        input_value.value = input_value.value + value;
        calc();
    }
    document.querySelector("#clear").addEventListener('click', function(){
        input_value.value = 0;
        calc();
    });
    document.querySelector("#backspace").addEventListener('click', function(){
        input_value.value = input_value.value.slice(0, -1);
        if(input_value.value == ""){
            input_value.value = 0;
        }
        calc();
    });

    document.querySelector('#priceclear').addEventListener('click',function(){
        document.querySelector('#price').value = 0;
        calc();
    });

    document.querySelector('#breakpoint').addEventListener("click", clickToCopy);
    document.querySelector('#fairprice').addEventListener("click", clickToCopy);
    document.querySelector('#giveme').addEventListener("click", clickToCopy);

    document.querySelectorAll('.personcount').forEach(function(e){
        e.addEventListener('click', function(){
            document.querySelector('#othercount').value = "";
            this.parentNode.parentNode.querySelectorAll('.personcount').forEach(function(f){
                f.classList.remove('active');
            })
            this.classList.add('active');
            if(document.querySelector('#price').value == ""){
                return;
            }
            personcount = parseInt(this.getAttribute('forI'));
            calc();
        });
    });

    document.querySelector('#othercount').addEventListener('keyup', function(){
        othercountevent(this);
    });
    document.querySelector('#othercount').addEventListener('change', function(){
        othercountevent(this);
    });

    document.querySelector('#price').addEventListener('keyup', function(){
        priceeditevent(this);
    });
    document.querySelector('#price').addEventListener('change', function(){
        priceeditevent(this);
    });
        
    tippy('table td:nth-child(2)', {
        allowHTML: true, 
        onShow(instance) {
        instance.setContent(instance.reference.getAttribute('tooltipcontent'));
        },
        theme: 'light', 
        placement: 'right',
    });
});