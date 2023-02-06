const textToSpeech = require('@google-cloud/text-to-speech');
const commander = require('commander');

const fs = require('fs');
const util = require('util');

const client = new textToSpeech.TextToSpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const text = 'How are you, stranger?';

async function getaudio(text, outputFilename)
{
    const request = {
        input: {text: text},
        voice: {
            'languageCode':'en-us',
            'name':'en-US-Wavenet-F',
            'ssmlGender': 'FEMALE'
        },
        audioConfig: {audioEncoding: 'MP3'},
    };
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
    .parse(process.argv);

    const options = commander.opts();

    var textinput = options.text;
    const outputFilename = options.output;

    if ((options.text) || (options.input)) {
        if (options.input) {
            inputText = options.input;
        }
        textinput = await readTextInput(inputText);
        getaudio(textinput, outputFilename);
    }
}

main();
