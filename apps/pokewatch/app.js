g.clear();
g.setFont("6x8",2);
g.setFontAlign(0,0); // center
g.drawString("Hello Bangle!", g.getWidth()/2, g.getHeight()/2);

setWatch(() => {
  load(); // go back to launcher when button is pressed
}, BTN1);
