'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Bitcoin, BookOpen, Globe, LogIn, UserPlus } from "lucide-react"
import { motion } from "framer-motion"

export default function HomePage() {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('zh')) {
      setLanguage('zh')
    } else {
      setLanguage('en')
    }
  }, [])

  const content = {
    zh: {
      title: "KOL List",
      subtitle: "连接最具影响力的华语加密货币意见领袖，为您的项目打造强大的市场影响力",
      exploreButton: "探索 KOL资源",
      learnMoreButton: "了解更多",
      features: [
        {
          title: "专业的币圈资源",
          description: "覆盖币圈最具影响力的KOL，为您的项目提供精准的营销推广服务",
          icon: Bitcoin
        },
        {
          title: "全球化视野",
          description: "连接全球华语用户，助力您的项目在国际市场获得更大影响力",
          icon: Globe
        },
        {
          title: "深度内容服务",
          description: "提供专业的内容策划和创作，确保传播效果最大化",
          icon: BookOpen
        }
      ],
      documentation: "文档",
      explore: "探索",
      signUp: "注册",
      login: "登录"
    },
    en: {
      title: "KOL List",
      subtitle: "Connect with the most influential Chinese-speaking cryptocurrency KOLs to build powerful market influence for your project",
      exploreButton: "Explore KOL Resources",
      learnMoreButton: "Learn More",
      features: [
        {
          title: "Professional Crypto Resources",
          description: "Cover the most influential KOLs in the crypto space, providing precise marketing and promotion services for your project",
          icon: Bitcoin
        },
        {
          title: "Global Vision",
          description: "Connect with Chinese-speaking users worldwide, helping your project gain greater influence in the international market",
          icon: Globe
        },
        {
          title: "In-depth Content Services",
          description: "Provide professional content planning and creation to maximize communication effectiveness",
          icon: BookOpen
        }
      ],
      documentation: "Docs",
      explore: "Explore",
      signUp: "Sign Up",
      login: "Login"
    }
  }

  const t = content[language]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    const chinese = "比特币 以太坊 区块链 加密货币 数字资产 投资 交易 KOL 意见领袖 社交媒体 营销 推广"
    const chars = chinese.split('')
    
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 20, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#0f0'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full opacity-30"
      />
      
      <div className="absolute top-4 right-4 z-20">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
          className="bg-black/50 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
        >
          {language === 'zh' ? 'EN' : '中文'}
        </Button>
      </div>
      
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">
          {t.title}
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-center max-w-3xl mx-auto text-gray-300">
          {t.subtitle}
        </p>
        <div className="flex gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
              {t.exploreButton}
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-700/90 hover:to-purple-700/90 transition-all duration-300 text-white border-none">
              {t.learnMoreButton}
            </Button>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          {t.features.map((feature, index) => (
            <div key={index} className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <feature.icon className="w-12 h-12 mb-4 text-blue-500" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex gap-6">
            <Link href="/documentation" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <BookOpen className="w-5 h-5" />
              <span>{t.documentation}</span>
            </Link>
            <Link href="/explore" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <Globe className="w-5 h-5" />
              <span>{t.explore}</span>
            </Link>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300">
              <UserPlus className="w-5 h-5 mr-2" />
              {t.signUp}
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
              <LogIn className="w-5 h-5 mr-2" />
              {t.login}
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}
