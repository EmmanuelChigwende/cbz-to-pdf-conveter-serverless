# CBZ to PDF Converter

A modern, client-side web application that converts CBZ (Comic Book Archive) files to PDF format directly in your browser.

![CBZ to PDF Converter](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![React](https://img.shields.io/badge/Built%20with-React-61DAFB)

## ✨ Features

- **100% Client-side Processing**: Files never leave your browser
- **Fast & Efficient**: Convert CBZ files to PDF in seconds
- **No Uploads Required**: All processing happens locally
- **Privacy-First**: No tracking, no data collection
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Free & Open Source**: No ads, no subscriptions

## 🚀 Live Demo

Visit the live application: [cbz-to-pdf-converter.vercel.app](https://cbz-to-pdf-converter.vercel.app)

## 📋 Supported Formats

### Input Formats:
- `.cbz` files (Comic Book Archive - essentially ZIP files containing images)

### Image Formats Inside CBZ:
- `.jpg` / `.jpeg`
- `.png`
- `.webp` (limited support)

### Output Format:
- `.pdf` (Portable Document Format)

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. Clone the repository:
```bash
git clone https://github.com/EmmanuelChigwende/cbz-to-pdf-converter.git
cd cbz-to-pdf-converter
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 📦 Dependencies

### Core Libraries:
- **React**: UI framework
- **pdf-lib**: PDF creation and manipulation
- **JSZip**: CBZ (ZIP) file extraction
- **GSAP**: Animation library for smooth UI effects
- **React Hot Toast**: Notification system
- **Lucide React**: Icon library

### Development:
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework

## 🎯 Usage

1. **Upload CBZ File**:
   - Click the upload area or drag & drop your `.cbz` file
   - The app validates the file format automatically

2. **Convert to PDF**:
   - Click the "Convert To PDF" button
   - The app processes all images in the CBZ file
   - Each image becomes a page in the PDF

3. **Download PDF**:
   - Once conversion is complete, the PDF automatically downloads
   - The filename matches your original CBZ file

## 🔧 How It Works

1. **File Reading**: The CBZ file is read using JSZip
2. **Image Extraction**: All image files are extracted and sorted alphabetically
3. **PDF Creation**: Each image is embedded as a separate page in a PDF document
4. **Client-side Processing**: All operations happen in the browser using Web APIs
5. **Download**: The generated PDF is downloaded automatically

## ⚙️ Technical Details

### Architecture:
- Single-page React application
- Component-based architecture
- Responsive design with Tailwind CSS
- No backend server required

### Security Features:
- No file uploads to external servers
- No tracking or analytics
- Automatic memory cleanup
- Secure file handling

### Performance:
- Lazy loading of components
- Optimized image processing
- Efficient memory management
- Smooth animations with GSAP

## 🌐 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

**Note**: Works best in modern browsers with good JavaScript performance.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Areas for Improvement:
- Add support for more image formats
- Implement PDF compression options
- Add batch processing
- Create a PWA version
- Add dark mode

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [pdf-lib](https://github.com/Hopding/pdf-lib) for PDF manipulation
- [JSZip](https://github.com/Stuk/jszip) for ZIP file handling
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling

## ☕ Support

If you find this tool useful, consider supporting the developer:

[![Buy Me A Coffee](https://ko-fi.com/emmanuel7728)

## 📧 Contact

Emmanuel Chigwende
- GitHub: [@EmmanuelChigwende](https://github.com/EmmanuelChigwende)
- Email: [emmanuelchigwende2@gmail.com]

---

**Disclaimer**: This tool is for personal use. Please ensure you have the right to convert any files you process. The developers are not responsible for any copyright infringement.
