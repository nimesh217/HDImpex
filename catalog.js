// Catalog functionality for H D IMPEX
let currentCatalogType = '';

// Catalog data
const catalogData = {
    agricultural: {
        title: 'Agricultural Products Catalog',
        filename: 'hdimpex-agricultural-catalog.pdf',
        url: 'catalogs/agricultural-products.pdf', // Replace with actual PDF URL
        description: 'Complete catalog of spices, grains, rice, and agricultural commodities'
    },
    industrial: {
        title: 'Industrial Materials Catalog',
        filename: 'hdimpex-industrial-catalog.pdf',
        url: 'catalogs/industrial-materials.pdf', // Replace with actual PDF URL
        description: 'Raw materials, chemicals, and industrial supplies catalog'
    },
    consumer: {
        title: 'Consumer Goods Catalog',
        filename: 'hdimpex-consumer-catalog.pdf',
        url: 'catalogs/consumer-goods.pdf', // Replace with actual PDF URL
        description: 'FMCG products, electronics, and consumer items catalog'
    }
};

// Open catalog in modal
function openCatalog(type) {
    const catalog = catalogData[type];
    if (!catalog) return;

    currentCatalogType = type;
    const modal = new bootstrap.Modal(document.getElementById('catalogModal'));
    const modalTitle = document.getElementById('catalogModalTitle');
    const viewer = document.getElementById('catalogViewer');

    modalTitle.textContent = catalog.title;
    
    // Show loading state
    viewer.innerHTML = `
        <div class="d-flex justify-content-center align-items-center h-100">
            <div class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">Loading catalog...</p>
            </div>
        </div>
    `;

    modal.show();

    // Load PDF or show placeholder
    loadPDFViewer(catalog.url, viewer);
}

// Load PDF viewer
function loadPDFViewer(pdfUrl, container) {
    // Check if PDF.js is available
    if (typeof pdfjsLib !== 'undefined') {
        loadPDFWithPDFJS(pdfUrl, container);
    } else {
        // Fallback to iframe or placeholder
        showPDFPlaceholder(container, pdfUrl);
    }
}

// Load PDF using PDF.js
function loadPDFWithPDFJS(pdfUrl, container) {
    pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
        container.innerHTML = '';
        
        // Create PDF viewer container
        const pdfContainer = document.createElement('div');
        pdfContainer.className = 'pdf-viewer-container';
        pdfContainer.style.cssText = `
            height: 100%;
            overflow-y: auto;
            background: #f5f5f5;
            padding: 20px;
        `;
        
        // Render all pages
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            renderPDFPage(pdf, pageNum, pdfContainer);
        }
        
        container.appendChild(pdfContainer);
    }).catch(function(error) {
        console.log('PDF loading error:', error);
        showPDFPlaceholder(container, pdfUrl);
    });
}

// Render individual PDF page
function renderPDFPage(pdf, pageNum, container) {
    pdf.getPage(pageNum).then(function(page) {
        const scale = 1.2;
        const viewport = page.getViewport({ scale: scale });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvas.style.cssText = `
            display: block;
            margin: 0 auto 20px auto;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            background: white;
        `;
        
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        
        page.render(renderContext);
        container.appendChild(canvas);
    });
}

// Show PDF placeholder when PDF.js fails or PDF not available
function showPDFPlaceholder(container, pdfUrl) {
    const catalog = catalogData[currentCatalogType];
    
    container.innerHTML = `
        <div class="d-flex flex-column justify-content-center align-items-center h-100 p-4">
            <div class="text-center">
                <i class="fas fa-file-pdf fa-5x text-danger mb-4"></i>
                <h4>${catalog.title}</h4>
                <p class="lead">${catalog.description}</p>
                <div class="mt-4">
                    <button class="btn btn-primary btn-lg me-2" onclick="downloadCatalog('${currentCatalogType}')">
                        <i class="fas fa-download me-2"></i>Download PDF
                    </button>
                    <button class="btn btn-success btn-lg" onclick="requestCatalogViaWhatsApp()">
                        <i class="fab fa-whatsapp me-2"></i>Request via WhatsApp
                    </button>
                </div>
                <div class="mt-4">
                    <small class="text-muted">
                        PDF viewer not available. Please download the catalog or request via WhatsApp.
                    </small>
                </div>
            </div>
        </div>
    `;
}

// Download catalog
function downloadCatalog(type) {
    const catalog = catalogData[type];
    if (!catalog) return;

    // Create download link
    const link = document.createElement('a');
    link.href = catalog.url;
    link.download = catalog.filename;
    link.target = '_blank';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show notification
    showNotification(`Downloading ${catalog.title}...`, 'success');
    
    // Track download (you can add analytics here)
    console.log(`Catalog downloaded: ${type}`);
}

// Download current catalog from modal
function downloadCurrentCatalog() {
    if (currentCatalogType) {
        downloadCatalog(currentCatalogType);
    }
}

// Request catalog via WhatsApp
function requestCatalogViaWhatsApp() {
    const catalog = catalogData[currentCatalogType] || { title: 'Product Catalog' };
    const message = `Hi! I would like to request the ${catalog.title}. Please share the latest version with pricing information.`;
    openWhatsApp(message);
}

// Handle catalog request form
function initializeCatalogRequestForm() {
    const form = document.getElementById('catalogRequestForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                company: formData.get('company'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                catalogs: formData.getAll('catalog[]'),
                address: formData.get('address')
            };
            
            // Validate form
            if (!data.name || !data.email || !data.phone || !data.address) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (data.catalogs.length === 0) {
                showNotification('Please select at least one catalog type.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending Request...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('Thank you! Your catalog request has been submitted. We will contact you soon.', 'success');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Send WhatsApp message with request details
                const catalogTypes = data.catalogs.join(', ');
                const whatsappMessage = `Catalog Request:
Name: ${data.name}
Company: ${data.company || 'N/A'}
Email: ${data.email}
Phone: ${data.phone}
Catalogs: ${catalogTypes}
Address: ${data.address}

Please send the requested catalogs to the above address.`;
                
                setTimeout(() => {
                    if (confirm('Would you like to send this request via WhatsApp as well?')) {
                        openWhatsApp(whatsappMessage);
                    }
                }, 2000);
            }, 1500);
        });
    }
}

// Add catalog links to other pages
function addCatalogLinks() {
    // Add catalog button to product pages
    const productSections = document.querySelectorAll('#products, .product-section');
    productSections.forEach(section => {
        if (!section.querySelector('.catalog-link')) {
            const catalogBtn = document.createElement('div');
            catalogBtn.className = 'text-center mt-4 catalog-link';
            catalogBtn.innerHTML = `
                <a href="catalog.html" class="btn btn-outline-primary">
                    <i class="fas fa-book me-2"></i>View Complete Catalog
                </a>
            `;
            section.appendChild(catalogBtn);
        }
    });
}

// Initialize catalog functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeCatalogRequestForm();
    addCatalogLinks();
    
    // Set PDF.js worker
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
});

// Export catalog functions
window.CatalogJS = {
    openCatalog,
    downloadCatalog,
    requestCatalogViaWhatsApp
};
