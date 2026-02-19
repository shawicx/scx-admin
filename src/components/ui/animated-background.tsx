'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number
}

interface GeometricShape {
  x: number
  y: number
  rotation: number
  rotationSpeed: number
  size: number
  opacity: number
  type: 'triangle' | 'hexagon' | 'circle' | 'line'
  color: string
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const shapesRef = useRef<GeometricShape[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置canvas尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 初始化粒子
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: ['#8b5cf6', '#06b6d4', '#3b82f6', '#ffffff'][
            Math.floor(Math.random() * 4)
          ],
          life: 0,
          maxLife: Math.random() * 200 + 100,
        })
      }
    }

    // 初始化几何形状
    const initShapes = () => {
      shapesRef.current = []
      for (let i = 0; i < 8; i++) {
        shapesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          size: Math.random() * 100 + 50,
          opacity: Math.random() * 0.3 + 0.1,
          type: ['triangle', 'hexagon', 'circle', 'line'][
            Math.floor(Math.random() * 4)
          ] as any,
          color: ['#8b5cf6', '#06b6d4', '#3b82f6'][
            Math.floor(Math.random() * 3)
          ],
        })
      }
    }

    initParticles()
    initShapes()

    // 绘制粒子
    const drawParticles = () => {
      particlesRef.current.forEach(particle => {
        // 更新粒子位置
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        // 边界检测
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // 生命周期管理
        if (particle.life > particle.maxLife) {
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          particle.life = 0
        }

        // 绘制粒子
        ctx.save()
        ctx.globalAlpha =
          particle.opacity * (1 - particle.life / particle.maxLife)
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // 添加光晕效果
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        )
        gradient.addColorStop(0, particle.color + '40')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
    }

    // 绘制几何形状
    const drawShapes = () => {
      shapesRef.current.forEach(shape => {
        shape.rotation += shape.rotationSpeed

        ctx.save()
        ctx.globalAlpha = shape.opacity
        ctx.translate(shape.x, shape.y)
        ctx.rotate(shape.rotation)
        ctx.strokeStyle = shape.color
        ctx.lineWidth = 2

        switch (shape.type) {
          case 'triangle':
            ctx.beginPath()
            ctx.moveTo(0, -shape.size / 2)
            ctx.lineTo(-shape.size / 2, shape.size / 2)
            ctx.lineTo(shape.size / 2, shape.size / 2)
            ctx.closePath()
            ctx.stroke()
            break

          case 'hexagon':
            ctx.beginPath()
            for (let i = 0; i < 6; i++) {
              const angle = (i * Math.PI) / 3
              const x = (Math.cos(angle) * shape.size) / 2
              const y = (Math.sin(angle) * shape.size) / 2
              if (i === 0) ctx.moveTo(x, y)
              else ctx.lineTo(x, y)
            }
            ctx.closePath()
            ctx.stroke()
            break

          case 'circle':
            ctx.beginPath()
            ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2)
            ctx.stroke()
            break

          case 'line':
            ctx.beginPath()
            ctx.moveTo(-shape.size / 2, 0)
            ctx.lineTo(shape.size / 2, 0)
            ctx.stroke()
            break
        }
        ctx.restore()
      })
    }

    // 绘制连接线
    const drawConnections = () => {
      const particles = particlesRef.current
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.save()
            ctx.globalAlpha = ((150 - distance) / 150) * 0.2
            ctx.strokeStyle = '#8b5cf6'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
    }

    // 绘制网格
    const drawGrid = () => {
      ctx.save()
      ctx.globalAlpha = 0.1
      ctx.strokeStyle = '#8b5cf6'
      ctx.lineWidth = 1

      const gridSize = 50
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
      ctx.restore()
    }

    // 主动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 绘制渐变背景
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      )
      gradient.addColorStop(0, '#0f172a')
      gradient.addColorStop(0.5, '#1e293b')
      gradient.addColorStop(1, '#000000')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawGrid()
      drawShapes()
      drawParticles()
      drawConnections()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  )
}
