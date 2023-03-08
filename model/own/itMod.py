import subprocess
import threading
import time

from subprocess import call 


#Este script realiza la ejecución cada 3 segundos la obtención del sonido y luego su posterior evaluación. Todo ello durante un tiempo indicado en la función de abajo, 


#Ejecuta la función mientras act.is_set()=True...
def tempo(act):
    #Se repite la ejecución cada X seg indicadops en time.sleep(X) mientras que act sea True (fuera de la funcion cambia el valor)
    while(act.is_set()):    
       
        #Llamamos a la función que graba... 

        result = subprocess.run(["python3", "/Users/jesusvenacampos/Universidad/CUARTO/TFG/Repositorio/TFG/model/own/recordAudio2.py"],shell=False)      

        #Ejecutamos la función que procesa el sonido que acabamos de capturar

        res2 = subprocess.run(["python3", "/Users/jesusvenacampos/Universidad/CUARTO/TFG/Repositorio/TFG/model/analyze.py"],shell=False)

        #Una vez tenemos los nuevos resultados, guardaremos los nuevos análisis en la bd

        res5 = subprocess.run(["python3", "/Users/jesusvenacampos/Universidad/CUARTO/TFG/Repositorio/TFG/model/own/bd/bd.py"],shell=False)

        #Espera de 3 segundos para volver a la ejecución nuevamente

        time.sleep(3) 


#A esta función le pasamos como parámetro la función que ejecutaremos dentro del hilo independiente. 

def params(func):

    #act es un booleano que nos indica si el hilo debe activarse o no 

    act=threading.Event()

    #Activamos el hilo poniendo el valor a true

    act.set()

    #Ejecutamos la función en un hilo idpte, indicar en func la funcion a usar

    t =threading.Thread(target=func,args =(act,))

    #Iniciamos la ejecución

    t.start()

    #Esperamos 30 segundos para parar el bucle(ponemos el valor a False)

    time.sleep(30)

    #Ponemos el valor act a false, paramos la ejecución del hilo

    act.clear()


#Llamada a la función

params(tempo)