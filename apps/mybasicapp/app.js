// Clear screen
g.clear();

// Centered text
g.setFont("6x8", 2);
g.setFontAlign(0, 0);
g.drawString("Hello Bangle!", g.getWidth()/2, g.getHeight()/2);

// Exit to launcher on BTN1
setWatch(() => {
  load();
}, BTN1);
