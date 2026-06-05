'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const photos = [
    {
        src: '/gallery/1.jpg',
        alt: 'Armandas treniruoja klientą atliekant pritūpimus',
        caption: 'Asmeninės treniruotės',
    },
    {
        src: '/gallery/2.jpg',
        alt: 'Armandas demonstruoja teisingą atsispaudimų techniką',
        caption: 'Technikos korekcija',
    },
    {
        src: '/gallery/3.png',
        alt: 'Reabilitacinis tempimas su klientu',
        caption: 'Reabilitacija po traumų',
    },
    {
        src: '/gallery/4.png',
        alt: 'Armandas — asmeninis treneris portretas',
        caption: 'Asmeninis treneris',
    },
    {
        src: '/gallery/5.jpg',
        alt: 'BKI čempionato apdovanojimas',
        caption: 'BKI Lietuvos čempionas',
    },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export function PhotoGallery() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const openLightbox = useCallback((index: number) => setActiveIndex(index), [])
    const closeLightbox = useCallback(() => setActiveIndex(null), [])

    const goNext = useCallback(() => {
        setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % photos.length))
    }, [])

    const goPrev = useCallback(() => {
        setActiveIndex((prev) =>
            prev === null ? photos.length - 1 : (prev - 1 + photos.length) % photos.length
        )
    }, [])

    useEffect(() => {
        if (activeIndex === null) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox()
            if (e.key === 'ArrowRight') goNext()
            if (e.key === 'ArrowLeft') goPrev()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [activeIndex, closeLightbox, goNext, goPrev])

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        if (activeIndex !== null) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [activeIndex])

    return (
        <section className="bg-background py-24 px-6 sm:px-10 lg:px-16" aria-labelledby="gallery-heading">
            <div className="max-w-7xl mx-auto">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                    className="mb-14"
                >
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4">
                        <span className="size-1.5 rounded-full bg-primary inline-block" />
                        Nuotraukų galerija
                    </span>
                    <h2
                        id="gallery-heading"
                        className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground text-balance"
                    >
                        Darbo akimirkos
                    </h2>
                    <p className="mt-4 text-muted-foreground text-base leading-relaxed max-w-xl text-pretty">
                        Treniruotės, reabilitacija, pasiekimai — keli kadrai iš kasdienio darbo su klientais.
                    </p>
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
                >
                    {photos.map((photo, index) => (
                        <motion.button
                            key={photo.src}
                            variants={itemVariants}
                            onClick={() => openLightbox(index)}
                            className={[
                                'relative overflow-hidden rounded-xl group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                                // First item is tall, spanning 2 rows on desktop
                                index === 0 ? 'md:row-span-2' : '',
                                // Aspect ratios per slot
                                index === 0 ? 'aspect-[4/5] md:aspect-auto' : 'aspect-square',
                            ].join(' ')}
                            aria-label={`Atidaryti nuotrauką: ${photo.caption}`}
                        >
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                sizes="(max-width: 768px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300" />
                            <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-sm font-medium text-foreground bg-background/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                                    {photo.caption}
                                </span>
                            </div>
                            {/* Subtle border */}
                            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5" />
                        </motion.button>
                    ))}
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {activeIndex !== null && (
                    <motion.div
                        key="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
                        onClick={closeLightbox}
                    >
                        {/* Image container — stop propagation so clicking image doesn't close */}
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 0.93 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="relative w-full max-w-4xl max-h-[85vh] mx-4 aspect-square sm:aspect-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80">
                                <Image
                                    src={photos[activeIndex].src}
                                    alt={photos[activeIndex].alt}
                                    fill
                                    sizes="(max-width: 1280px) 100vw, 1024px"
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            {/* Caption */}
                            <div className="mt-4 flex items-center justify-between px-1">
                                <p className="text-sm text-muted-foreground">
                                    <span className="text-foreground font-medium">{photos[activeIndex].caption}</span>
                                    &nbsp;&mdash;&nbsp;
                                    {activeIndex + 1} / {photos.length}
                                </p>
                            </div>
                        </motion.div>

                        {/* Close */}
                        <button
                            onClick={closeLightbox}
                            aria-label="Uždaryti"
                            className="absolute top-5 right-5 size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <X className="size-5" />
                        </button>

                        {/* Prev */}
                        <button
                            onClick={(e) => { e.stopPropagation(); goPrev() }}
                            aria-label="Ankstesnė nuotrauka"
                            className="absolute left-4 top-1/2 -translate-y-1/2 size-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <ChevronLeft className="size-6" />
                        </button>

                        {/* Next */}
                        <button
                            onClick={(e) => { e.stopPropagation(); goNext() }}
                            aria-label="Kita nuotrauka"
                            className="absolute right-4 top-1/2 -translate-y-1/2 size-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <ChevronRight className="size-6" />
                        </button>

                        {/* Dot indicators */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                            {photos.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={(e) => { e.stopPropagation(); setActiveIndex(i) }}
                                    aria-label={`Nuotrauka ${i + 1}`}
                                    className={[
                                        'rounded-full transition-all duration-200',
                                        i === activeIndex
                                            ? 'size-2.5 bg-primary'
                                            : 'size-1.5 bg-white/30 hover:bg-white/60',
                                    ].join(' ')}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
