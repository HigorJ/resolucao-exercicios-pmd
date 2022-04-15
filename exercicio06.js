require('dotenv').config()
const readline = require('readline');
const { stdin, stdout } = require('process');
const axios = require("axios").default;

const rl = readline.createInterface({ input: stdin, output: stdout });

let lat = -23.6150183, lon = -46.5101675;
let option;

const {
    PROTOCOL,
    BASE_URL,
    UNITS,
    API_KEY,
    LANG
} = process.env;

function exibeInterface() {
    console.log('1- Digitar latitude e longitude');
    console.log('2- Sair');
}

function leValor(texto) {
    return new Promise((resolve) => rl.question(texto, (valor) => resolve(valor)));
}

async function main() {
    do {
        exibeInterface();
        option = Number(await leValor("Escolha uma opção: "));

        if(option === 2) {
            rl.close();
            break;
        } else if(option === 1) {
            lat = await leValor("Digite a latitude: ");
            lon = await leValor("Digite a longitude: ");

            const URL = `${PROTOCOL}://${BASE_URL}?lat=${lat}&lon=${lon}&units=${UNITS}&appid=${API_KEY}&lang=${LANG}`;

            let response = await axios.get(URL);

            if(!response.data) console.log("Erro inesperado");

            console.log(`\nLocal: ${response.data.name} - Temperatura: ${response.data.main.temp}\n`)
        } else {
            console.log("Opção inválida!");
        }
    } while(option !== 2);
}

main()
