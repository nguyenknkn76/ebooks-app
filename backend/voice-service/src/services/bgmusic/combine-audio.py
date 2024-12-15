from pydub import AudioSegment

def combine_audio():
  speech = AudioSegment.from_file("src/services/bgmusic/audio/output4.mp3")
  background_music = AudioSegment.from_file("src/services/bgmusic/audio/rfiu.mp3")
  combined = background_music.overlay(speech, position=0)
  combined.export("combined_audio.mp3", format="mp3")
  print("audio combined successfully ! <3")

if __name__ == "__main__":
    combine_audio()
