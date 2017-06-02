#include <SPI.h>

const int trigPin = 3;
const int echoPin = 4;
long duration;
int distance;
#include "SoftwareSerial.h"

# define Start_Byte     0x7E
# define Version_Byte   0xFF
# define Command_Length 0x06
# define End_Byte       0xEF
# define Acknowledge    0x00        //Returns info with command 0x41 [0x01: info, 0x00: no info] 
int count;
SoftwareSerial mySerial(9, 10);
int val;
int lastVal;
String head = "f";
int busy = 7;
const byte address[6] = "00001        ";
void setup() {
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Inp
  count = 0;
  Serial.begin(9600);
  mySerial.begin (9600);
  execute_CMD(0x3F, 0x00, 0x00);   // Send request for initialization parameters
  while (mySerial.available() < 10) { // Wait until initialization parameters are received (10 bytes)
    delay(30);
    //    Serial.println("ww");
  }
  execute_CMD(0x06, 0x00, 0x05);

  byte Command    = 6;
  byte Parameter1 = 0;
  byte Parameter2 = 0x20;
  execute_CMD(Command, Parameter1, Parameter2);

}
void loop() {
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  // Calculating the distance
  distance = duration * 0.034 / 2;
  //   Serial.println("ll");
  busy  = digitalRead(2);

  int val  = analogRead(0);


  if (distance < 120 && busy != 0) {

    //    radio.write(&buf, 5);
    // Input Serial monitor: Command and the two parameters in DECIMAL numbers (NOT HEX)
    // E.g. 3,0,1 (or 3 0 1 or 3;0;1) will play first track on the TF-card
    byte Command    = 3;
    byte Parameter1 = 0;
    byte Parameter2 = floor(random(1,5));

    // Write your input at the screen

    // Excecute the entered command and parameters
    execute_CMD(Command, Parameter1, Parameter2);


  }
  //  }
  Serial.print("Distance: ");
  Serial.println(distance);
  lastVal = val;
  //  Serial.println(myString);
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

