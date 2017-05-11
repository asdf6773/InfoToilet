//#include <SPI.h>
//#include <nRF24L01.h>
//#include <RF24.h>
//int val;
//int lastVal;
//String head = "h";
//RF24 radio(7, 8); // CNS, CE
//const byte address[6] = "00001";
void setup() {
  Serial.begin(9600);
  //  radio.openWritingPipe(address);
  //  radio.setPALevel(RF24_PA_MIN);
  //  radio.stopListening();
}
void loop() {
  Serial.println(analogRead(A0));
  //  }
  //  lastVal = val;

  //delete char;
  delay(50);
}
