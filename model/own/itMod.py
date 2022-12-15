import subprocess
import threading
import time


#Este script realiza la ejecución cada 3 segundos la obtención del sonido y luego su posterior evaluación.


#Ejecuta la función mientras act.is_set()=True...
def tempo(act):
    #Se repite la ejecución cada X seg indicadops en time.sleep(X) mientras que act sea True (fuera de la funcion cambia el valor)
    while(act.is_set()):
        print("Ejecutando el bucle")
        
        
        #Llamamos a la función que graba... 
        result = subprocess.run('python own/recordAudio2.py',shell=False)

        #Antes de analizar borramos el archivo donde se guaradan los resultados, para no duplicarlos en la bd
      

        #Ejecutamos la función que procesa el sonido que acabamos de capturar
        res2 = subprocess.run('python analyze.py',shell=False)

        #Una vez tenemos los nuevos resultados, guardaremos los nuevos análisis en la bd

        res5 = subprocess.run('python own/bd/bd.py',shell=False)

        #Espera de 3 segundos para volver a la ejecución nuevamente
        time.sleep(3) 

def params(func):
    #act es un booleano que nos indica si el hilo debe activarse o no 
    act=threading.Event()

    #activamos el hilo poniendo el valor a true
    act.set()

    #Ejecutamos la función en un hilo idpte, indicar en func la funcion a usar
    t =threading.Thread(target=func,args =(act,))

    #Iniciamos la ejecución
    t.start()


    #Esperamos 30 segundos para parar el bucle(ponemos el valor a False)
    time.sleep(30)

    #Ponemos el valor act a false, paramos la ejecución del hilo
    act.clear()

    print("Última ejecución del bucle.")

params(tempo)