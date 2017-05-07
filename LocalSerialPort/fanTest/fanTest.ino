int val;
int lastVal;

void setup() {
  Serial.begin(9600);

}

void loop() {
  // put your main code here, to run repeatedly:
  int val  = analogRead(0);
  if ( lastVal < 500 && val >= 500) {
    Serial.println(val);
  }
  if ( lastVal > 500 && val <= 500) {
    Serial.println(val);
  }
  delay(1);
  lastVal = val;


}
