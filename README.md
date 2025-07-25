# Sıkça Sorulan Sorular (SSS) Web Sitesi

Bu proje, sıkça sorulan soruları ve cevaplarını göstermek için oluşturulmuş basit ve kullanıcı dostu bir web uygulamasıdır.

## Özellikler

- CSV dosyasından soru-cevapları otomatik yükleme
- Arama özelliği ile kolay gezinme
- Responsive tasarım (mobil uyumlu)
- Sorulara tıklayarak cevapları gösterme/gizleme
- URL'den belirli bir soruya doğrudan bağlantı

## Kurulum

1. Bu depoyu bilgisayarınıza klonlayın veya indirin.
2. `data` klasörü içine `veriSeti2.csv` dosyanızı yerleştirin.
3. `index.html` dosyasını bir web tarayıcısında açın.

## Geliştirme

### Yerel Sunucu ile Çalıştırma

Eğer yerel bir sunucu üzerinden test etmek isterseniz, aşağıdaki adımları izleyebilirsiniz:

1. Python kullanarak (Python 3):
   ```bash
   python -m http.server 8000
   ```
   Sonra tarayıcınızda `http://localhost:8000` adresine gidin.

### CSV Dosya Yapısı

CSV dosyanız aşağıdaki gibi olmalıdır:
```
Soru, Cevap
"Soru metni", "Cevap metni"
"Başka bir soru", "Başka bir cevap"
```

## Canlıya Alma

Bu web sitesini canlıya almak için birkaç seçeneğiniz var:

### 1. GitHub Pages (Ücretsiz)

1. Bu projeyi bir GitHub reposuna yükleyin.
2. Ayarlar (Settings) > Pages bölümüne gidin.
3. Kaynak (Source) olarak ana dalı (main/master) seçin.
4. Kaydedin ve birkaç dakika bekleyin.

### 2. Netlify (Ücretsiz)

1. Netlify hesabınıza giriş yapın.
2. Yeni bir site oluştur (New site from Git) seçeneğini seçin.
3. GitHub'ı seçin ve deponuzu bağlayın.
4. Dağıtım ayarlarını yapılandırın ve "Deploy site" butonuna tıklayın.

### 3. Vercel (Ücretsiz)

1. Vercel hesabınıza giriş yapın.
2. Yeni proje oluştur (New Project) seçeneğini seçin.
3. GitHub'ı seçin ve deponuzu bağlayın.
4. İmport butonuna tıklayın ve dağıtımı başlatın.

## Özelleştirme

- **Renkleri değiştirmek** için `css/style.css` dosyasındaki `:root` değişkenlerini düzenleyebilirsiniz.
- **Logo eklemek** için `index.html` dosyasında header içine bir `img` etiketi ekleyebilirsiniz.
- **Sosyal medya bağlantıları** eklemek için footer bölümüne linkler ekleyebilirsiniz.

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.
