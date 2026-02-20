'use client'

import { useEffect, useRef } from 'react'

interface Column {
  value: number
}

/**
 * 黑客帝国代码雨效果组件
 * 复现电影《黑客帝国》中经典的绿色字符流下落动画
 */
export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const columnsRef = useRef<Column[]>([])

  // 字符集：日文片假名 + 拉丁字母 + 数字
  const katakana =
    'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブペエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン'
  const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const nums = '0123456789'
  const alphabet = katakana + latin + nums

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 调整画布尺寸并初始化列
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const fontSize = 16
      const columns = Math.floor(canvas.width / fontSize)
      columnsRef.current = Array(columns)
        .fill(0)
        .map(() => ({
          value: Math.random() * canvas.height,
        }))
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 绘制代码雨动画
    const drawMatrix = () => {
      // 用半透明黑色覆盖画布，产生尾迹效果
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const fontSize = 16
      // 黑客帝国绿色
      ctx.fillStyle = '#0F0'
      ctx.font = `bold ${fontSize}px monospace`

      columnsRef.current.forEach((column, i) => {
        // 随机选择字符
        const text = alphabet.charAt(
          Math.floor(Math.random() * alphabet.length)
        )
        const x = i * fontSize
        const y = column.value * fontSize

        // 当字符流到达底部时，有 2.5% 概率重置到顶部
        if (y > canvas.height && Math.random() > 0.975) {
          column.value = 0
        }

        ctx.fillText(text, x, y)

        // 列下移一个字符位置
        column.value += 0.25
      })

      animationRef.current = requestAnimationFrame(drawMatrix)
    }

    drawMatrix()

    // 清理：移除事件监听器和取消动画帧
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
      style={{ background: '#000' }}
    />
  )
}
