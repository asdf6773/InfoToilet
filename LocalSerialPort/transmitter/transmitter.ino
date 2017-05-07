#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>
int val;
int lastVal;
String head = "h";
RF24 radio(7, 8); // CNS, CE
const byte address[6] = "00001";
void setup() {
  radio.begin();
  radio.openWritingPipe(address);
  radio.setPALevel(RF24_PA_MIN);
  radio.stopListening();
}
void loop() {
  
  int val  = analogRead(0);
  //  if ( lastVal < 500 && val >= 500) {
  //    byte data = 1;
  //    radio.write(&val, sizeof(val));
  //  }
  //  if ( lastVal > 500 && val <= 500) {
  //    byte data = 0;
  String myString = head+String(val);
  char buf[5];
  myString.toCharArray(buf,myString.length()+1);
  radio.write(&buf, myString.length()+1);
  //  }
  //  lastVal = val;

//delete char;
  delay(50);
}
