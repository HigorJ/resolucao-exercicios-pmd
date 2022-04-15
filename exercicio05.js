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

exibeInterface();
rl.on("line", op => {
    option = Number(op);

    if(option === 2) {
        rl.close();
    } else if(option === 1) {
        new Promise((resolve) => rl.question("Digite a latitude: ", latitude => resolve(latitude))).then(latitude => {
            lat = latitude;
            new Promise((resolve) => rl.question("Digite a longitude: ", longitude => resolve(longitude))).then(longitude => {
                lon = longitude;

                const URL = `${PROTOCOL}://${BASE_URL}?lat=${lat}&lon=${lon}&units=${UNITS}&appid=${API_KEY}&lang=${LANG}`;
    
                axios.get(URL).then(response => {
                    console.log(`\nLocal: ${response.data.name} - Temperatura: ${response.data.main.temp}\n`)
                    exibeInterface();
                });
            });
        });
    } else {
        console.log("Alternativa inválida!");
    }
})
    