const readline = require('readline');
const { stdin, stdout } = require('process');

const rl = readline.createInterface({ input: stdin, output: stdout });

const operacoes = {
    soma: (x, y) => x + y,
    subtracao: (x, y) => x - y,
    multiplicacao: (x, y) => x * y,
    divisao: (x, y) => x / y
}

function exibeInterface() {
    console.log("========== CALCULADORA ==========");
    console.log("1 - Adição");
    console.log("2 - Subtração");
    console.log("3 - Multiplicação");
    console.log("4 - Divisão");
    console.log("5 - Sair");  
    console.log("")
}

function leValor(texto) {
    return new Promise((resolve) => rl.question(texto, (valor) => resolve(valor)));
}

async function main() {
    let option = 0, resultado = 0, x=10, y=5;

    do {
        exibeInterface();

        option = Number(await leValor("Escolha uma opção: "));

        if(option === 5) {
            rl.close();
            break;
        }

        x = Number(await leValor("Digite o primeiro número: "));
        y = Number(await leValor("Digite o segundo número: "));
        
        switch(option) {
            case 1:
                resultado = operacoes.soma(x, y);
                break;
            case 2:
                resultado = operacoes.subtracao(x, y);
                break;
            case 3:
                resultado = operacoes.multiplicacao(x, y);
                break;
            case 4:
                resultado = operacoes.divisao(x, y);
                break;
            default:
                console.log("Escolha inválida!");
                break;
        }
    
        console.log("Resultado: " + resultado);
    } while(option !== 5);
}

main();