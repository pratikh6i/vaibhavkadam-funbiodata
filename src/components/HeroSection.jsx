import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const HeroSection = ({ onScrollComplete }) => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Fade out welcome text as user scrolls
    const welcomeOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const welcomeScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    // Photo animation: center -> right side
    const photoOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
    const photoScale = useTransform(scrollYProgress, [0.15, 0.4], [0.5, 1]);
    const photoX = useTransform(scrollYProgress, [0.3, 0.6], ['0%', '50%']);

    // Biodata reveal
    const biodataOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
    const biodataX = useTransform(scrollYProgress, [0.5, 0.7], ['-50px', '0px']);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[300vh]"
        >
            {/* Sticky container */}
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary-500/5 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary-500/5 rounded-full" />
                </div>

                {/* Welcome Text */}
                <motion.div
                    style={{ opacity: welcomeOpacity, scale: welcomeScale }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-10"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-center"
                    >
                        <p className="text-primary-400 text-lg md:text-xl tracking-widest uppercase mb-4 font-light">
                            Welcome to
                        </p>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold gradient-text mb-6 text-shadow">
                            Vaibhav Kadam
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl max-w-md mx-auto mb-8">
                            A journey of traditions, dreams & connections
                        </p>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-primary-400"
                        >
                            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            <span className="text-sm mt-2 block text-slate-500">Scroll to explore</span>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Profile Photo */}
                <motion.div
                    style={{
                        opacity: photoOpacity,
                        scale: photoScale,
                        x: photoX,
                    }}
                    className="absolute right-0 md:right-10 lg:right-20 z-20"
                >
                    <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-teal-400 rounded-full blur-2xl opacity-30 scale-110" />

                        {/* Photo container */}
                        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary-400/30 glow">
                            {/* Placeholder - Replace with actual photo */}
                            <div className="w-full h-full bg-gradient-to-br from-primary-600 to-teal-500 flex items-center justify-center">
                                <span className="text-white text-6xl font-bold">VK</span>
                            </div>
                        </div>

                        {/* Decorative ring */}
                        <div className="absolute -inset-4 border-2 border-primary-500/20 rounded-full animate-pulse" />
                    </div>
                </motion.div>

                {/* Biodata Preview */}
                <motion.div
                    style={{
                        opacity: biodataOpacity,
                        x: biodataX,
                    }}
                    className="absolute left-4 md:left-10 lg:left-20 top-1/2 -translate-y-1/2 z-20 max-w-lg"
                >
                    <div className="glass-card p-8 md:p-10">
                        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
                            Biodata
                        </h2>
                        <div className="space-y-4 text-slate-300">
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-primary-400 rounded-full" />
                                <span className="text-slate-400">Name:</span>
                                <span className="font-medium text-white">Vaibhav Kadam</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-primary-400 rounded-full" />
                                <span className="text-slate-400">Looking for:</span>
                                <span className="font-medium text-white">Life Partner</span>
                            </div>
                        </div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-primary-400 mt-6 text-sm"
                        >
                            ↓ Scroll for complete details
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
