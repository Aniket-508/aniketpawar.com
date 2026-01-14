let audioContext: AudioContext | null = null

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext()
  }
  if (audioContext.state === "suspended") {
    audioContext.resume()
  }
  return audioContext
}

export const sounds = {
  click: () => {
    try {
      const ctx = getAudioContext()
      const t = ctx.currentTime

      const noise = ctx.createBufferSource()
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.008, ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 50)
      }
      noise.buffer = buf

      const filter = ctx.createBiquadFilter()
      filter.type = "bandpass"
      filter.frequency.value = 4000 + Math.random() * 1000
      filter.Q.value = 3

      const gain = ctx.createGain()
      gain.gain.value = 0.5 + Math.random() * 0.15

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      noise.start(t)
    } catch {}
  },
}
