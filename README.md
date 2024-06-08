# Proje Kurulumu 

Uygulamayı kendi localinizde çalıştırabilmek için öncelikle projeyi localinizi klonlayın.

`console git clone https://github.com/kuloglusalih10/Resbul.git`

Daha sonra uygulama klasörünü `console xampp/htdocs` klasörüne taşıyın.

Ardından proje kök ve `console /resbul-api` dizinlerinde bulunan .env.example dosyalarını kendi ortam değişkenlerinize göre düzenleyin.

`JS

  // Kök dizin için (React)
  
  VITE_API_URL="BACKENDİNİN APİ KLASÖRÜ YOLU"
  VITE_GOOGLE_CLIENT_ID="GOOGLE OAUTH CLİENT İD"
  VITE_GOOGLE_LOGIN_PASSWORD_KEY="GOOGLE OAUTH PASSWORD KEY"
  VITE_BACKEND_URL="BACKEND KÖK DOSYA DİZİNİ"
  VITE_CITIES_API = https://turkiyeapi.dev/api/v1/
  VITE_JWT_SECRET_KEY = "JWT SECRET KEY"

  // ./resbul-api dizini için (php)

  SMTP_HOST='SMTP SERVER HOST'
  SMTP_USERNAME="SMTP USERNAME"
  SMTP_PASSWORD="SMTP PASSWORD"
  JWT_SECRET_KEY="JWT SECRET KEY"


`



# Giriş

Bu rapor, Resbul web uygulamasının geliştirilme sürecini, kullanılan teknolojileri, uygulanan özellikleri ve karşılaşılan zorlukları kapsamaktadır. Bu web uygulaması, kullanıcıların çeşitli hizmetlere kolayca erişebileceği ve yönetebileceği bir platform sağlamaktadır. Uygulama 2 farklı giriş vardır , işletme girişi ile kullanıcı kendi işletmesini ekleyebilir, fotoğraflar ve yazılar ile tanıtımını yapabilir. Müşteri girişi ile de kulllanıcılar eklenen işletmeleri bölgelere göre görüntüleyerek yorumlarda bulunabilir.


<img width="1710" alt="Ekran Resmi 2024-06-07 22 54 21" src="https://github.com/kuloglusalih10/Resbul/assets/101921061/d801ddae-6f23-4af5-ab3e-8d1f632e555e">

# Proje Tanımı

Resbul, PHP, MySQL, JSON, RESTful API ve React kullanılarak geliştirilmiş bir web uygulamasıdır. Uygulama, kullanıcıların kayıt olabileceği, giriş yapabileceği, verilerini yönetebileceği ve çeşitli işlemler gerçekleştirebileceği bir platform sunar.

<img width="1710" alt="Ekran Resmi 2024-06-07 22 57 33" src="https://github.com/kuloglusalih10/Resbul/assets/101921061/952f7e8f-fb61-4df8-9c7d-7084d1bc7ba8">

#  Kullanılan Teknolojiler

PHP: Sunucu tarafında çalışan betik dili.
MySQL: Veritabanı yönetim sistemi.
JSON: Veri değişim formatı.
RESTful API: API tasarım modeli.
React: JS için bir web uygulama çatısı (framework).


# Özellikler

Kullanıcı Yönetimi
Kullanıcı kayıt ve giriş sistemi.
Şifrelerin güvenli bir şekilde saklanması (hashing).
Dosya Yükleme, güncelleme, görüntüleme


# Veritabanı İşlemleri

CRUD (Create, Read, Update, Delete) işlemleri.
Veritabanı tasarımı ve ilişkisel veritabanı yönetimi.
MySQL kullanarak veritabanı işlemlerinin gerçekleştirilmesi.

<img width="1438" alt="Ekran Resmi 2024-06-07 23 08 31" src="https://github.com/kuloglusalih10/Resbul/assets/101921061/c8a15cdd-1667-46c1-a501-7fee0413be38">


# Form Yönetimi

Veri doğrulama ve hata yönetimi.
Kullanıcıdan alınan verilerin işlenmesi ve saklanması.
React tarafında form yönetimleri için formik ve yup paketleri kullanıldı

<img width="1710" alt="Ekran Resmi 2024-06-07 23 05 28" src="https://github.com/kuloglusalih10/Resbul/assets/101921061/8c859581-6aef-4f96-bd63-c4bf5ac3b621">

# Dosya Yükleme

Kullanıcıların dosya yükleyebilmesi (resim).
Yüklenen dosyaların sunucuda güvenli bir şekilde saklanması.

# JSON ve RESTful API

JSON formatında veri alışverişi.
RESTful API oluşturma ve kullanma.
API üzerinden veri alma ve gönderme işlemleri.

<img width="1281" alt="Ekran Resmi 2024-06-08 07 29 59" src="https://github.com/kuloglusalih10/Resbul/assets/101921061/5be9cdd9-89e2-4770-a3a5-a199b9ceb923">

# Oturum Yönetimi

JWT kullanarak oturum yönetimi.
Kullanıcı oturumlarının güvenli bir şekilde yönetilmesi.

# Güvenlik

Güvenlik önlemleri (örneğin CSRF, XSS korumaları).
Kullanıcı verilerinin güvenliğinin sağlanması.

# PHP OOP ve PDO
Nesne yönelimli programlama (OOP) prensiplerine uygun kod yazma.
PHP PDO kullanarak veritabanı işlemleri gerçekleştirme.

# Ekstra Özellikler

E-posta Bildirimleri: Kullanıcılara e-posta bildirimleri gönderme.

<img width="1108" alt="Ekran Resmi 2024-06-08 07 33 36" src="https://github.com/kuloglusalih10/Resbul/assets/101921061/a4841baa-12f7-4deb-9925-71d49c2e521c">

Sosyal Medya Entegrasyonu: Sosyal medya ile giriş (Google).



This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
