import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with aerial view */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/aerial_view.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-teal-700/80"></div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-32 right-16 w-48 h-48 bg-teal-300/20 rounded-full blur-2xl"
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Main login card */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative mb-6"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/30 flex items-center justify-center backdrop-blur-sm">
                  <img
                    src="/bird.jpeg"
                    alt="Bird Logo"
                    className="w-16 h-16 rounded-full object-cover shadow-lg"
                  />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-fuchsia-500/30 to-blue-500/30 rounded-full blur-lg -z-10"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 rounded-full blur-xl -z-20"></div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-3xl font-bold text-white mb-2 tracking-tight"
              >
                Welcome Back
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-white/80 text-lg"
              >
                Sign in to your Sandpiper Run account
              </motion.p>
            </div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-500/20 border border-red-400/50 rounded-xl p-4 backdrop-blur-sm"
                >
                  <p className="text-red-100 text-sm font-medium">{error}</p>
                </motion.div>
              )}

              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-white/90">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all duration-300 backdrop-blur-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-white/90">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/50" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all duration-300 backdrop-blur-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-xl hover:from-teal-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center space-x-2 group"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* Footer links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
             <div className="mt-8 space-y-4">
               <div className="text-center">
                 <Link
                   to="/forgot-password"
                   className="text-teal-300 hover:text-teal-200 text-sm font-medium transition-colors duration-200"
                 >
                   Forgot your password?
                 </Link>
               </div>
               
               <div className="relative">
                 <div className="absolute inset-0 flex items-center">
                   <div className="w-full border-t border-white/20"></div>
                 </div>
                 <div className="relative flex justify-center text-sm">
                   <span className="px-4 bg-transparent text-white/60">New to Sandpiper Run?</span>
                 </div>
               </div>

               <div className="text-center">
                 <Link
                   to="/register"
                   className="inline-flex items-center space-x-2 text-white hover:text-teal-300 font-medium transition-colors duration-200 group"
                 >
                   <span>Create an account</span>
                   <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                 </Link>
               </div>
             </div>
           </motion.div>
          </div>

          {/* Decorative bottom element */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
           <div className="mt-8 text-center">
             <p className="text-white/60 text-sm">
               © 2024 Sandpiper Run Community
             </p>
           </div>
         </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login