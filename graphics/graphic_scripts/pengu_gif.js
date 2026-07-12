const canvas = document.getElementById('portfolio-canvas')
const ctx = canvas.getContext('2d')

const img_size = [227, 137]
const img_loc = [100, 100]

const img00 = new Image();
const img01 = new Image();
const img02 = new Image();
const img03 = new Image();
const img04 = new Image();
const img05 = new Image();
const img06 = new Image();
const img07 = new Image();
const img08 = new Image();
const img09 = new Image();
const img10 = new Image();
const img11 = new Image();
const img12 = new Image();
const img13 = new Image();
const img14 = new Image();
const img15 = new Image();
const img16 = new Image();
const img17 = new Image();
const img18 = new Image();
const img19 = new Image();
const img20 = new Image();

let frames = [
	"./pengu_web/00.jpg",
	"./pengu_web/01.jpg",
	"./pengu_web/02.jpg",
	"./pengu_web/03.jpg",
	"./pengu_web/04.jpg",
	"./pengu_web/05.jpg",
	"./pengu_web/06.jpg",
	"./pengu_web/07.jpg",
	"./pengu_web/08.jpg",
	"./pengu_web/09.jpg",
	"./pengu_web/10.jpg",
	"./pengu_web/11.jpg",
	"./pengu_web/12.jpg",
	"./pengu_web/13.jpg",
	"./pengu_web/14.jpg",
	"./pengu_web/15.jpg",
	"./pengu_web/16.jpg",
	"./pengu_web/17.jpg",
	"./pengu_web/18.jpg",
	"./pengu_web/19.jpg",
	"./pengu_web/20.jpg",
];

img00.src = frames[0]
img01.src = frames[1]
img02.src = frames[2]
img03.src = frames[3]
img04.src = frames[4]
img05.src = frames[5]
img06.src = frames[6]
img07.src = frames[7]
img08.src = frames[8]
img09.src = frames[9]
img10.src = frames[10]
img11.src = frames[11]
img12.src = frames[12]
img13.src = frames[13]
img14.src = frames[14]
img15.src = frames[15]
img16.src = frames[16]
img17.src = frames[17]
img18.src = frames[18]
img19.src = frames[19]
img20.src = frames[20]

imgs = [
	img00,
	img01,
	img02,
	img03,
	img04,
	img05,
	img06,
	img07,
	img08,
	img09,
	img10,
	img11,
	img12,
	img13,
	img14,
	img15,
	img16,
	img17,
	img18,
	img19, 
	img20
]

let currentFrameIndex = 0;
let lastTime = 0;
let fps = 2;
let frameInterval = 1000 / fps;

function animate(currentTime) {
	requestAnimationFrame(animate);

	let deltaTime = currentTime - lastTime;

	if (deltaTime > frameInterval) {
		lastTime = currentTime - (deltaTime % frameInterval);

		currentFrameIndex = (currentFrameIndex + 1) % frames.length;

		ctx.clearRect(img_loc[0], img_loc[1], img_loc[0] + img_size[0], img_loc[1] + img_size[1]);
		ctx.drawImage(imgs[currentFrameIndex], img_loc[0], img_loc[1], img_size[0], img_size[1]);
	}
}

requestAnimationFrame(animate);