import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

export function AppPreview() {
  return (
    <section className="relative">
      <div className="container mx-auto px-4 relative flex flex-col items-center">
        {/* Content */}
      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center mb-20 relative z-10"
        >
          <div className="relative inline-block">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 leading-[1.1] relative z-10 flex flex-col md:block items-center"
            >
              Intelligent Conversations <br /> 
              <span className="inline-flex items-center justify-center pt-2">
                <AnimatedText
                  text="Redefined"
                  textClassName="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/60 italic"
                  underlineClassName="text-primary"
                  underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
                  underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
                  underlineDuration={1}
                />
              </span>
            </motion.h1>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-xl lg:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your ideas into reality with Milkyway AI. Experience the most advanced models in one beautiful interface.
          </motion.p>
        </motion.div>
      </div>
        
        {/* App Preview Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-5xl mx-auto relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <div className="rounded-2xl border bg-card shadow-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] relative">
            <div className="absolute top-0 left-0 w-full h-8 bg-muted/50 border-b flex items-center px-4 gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            {/* Mockup Content */}
            <div className="pt-8 h-full flex flex-col items-center justify-center gap-4 opacity-40 select-none grayscale">
               <div className="w-[80%] h-4 md:h-6 bg-muted rounded-md animate-pulse" />
               <div className="w-[60%] h-4 md:h-6 bg-muted rounded-md animate-pulse" />
               <div className="w-[70%] h-4 md:h-6 bg-muted rounded-md animate-pulse" />
               <div className="mt-4 md:mt-8">
                 <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-primary/20" />
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
