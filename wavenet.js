const textToSpeech = require('@google-cloud/text-to-speech');
const commander = require('commander');

const fs = require('fs');
const util = require('util');

const client = new textToSpeech.TextToSpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const text = 'How are you, stranger?';

async function getaudio(text, outputFilename, voice, pitch, speed)
{
    var request = {
        input: {text: text},
        voice: {
            'languageCode':'en-us',
            'name':'en-US-Wavenet-F',
            'ssmlGender': 'FEMALE',
            'pitch': 10.00,
            'speakingRate': 2.00
        },
        audioConfig: {audioEncoding: 'MP3', 'pitch': 0.00, 'speakingRate': 1.0
        },
    };

    if (voice == 'de') {
        request.voice.languageCode = 'de-De';
        request.voice.name = 'de-De-Wavenet-C';
    } else if (voice == 'fr') {
        request.voice.languageCode = 'fr-FR';
        request.voice.name = 'fr-FR-Wavenet-C';
    } else if (voice == 'es') {
        request.voice.languageCode = 'es-ES';
        request.voice.name = 'es-ES-Wavenet-C';
    }

    if (pitch) {
        request.audioConfig.pitch = pitch;
    }

    if (speed) {
        request.audioConfig.speakingRate = speed;
    }

    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(outputFilename, response.audioContent, 'binary');
    console.log(`Audio content written to file: ${outputFilename}`);
}

async function readTextInput(filename)
{
    const readFile = util.promisify(fs.readFile);
    const data = await readFile(filename, { encoding: 'utf8' });
    return data;
}

async function main() 
{

    commander
    .version('1.0.0', '-v, --version')
    .usage('[OPTIONS]...')
    .option('-o, --output <filename>', 'Path to output the generated mp3-file.', 'output.mp3')
    .option('-t, --text <text>', 'Text to be transformed via Wavenet')
    .option('-i, --input <input>', 'Text Input file')
    .option('-l, --language <input>', 'Ausgabesprache')
    .option('-p, --pitch <input>', 'Pitch')
    .option('-s, --speed <input>', 'Textspeed')
    .parse(process.argv);

    const options = commander.opts();

    var textinput = options.text;
    const outputFilename = options.output;

    if ((options.text) || (options.input)) {
        if (options.input) {
            inputText = options.input;
        }
        textinput = await readTextInput(inputText);
        getaudio(textinput, outputFilename, options.language, options.pitch, options.speed);
    }
}

main();
