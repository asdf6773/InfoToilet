#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>
int val;
int  handDryerInt;
int  lastHandDryerInt;
int  tapInt;
int  lastTapInt;
int lastVal;
int toiletInt;
int lastToiletInt;
RF24 radio(7, 8); // CNS, CE
const byte address[6] = "00001";
const byte flushStatus[6] = "00002";
void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);
  radio.begin();
  radio.openWritingPipe(address);
  
//  radio.openWritingPipe(flushStatus);//waiting
  radio.openReadingPipe(0, address);
  radio.setPALevel(RF24_PA_MAX);
  radio.startListening();
}
void loop() {
  //  if (Serial.available() > 0) {
  //    Serial1.write(1);
  ////    Serial3.println("over");
  //
  //  }
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


        //    Serial.print("hand");
        Serial.println(data);
      }
      if ( handDryerInt > 500 && lastHandDryerInt <= 500) {
        //   Serial.print("hand");
        Serial.println(data);
      }
    }
    lastHandDryerInt = handDryerInt;
    
    if (data[0] == 'f') {
//        Serial.println(data);
      // int val = data.toInt();
      char tap[4];
      for (int i = 0; i < 4; i++) {
        tap[i] = data[i + 1];
      }
      tapInt = atoi(tap);
      if ( tapInt < 500 && lastTapInt >= 500) {
        //   Serial.print("tap");
        Serial.println(data);
      }
      if ( tapInt > 500 && lastTapInt <= 500) {
        //    Serial.print("tap");
        Serial.println(data);
      }
      //       lastTapInt = tapInt;
    }
    if (data[0] == 't') {
      // int val = data.toInt();
      char toilet[4];
      for (int i = 0; i < 4; i++) {
        toilet[i] = data[i + 1];
      }
      toiletInt  = atoi(toilet);
      if ( toiletInt < 500 && lastToiletInt >= 500) {
        //   Serial.print("tap");
        Serial.println(data);
      }
      if ( toiletInt > 500 && lastToiletInt <= 500) {
        //    Serial.print("tap");
        Serial.println(data);
      }
      //       lastTapInt = tapInt;
    }
    lastToiletInt = toiletInt;
    lastTapInt = tapInt;
    //Serial.println(sizeof(data));
    //Serial.println(data);

  }
}
