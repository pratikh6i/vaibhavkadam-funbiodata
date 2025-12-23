import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MediaGallery = () => {
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    // GitHub API configuration
    const GITHUB_API_URL = 'https://api.github.com/repos/pratikh6i/vaibhavkadam-funbiodata/contents/media';

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        try {
            setLoading(true);
            const response = await fetch(GITHUB_API_URL, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    setError('Media folder not found. Please create a "media" folder in the repository.');
                } else {
                    throw new Error(`GitHub API error: ${response.status}`);
                }
                return;
            }

            const data = await response.json();

            // Filter for supported media types
            const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.webm', '.mov'];
            const mediaFiles = data.filter(file =>
                supportedExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
            ).map(file => ({
                ...file,
                type: file.name.match(/\.(mp4|webm|mov)$/i) ? 'video' : 'image',
                // Use raw GitHub content URL for direct access
                rawUrl: file.download_url,
            }));

            setMedia(mediaFiles);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: 'easeOut' }
        },
    };

    return (
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary-400 text-sm uppercase tracking-widest mb-2 block">
                        Explore More
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4">
                        Life & Interests
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        A visual journey through hobbies, travels, and memorable moments
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mb-4" />
                        <p className="text-slate-400">Loading gallery...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-8 md:p-12 text-center max-w-2xl mx-auto"
                    >
                        <div className="text-5xl mb-4">📸</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Gallery Coming Soon</h3>
                        <p className="text-slate-400 mb-4">{error}</p>
                        <p className="text-slate-500 text-sm">
                            Add images and videos to the <code className="text-primary-400 bg-slate-800 px-2 py-1 rounded">media</code> folder in the GitHub repository to populate this gallery.
                        </p>
                    </motion.div>
                )}

                {/* Gallery Grid */}
                {!loading && !error && media.length > 0 && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                    >
                        {media.map((item, idx) => (
                            <motion.div
                                key={item.sha}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className={`
                  relative overflow-hidden rounded-xl cursor-pointer group
                  ${idx % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''}
                `}
                                onClick={() => setSelectedItem(item)}
                            >
                                <div className="aspect-square w-full h-full bg-slate-800">
                                    {item.type === 'image' ? (
                                        <img
                                            src={item.rawUrl}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="relative w-full h-full">
                                            <video
                                                src={item.rawUrl}
                                                className="w-full h-full object-cover"
                                                muted
                                                loop
                                                playsInline
                                                onMouseEnter={(e) => e.target.play()}
                                                onMouseLeave={(e) => e.target.pause()}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <p className="text-white text-sm font-medium truncate">
                                            {item.name.replace(/\.[^/.]+$/, '')}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && !error && media.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-8 md:p-12 text-center max-w-2xl mx-auto"
                    >
                        <div className="text-5xl mb-4">🖼️</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No Media Yet</h3>
                        <p className="text-slate-400">
                            Add photos and videos to the <code className="text-primary-400 bg-slate-800 px-2 py-1 rounded">media</code> folder to showcase here.
                        </p>
                    </motion.div>
                )}

                {/* Lightbox Modal */}
                <AnimatePresence>
                    {selectedItem && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                            onClick={() => setSelectedItem(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: 'spring', damping: 25 }}
                                className="relative max-w-5xl max-h-[90vh] w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {selectedItem.type === 'image' ? (
                                    <img
                                        src={selectedItem.rawUrl}
                                        alt={selectedItem.name}
                                        className="w-full h-full object-contain rounded-lg"
                                    />
                                ) : (
                                    <video
                                        src={selectedItem.rawUrl}
                                        className="w-full h-full object-contain rounded-lg"
                                        controls
                                        autoPlay
                                    />
                                )}

                                {/* Close button */}
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default MediaGallery;
