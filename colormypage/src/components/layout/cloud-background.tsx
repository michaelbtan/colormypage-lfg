"use client"

import { useEffect, useRef } from "react"

interface Cloud {
  x: number
  y: number
  width: number
  height: number
  speed: number
  opacity: number
}

export default function CloudBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const vw = Math.min(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const vh = Math.min(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      canvas.width = vw;
      canvas.height = vh;
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Cloud array
    const clouds: Cloud[] = []

    // Create initial clouds
    const createCloud = (x?: number): Cloud => ({
      x: x ?? Math.random() * canvas.width,
      y: Math.random() * (canvas.height * 0.6),
      width: 80 + Math.random() * 120,
      height: 40 + Math.random() * 60,
      speed: 0.2 + Math.random() * 0.8,
      opacity: 0.3 + Math.random() * 0.4,
    })

    // Initialize clouds
    for (let i = 0; i < 8; i++) {
      clouds.push(createCloud())
    }

    // Draw cloud function
    const drawCloud = (cloud: Cloud) => {
      ctx.save()
      ctx.globalAlpha = cloud.opacity
      ctx.fillStyle = "#ffffff"

      const x = cloud.x
      const y = cloud.y
      const w = cloud.width
      const h = cloud.height

      ctx.beginPath()
      // Main cloud body
      ctx.arc(x, y, h * 0.5, 0, Math.PI * 2)
      ctx.arc(x + w * 0.25, y, h * 0.6, 0, Math.PI * 2)
      ctx.arc(x + w * 0.5, y, h * 0.5, 0, Math.PI * 2)
      ctx.arc(x + w * 0.75, y, h * 0.4, 0, Math.PI * 2)
      ctx.arc(x + w, y, h * 0.3, 0, Math.PI * 2)

      // Additional puffs for more realistic look
      ctx.arc(x + w * 0.15, y - h * 0.2, h * 0.3, 0, Math.PI * 2)
      ctx.arc(x + w * 0.6, y - h * 0.15, h * 0.35, 0, Math.PI * 2)
      ctx.arc(x + w * 0.85, y - h * 0.1, h * 0.25, 0, Math.PI * 2)

      ctx.fill()
      ctx.restore()
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with light blue background
      ctx.fillStyle = "oklch(0.95 0.08 230)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw clouds
      clouds.forEach((cloud, index) => {
        cloud.x += cloud.speed

        // Reset cloud position when it goes off screen
        if (cloud.x > canvas.width + cloud.width) {
          clouds[index] = createCloud(-cloud.width)
        }

        drawCloud(cloud)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none block"
      style={{ width: '100%' }} 
    />
  )
}
