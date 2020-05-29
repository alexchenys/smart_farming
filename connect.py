# -*- coding: utf-8 -*-
"""
Created on Tue May 26 02:50:49 2020

@author: USER
"""
import serial  # 引用pySerial模組
import sqlite3

conn = sqlite3.connect('data.db')

print ("Opened database successfully");
conn.execute('''CREATE TABLE IF NOT EXISTS DASH
       (no            TEXT    NOT NULL,
       Humidity       TEXT    NOT NULL,
       Celsius        TEXT    NOT NULL,
       Fahrenheit     TEXT    NOT NULL,
       Dirt           TEXT    NOT NULL,
       Water          TEXT    NOT NULL,      
       Rain           TEXT    NOT NULL);''')
       
COM_PORT = 'COM3'    # 指定通訊埠名稱
BAUD_RATES = 9600    # 設定傳輸速率
ser = serial.Serial(COM_PORT, BAUD_RATES)   # 初始化序列通訊埠
count = 0
dataList = ["0","0","0","0","0","0"]
conn.execute("INSERT INTO DASH (no, Humidity,Celsius,Fahrenheit,Dirt,Water,Rain) VALUES(1," + dataList[0] +","+ dataList[1] +","+  dataList[2] +","+ dataList[3] +","+ dataList[4] +","+ dataList[5]+")");
conn.commit()
dataList = []

try:
    while True:
        while ser.in_waiting:          # 若收到序列資料…
            data_raw = ser.readline()  # 讀取一行
            data = data_raw.decode()   # 用預設的UTF-8解碼
            data = data.rstrip()
            count += 1
            
            if(count <= 7):
                dataList.append(data)
                if(count == 6):
                    #print(dataList)
                    conn.execute("UPDATE DASH set Humidity =" + dataList[0] + ",Celsius =" + dataList[1] + ",Fahrenheit =" + dataList[2] + ",Dirt =" + dataList[3] + ",Water =" + dataList[4] + ",Rain =" + dataList[5] + " WHERE no = 1")
                    conn.commit()
                    print('')
                    count = 0
                    dataList = []
            
 
except KeyboardInterrupt:
    ser.close()    # 清除序列通訊物件
    conn.execute("DELETE FROM DASH WHERE no = 1")
    conn.commit()
    print('再見！')
