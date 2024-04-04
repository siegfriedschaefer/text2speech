# text2speech

This is a small node.js utility to transform textfiles into mp3 audiofiles via google cloud.
It uses the wavenet speech syntheses.
I use it to generate the audio explanations of my youtube channel
mtvs4u - https://www.youtube.com/channel/UCo4BndqR2VFkbWO1kNr5j6A

## Usage

node wavenet.js -i slide.txt -o slide.mp3
node wavenet.js -l en -i tutorials/dusk_001/comment_001.txt -o builds/workshop_013/comment_001.mp3 -s 0.8 -p 1.4
