// waves animation

const container = document.body;
const width = container.offsetWidth;
const height = container.offsetHeight;


const wave_0 = {
  elem: document.getElementById('wave0'),
  width: container.offsetWidth, // Wave SVG width (usually container width)
  height: 220, // Position from the top of container
  delta: 15, // Wave amplitude
  speed: 0.7, // Wave animation speed
  numPoints: 3, // How many point will be used to compute our wave
  points: [],
};

const wave_1 = {
  elem: document.getElementById('wave1'),
  width: container.offsetWidth, // Wave SVG width (usually container width)
  height: 220, // Position from the top of container
  delta: 20, // Wave amplitude
  speed: 0.6, // Wave animation speed
  numPoints: 2, // How many point will be used to compute our wave
  points: [],
};

const wave_2 = {
  elem: document.getElementById('wave2'),
  width: container.offsetWidth, // Wave SVG width (usually container width)
  height: 250, // Position from the top of container
  delta: 25, // Wave amplitude
  speed: 0.5, // Wave animation speed
  numPoints: 3, // How many point will be used to compute our wave
  points: [],
};

const wave_3 = {
  elem: document.getElementById('wave3'),
  width: container.offsetWidth, // Wave SVG width (usually container width)
  height: 280, // Position from the top of container
  delta: 30, // Wave amplitude
  speed: 0.4, // Wave animation speed
  numPoints: 4, // How many point will be used to compute our wave
  points: [],
};

const wave_4 = {
  elem: document.getElementById('wave4'),
  width: container.offsetWidth, // Wave SVG width (usually container width)
  height: 320, // Position from the top of container
  delta: 40, // Wave amplitude
  speed: 0.3, // Wave animation speed
  numPoints: 5, // How many point will be used to compute our wave
  points: [],
};

function calculateWavePoints(factor, points, waveHeight, wavePoints, waveWidth, waveDelta, speed) {
  points = [];
  
  for (let i = 0; i <= wavePoints; i++) {
    const x = i/wavePoints * waveWidth;
    const sinSeed = (factor + (i + i % wavePoints)) * speed * 100;
    const sinHeight = Math.sin(sinSeed / 100) * waveDelta;
    const yPos = Math.sin(sinSeed / 100) * sinHeight  + waveHeight;
    points.push({x: x, y: yPos});
  }

  return points;
}

function buildPath(points) {
  let SVGString = 'M ' + points[0].x + ' ' + points[0].y;

  const cp0 = {
    x: (points[1].x - points[0].x) / 2,
    y: (points[1].y - points[0].y) + points[0].y + (points[1].y - points[0].y)
  };

  SVGString += ' C ' + cp0.x + ' ' + cp0.y + ' ' + cp0.x + ' ' + cp0.y + ' ' + points[1].x + ' ' + points[1].y;

  let prevCp = cp0;
  let inverted = -1;

  for (let i = 1; i < points.length-1; i++) {
    var cp1 = {
      x: (points[i].x - prevCp.x) + points[i].x,
      y: (points[i].y - prevCp.y) + points[i].y
    };

    SVGString += ' C ' + cp1.x + ' ' + cp1.y + ' ' + cp1.x + ' ' + cp1.y + ' ' + points[i+1].x + ' ' + points[i+1].y;
    prevCp = cp1;
    inverted = -inverted;
  };

  SVGString += ' L ' + width + ' ' + height;
  SVGString += ' L 0 ' + height + ' Z';
  return SVGString;
}

let lastUpdate;
let totalTime = 0;

function tick(lastUpdate, totalTime, wave, points, waveHeight, wavePoints, waveWidth, waveDelta, speed) {
  const now = window.Date.now();

  if (lastUpdate) {
    const elapsed = (now-lastUpdate) / 1000;
    lastUpdate = now;

    totalTime += elapsed;
    
    const factor = totalTime*Math.PI;
    wave.setAttribute('d', buildPath(calculateWavePoints(factor, points, waveHeight, wavePoints, waveWidth, waveDelta, speed)));
  } else {
    lastUpdate = now;
  }
  
  window.requestAnimationFrame(() => tick(lastUpdate, totalTime, wave, points, waveHeight, wavePoints, waveWidth, waveDelta, speed));
};

tick(lastUpdate, totalTime, wave_0.elem, wave_0.points, wave_0.height, wave_0.numPoints, wave_0.width, wave_0.delta, wave_0.speed);
tick(lastUpdate, totalTime, wave_1.elem, wave_1.points, wave_1.height, wave_1.numPoints, wave_1.width, wave_1.delta, wave_1.speed);
tick(lastUpdate, totalTime, wave_2.elem, wave_2.points, wave_2.height, wave_2.numPoints, wave_2.width, wave_2.delta, wave_2.speed);
tick(lastUpdate, totalTime, wave_3.elem, wave_3.points, wave_3.height, wave_3.numPoints, wave_3.width, wave_3.delta, wave_3.speed);
tick(lastUpdate, totalTime, wave_4.elem, wave_4.points, wave_4.height, wave_4.numPoints, wave_4.width, wave_4.delta, wave_4.speed);

// button click loading

const btn = document.querySelector("button");
const myWaveSvg = document.querySelector(".my-wave");
const fish = document.querySelector(".fish");
btn.addEventListener("click", () => {
  myWaveSvg.classList.toggle("my-wave_active");
  fish.classList.toggle("fish_active");
});