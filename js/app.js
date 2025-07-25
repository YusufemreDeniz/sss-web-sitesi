// CSV dosyasını yükleme ve işleme
async function loadFAQData() {
    try {
        const response = await fetch('data/veriSeti2.csv');
        const csvData = await response.text();
        return parseCSV(csvData);
    } catch (error) {
        console.error('Veri yüklenirken bir hata oluştu:', error);
        return [];
    }
}

// CSV'yi JSON'a dönüştürme
function parseCSV(csv) {
    const lines = csv.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',');
    
    return lines.slice(1).map(line => {
        const values = [];
        let currentValue = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(currentValue);
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        
        values.push(currentValue);
        
        // Eğer satırda yeterli veri yoksa boş obje döndür
        if (values.length < 2) return null;
        
        return {
            question: values[0].trim(),
            answer: values[1].trim()
        };
    }).filter(item => item !== null); // Geçersiz satırları filtrele
}

// SSS öğelerini oluşturma
function createFAQItems(faqData) {
    const faqContainer = document.getElementById('faqContainer');
    
    if (!faqData || faqData.length === 0) {
        faqContainer.innerHTML = '<div class="error">Üzgünüz, veriler yüklenirken bir hata oluştu.</div>';
        return;
    }
    
    let html = '';
    
    faqData.forEach((item, index) => {
        if (!item.question || !item.answer) return;
        
        // HTML etiketlerini temizle ve güvenli hale getir
        const question = escapeHTML(item.question);
        const answer = formatAnswer(escapeHTML(item.answer));
        
        html += `
            <div class="faq-item" id="faq-${index}">
                <div class="faq-question">
                    ${question}
                    <i class="fas fa-chevron-down faq-icon"></i>
                </div>
                <div class="faq-answer">
                    ${answer}
                </div>
            </div>
        `;
    });
    
    faqContainer.innerHTML = html;
    
    // Tıklama olaylarını ekle
    document.querySelectorAll('.faq-item').forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Tüm açık olanları kapat
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.faq-answer').classList.remove('show');
            });
            
            // Eğer tıklanan zaten açık değilse, sadece onu aç
            if (!isActive) {
                item.classList.add('active');
                answer.classList.add('show');
                
                // URL'ye hash ekle
                window.location.hash = `faq-${index}`;
            }
        });
    });
    
    // Eğer URL'de hash varsa, ilgili soruyu aç
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            targetElement.classList.add('active');
            targetElement.querySelector('.faq-answer').classList.add('show');
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Güvenli HTML çıktısı için
function escapeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Cevap metnini biçimlendir (örneğin, linkleri tıklanabilir yap)
function formatAnswer(text) {
    // URL'leri tıklanabilir linklere dönüştür
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, url => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    }).replace(/\n/g, '<br>'); // Yeni satırları <br> etiketine dönüştür
}

// Arama işlevselliği
function setupSearch(faqData) {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm.length < 2) {
            // Arama kutusu boş veya çok kısa ise tüm soruları göster
            document.querySelectorAll('.faq-item').forEach(item => {
                item.style.display = '';
            });
            return;
        }
        
        // Her soru için arama yap
        document.querySelectorAll('.faq-item').forEach((item, index) => {
            const question = item.querySelector('.faq-question').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', async () => {
    const faqData = await loadFAQData();
    createFAQItems(faqData);
    setupSearch(faqData);
    
    // Arama kutusuna odaklan
    document.getElementById('searchInput').focus();
});
