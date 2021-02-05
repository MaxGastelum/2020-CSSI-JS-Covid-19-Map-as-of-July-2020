// Max Gastelum
// Sarah Luna

// Credit: Daniel Shiffman

var mapimg;

var clat = 0;
var clon = 0;

var ww = 1024;
var hh = 512;

var zoom = 1;
var cases;

function preload() {
  // The clon and clat in this url are edited to be in the correct order.
  mapimg = loadImage(
    'https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
      clon +
      ',' +
      clat +
      ',' +
      zoom +
      '/' +
      ww +
      'x' +
      hh +
      '?access_token=sk.eyJ1IjoicHJvZnNhdGh5YSIsImEiOiJja2N3bzM1amUwZnFxMnNwZDZtbGU3ZHZ4In0.DdYK7WyTFacCXnhlG3XL2g'
  );
  
  cases = loadTable("cases.csv","csv","header");
  stateCases = loadTable("statecases.csv","csv","header");
}

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}



function draw() {
  createCanvas(ww, hh);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);
  

  button = createButton('Light Mode');
  button.position(420, 490);
  button.mousePressed(lightmode);

  button = createButton('Dark Mode');
  button.position(510, 490);
  button.mousePressed(darkmode);

  worldCases()
  usCases()

  
}

function lightmode() {
  mapimg = loadImage(
    'https://api.mapbox.com/styles/v1/mapbox/light-v9/static/' +
      clon +
      ',' +
      clat +
      ',' +
      zoom +
      '/' +
      ww +
      'x' +
      hh +
      '?access_token=sk.eyJ1IjoicHJvZnNhdGh5YSIsImEiOiJja2N3bzM1amUwZnFxMnNwZDZtbGU3ZHZ4In0.DdYK7WyTFacCXnhlG3XL2g'
  );
}

function darkmode() {
  mapimg = loadImage(
    'https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
      clon +
      ',' +
      clat +
      ',' +
      zoom +
      '/' +
      ww +
      'x' +
      hh +
      '?access_token=sk.eyJ1IjoicHJvZnNhdGh5YSIsImEiOiJja2N3bzM1amUwZnFxMnNwZDZtbGU3ZHZ4In0.DdYK7WyTFacCXnhlG3XL2g'
  ); 
 
 
}


function usCases(){
  
  var cx = mercX(clon);
  var cy = mercY(clat);

  var rows = stateCases.getRows()
  for (var r = 0; r < rows.length; r++) {
   
    var lat = rows[r].getNum("SLat")
    var lon = rows[r].getNum("SLong")
    var mag = rows[r].getNum("SMag")
    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;
   
    if (x < -width / 2) {
      x += width;
    } else if (x > width / 2) {
      x -= width;
    }
    mag *= 1595000;
    mag = sqrt(mag);

    var magmax = sqrt(pow(10, 10));

    var d = map(mag, 0, magmax, 0, 180);
    
    stroke(0, 0, 0);
    fill(255, 0, 0, 185);
    ellipse(x, y, d, d);
}
  
textSize(25)
  textFont('century gothic')
  text('COVID-19 In The US', -450, 200)

}

function worldCases(){
  button = createButton('Light Mode');
  button.position(420, 490);
  button.mousePressed(lightmode);

  button = createButton('Dark Mode');
  button.position(510, 490);
  button.mousePressed(darkmode); 



  var cx = mercX(clon);
  var cy = mercY(clat);

  var rows = cases.getRows()
  for (var r = 0; r < rows.length; r++) {
   
    var lat = rows[r].getNum("Lat")
    var lon = rows[r].getNum("Long")
    var mag = rows[r].getNum("Mag")
    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;
   
    if (x < -width / 2) {
      x += width;
    } else if (x > width / 2) {
      x -= width;
    }
    mag *= 1595000;
    mag = sqrt(mag);

    var magmax = sqrt(pow(10, 10));

    var d = map(mag, 0, magmax, 0, 180);
    stroke(0, 0, 0);
    fill(100, 300, 100, 185);
    ellipse(x, y, d, d);
}
textSize(25)
  textFont('century gothic')
  text('COVID-19 Cases World Wide', -130, 200)

}