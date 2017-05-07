#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>
int val;
int  handDryerInt;
int  lastHandDryerInt;
int  tapInt;
int  lastTapInt;
int lastVal;
RF24 radio(7, 8); // CNS, CE
const byte address[6] = "00001";
void setup() {
  Serial.begin(9600);
  radio.begin();
  radio.openReadingPipe(0, address);
  radio.setPALevel(RF24_PA_MIN);
  radio.startListening();
}
void loop() {
  char data[5];
  if (radio.available()) {
    radio.read(&data, sizeof(data));
    if (data[0] == 'h') {
      // int val = data.toInt();
      char handDryer[4];
      for (int i = 0; i < 4; i++) {
        handDryer[i] = data[i + 1];
      }
      handDryerInt = atoi(handDryer);
      if ( handDryerInt < 500 && lastHandDryerInt >= 500) {
        Serial.print("hand");
        Serial.println(handDryerInt);
      }
      if ( handDryerInt > 500 && lastHandDryerInt <= 500) {
        Serial.print("hand");
        Serial.println(handDryerInt);
      }
    }
    lastHandDryerInt = handDryerInt;
    if (data[0] == 't') {
      // int val = data.toInt();
      char tap[4];
      for (int i = 0; i < 4; i++) {
        tap[i] = data[i + 1];
      }
      tapInt = atoi(tap);
      if ( tapInt < 500 && lastTapInt >= 500) {
        Serial.print("tap");
        Serial.println(tapInt);
      }
      if ( tapInt > 500 && lastTapInt <= 500) {
        Serial.print("tap");
        Serial.println(tapInt);
      }
//       lastTapInt = tapInt;
    }
    lastTapInt = tapInt;



  }
}
