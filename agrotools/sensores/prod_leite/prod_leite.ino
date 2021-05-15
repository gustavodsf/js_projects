#include <Wire.h>
#include <LCD.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C	lcd(0x3F,2,1,0,4,5,6,7); // 0x27 is the I2C bus address for an unmodified module

float vazao = 0; 
int i = 0; 
unsigned long  tempoAnterior = 0; 
unsigned long totalMililitros = 0;
unsigned int fluxoMiliLitros = 0;


int interupcaoSensor = 0;
byte pinoSensor      = 2;
byte pinoBotao       = 3;

float fatorCalibracao = 6;

volatile byte contaPulso;  



void setup()
{
  Serial.begin(9600);
  lcd.setBacklightPin(3,POSITIVE);
  lcd.setBacklight(HIGH); // NOTE: You can turn the backlight off by setting it to LOW instead of HIGH
  lcd.begin(16, 2);
  lcd.clear();
  
  pinMode(pinoSensor, INPUT);
  pinMode(pinoBotao, INPUT);
  digitalWrite(pinoSensor, HIGH);

  contaPulso        = 0;
  vazao             = 0.0;
  totalMililitros   = 0;
  fluxoMiliLitros   = 0;
  tempoAnterior     = 0;
  
  lcd.setCursor(0, 0);
  lcd.print("Sitio Sao Pedro");             // Output separator
  
  attachInterrupt(interupcaoSensor, incpulso, FALLING);

}

void loop ()
{
  /*if((millis() - tempoAnterior) > 1000)    // Only process counters once per second
  { 
    detachInterrupt(interupcaoSensor);

    vazao = ((1000.0 / (millis() - tempoAnterior)) * contaPulso) / fatorCalibracao;

    tempoAnterior = millis();

    fluxoMiliLitros = (vazao / 60) * 1000;
    
    totalMililitros += fluxoMiliLitros;
      
    contaPulso = 0;
    attachInterrupt(interupcaoSensor, incpulso, FALLING);
  }*/
  byte valor = digitalRead(pinoBotao);
  if (valor == HIGH) {
    contaPulso = 0;   
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Sensor de fluxo"); 
  } 
  lcd.setCursor(0, 1);
  lcd.print("Valor:");  
  lcd.setCursor(6, 1);
  lcd.print("         ");
  lcd.setCursor(6, 1);
  lcd.print(contaPulso); 
    
}

void incpulso ()
{
 contaPulso++; //Incrementa a variável de pulsos
}
