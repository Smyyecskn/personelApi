//! Burda Token İşlemlerinin farklı isimleri var
//TOKEN , SIMPLE TOKEN, BASİC TOKEN,CLASSİC TOKEN =>TOKEN AUTHENTİCATİON.
// AUTHORIZATION = ŞUNA İZNİN VER BUNA İZİN VER. YETKİLİ Mİ ? GELEN KULLANICININ NEYE YETKISI VAR ONU SORGULAR ONA GÖRE RRESPONSE DÖNERİZ.

//!(Authentication) Kimlik doğrulama, bir kullanıcının kimlik bilgilerini doğrulama sürecidir.
//!(Authorization) Yetkilendirme, bir kullanıcının belirli kaynaklara erişim iznini kontrol etme sürecidir.

//! Token adı altında bir MODEL OLUŞTURUP ona göre izin vericez.
//**************** Yapılacak işlemler ************//
//1 ilk önce sync dosyasından senkronizasyon yapıp ve console.logda senkronize oldugunu goruyoruz.
//2 Kullanıcı için token.model ile token olusturcaz.FE'den her işlem için bana TOKEN göndermesini isticem.FE'nin gönderdigi TOKEN'a göre kullanıcıyı tanıcam. Ve ona YETKİ vericem .isAdmin, isLead olarak yetki verebilirim.
//3 token.model js olusturuyoruz.

//! MODEL KISMI
//instance yani Schmea olusturduk bu onBUYUK HARFLE YAZILIR. TokenSchema
//tablo ismi kucuk ve çogul olur = tokens.
//tokenmodele en cok sorgulama yapacagım kısım O YUZDEN HIZLI OLSUN DIYE index=true verdik

//! CONTROLLER KISMI
//tokenlarda controllera gerek yok.AMA biz öğrenmek için yazdık. Bütün methodları yaptık içinde.

//!ROUTER
//Ana routerlarımızı routes dosyası içinde index içine taşıdık.
//mutlaka router ! kullanıp export etmek lazım.
