from http import client
import pyaudio
import wave



trozo = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100
RECORD_SECONDS = 5


p = pyaudio.PyAudio()

stream = p.open(format=FORMAT,
                channels=CHANNELS,
                rate=RATE,
                input=True,
                frames_per_buffer=trozo)

print("* recording...")

frames = []

for i in range(0, int(RATE / trozo * RECORD_SECONDS)):
    data = stream.read(trozo)
    frames.append(data)


print("* done recording...")

stream.stop_stream()
stream.close()
p.terminate()

#Guarda el archivo de audio

wf = wave.open('/Users/jesusvenacampos/Universidad/CUARTO/TFG/Repositorio/TFG/model/example/output.wav','wb')
wf.setnchannels(CHANNELS)
wf.setsampwidth(p.get_sample_size(FORMAT))
wf.setframerate(RATE)
wf.writeframes(b''.join(frames))
wf.close()












