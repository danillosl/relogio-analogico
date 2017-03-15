var canvas = document.getElementById("relogio");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
desenhaRelogio();
setInterval(desenhaRelogio, 10);

mudarVisibilidadeRelogio();

function desenhaRelogio() {
    desenhaFace(ctx, radius);
    desenhaNumeros(ctx, radius);
    desenhaHora(ctx, radius);
}

function desenhaFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);

    ctx.fillStyle = 'grey';
    ctx.fill();

    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0.5, 'red');
    grad.addColorStop(0, 'red');
    ctx.strokeStyle = grad;
    ctx.stroke();

    //fim primeiro circulo

    ctx.beginPath();
    ctx.arc(0, 0, radius - 60, 0, 2 * Math.PI);

    var gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(1, "black");
    gradient.addColorStop(0, "white");
    ctx.fillRect(20, 20, 150, 100);

    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.strokeStyle = grad;
    ctx.stroke();
    ctx.beginPath();

    //fim segundo circulo

    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#000000';
    ctx.fill();
}

function desenhaNumeros(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.10 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 25; num++) {
        ang = calculoAngulo(num, 12);
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function desenhaHora(ctx, radius) {
    var now = new Date();
    var hora = now.getHours();
    var minuto = now.getMinutes();
    var segundo = now.getSeconds();


    hora = calculoAngulo(hora, 12);
    desenhaPonteiros(ctx, hora, radius * 0.5, radius * 0.07);

    minuto = calculoAngulo(minuto, 30);

    desenhaPonteiros(ctx, minuto, radius * 0.8, radius * 0.07);

    segundo = calculoAngulo(segundo, 30);

    desenhaPonteiros(ctx, segundo, radius * 0.9, radius * 0.02);

}

function desenhaPonteiros(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function calculoAngulo(numero1, numero2) {
    return ((numero2 + numero1) * Math.PI / numero2);

}

function mudarVisibilidadeRelogio() {

    var relogioVisivel = true;
    var botao = document.getElementById("botao");
    var sectionRelogio = document.getElementById("section-relogio");


    botao.addEventListener("click", function () {

        if (relogioVisivel) {
            botao.innerHTML = "Mostrar Relógio";
            sectionRelogio.style.visibility = 'hidden';
        } else {
            botao.innerHTML = "Esconder Relógio";
            sectionRelogio.style.visibility = 'visible';

        }

        relogioVisivel = !relogioVisivel;

    });


}