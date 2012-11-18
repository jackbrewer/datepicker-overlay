function initClock(){
  clock()
  setInterval(clock, 100)
}

function clock(){

  var now = new Date()
    , ctx = document.getElementById('icon-clock').getContext('2d')
    , baseSize = 60

  // General Setup
  ctx.save()
  ctx.clearRect(0, 0, baseSize, baseSize)
  ctx.translate(baseSize / 2, baseSize / 2)
  ctx.scale(0.5, 0.5)
  ctx.rotate(-Math.PI/2)
  ctx.strokeStyle = '#000'
  ctx.fillStyle = '#000'
  ctx.lineCap = 'round'
  ctx.lineWidth = baseSize * 0.2

  // Get the Time
  var sec = now.getSeconds()
    , min = now.getMinutes()
    , hr  = now.getHours()
    , milli = now.getMilliseconds()

  hr = hr >= 12 ? hr - 12 : hr

  // Write Hours
  ctx.save()
  ctx.rotate( hr*(Math.PI/6) + (Math.PI/360)*min + (Math.PI/21600)*sec )
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(baseSize * 0.5, 0)
  ctx.stroke()
  ctx.restore()

  // Write Minutes
  ctx.save()
  ctx.rotate( (Math.PI/30)*min + (Math.PI/1800)*sec )
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(baseSize * 0.66, 0)
  ctx.stroke()
  ctx.restore()

  // Write seconds
  ctx.save()
  ctx.rotate( (sec + (milli / 999)) * Math.PI/30)
  ctx.lineWidth = baseSize / 10
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(baseSize * 0.7, 0)
  ctx.stroke()
  ctx.restore()

  ctx.globalCompositeOperation = 'source-out'
  ctx.beginPath()
  ctx.fillStyle = '#fff'
  ctx.arc(0, 0, baseSize, 0, Math.PI*2, true)
  ctx.fill()

  ctx.restore()
}