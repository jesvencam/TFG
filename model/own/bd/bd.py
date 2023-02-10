import sqlite3
import time 

def lecturaDatos():
    data=[]
    birds=set()
#Abrimos el archivo que guarda el análisis del sonido
                                                            #ESTE ARCHIVO HAY QUE CAMBIARLO AHORA MISMO ESTA EL DE PRUEBA CON UN AUDIO BUENO. 
    with open("/Users/jesusvenacampos/Universidad/CUARTO/TFG/Repositorio/TFG/model/example/soundscape.BirdNET.selection.table.txt","r") as archivo:

        for l in archivo.readlines():
            
            #Lista de tuplas con todos los datos obtenidos
            lsf=l.replace("\n","").split("\t")
            del lsf[0:3]
            del lsf[2:4]
            print(lsf)
            datetime = time.strftime("%m/%d/%Y, %H:%M:%S")
            lsf.append(datetime)
            print(lsf)

            data.append(lsf)
            birds.add((lsf[3],lsf[2]))
            

    #En la lista quedará:  begintime, endtime, speciescode, commonname, confidence.


    #Lista de 1 tupla con los identificadores de los elementos, por si fuera necesario saber que es cada cosa. 
    
    info = data[0]

    #Elimino el primer elemento de data que es una tupla con los identificadores de los parámetros. 
    del data[0]
    print('fin lectura datos')
    
    birds2 = list(list(x) for x in birds )
    return data,birds2


def dataBase(data,birds):
    #Creamos una conexión a la base de datos, si no esta creada, la inicializa 
    conex = sqlite3.connect("/Users/jesusvenacampos/Universidad/CUARTO/TFG/Repositorio/TFG/model/own/bd/dataBase")
    cursor = conex.cursor()

    print("En la BD")
    cursor.execute("CREATE TABLE IF NOT EXISTS birds(id_bird integer PRIMARY KEY AUTOINCREMENT,name TEXT UNIQUE ,speciesCode VARCHAR(30))")

    sql_sentence="CREATE TABLE IF NOT EXISTS datas(id_data integer PRIMARY KEY AUTOINCREMENT,beginTime VARCHAR(30),endTime VARCHAR(30),speciesCode VARCHAR(30),commonName VARCHAR(30),confidence VARCHAR(30),datetime DATETIME,FOREIGN KEY(speciesCode) REFERENCES birds(speciesCode))"
    cursor.execute(sql_sentence)

    print('Tablas creadas')
    
    #Intentamos crear la tabla en la base de datos, si existe no la crea, el try es pa ra controlar una excepción. 

    #Controlamos la excepción en el caso de que el pájaro a añadir ya se encuentre en la bd

    for x in birds:
       
        try:
            print('Insertando datos PAJARO')
            cursor.executemany("INSERT INTO birds(name,speciesCode) VALUES(?,?)",[x])
            print('DATO INSERTADO')
        except:
            print("pajaro añadido en otra ocasión")

    print('Insertando datos generales')
    
    cursor.executemany("INSERT INTO datas(beginTime,endTime,speciesCode,commonName,confidence,datetime) VALUES (?,?,?,?,?,?)",data)



    #Para hacer el cambio persistente
    conex.commit()

    #Para cerrar la conexión con la base de datos.
    conex.close()

    #Borro el archivo con el análisis para no tener duplicaciones innecesarias, aunque tamb lo borro en el itMOd
    file = open('/Users/jesusvenacampos/Universidad/CUARTO/TFG/Repositorio/TFG/model/example/output.BirdNET.selection.table.txt','w')
    file.close()

    print('Datos insertados en la base de datos')

if __name__ == '__main__':

    
    data,birds = lecturaDatos()
    dataBase(data,birds)