import React from 'react'
import { File, CircleCheck, Github, Coffee } from 'lucide-react' // Fixed import names
import { useState, useRef, useEffect } from 'react'
import toast from 'react-hot-toast'
import JSZip from 'jszip'
import gsap from 'gsap'
import { PDFDocument } from 'pdf-lib'

const Home = () => {
    const [cbz, setCbz] = useState(null)
    const [isConverting, setIsConverting] = useState(false)
    const animate = useRef()

    useEffect(() => {
        const animation = gsap.fromTo(animate.current, {
            scale: 1,
        }, {         
            scale: 1.2,
            duration: 0.8,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut",
        })

        // Cleanup animation on component unmount
        return () => {
            animation.kill()
        }
    }, [])

    function HandleUploadedFile(e) {
        const UserUploadedFile = e.target.files[0]

        if (!UserUploadedFile) {
            toast.error("Please select a file")
            return
        }

        // Validate file extension
        if (!UserUploadedFile.name.toLowerCase().endsWith('.cbz')) {
            toast.error("Please select a .cbz file")
            return
        }

        setCbz(UserUploadedFile)
        toast.success("File uploaded successfully!")
    }

    async function HandleCbzFile() {
        if (!cbz) {
            toast.error("Please upload a CBZ file first")
            return
        }

        setIsConverting(true)
        toast.loading("Converting to PDF...")

        try {
            const cbzFileData = await JSZip.loadAsync(cbz)
            
            // Get image files sorted by name for proper order
            const imageFiles = Object.keys(cbzFileData.files)
                .filter(name => /\.(jpg|jpeg|png|webp)$/i.test(name))
                .sort() // Sort to maintain proper page order

            if (imageFiles.length === 0) {
                toast.error("No images found in the CBZ file")
                setIsConverting(false)
                return
            }

            const pdfDoc = await PDFDocument.create()
            
            for (let i = 0; i < imageFiles.length; i++) {   
                const imageName = imageFiles[i]
                const imageData = await cbzFileData.files[imageName].async('uint8array')
                let image

                // Get file extension
                const ext = imageName.toLowerCase().split('.').pop()
                
                if (ext === 'jpg' || ext === 'jpeg') {
                    image = await pdfDoc.embedJpg(imageData)
                } else if (ext === 'png') {
                    image = await pdfDoc.embedPng(imageData)
                } else if (ext === 'webp') {
                    // Note: pdf-lib doesn't support webp directly
                    // You might need to convert webp to png/jpg first
                    toast.error(`Unsupported image format: .${ext}`)
                    continue
                } else {
                    toast.error(`Unsupported image format: .${ext}`)
                    continue
                }
                
                const page = pdfDoc.addPage([image.width, image.height])
                page.drawImage(image, {
                    x: 0,
                    y: 0,
                    width: image.width,
                    height: image.height
                })
            } 
            
            const pdfBytes = await pdfDoc.save()
            const blob = new Blob([pdfBytes], {
                type: 'application/pdf'
            })

            // Create download link
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${cbz.name.replace('.cbz', '')}.pdf`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            
            // Clean up URL object
            URL.revokeObjectURL(url)

            toast.dismiss()
            toast.success("PDF created successfully!")
        } catch (error) {
            console.error('Conversion error:', error)
            toast.dismiss()
            toast.error("Failed to convert file. Please try again.")
        } finally {
            setIsConverting(false)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex justify-center items-center p-4'>
            <div className='bg-white h-auto max-h-[90vh] w-full max-w-[500px] rounded-2xl p-5 shadow-2xl overflow-y-auto'>
                <div>
                    <div className='w-full text-center flex items-center justify-center gap-4 mb-4'>
                        <div className='flex items-center'>
                            <File size={80} className='text-blue-600' />
                        </div>
                        <div>
                            <h1 className='font-bold text-[2rem] text-gray-800'>
                                Cbz to Pdf Converter
                            </h1>
                            <p className='text-[1.2rem] text-gray-600 font-semibold'>
                                fast • secure • reliable
                            </p>
                        </div>
                    </div>

                    <div className='text-center mb-6 font-bold text-gray-600'>
                        <h2 className='text-lg mb-2'>
                            Convert your comic files directly in your browser
                        </h2>
                        <p className='text-gray-500'>
                            no uploads • no tracking • no ads
                        </p>
                    </div>

                    <div className='p-4 bg-gray-50 rounded-xl shadow-inner'>
                        <div className='w-full'>
                            <div className='mb-4'>
                                <label className='block w-full p-4 text-center border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer'>
                                    <input 
                                        onChange={HandleUploadedFile} 
                                        className='hidden' 
                                        type="file" 
                                        accept='.cbz'
                                        disabled={isConverting}
                                    />
                                    <span className='text-gray-700'>
                                        {cbz ? `Selected: ${cbz.name}` : 'Click to select CBZ file'}
                                    </span>
                                </label>
                                <p className='text-xs text-gray-500 mt-2 text-center'>
                                    Supported format: CBZ (Comic Book Archive)
                                </p>
                            </div>

                            <div className='mt-4 mb-4'>
                                <button 
                                    onClick={HandleCbzFile}
                                    disabled={isConverting || !cbz}
                                    className={`w-full text-white p-3 rounded-lg text-lg font-semibold transition-all ${
                                        isConverting || !cbz 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                                    }`}
                                >
                                    {isConverting ? 'Converting...' : 'Convert To PDF'}
                                </button>
                            </div>
                        </div>

                        <div className='w-full'>
                            <ul className='w-full space-y-2'>
                                <li className='w-full flex items-center gap-2 text-gray-700'>
                                    <CircleCheck className='text-green-500 flex-shrink-0' size={20}/>
                                    <span>Files never leave your browser</span>
                                </li>
                                <li className='w-full flex items-center gap-2 text-gray-700'>
                                    <CircleCheck className='text-green-500 flex-shrink-0' size={20}/>
                                    <span>Fast conversion</span>
                                </li>
                                <li className='w-full flex items-center gap-2 text-gray-700'>
                                    <CircleCheck className='text-green-500 flex-shrink-0' size={20}/>
                                    <span>Files are auto-deleted</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div className='w-full mt-8'>
                    <div className='w-full flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-600'>
                        <a 
                            href='https://github.com/EmmanuelChigwende'
                            className='flex items-center gap-1 hover:text-blue-600 transition-colors'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <Github size={16}/>
                            <span>Open source project on GitHub</span>
                        </a>
                        <p>
                            © 2026 Cbz to Pdf Converter
                        </p>
                    </div>

                    <div className='w-full flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 text-sm'>
                        <a 
                            href='https://github.com/EmmanuelChigwende'
                            className='text-gray-600 hover:text-blue-600 transition-colors'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            Made with ❤️ by Emmanuel
                        </a>
                        <a 
                            ref={animate}
                            href='https://ko-fi.com/emmanuel7728'
                            className='flex items-center gap-2 text-white p-2 px-4 rounded-md bg-purple-600 hover:bg-purple-700 transition-colors shadow-md'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <Coffee size={16}/>
                            Buy me a coffee
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home