#include "DHT.h"
#define dhtPin 8      //讀取DHT11 Data
#define dhtType DHT11 //選用DHT11   
#define Moisture A0   //定義AO 引腳 為土讓濕度感測器
#define Grove_Water_Sensor A1 //定義A1為水位感測器腳位
#define Raindrop_module 6 //定義A2為下雨感測器的腳為

DHT dht(dhtPin, dhtType); // Initialize DHT sensor

void setup() {
  Serial.begin(9600);//設定鮑率9600
  pinMode(Moisture, INPUT);
  pinMode(Grove_Water_Sensor, INPUT); 
  pinMode(Raindrop_module, INPUT);
  dht.begin();//啟動DHT
}

void loop() {
  float h = dht.readHumidity();//讀取濕度
  float t = dht.readTemperature();//讀取攝氏溫度
  float f = dht.readTemperature(true);//讀取華氏溫度
  
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println("無法從DHT傳感器讀取！");
    return;
  }
  
  Serial.println(h);//濕度
  Serial.println(t);//攝氏溫度
  Serial.println(f);//華氏溫度
  Serial.println(analogRead(Moisture));//土壤濕度
  Serial.println(analogRead(Grove_Water_Sensor)); //水位感測器
  Serial.println(digitalRead(Raindrop_module)); //下雨感測器
  delay(2000);//延時5秒
}
