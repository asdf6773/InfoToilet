#include <SPI.h>
#include <nRF24L01.h>
#include "SoftwareSerial.h"
#include <RF24.h>
# define Start_Byte     0x7E
# define Version_Byte   0xFF
# define Command_Length 0x06
# define End_Byte       0xEF
# define Acknowledge    0x00        //Returns info with command 0x41 [0x01: info, 0x00: no info] 

SoftwareSerial mySerial(9, 10);
int val;
int checkCount;
int busy;
int lastVal;
int initCount;
String head = "h";
RF24 radio(7, 8); // CNS, CE
const byte address[6] = "00001";
void(* resetFunc)(void) = 0; //declare reset function @ address 0
void setup() {
  checkCount = 0;
  initCount = 0;
  Serial.begin(9600);
  mySerial.begin (9600);
  execute_CMD(0x3F, 0x00, 0x00);   // Send request for initialization parameters
  while (mySerial.available() < 10) { // Wait until initialization parameters are received (10 bytes)
    if (initCount < 100) {
      delay(30);
      initCount += 1;
    } else {
      resetFunc();  //call reset
    }
    //    Serial.println("ww");
  }
  execute_CMD(0x06, 0x00, 0x05);
  radio.begin();
  radio.openWritingPipe(address);
  radio.setPALevel(RF24_PA_MIN);
  radio.stopListening();
  byte Command    = 6;
  byte Parameter1 = 0;
  byte Parameter2 = 0x20;
  execute_CMD(Command, Parameter1, Parameter2);
}
void loop() {


  busy = digitalRead(2);
  int val  = map(analogRead(A0), 0, 736, 0, 1023);

  //  if ( lastVal < 500 && val >= 500) {
  //    byte data = 1;
  //    radio.write(&val, sizeof(val));
  //  }
  //  if ( lastVal > 500 && val <= 500) {
  //    byte data = 0;
  String myString = head + String(val);
  char buf[5];
  myString.toCharArray(buf, myString.length() + 1);
  //  if (busy == 1) {
  radio.write(&buf, 5);
  //  }

  //check Process
  char check[5];
  check[0] = 'H';
  checkCount += 1;
  if (checkCount > 100) {
    radio.write(&check, 5);
    checkCount = 0;
  }
  //---------
Serial.println(val);
  if ((val > 500 && lastVal <= 500) && busy == 1) {


    // Input Serial monitor: Command and the two parameters in DECIMAL numbers (NOT HEX)
    // E.g. 3,0,1 (or 3 0 1 or 3;0;1) will play first track on the TF-card
    byte Command    = 3;
    byte Parameter1 = 0;
    byte Parameter2 = 1;

    // Write your input at the screen
    //    Serial.print("Command : 0x"); if (Command < 16) Serial.print("0"); Serial.print(Command, HEX);
    //    Serial.print("("); Serial.print(Command, DEC);
    //    Serial.print("); Parameter: 0x"); if (Parameter1 < 16) Serial.print("0"); Serial.print(Parameter1, HEX);
    //    Serial.print("("); Serial.print(Parameter1, DEC);
    //    Serial.print("), 0x"); if (Parameter2 < 16) Serial.print("0"); Serial.print(Parameter2, HEX);
    //    Serial.print("("); Serial.print(Parameter2, DEC); Serial.println(")");

    // Excecute the entered command and parameters
    execute_CMD(Command, Parameter1, Parameter2);


  }
  //  }
  lastVal = val;


  //delete char;
  delay(10);
}



void execute_CMD(byte CMD, byte Par1, byte Par2)
// Excecute the command and parameters
{
  // Calculate the checksum (2 bytes)
  word checksum =  -(Version_Byte + Command_Length + CMD + Acknowledge + Par1 + Par2);
  // Build the command line
  byte Command_line[10] = { Start_Byte, Version_Byte, Command_Length, CMD, Acknowledge,
                            Par1, Par2, highByte(checksum), lowByte(checksum), End_Byte
                          };
  //Send the command line to the module
  for (byte k = 0; k < 10; k++)
  {
    mySerial.write( Command_line[k]);
  }





}

