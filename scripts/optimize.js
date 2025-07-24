#!/usr/bin/env node

// Portfolio Optimization Build Script
// Minifies CSS/JS, optimizes images, and prepares production files

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
    sourceDir: '.',
    outputDir: './dist',
    cssFiles: [
        'css/style.css',
        'css/animations.css',
        'css/mobile.css'
    ],
    jsFiles: [
        'scripts/animations.js',
        'scripts/script.js',
        'scripts/css-loader.js'
    ],
    preserveFiles: [
        'index.html',
        'manifest.json',
        'sw.js',
        'extras/**/*',
        'IOD/**/*',
        'UCMADS/**/*',
        'test/**/*'
    ]
};

// Utility functions
function log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const colors = {
        info: '\x1b[36m',    // Cyan
        success: '\x1b[32m', // Green
        warning: '\x1b[33m', // Yellow
        error: '\x1b[31m',   // Red
        reset: '\x1b[0m'     // Reset
    };

    console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`);
}

function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch {
        return false;
    }
}

function createDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        log(`Created directory: ${dirPath}`, 'info');
    }
}

function copyFile(src, dest) {
    createDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
    log(`Copied: ${src} → ${dest}`, 'info');
}

// CSS Minification (simple regex-based)
function minifyCSS(cssContent) {
    return cssContent
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove extra whitespace
        .replace(/\s+/g, ' ')
        // Remove space around specific characters
        .replace(/\s*([{}:;,>+~])\s*/g, '$1')
        // Remove trailing semicolons
        .replace(/;}/g, '}')
        // Remove space after opening brace
        .replace(/{\s+/g, '{')
        // Remove space before closing brace
        .replace(/\s+}/g, '}')
        // Trim
        .trim();
}

// JavaScript Minification (basic)
function minifyJS(jsContent) {
    return jsContent
        // Remove single-line comments (but preserve URLs)
        .replace(/\/\/(?![^\r\n]*https?:\/\/)[^\r\n]*/g, '')
        // Remove multi-line comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove extra whitespace but preserve necessary spaces
        .replace(/\s+/g, ' ')
        // Remove space around operators and punctuation
        .replace(/\s*([{}();,=+\-*/<>!&|])\s*/g, '$1')
        // Remove space after opening parenthesis
        .replace(/\(\s+/g, '(')
        // Remove space before closing parenthesis
        .replace(/\s+\)/g, ')')
        // Trim
        .trim();
}

// HTML Minification (basic)
function minifyHTML(htmlContent) {
    return htmlContent
        // Remove HTML comments (but preserve IE conditionals)
        .replace(/<!--(?!\[if)[\s\S]*?-->/g, '')
        // Remove extra whitespace between tags
        .replace(/>\s+</g, '><')
        // Remove leading/trailing whitespace in text nodes
        .replace(/>\s+/g, '>')
        .replace(/\s+</g, '<')
        // Trim
        .trim();
}

// File size calculator
function getFileSize(filePath) {
    if (!fileExists(filePath)) return 0;
    const stats = fs.statSync(filePath);
    return stats.size;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Main optimization functions
function optimizeCSS() {
    log('Starting CSS optimization...', 'info');

    let totalOriginalSize = 0;
    let totalMinifiedSize = 0;

    CONFIG.cssFiles.forEach(file => {
        const srcPath = path.join(CONFIG.sourceDir, file);
        const destPath = path.join(CONFIG.outputDir, file);

        if (!fileExists(srcPath)) {
            log(`CSS file not found: ${srcPath}`, 'warning');
            return;
        }

        const originalContent = fs.readFileSync(srcPath, 'utf8');
        const minifiedContent = minifyCSS(originalContent);

        createDir(path.dirname(destPath));
        fs.writeFileSync(destPath, minifiedContent);

        const originalSize = Buffer.byteLength(originalContent, 'utf8');
        const minifiedSize = Buffer.byteLength(minifiedContent, 'utf8');
        const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);

        totalOriginalSize += originalSize;
        totalMinifiedSize += minifiedSize;

        log(`Minified ${file}: ${formatFileSize(originalSize)} → ${formatFileSize(minifiedSize)} (${savings}% savings)`, 'success');
    });

    const totalSavings = ((totalOriginalSize - totalMinifiedSize) / totalOriginalSize * 100).toFixed(1);
    log(`Total CSS optimization: ${formatFileSize(totalOriginalSize)} → ${formatFileSize(totalMinifiedSize)} (${totalSavings}% savings)`, 'success');
}

function optimizeJS() {
    log('Starting JavaScript optimization...', 'info');

    let totalOriginalSize = 0;
    let totalMinifiedSize = 0;

    CONFIG.jsFiles.forEach(file => {
        const srcPath = path.join(CONFIG.sourceDir, file);
        const destPath = path.join(CONFIG.outputDir, file);

        if (!fileExists(srcPath)) {
            log(`JS file not found: ${srcPath}`, 'warning');
            return;
        }

        const originalContent = fs.readFileSync(srcPath, 'utf8');
        const minifiedContent = minifyJS(originalContent);

        createDir(path.dirname(destPath));
        fs.writeFileSync(destPath, minifiedContent);

        const originalSize = Buffer.byteLength(originalContent, 'utf8');
        const minifiedSize = Buffer.byteLength(minifiedContent, 'utf8');
        const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);

        totalOriginalSize += originalSize;
        totalMinifiedSize += minifiedSize;

        log(`Minified ${file}: ${formatFileSize(originalSize)} → ${formatFileSize(minifiedSize)} (${savings}% savings)`, 'success');
    });

    const totalSavings = ((totalOriginalSize - totalMinifiedSize) / totalOriginalSize * 100).toFixed(1);
    log(`Total JS optimization: ${formatFileSize(totalOriginalSize)} → ${formatFileSize(totalMinifiedSize)} (${totalSavings}% savings)`, 'success');
}

function optimizeHTML() {
    log('Starting HTML optimization...', 'info');

    const srcPath = path.join(CONFIG.sourceDir, 'index.html');
    const destPath = path.join(CONFIG.outputDir, 'index.html');

    if (!fileExists(srcPath)) {
        log('index.html not found', 'error');
        return;
    }

    const originalContent = fs.readFileSync(srcPath, 'utf8');
    const minifiedContent = minifyHTML(originalContent);

    fs.writeFileSync(destPath, minifiedContent);

    const originalSize = Buffer.byteLength(originalContent, 'utf8');
    const minifiedSize = Buffer.byteLength(minifiedContent, 'utf8');
    const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);

    log(`Minified index.html: ${formatFileSize(originalSize)} → ${formatFileSize(minifiedSize)} (${savings}% savings)`, 'success');
}

function copyStaticFiles() {
    log('Copying static files...', 'info');

    const staticFiles = ['manifest.json', 'sw.js'];

    staticFiles.forEach(file => {
        const srcPath = path.join(CONFIG.sourceDir, file);
        const destPath = path.join(CONFIG.outputDir, file);

        if (fileExists(srcPath)) {
            copyFile(srcPath, destPath);
        }
    });

    // Copy extras directory
    if (fs.existsSync('extras')) {
        log('Copying extras directory...', 'info');
        try {
            execSync(`cp -r extras ${CONFIG.outputDir}/`);
        } catch (error) {
            log(`Error copying extras: ${error.message}`, 'error');
        }
    }
}

function generateOptimizationReport() {
    log('Generating optimization report...', 'info');

    const reportPath = path.join(CONFIG.outputDir, 'optimization-report.txt');
    const timestamp = new Date().toISOString();

    let report = `Portfolio Optimization Report\n`;
    report += `Generated: ${timestamp}\n`;
    report += `============================\n\n`;

    // Calculate total sizes
    let originalTotalSize = 0;
    let optimizedTotalSize = 0;

    [...CONFIG.cssFiles, ...CONFIG.jsFiles, 'index.html'].forEach(file => {
        const originalPath = path.join(CONFIG.sourceDir, file);
        const optimizedPath = path.join(CONFIG.outputDir, file);

        if (fileExists(originalPath) && fileExists(optimizedPath)) {
            const originalSize = getFileSize(originalPath);
            const optimizedSize = getFileSize(optimizedPath);

            originalTotalSize += originalSize;
            optimizedTotalSize += optimizedSize;

            const savings = originalSize > 0 ? ((originalSize - optimizedSize) / originalSize * 100).toFixed(1) : '0';
            report += `${file}:\n`;
            report += `  Original: ${formatFileSize(originalSize)}\n`;
            report += `  Optimized: ${formatFileSize(optimizedSize)}\n`;
            report += `  Savings: ${savings}%\n\n`;
        }
    });

    const totalSavings = originalTotalSize > 0 ? ((originalTotalSize - optimizedTotalSize) / originalTotalSize * 100).toFixed(1) : '0';
    report += `TOTAL OPTIMIZATION:\n`;
    report += `  Original: ${formatFileSize(originalTotalSize)}\n`;
    report += `  Optimized: ${formatFileSize(optimizedTotalSize)}\n`;
    report += `  Total Savings: ${totalSavings}%\n`;
    report += `  Size Reduction: ${formatFileSize(originalTotalSize - optimizedTotalSize)}\n`;

    fs.writeFileSync(reportPath, report);
    log(`Optimization report saved to: ${reportPath}`, 'success');

    // Display summary
    console.log('\n' + '='.repeat(50));
    console.log('OPTIMIZATION SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total Size Reduction: ${formatFileSize(originalTotalSize - optimizedTotalSize)}`);
    console.log(`Percentage Saved: ${totalSavings}%`);
    console.log(`Original Size: ${formatFileSize(originalTotalSize)}`);
    console.log(`Optimized Size: ${formatFileSize(optimizedTotalSize)}`);
    console.log('='.repeat(50) + '\n');
}

function cleanDist() {
    if (fs.existsSync(CONFIG.outputDir)) {
        log('Cleaning existing dist directory...', 'info');
        fs.rmSync(CONFIG.outputDir, { recursive: true, force: true });
    }
    createDir(CONFIG.outputDir);
}

// Main execution
function main() {
    log('Starting portfolio optimization build...', 'info');

    try {
        cleanDist();
        optimizeCSS();
        optimizeJS();
        optimizeHTML();
        copyStaticFiles();
        generateOptimizationReport();

        log('Portfolio optimization completed successfully! 🎉', 'success');
        log(`Optimized files available in: ${CONFIG.outputDir}`, 'info');

    } catch (error) {
        log(`Optimization failed: ${error.message}`, 'error');
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    minifyCSS,
    minifyJS,
    minifyHTML,
    main
};
