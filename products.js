// Product data and functionality
const productData = {
    cumin: {
        title: "A Grade Brown Cumin Seeds",
        image: "https://via.placeholder.com/400x300",
        specifications: {
            "Type": "Seeds",
            "Color": "Brown",
            "Grade": "A Grade",
            "Purity": "99.5%",
            "Moisture": "Max 10%",
            "Packaging": "25kg, 50kg bags",
            "Origin": "India",
            "Shelf Life": "24 months"
        },
        description: "Premium quality brown cumin seeds with rich aroma and flavor. Used whole in tempering (tadka) for dals, vegetables, and curries. Essential ingredient in North Indian and Rajasthani cuisine.",
        applications: [
            "Tempering for dals and vegetables",
            "Spice blends like Garam Masala",
            "Roasted and ground for powder",
            "Medicinal and ayurvedic uses"
        ]
    },
    cardamom: {
        title: "Premium Green Cardamom",
        image: "https://via.placeholder.com/400x300",
        specifications: {
            "Type": "Pods",
            "Color": "Green",
            "Grade": "Premium",
            "Size": "6-8mm",
            "Moisture": "Max 12%",
            "Packaging": "5kg, 10kg boxes",
            "Origin": "Kerala, India",
            "Shelf Life": "18 months"
        },
        description: "Aromatic green cardamom pods with intense flavor and fragrance. Known as the 'Queen of Spices', essential for both sweet and savory dishes.",
        applications: [
            "Biryanis and pulao",
            "Desserts and sweets",
            "Tea and beverages",
            "Garam masala preparation"
        ]
    },
    turmeric: {
        title: "A Grade Turmeric Powder",
        image: "https://via.placeholder.com/400x300",
        specifications: {
            "Type": "Powder",
            "Color": "Golden Yellow",
            "Grade": "A Grade",
            "Curcumin": "3-5%",
            "Moisture": "Max 10%",
            "Packaging": "25kg, 50kg bags",
            "Origin": "Andhra Pradesh, India",
            "Shelf Life": "24 months"
        },
        description: "Pure turmeric powder with high curcumin content. Essential spice for Indian cooking with numerous health benefits and medicinal properties.",
        applications: [
            "Daily cooking and curries",
            "Health supplements",
            "Cosmetic applications",
            "Traditional medicine"
        ]
    },
    basmati: {
        title: "Long Grain Basmati Rice",
        image: "https://via.placeholder.com/400x300",
        specifications: {
            "Type": "Basmati Rice",
            "Length": "6.5-7.5mm",
            "Grade": "Premium",
            "Aging": "12 months",
            "Moisture": "Max 14%",
            "Packaging": "25kg, 50kg bags",
            "Origin": "Punjab, India",
            "Shelf Life": "24 months"
        },
        description: "Aromatic long grain basmati rice with distinctive fragrance and taste. Aged for superior quality and perfect for special occasions.",
        applications: [
            "Biryanis and pulao",
            "Special occasion meals",
            "Export quality rice",
            "Premium restaurants"
        ]
    },
    wheat: {
        title: "Golden Durum Wheat",
        image: "https://via.placeholder.com/400x300",
        specifications: {
            "Type": "Durum Wheat",
            "Color": "Golden",
            "Grade": "A Grade",
            "Protein": "12-14%",
            "Moisture": "Max 12%",
            "Packaging": "50kg bags",
            "Origin": "Madhya Pradesh, India",
            "Shelf Life": "12 months"
        },
        description: "High protein durum wheat with golden color and superior quality. Ideal for pasta, bread, and other wheat-based products.",
        applications: [
            "Pasta manufacturing",
            "Bread and bakery products",
            "Semolina production",
            "Export markets"
        ]
    },
    barley: {
        title: "A Grade Barley Grain",
        image: "https://via.placeholder.com/400x300",
        specifications: {
            "Type": "Hulled Barley",
            "Color": "Light Brown",
            "Grade": "A Grade",
            "Protein": "10-12%",
            "Moisture": "Max 12%",
            "Packaging": "50kg bags",
            "Origin": "Rajasthan, India",
            "Shelf Life": "18 months"
        },
        description: "Nutritious barley grains rich in fiber, vitamins, and minerals. Perfect for health-conscious consumers and food processing.",
        applications: [
            "Health food products",
            "Soups and stews",
            "Animal feed",
            "Brewing industry"
        ]
    }
};

// Category filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('[data-category]');
    const productItems = document.querySelectorAll('.product-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            productItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Initialize search functionality
    initializeProductSearch();
});

// Search functionality
function initializeProductSearch() {
    const searchInput = document.querySelector('#productSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-item');
            
            productCards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const description = card.querySelector('.card-text').textContent.toLowerCase();
                const specs = card.querySelector('.product-specs').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm) || specs.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Open product detail modal
function openProductModal(productKey) {
    const product = productData[productKey];
    if (!product) return;

    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    const titleElement = document.getElementById('productModalTitle');
    const bodyElement = document.getElementById('productModalBody');

    titleElement.textContent = product.title;
    
    bodyElement.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${product.image}" class="img-fluid rounded mb-3" alt="${product.title}">
            </div>
            <div class="col-md-6">
                <h6 class="text-primary">Product Description</h6>
                <p>${product.description}</p>
                
                <h6 class="text-primary mt-3">Applications</h6>
                <ul class="list-unstyled">
                    ${product.applications.map(app => `<li><i class="fas fa-check text-success me-2"></i>${app}</li>`).join('')}
                </ul>
            </div>
        </div>
        
        <div class="row mt-4">
            <div class="col-12">
                <h6 class="text-primary">Technical Specifications</h6>
                <div class="table-responsive">
                    <table class="table table-bordered table-sm">
                        <tbody>
                            ${Object.entries(product.specifications).map(([key, value]) => 
                                `<tr><td class="fw-bold">${key}</td><td>${value}</td></tr>`
                            ).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    modal.show();
}

// Search functionality (if needed)
function searchProducts(query) {
    const productItems = document.querySelectorAll('.product-item');
    const searchTerm = query.toLowerCase();

    productItems.forEach(item => {
        const title = item.querySelector('.card-title').textContent.toLowerCase();
        const description = item.querySelector('.card-text').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
