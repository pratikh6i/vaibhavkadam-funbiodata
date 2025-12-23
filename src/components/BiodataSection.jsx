import { motion } from 'framer-motion';

const BiodataSection = () => {
    const biodataFields = [
        {
            category: 'Personal Details',
            icon: '👤',
            fields: [
                { label: 'नाव (Name)', value: 'वैभव कदम (Vaibhav Kadam)' },
                { label: 'वय (Age)', value: '28 वर्षे' },
                { label: 'उंची (Height)', value: "5'8\" (173 cm)" },
                { label: 'जन्मतारीख (Date of Birth)', value: '15 मार्च 1996' },
                { label: 'जन्मवेळ (Birth Time)', value: 'सकाळी 6:30' },
                { label: 'जन्मस्थान (Birth Place)', value: 'पुणे, महाराष्ट्र' },
            ]
        },
        {
            category: 'Education & Career',
            icon: '🎓',
            fields: [
                { label: 'शिक्षण (Education)', value: 'B.Tech Computer Science' },
                { label: 'व्यवसाय (Occupation)', value: 'Software Engineer' },
                { label: 'कंपनी (Company)', value: 'Leading Tech Company' },
                { label: 'वार्षिक उत्पन्न (Annual Income)', value: 'Respectable' },
            ]
        },
        {
            category: 'Family Background',
            icon: '👨‍👩‍👦',
            fields: [
                { label: 'वडिलांचे नाव (Father)', value: 'श्री. [Name] कदम' },
                { label: 'वडिलांचा व्यवसाय', value: '[Occupation]' },
                { label: 'आईचे नाव (Mother)', value: 'सौ. [Name] कदम' },
                { label: 'आईचा व्यवसाय', value: 'गृहिणी / [Occupation]' },
                { label: 'भाऊ-बहीण (Siblings)', value: '[Details]' },
            ]
        },
        {
            category: 'Gotra & Kul',
            icon: '🕉️',
            fields: [
                { label: 'गोत्र (Gotra)', value: '[Gotra Name]' },
                { label: 'कुलदैवत (Kuldaivat)', value: '[Deity Name]' },
                { label: 'राशी (Rashi)', value: 'मीन (Pisces)' },
                { label: 'नक्षत्र (Nakshatra)', value: 'रेवती' },
            ]
        },
        {
            category: 'Expectations',
            icon: '💫',
            fields: [
                { label: 'अपेक्षा (Expectations)', value: 'Educated, family-oriented partner' },
                { label: 'वयोमर्यादा (Age Range)', value: '24-28 वर्षे' },
                { label: 'शिक्षण (Education)', value: 'Graduate / Post Graduate' },
            ]
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
        },
    };

    return (
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 right-10 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary-400 text-sm uppercase tracking-widest mb-2 block">
                        Complete Profile
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4">
                        बायोडाटा
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        A detailed glimpse into life, values, and aspirations
                    </p>
                </motion.div>

                {/* Biodata Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 gap-6 lg:gap-8"
                >
                    {biodataFields.map((section, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="glass-card p-6 md:p-8 hover:border-primary-500/30 transition-all duration-300 group"
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-3xl">{section.icon}</span>
                                <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-primary-400 transition-colors">
                                    {section.category}
                                </h3>
                            </div>

                            {/* Fields */}
                            <div className="space-y-4">
                                {section.fields.map((field, fieldIdx) => (
                                    <div
                                        key={fieldIdx}
                                        className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 py-2 border-b border-slate-700/50 last:border-0"
                                    >
                                        <span className="text-slate-400 text-sm sm:min-w-[140px]">
                                            {field.label}
                                        </span>
                                        <span className="text-white font-medium">
                                            {field.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Quote Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-16 text-center glass-card p-8 md:p-12"
                >
                    <div className="text-5xl mb-4 opacity-50">❝</div>
                    <p className="text-xl md:text-2xl text-slate-300 italic max-w-3xl mx-auto">
                        "संस्कार, शिक्षण आणि प्रेमाच्या पायावर कुटुंब निर्माण करायचे आहे"
                    </p>
                    <p className="text-slate-500 mt-4 text-sm">
                        Looking to build a family on the foundation of values, education, and love
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default BiodataSection;
