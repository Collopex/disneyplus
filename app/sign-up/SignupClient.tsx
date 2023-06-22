'use client';

import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Checked, HidePassword, Loader, ShowPassword } from '@/public/icons';
import Footer from '../components/Footer/Footer';

enum STEPS {
  EMAIL = 0,
  AGREEMENT = 1,
  PASSWORD = 2,
}

const SignupClient = () => {
  const router = useRouter();

  const [checked, setChecked] = useState(false);
  const [step, setStep] = useState(STEPS.EMAIL);

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, reset } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const email = watch('email');

  const handleShowPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    // Calculate password strength
    let strength = '';
    if (value.length < 4) {
      strength = 'Very Weak';
    } else if (
      value.length < 8 ||
      (!/\d/.test(value) && !/[!@#$%^&*]/.test(value))
    ) {
      strength = 'Weak';
    } else if (value.length >= 12 && (value.match(/\d/g) || []).length >= 1) {
      strength = 'Strong';
    } else {
      strength = 'Medium';
    }
    setPasswordStrength(strength);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PASSWORD) {
      return onNext();
    }
    setLoading(true);
    axios
      .post('/api/register', data)
      .then(() => {
        router.push('/login');
        reset();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getProgressBarColor = () => {
    if (passwordStrength === 'Very Weak' || passwordStrength === 'Weak') {
      return 'bg-[#ff554c] transition-color-password';
    } else if (passwordStrength === 'Medium') {
      return 'bg-[#ffb63f] transition-color-password';
    } else {
      return 'bg-[#63dc9f] transition-color-password';
    }
  };

  const getProgressBarWidth = () => {
    if (passwordStrength === 'Very Weak') {
      return 'w-[20%] transition-width-password';
    } else if (passwordStrength === 'Weak') {
      return 'w-[40%] transition-width-password';
    } else if (passwordStrength === 'Medium') {
      return 'w-[70%] transition-width-password';
    } else {
      return 'w-full transition-width-password';
    }
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 'Very Weak') {
      return 'text-[#ff554c] opacity-0 select-none';
    } else if (passwordStrength === 'Weak') {
      return 'text-[#ff554c]';
    } else if (passwordStrength === 'Medium') {
      return 'text-[#ffb63f]';
    } else {
      return 'text-[#63dc9f]';
    }
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  let formContent = (
    <div className='text-[#fff] mx-auto my-8 max-w-[374px] overflow-visible w-full'>
      <p className='text-[#cacaca] m-0 pb-1 text-[9.7px] leading-[1.5] font-medium tracking-[1.2px] uppercase'>
        Step 1 of 3
      </p>
      <form className='block'>
        <h3 className='text-[24px] leading-[1.2] tracking-[.11px] pb-2 font-medium select-none'>
          Enter your email address
        </h3>
        <div className='pb-6'>
          <span>
            <p className='text-left m-0 text-[14px] leading-[1.6] tracking-tight'>
              You will use this email and password to log into your Disney+
              account to watch your favourite shows and movies.
            </p>
          </span>
        </div>
        <fieldset className='mb-6'>
          <input
            id='email'
            type='email'
            placeholder='Email address'
            {...register('email', { required: true })}
            className='placeholder:text-sm text-sm font-medium backdrop-filter h-12 m-0 outline-none px-3 py-[9px] w-full rounded-[4px] bg-[#31343e]'
          />
        </fieldset>
        <label className='relative block cursor-pointer mt-0 mr-2 mb-4 ml-7 p-0 text-white'>
          <input
            type='checkbox'
            className='opacity-0 absolute overflow-visible p-0'
            onClick={() => setChecked(!checked)}
          />
          <span
            className={`flex items-center justify-center h-5 w-5 rounded-[3px] -left-7 absolute  ${
              checked
                ? 'bg-[#0072d2] border-2 border-[#0072d2] '
                : 'border-2 border-[#6d7582]'
            }`}
          >
            {checked && <Checked />}
          </span>
          <div className='mt-[2px] ml-1 mb-0 mr-[3px]'>
            <div className='text-[#cacaca] text-[11px] leading-[1.8] font-medium select-none'>
              Yes! I would like to receive special offers and updates about
              Disney+ and other products and services from{' '}
              <a
                href='https://privacy.thewaltdisneycompany.com/en/definitions/#The-Walt-Disney-Family-of-Companies'
                className='text-[#67bdff] underline'
              >
                The Walt Disney Family of Companies
              </a>{' '}
              by email.
            </div>
          </div>
        </label>

        <div className='bg-[#f9f9f91a]/10 rounded-lg p-2 my-0 -mx-[8px] text-[#cacaca] text-[11px] leading-[1.8]'>
          <div className='mt-0 ml-0 mb-2'>
            Disney will use your data to personalize and improve your Disney+
            experience and to send you information about Disney+. You can change
            your communication preferences anytime. We may use your data as
            described in our{' '}
            <a href='/legal/policy' className='text-[#67bdff] underline'>
              Privacy Policy
            </a>{' '}
            , including sharing it with The Walt Disney Family of Companies. By
            clicking &quot;Continue,&quot; you acknowledge that you have read
            our{' '}
            <a href='/legal/policy' className='text-[#67bdff] underline'>
              Privacy Policy,
            </a>{' '}
            <a
              href='/legal/cookies-policy'
              className='text-[#67bdff] underline'
            >
              Cookies Policy,
            </a>{' '}
            and{' '}
            <a
              href='/legal/emea-policy-rights'
              className='text-[#67bdff] underline'
            >
              EMEA Privacy Rights,
            </a>{' '}
          </div>
          <div className='block'>
            <button
              type='submit'
              onClick={handleSubmit(onSubmit)}
              className='h-12 inline-flex items-center justify-center w-full bg-[#0072d2] text-[#f9f9f9] text-[15px] font-medium uppercase border-none rounded hover:bg-[#0682f0] active:bg-[#183966] transition-[background-color_.2s_ease-in-out]'
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  if (step === STEPS.AGREEMENT) {
    formContent = (
      <div className='text-[#fff] mx-auto my-8 max-w-[506px] overflow-visible w-full animate-slide-in'>
        <p className='text-[#cacaca] m-0 pb-1 text-[9.7px] leading-[1.5] font-medium tracking-[1.2px] uppercase'>
          Step 2 of 3
        </p>
        <div className='block w-full relative max-w-[506px]'>
          <h3 className='text-[24px] leading-[1.2] tracking-[.11px] pb-2 font-medium select-none'>
            Subscriber Agreement
          </h3>

          <div className='mt-4 overflow-y-auto block text-[12px] text-[#fff] leading-[1.5] tracking-tight sm:border border-[#31343e] h-[260px] py-4 px-5'>
            <div>
              Disney+ Üyelik Sözleşmesi
              <br />
              <br />
              Türkiye
              <br />
              <br />
              Güncelleme Tarihi: 1 Mayıs 2022
              <br />
              <br />
              DISNEY DTC EM LIMITED (“Disney+”, “biz”, “bizi”, “bizim”) olarak
              Disney+ Servisi’ne katılmanızdan büyük memnuniyet duyuyoruz.
              “Disney+ Servisi”; Disney+ web sitesini, uygulamasını, ilgili
              içerikleri ve servisleri kapsamaktadır.
              <br />
              <br />
              DISNEY+ SERVİSİ’Nİ KULLANMADAN ÖNCE LÜTFEN BU ÜYELİK SÖZLEŞMESİ’Nİ
              (“DISNEY+ ÜYELİK SÖZLEŞMESİ” VEYA “SÖZLEŞME”) DİKKATLİCE OKUYUN.
              <br />
              <br />
              BU SÖZLEŞME YALNIZCA DISNEY+ SERVİSİ’Nİ KULLANIMINIZ İÇİN GEÇERLİ
              OLACAKTIR. BİR DISNEY+ HESABI OLUŞTURDUKTAN SONRA ERİŞEBİLECEĞİNİZ
              DİĞER DISNEY SERVİSLERİNİ KULLANIMINIZ WWW.DISNEYTERMSOFUSE.COM
              ADRESİNDE YER ALAN THE WALT DISNEY COMPANY KULLANIM ŞARTLARINA
              TABİDİR.
              <br />
              <br />
              Disney+ kayıt işlemi sırasında “Devam Et” seçeneğine
              tıkladığınızda ya da farklı bir endüstri standardı mekanizmayı
              kullandığınızda Disney+ Üyelik Sözleşmesi’ni kabul etmiş ve
              Disney+ Servisi’nin herhangi bir unsurunu kullandığınızda
              sözleşmenizi tasdik etmiş olursunuz. Disney+ Üyelik Sözleşmesi’ni
              kabul etmezseniz Disney+ Servisi’ni kullanamazsınız. Disney+
              Servisi’ni ve Disney+ İçeriklerini kullanımınızla ilgili makul
              talimatlarımıza ve şartlarımıza uymanız ve uyacağınızı kabul
              etmeniz gerekir. Disney+ Servisi’nin fiyatlandırılması dahil olmak
              üzere işbu Sözleşme’de değişiklikler yapabiliriz. Önemli
              değişiklikler, size yapacağımız bildirimden en az otuz (30) gün
              sonra geçerli olacaktır (ve Disney+ Servisi’nde yapılan
              değişikliklerin ayrıntılarını da paylaşabiliriz). Söz konusu
              bildirim süresinin bitiminden sonra gerçekleştirilecek herhangi
              bir satın alma veya üyelik yenileme işlemini, bildirilen
              değişiklikleri kabul ettiğiniz olarak yorumlayacağız. İşbu
              Sözleşme’deki herhangi bir değişikliği kabul etmiyorsanız Disney+
              Servisi’ni kullanmayı bırakmanız gerekir. Bildirimin size
              sunulmasının ardından işbu Sözleşme’de yapılan herhangi bir
              değişikliği kabul etmezseniz Yardım Merkezi üzerinden bize
              bildirin, bu durumda Sözleşme değiştirilmeyecektir. Böyle bir
              durumda Sözleşme’yi mevcut fatura döneminin ya da ücretsiz deneme
              süresinin sonunda feshedebiliriz.
              <br />
              Güvenlik sebebiyle ya da yasal veya mevzuat ile ilgili nedenler
              dolayısıyla işbu Sözleşme’de daha hızlı bir değişiklik yapılması
              gerekirse bir bildirim yoluyla sizi mümkün olan en kısa zaman
              içinde bilgilendireceğiz. Müşteri hizmetleri temsilcilerimiz işbu
              Sözleşme’nin herhangi bir hükmünü sözlü veya yazılı olarak
              değiştirme yetkisine sahip değildir. İşbu Sözleşme’nin en güncel
              versiyonu Disney+ web sitesi üzerinden sunulacaktır ve işbu
              Sözleşme’nin değiştirildiğine dair size bildirimde bulunduğumuzda
              kendi kayıtlarınız için en güncel versiyonun çıktısını almanızı
              öneririz.
              <br />
              <br />
              Bölüm Listesi:
              <br />
              1. Kullanıcı Uygunluğu ve Kayıt
              <br />
              2. Üyelik Şartları
              <br />
              3. Telif Hakkı Lisansının Verilmesi ve Kısıtlamalar
              <br />
              4. Kullanım Şartları
              <br />
              5. Bilgilerinizin Kullanılması ve Paylaşılması
              <br />
              6. Askıya Alma ve Feshetme
              <br />
              7. Ek Hükümler
              <br />
              <br />
              1. KULLANICI UYGUNLUĞU VE KAYIT
              <br />
              a. Uygunluk ve Yaş Sınırlamaları. Sadece Disney+ Servisi’nin
              sunulduğu ülkelerde (hep birlikte “Bölge”) ikamet eden kişiler
              Disney+ hesabı için kayıt yaptırabilirler. İşbu Disney+ Üyelik
              Sözleşmesi, (Türkiye) ülkesinde ikamet eden kişilerin bir Disney+
              hesabı için kayıt yaptırması ve Disney+ Servisi’ni kullanmasıyla
              ilgili hususları yönetmektedir. Disney+ Servisi’ni satın alabilmek
              için en az 18 yaşında olmanız gerekir. Disney+ Servisi, söz konusu
              kişilere kişisel ve ticari olmayan kullanım için sunulur.
              Şirketler, birlikler ve diğer gruplar bir Disney+ hesabı için
              kayıt yaptıramaz veya Disney+ Servisi’ni kullanamaz. 18 yaşından
              küçük kişiler bir Disney+ hesabı için kayıt yaptıramaz ve bu
              kişilerin kişisel bilgilerini Disney+’a sunmalarına izin verilmez.
              <br />
              b. Kayıt. Belirli bilgileri sunma şartı (ör. geçerli bir cep
              telefonu numarası ve/veya geçerli bir e-posta adresi) dahil olmak
              üzere yalnızca Disney+ hesabı için kayıt yaptıran ve işbu
              Sözleşme’nin şartlarını kabul eden kişiler Disney+ Servisi’ni
              kullanma hakkına sahiptir. Disney+ için üyelik kaydı sırasında
              belirttiğiniz cep telefonu numarası, oluşturduğunuz ya da size
              verilen benzersiz Kullanıcı Kimliği veya OTP’nin gizliliğinin ve
              güvenliğinin korunması sizin sorumluluğunuzdadır. Bununla
              birlikte, işbu Sözleşme’nin şartları uyarınca izin verilen,
              Disney+ Servisi’ni kullanma şartlarını karşılayan diğer kişilerin
              sizin Disney+ hesabınıza erişmesine izin verirseniz işbu Sözleşme
              ve vermiş olabileceğiniz belirli onaylar söz konusu kişilerin
              erişimi, kullanımı ve bilgilerinin ifşası için de geçerli
              olacaktır. Disney+ hesabınıza izinsiz giriş yapılması durumunda
              Disney+’ı derhal bilgilendirmeyi kabul etmektesiniz. Söz konusu
              izinsiz kullanımın Disney+’ın bir eylemi veya ihmali nedeniyle
              gerçekleştiği durumlar hariç olmak üzere, Disney+ hesabınızın
              izinsiz kullanımından doğacak herhangi bir kayıptan Disney+
              sorumlu olmayacaktır.
              <br />
              c. Bildirimler. Disney+’ın tarafınıza yapacağı bildirimler, (i)
              sağladığınız en son e-posta adresine e-posta gönderilerek ve/veya
              (ii) Disney+ Servisi’nde veya bir bildirim paylaşılmasına ek
              olarak uygulama içi bildirim ya da Disney+ web sitesinde
              paylaşılacak bir bildirim yoluyla ve/veya (iii) bir Disney+ hesabı
              için kaydettirdiğiniz cep telefonu numarasına SMS gönderilerek
              elektronik olarak gerçekleştirilecektir. Disney+ web sitesi
              üzerinden yapılan bildirimlerin Disney+ web sitesinde
              paylaşıldıktan bir gün sonra gönderilmiş sayılması durumu
              haricinde bildirimler gönderildikleri gün teslim edilmiş
              sayılacaktır. Tarafımızdan gönderilecek bildirimler ve diğer
              iletişimler için iletişim bilgileriniz dahil olmak üzere doğru,
              güncel ve eksiksiz bilgiler sağlamayı ve bilgileri bu şekilde
              tutmayı kabul etmektesiniz. Başka bir kişinin kullanıcı adı,
              parolası veya diğer hesap bilgileri ya da başka bir kişinin adını
              veya benzerliğini kullanmak ya da yanlış bilgiler sağlamak dahil
              olmak üzere, başka bir kişinin ya da kuruluşun kimliğine
              bürünmeyeceğinizi veya herhangi bir kişiyle ya da kurumla olan
              ilişkinizi yanıltıcı bir şekilde beyan etmeyeceğinizi
              onaylamaktasınız. Sağladığınız bilgilerin doğruluğunu onaylamak
              için gerekli adımları atabileceğimizi kabul etmektesiniz.
              <br />
              <br />
              2. ÜYELİK ŞARTLARI
              <br />
              a. Üyelik. Disney+ Servisi’ne üye olmak için devam eden/tekrar
              eden bir ödeme planına kaydolmanız gerekmektedir. Üyeliğiniz
              belirsiz bir süre için devam eder ve aşağıdaki iptal talimatları
              doğrultusunda iptal edilebilir. Ödeme, iptal edilmediği sürece
              satın alma onaylandığında ve her yeni fatura döneminin
              başlangıcında tercih ettiğiniz ödeme yöntemi üzerinden tahsil
              edilecektir. Fatura dönemi, Disney+ Servisi’ne erişmek için
              ödemeyi kabul ettiğiniz dönem anlamına gelmektedir; örneğin her ay
              düzenli olarak ödeme yapmayı kabul ettiyseniz fatura dönemi ayda
              bir olacaktır (ve bu durumda ödemenin geçerli olduğu ay boyunca
              Disney+ Servisi’ne erişim sağlanacaktır). Benzer şekilde, her yıl
              düzenli olarak ödeme yapmayı kabul ettiyseniz fatura dönemi yılda
              bir olacaktır (ve bu durumda ödemenin geçerli olduğu yıl boyunca
              Disney+ Servisi’ne erişim sağlanacaktır).
              <br />
              Yukarıda belirtilen hükümlere ek olarak, Disney+ Servisi’ne
              üyeliğiniz bir Disney hediye kartı ile etkinleştirilmişse ve bize
              herhangi bir ödeme yöntemi beyan etmemişseniz Disney hediye kartı
              tarafından sağlanan üyelik döneminin sonunda üyeliğiniz sona
              erecektir.
              <br />
              b. Ücretsiz Deneme Süreleri. Disney+ Servisi üyeliği bir ücretsiz
              deneme süresi ile başlayabilir. Ücretsiz deneme süresinin
              sunulacağı garanti değildir ve sunulması durumunda sadece herhangi
              bir Disney+ Servisi için daha önce ücretsiz deneme süresi
              kullanmamış kişilere sunulacaktır. Ücretsiz deneme sürenizin
              şartları, Disney+ Servisi için kayıt yaptırırken size
              bildirilecektir. Ücretsiz deneme sürenizin sona ermek üzere olduğu
              veya sona erdiği ya da ücretli üyeliğinizin başladığı size
              bildirilmeyecektir. İlk ödemeniz, aşağıdaki iptal talimatları
              doğrultusunda iptal edilmediği sürece ücretsiz deneme süresinin
              ardından tercih ettiğiniz ödeme yöntemi üzerinden derhal tahsil
              edilecektir. Ücretsiz deneme süreniz bitmeden önce üyeliğinizi
              dilediğiniz zaman iptal edebilirsiniz.
              <br />
              c. İptal ve Para İadesi Politikası. Mevcut fatura dönemi veya
              ücretsiz deneme süresi bitmeden önce üyeliğinizi dilediğiniz zaman
              iptal edebilirsiniz. İptal işlemi, mevcut fatura döneminin veya
              ücretsiz deneme süresinin sonunda geçerli olacaktır. Disney+
              üyeliğinizi iptal etmek için Disney+ Servisi’ndeki iptal ekranına
              gidin ve “İptal İşlemini Onayla” seçeneğine tıklayın. Üçüncü bir
              taraf (ör. iTunes, Google Play, Amazon Store veya Roku gibi bir
              uygulama mağazası) üzerinden üye olduysanız iptal işlemiyle ilgili
              talimatları öğrenmek için lütfen Yardım Merkezimizi ziyaret edin.
              İptal işlemi ancak mevcut fatura döneminin (veya ücretsiz deneme
              süresinin) sonunda geçerli olacaktır ve o tarihe kadar Disney+’a
              erişebilirsiniz. Yasalar uyarınca gerekli olduğu haller dışında,
              kısmen kullanılan fatura dönemleri için para iadesi yapılmaz veya
              alacak tanımlanmaz. Mevcut fatura döneminiz yılda bir ise, iptal
              işlemi ilgili ayın (veya ücretsiz deneme süresinin) sonunda
              geçerli olacaktır ve o tarihe kadar Disney+&quot;a erişmeye devam
              edebilirsiniz. Yasalar doğrultusunda, Disney+ Servisi’ne kayıt
              yaptırdıktan sonraki 14 gün içinde üyelikten cayma hakkına
              sahipsiniz. Bununla birlikte, Disney+ Servisi’nde oturum açarsanız
              veya Disney+ dijital içeriklerine erişirseniz Disney+ Servisi’nden
              cayma hakkınızı kaybetmiş olursunuz. İşbu Disney+ Üyelik
              Sözleşmesi’nin şartları uyarınca fesih hakkınız bu durumdan
              etkilenmez.
              <br />
              d. Ödeme Bilgileri. Ödeme bilgilerinin bize sağlandığı durumlarda,
              yasal olarak izin verilmesi halinde kredi kartı numaranız ve
              kartınızın son kullanma tarihi gibi ayrıntılı ödeme bilgilerini
              dosyada saklayacağız. Satın alma işlemi sırasında paylaşılmasına
              izin vermeniz halinde ödeme bilgilerinizi Walt Disney Şirketler
              Grubu (ör. ESPN, Marvel, Pixar vb.) içerisinde paylaşabiliriz.
              Hesap ayarlarınızdaki bilgilerde gerekli güncellemeleri yaparak
              ödeme bilgilerinizi güncel tutmak sizin sorumluluğunuzdadır. Ödeme
              bilgilerinizin değişmesi veya bilgilerin süresinin dolmak üzere
              olması halinde, yasaların izin verdiği durumlarda kart numaranız,
              son kullanma tarihi ve CVV (veya eşdeğeri) dahil olmak üzere
              güncel ödeme bilgilerinizi ödeme sağlayıcınızdan edinebilir veya
              alabiliriz. Bu işlem, sizin için Disney+ Servisi’ne erişim
              sağlamaya devam etmemize olanak verir. Söz konusu güncellenen
              bilgileri kullanarak ödeme kartınızdan tahsilat yapmaya devam
              etmemiz için bize yetki vermektesiniz. Son kullanma tarihinin
              geçmesi, yeterli bakiye olmaması veya başka bir nedenden olayı
              ödemenin başarıyla gerçekleştirilmemesi durumunda size bildirimde
              bulunarak üyeliğinizi askıya alabilir ya da feshedebiliriz.
              Disney+ üyeliğinizi yeniden başlatmaya karar verirseniz
              üyeliğinizi yeniden başlatırken alternatif bir ödeme yöntemi
              belirtmemeniz durumunda dosyada kayıtlı ödeme yönteminiz üzerinden
              tahsilat yapabileceğimizi kabul etmiş olursunuz.
              <br />
              e. Üçüncü Taraflar Üzerinden Edinilen Üyelikler. Disney+ Servisi
              üyeliğinizi üçüncü bir taraf (ör. bir uygulama mağazası) üzerinden
              edindiyseniz söz konusu üyelik aynı zamanda üçüncü tarafın
              şartlarına tabidir ve işbu Disney+ Üyelik Sözleşmesi’nin ilgili
              üçüncü tarafın şartlarıyla çelişkili olduğu durumlarda işbu
              Disney+ Üyelik Sözleşmesi’nde yer alan üyelik satın alma,
              faturalandırma, iptal/para iadesi ve ödeme ile ilgili hükümler söz
              konusu üyelik için geçerli olmaz. Üçüncü bir taraf üzerinden
              edinilen üyelikler için faturalandırma ilişkiniz doğrudan ilgili
              üçüncü taraf ile olacaktır. Disney+ Servisi üyeliğiniz için tahsil
              edilecek ücretler, söz konusu üçüncü tarafa sağladığınız ödeme
              bilgileri kullanılarak ilgili üçüncü tarafça
              faturalandırılacaktır. Üçüncü bir taraf üzerinden edinilen bir
              Disney+ Servisi üyeliğini iptal etmek için lütfen ilgili üçüncü
              tarafın belirttiği iptal talimatlarını uygulayın. Üçüncü bir taraf
              üzerinden edinilen bir Disney+ Servisi üyeliğinin iptal
              edilmesiyle ilgili talimatları öğrenmek için Yardım Merkezimizi
              ziyaret edebilirsiniz.
              <br />
              f. Paketli Üyelik Seçenekleri. Üçüncü taraf ürünler ve servislere
              üyelikler dahil olmak üzere bir Disney+ Servisi üyeliğini diğer
              üyelik servisleriyle birlikte paket halinde sunabiliriz. Üçüncü
              taraf üyelikler, ürünler ve servisler, söz konusu üçüncü
              taraflarca veya söz konusu taraflar adına yayımlanan kullanım
              şartlarına tabidir.
              <br />
              <br />
              3. TELİF HAKKI LİSANSININ VERİLMESİ VE KISITLAMALAR
              <br />
              a. Lisans. Bölge içerisinde ve işbu Disney+ Üyelik Sözleşmesi’nin
              şartları ve koşullarına tabi olmak kaydıyla Disney+ size
              aşağıdakilerle ilgili sınırlı, kişisel kullanıma yönelik,
              devredilemez, atanamaz, geri alınabilir, münhasır olmayan ve alt
              lisans yoluyla başkalarına lisanslanamayacak haklar vermektedir:
              <br />
              i. Disney+ Servisi’ni yüklemek ve ticari olmayan, kişisel
              amaçlarla kullanmak ve
              <br />
              ii. Disney+ Servisi’nin size sağladığı filmler, televizyon
              programları, diğer eğlence programları veya bilgilendirici
              programlar, fragmanlar, bonus materyaller, görüntüler ve sanat
              eserleri (“Disney+ İçerikleri”) dahil olmak üzere ancak bunlarla
              sınırlı kalmamak kaydıyla telif hakkı ile korunan materyalleri
              izlemek veya geçici olarak indirmek.
              <br />
              Bu bir lisans sözleşmesidir ve Disney+ İçerikleri veya Disney+
              Servisi ile ilgili herhangi bir hakkın satışı ya da atanması ile
              ilgili bir sözleşme değildir. Disney+ İçeriklerinin izlenmesi veya
              geçici olarak indirilmesi için bir lisansın satın alınması,
              Disney+ İçeriklerinde herhangi bir mülkiyet menfaati oluşturmaz.
              Disney+ İçerikleri ile ilgili telif hakları, ticari haklar, servis
              markaları, ticari adlar, ticari takdim şekilleri ve diğer fikri
              mülkiyet hakları dahil olmak üzere söz konusu Disney+ İçerikleri
              Disney+’a, onun iştiraklerine ve/veya diğer lisans sahiplerine
              aittir ve diğer fikri mülkiyet yasaları ve anlaşmalarının yanı
              sıra Amerika Birleşik Devletleri’ndeki yasalar dahil olmak üzere
              telif hakkı yasaları tarafından korunmaktadır.
              <br />
              b. Disney+ İçeriklerini Kullanımınızla İlgili Kısıtlamalar.
              Lisansınızın bir koşulu olarak aşağıdakileri gerçekleştiremezsiniz
              ve gerçekleştirmeyeceğinizi kabul edersiniz:
              <br />
              i. Disney+ İçeriklerine erişimi kontrol etmek üzere Disney+
              Servisi ile bağlantılı olarak kullanılan herhangi bir içerik
              koruma sistemini veya dijital hak yönetim teknolojilerini atlatmak
              veya devre dışı bırakmak,
              <br />
              ii. İşbu Disney+ Üyelik Sözleşmesi’nde açıkça izin verilen
              durumlar hariç olmak üzere Disney+ İçeriklerini kopyalamak,
              <br />
              iii. Disney+ Servisi üzerinden sunulan Disney+ İçeriklerini
              yeniden yayımlamak, iletmek veya sunmak,
              <br />
              iv. Disney+ İçeriklerinden türetilmiş işler oluşturmak veya
              <br />
              v. Diğer yollarla üçüncü tarafların yukarıdaki kısıtlamaları ihlal
              etmelerine izin vermek.
              <br />
              b. Disney+ Servisi’ni Kullanımınızla İlgili Kısıtlamalar.
              Lisansınızın bir koşulu olarak aşağıdakileri gerçekleştiremezsiniz
              ve gerçekleştirmeyeceğinizi kabul edersiniz:
              <br />
              i. Disney+ Servisi’ni ve/veya video oynatıcıyı, ardında yatan
              teknolojiyi, dijital hak yönetimi mekanizmalarını, cihazlarını ya
              da video oynatıcıya yerleştirilmiş olan diğer içerik korumalarını
              veya erişim kontrol önlemlerini kaldırmak, geri derlemek, onlara
              ters mühendislik uygulamak, onları parçalarına ayırmak ya da diğer
              yollarla okunabilir biçime dönüştürmek,
              <br />
              ii. Disney+ İçerikleri veya Disney+ Servisi’ndeki tanımlama, telif
              hakkı veya diğer mülkiyet bildirimlerini kaldırmak dahil olmak
              üzere ancak bunlarla sınırlı kalmamak kaydıyla Disney+ Servisi’ni
              değiştirmek,
              <br />
              iii. Disney+ Servisi’ne, siz ve/veya herhangi bir üçüncü taraf ile
              ürünlerimiz, servislerimiz veya markalarımız arasında bir ilişki
              olduğunu ima edecek şekilde erişmek ya da Disney+ Servisi’ni bu
              şekilde kullanmak,
              <br />
              iv. Disney+ Servisi’ni herhangi bir ticari faaliyet veya işle
              ilgili amaca yönelik olarak ya da herhangi bir ticari işletmede
              veya halka açık bir alanda (ör. lobi, bar, restoran, lokanta,
              stadyum, kumarhane, kulüp, kafe, sinema vb.) kullanmak veya kâr
              amaçlı olup olmamasına bakılmaksızın Disney+ İçeriklerinin veya
              Disney+ Servisi’nin kullanıldığı bir iş kurmak,
              <br />
              v. Yalnızca yukarıda belirtilen kısıtlamanın geçerli yasalar
              tarafından yasaklandığı durumlar hariç olmak üzere, Disney+
              Servisi’nde Disney’in sahip olduğu bileşenlerden, güncellemelerden
              veya bunların parçalarından türetilmiş işler oluşturmak,
              <br />
              vi. Disney+ Servisi’nin herhangi bir işlevini veya korumasını
              atlatmak, değiştirmek, aşmak, kurcalamak ya da bozmak,
              <br />
              vii. Yazılı açık iznimiz olmaksızın robot, böcek, kazıyıcı veya
              diğer otomatik yöntemleri ya da manuel süreçleri kullanarak
              Disney+ Servisi’nin herhangi bir bileşenine erişmek ya da herhangi
              bir bileşenini izlemek veya kopyalamak ya da diğer kişilerin veya
              kuruluşların erişmesine, izlemesine ya da kopyalamasına izin
              vermek,
              <br />
              viii. Disney+ Servisi’ne hasar vermek veya onu devre dışı
              bırakmak, aşırı yüklemek ya da çalışmaz hale getirmek,
              <br />
              ix. Disney+ Servisi’ni yasalara aykırı bir şekilde veya yasalara
              aykırı bir amaçla ya da işbu Disney+ Üyelik Sözleşmesi’ne uygun
              olmayan bir şekilde kullanmak,
              <br />
              x. Oturum açma bilgilerinizi üçüncü taraflarla paylaşmak veya
              <br />
              xi. Başka yollarla üçüncü tarafların yukarıdaki kısıtlamaları
              ihlal etmelerine izin vermek.
              <br />
              d. İhlaller. Yukarıdaki 3(b) ve 3(c) Bölümlerinde belirtilen
              herhangi bir kısıtlamanın ihlal edilmeye çalışılması, Disney+’ın
              ve telif hakkı sahibinin haklarının ihlal edilmesi anlamına gelir.
              <br />
              <br />
              4. KULLANIM ŞARTLARI
              <br />
              a. Disney+ ile Uyumlu Cihazlar. Disney+ Servisi’nin
              kullanılabilmesi için uyumlu cihazlar gerekir, belirli
              yazılımların düzenli olarak güncellenmesi gerekebilir ve Disney+
              Servisi’ni kullanımınız söz konusu bileşenlerin performansından
              etkilenebilir. İnternete bağlı hemen hemen her bilgisayarla veya
              belirli mobil cihazlarda ya da diğer cihazlarda kullanılabilen
              Disney+ uygulaması üzerinden (internet bağlantısı gerekir) (her
              biri “Uyumlu Cihaz”) Disney+ İçeriklerine erişebilirsiniz.
              Özellikle yeni işletim sistemlerinin çıkması durumunda cihaz
              desteği tarafımızca düzenli olarak gözden geçirilir ve daha eski
              cihazlar dahil olmak üzere bazı cihazlara sunulan destek
              durdurulabilir. Desteklenen cihazlar, işletim sistemleri, web
              tarayıcıları ve optimum izleme desteği ile ilgili ayrıntılar için
              lütfen Yardım Merkezimizi ziyaret edin. Disney+ uygulamasını
              Uyumlu Cihaza indirerek ve uygulama üzerinden Disney+ hesabınıza
              giriş yaparak Disney+ hesabınıza Uyumlu Cihaz ekleyebilirsiniz.
              <br />
              b. İnternet Bağlantısı. Disney+ Servisi’ne erişmek ve Disney+
              Servisi’nin belirli bileşenlerini kullanmak için yüksek hızlı
              internet bağlantısına sahip olmanız gerekir. Disney+ Servisi’ni
              kullanımınızla bağlantılı tüm üçüncü taraf internet erişimi
              ücretlerinden siz sorumlusunuz. Olası internet veri kullanımı
              ücretleri ile ilgili bilgi edinmek için lütfen internet
              sağlayıcınıza ulaşın.
              <br />
              c. Disney+ İçeriklerini İzleme. Disney+ İçerikleri, aktif bir
              internet bağlantısı üzerinden Disney+ Servisi’nde izlenebilir.
              Herhangi bir zamanda her bir Disney+ hesabı için en fazla dört (4)
              adet eşzamanlı izlemeye izin verilir. Kullanılabilecek eşzamanlı
              izleme sayısı, takdir yetkisi tarafımızda olmak üzere zaman zaman
              değiştirilebilir.
              <br />
              d. Disney+ İçeriklerini İndirme. Disney+ İçerikleri, belirli
              Uyumlu Cihazlarda çevrimdışı olarak izlenmek üzere geçici olarak
              indirilebilir. İndirmeler en fazla on (10) adet Uyumlu Cihaz ile
              sınırlıdır. En fazla on (10) adet Uyumlu Cihaza ulaşıldığında ek
              bir cihaza içerik indirmenize izin verilmez. İndirdiğiniz Disney+
              İçeriklerini çevrimdışı olarak izlemeye devam edebilmek için
              Uyumlu Cihazınızı internete bağlamalı ve en az otuz (30) günde bir
              Disney+ Servisi’ne erişmeniz gerekir. Geçici olarak indirilen
              belirli içerikleri çevrimdışı olarak izleyebileceğiniz süre,
              takdir yetkisi tarafımızda olmak üzere zaman zaman
              değiştirilebilir.
              <br />
              e. Profiller. Disney+, bir hesap altında bir veya daha fazla
              profil oluşturarak Disney+ Servisi’nin kullanımını kişiselleştirme
              seçeneği sunmaktadır. Bir veya daha fazla profili Çocuk profili
              olarak ayarlayabilirsiniz, böyle bir durumda söz konusu profilden
              belirli Disney+ İçeriklerinin izlenmesi kısıtlanacaktır. Çocuk
              profilleri hakkında daha fazla bilgi edinmek için lütfen Yardım
              Merkezimizi ziyaret edin.
              <br />
              f. Disney+ İçeriklerinin Kullanılabilirliği. Disney+ Servisi
              üyeliği üzerinden sunulan belirli Disney+ İçerikleri, Bölge
              içerisindeki tüm ülkelerde veya bölgelerde kullanılamayabilir.
              Disney+ Servisi’ne eriştiğiniz konuma bağlı olarak coğrafi
              kısıtlamalar uygulanacaktır ve coğrafi konumunuzu doğrulamak için
              farklı teknolojiler ve yöntemler kullanabiliriz.
              <br />
              g. Mücbir Sebepler. Disney+ Servisi ve/veya Disney+ İçeriklerinin
              bir kısmı ya da tamamı (i) bakım veya güncelleme dönemleri, (ii)
              elektrik veya sunucu kesintileri, (iii) savaş, isyan, grev,
              toplumsal huzursuzluk ya da (iv) bizim kontrolümüz veya üçüncü
              tarafların kontrolü dışındaki olaylar dahil olmak üzere (“Mücbir
              Sebepler”) herhangi bir zamanda izleme ya da indirme için
              kullanılamayabilir. Disney+, olası servis kesintilerini mümkün
              olan en kısa süre içinde size bildirmek için makul adımları
              atacaktır. Disney+ Servisi’nin bizim kontrolümüz veya diğer üçüncü
              taraf servis sağlayıcılarının kontrolü dışındaki nedenler yüzünden
              kullanılamaması durumunda Disney+ size karşı herhangi bir
              sorumluluğa sahip olmayacaktır. Zaman zaman belirli özellikleri ya
              da işlevleri ve/veya cihazların ya da platformların Disney+’a
              erişimini kaldırmak zorunda kalabiliriz. Bu gibi değişiklikleri,
              kullanım kurallarını ve kısıtlamaları size bildirmek için
              elimizden geleni yapacağız ancak takdir yetkisi tarafımızda olmak
              üzere bunu herhangi bir bildirimde bulunmadan yapabileceğimizi
              kabul etmektesiniz.
              <br />
              h. Disney+’ı Askıya Alma ve Sonlandırma. Disney+ Servisi’nin
              askıya alınması veya sonlandırılmasıyla ile ilgili olarak size
              karşı sorumlu olmayacağımızı kabul etmektesiniz. Üyeyseniz ve
              Disney+ Servisi’ne üyeliğinizi askıya alır veya sonlandırırsak
              askıya alınan veya sonlandırılan erişiminizin süresine karşılık
              olarak size alacak, para iadesi, indirim ya da diğer bir telafi
              olanağı sağlayacağız. Bununla birlikte, Disney+ Üyelik
              Sözleşmesi’ni ciddi bir şekilde ihlal ettiğiniz için ya da bir
              Mücbir Sebebin sonucu olarak hesabınızı feshedersek veya Disney+
              Servisi’ne erişiminizi askıya alır veya sonlandırırsak söz konusu
              alacak, para iadesi, indirim veya diğer telafi olanağından
              yararlanma hakkınız olmayacaktır.
              <br />
              i. Promosyon Amaçlı ve Deneysel Özellikler. Disney+ Servisi ile
              ilgili düzenli olarak gerçekleştirdiğimiz değerlendirmeler
              doğrultusunda zaman zaman kullanıcılarımızın tamamı veya belirli
              bir kısmı için çeşitli denemeler gerçekleştirebiliriz ya da
              promosyon amaçlı özellikler, kullanıcı arayüzleri, Öncelikli
              Erişim (veya benzer ek özellikler), planlar ve fiyatlandırmalar
              dahil olmak üzere Disney+ Servisi ile ilgili belirli özellikler
              veya farklı bileşenler teklif edebiliriz. Disney+ ile ilgili
              güncellemeleri, değişiklikleri veya ikame versiyonları
              kullanımınız, işbu Disney+ Üyelik Sözleşmesi’ne ve söz konusu
              güncelleme, değişiklik veya ikame versiyonu yüklediğinizde kabul
              ettiğiniz ek şartlara tabi olacaktır.
              <br />
              <br />
              5. BİLGİLERİNİZİN KULLANILMASI VE PAYLAŞILMASI
              <br />
              Disney+ Servisi’ni size sağlamak üzere kişisel bilgilerinizin
              işlenmesini üstlenen veri sorumlusunun Disney+ olduğunu kabul
              etmektesiniz.
              <br />
              Bilgilerinizi toplamamız, kullanmamız ve paylaşmamızla ile ilgili
              daha fazla bilgi için lütfen Walt Disney Company Gizlilik
              Politikası’na bakın. Her iki belge de Disney+ Hukuk Merkezi’nde
              her zaman bulunabilir.
              <br />
              Disney, verilerinizi Disney+ Servisi deneyiminizi kişiselleştirmek
              ve iyileştirmek, ayrıca size Disney+ Servisi hakkında bilgiler
              göndermek için kullanacaktır. İletişim tercihlerinizi dilediğiniz
              zaman değiştirebilirsiniz. Verilerinizi, Walt Disney Şirketler
              Grubu bünyesinde paylaşmak da dahil olmak üzere Walt Disney
              Company Gizlilik Politikası’nda açıklandığı şekilde
              kullanabiliriz.
              <br />
              Disney+, güvenlik olaylarını ve/veya yasa ihlallerini çözmelerine
              yardımcı olmak için bilgilerinizi diğer sitelerdeki sistem
              yöneticileri ve emniyet kurumları ile paylaşma hakkını saklı
              tutmaktadır ve siz de Disney+’ın bunu yapabileceğiniz kabul
              etmektesiniz. İyi niyet çerçevesinde, verdiğiniz bilgilere
              erişilmesinin ve bu bilgilerin muhafaza edilmesinin veya ifşa
              edilmesinin (i) Disney+’ın, ana şirketlerimizin, iştiraklerimizin
              veya bağlı kuruluşlarımızın ya da onların çalışanlarının,
              temsilcilerinin ve yüklenicilerinin yasal haklarını veya
              mülklerini korumak veya savunmak (sözleşmelerimizin uygulamaya
              geçirilmesi dahildir), (ii) acil durumlara müdahale etmek dahil
              olmak üzere, Disney+ Servisi kullanıcılarının veya toplumun
              üyelerinin güvenliğini ve emniyetini korumak, (iii)
              dolandırıcılığa karşı koruma sağlamak veya risk yönetimi yapmak ya
              da (iv) kanunlara veya yasal süreçlere uygun hareket etmek için
              gerekli olduğuna inanmamız halinde Disney+ tarafından bu bilgilere
              erişilebileceğini, bu bilgilerin muhafaza edilebileceğini veya
              ifşa edilebileceğini kabul etmektesiniz.
              <br />
              <br />
              6. ASKIYA ALMA VE FESHETME
              <br />
              a. Disney+, takdir yetkisi tamamen kendisinde olmak üzere, mevcut
              fatura döneminiz veya ücretsiz deneme süreniz sona ermeden önce
              herhangi bir zamanda önceden bildirimde bulunarak (bildirim
              elektronik ortam üzerinden de yapılabilir) Disney+ Servisi
              üyeliğinizi feshedebilir. Söz konusu fesih işlemi, mevcut fatura
              döneminizin veya ücretsiz deneme sürenizin bitiminde geçerli
              olacaktır.
              <br />
              b. Ayrıca Disney+, haklı sebeplerle ve makul süre içerisinde
              bildirimde bulunarak (bildirim elektronik ortam üzerinden de
              yapılabilir) Disney+ hesabınıza erişiminizi kısıtlayabilir veya
              askıya alabilir ya da feshedebilir. Bu tür bir kısıtlama veya
              askıya alma durumunda Sözleşme’yi haklı sebeple
              sonlandırabilirsiniz.
              <br />
              c. Disney+ hesabınızın Disney+ tarafından veya sizin talebiniz
              üzerine haklı sebeplerle feshedilmesi durumunda (üyeliğinizin
              fatura dönemi veya ücretsiz deneme süresi bitimine kadar devam
              edeceği iptal veya normal sonlandırma dışındaki durumlar) Disney+
              Servisi üzerinden yayımlanan Disney+ İçeriklerine erişim hakkınızı
              derhal, Disney+ Servisi içerisinde indirilmiş olan Disney+
              İçeriklerini görüntüleme hakkınızı ise kısıtlı bir süre içerisinde
              kaybedersiniz.
              <br />
              <br />
              7. EK HÜKÜMLER
              <br />
              a. Yalnızca Bilgilendirme ve Eğlendirme Amaçlı Olma. Disney+
              Servisi üzerinden teslim aldığınız Disney+ İçeriklerinin yalnızca
              bilgilendirme ve eğlendirme amaçlı olduğunu anlamakta ve kabul
              etmektesiniz. Disney+ İçerikleri; yasal, finansal, profesyonel,
              tıbbi veya sağlıkla ilgili tavsiye ya da teşhis niteliğinde
              değildir ve bu amaçlar için kullanılamaz.
              <br />
              b. Disney+ İçeriklerinin Öznelliği. Disney+ İçerikleri farklı
              kişilerde farklı tepkilere neden olabilir. Saldırgan, uygunsuz,
              müstehcen veya sakıncalı bulabileceğiniz Disney+ İçerikleriyle
              karşılaşabilirsiniz. Ayrıca içerik derecelendirmeleri, sınıfları,
              türleri, kategorileri ve/veya açıklamaları serviste gezinmenize
              yardımcı olmayı ve bilgi vermeyi amaçlayan öneriler olarak
              sunulmaktadır. Bunlarla aynı fikirde olacağınızı garanti
              etmemekteyiz. Bu riskleri ve hangi Disney+ İçeriklerinin ailenize
              uygun olduğuna dair yapacağınız seçimlerle ilgili sorumluluğu
              kabul etmektesiniz.
              <br />
              c. Işığa Duyarlılık. Disney+ İçeriklerinde, fotosensitif epilepsi
              ya da diğer ışığa duyarlılık durumlarına yatkın kullanıcıları
              etkileyebilecek bazı yanıp sönen ışık sekansları veya görüntüleri
              olabilir. Ayrıca 4K UHD HDR içerik versiyonları, kullanıcıları
              etkileyebilecek şekilde daha yüksek parlaklık ve renk doygunluğuna
              olanak verebilir.
              <br />
              d. Disney+ İçeriklerinin Kalitesi. Size optimum izleme deneyimini
              sunmak için çeşitli teknolojilerden faydalanmaktayız. Örneğin
              belirli Disney+ İçerikleri için HD ve 4K Ultra HD kalitesi
              sunulmaktadır. Bununla birlikte, çözünürlük dahil olmak üzere
              Disney+ İçeriklerinin oynatma kalitesi diğer pek çok faktörün yanı
              sıra Disney+ İçeriklerinin formatı, konumunuz, internet
              hizmetinizin hızı, bant genişliği ve çeşitli koşulları ile
              kullanılan cihazlardan etkilenebilir. Disney+ İçeriklerini
              izlemeye başlayabilmeniz için geçen süre; konumunuz, internet bant
              genişliği, aynı anda aynı ağa bağlı cihaz sayısı, seçmiş olduğunuz
              Disney+ İçeriği ve kullandığınız cihazın yapılandırması dahil
              olmak üzere pek çok faktöre göre değişiklik gösterecektir.
              <br />
              e. Üçüncü Taraf Servisler ve Disney+ İçerikleri. Disney+ Servisi,
              üçüncü taraf servisleri ve içerikleri entegre edebilir, bunlara
              entegre edilebilir veya bunlarla bağlantılı olarak sunulabilir. Bu
              tür üçüncü taraf servisleri ve içerikleri kontrol etmemekteyiz.
              İlgili üçüncü taraf servisler ve içerikler için geçerli olan
              kullanım şartlarını, sözleşmeleri ve gizlilik politikalarını
              okumalısınız. Disney+ Servisi’ne üçüncü taraf bir servisi veya
              cihazı (örneğin Apple iOS, Android veya Microsoft Windows ile
              çalışan bir cihaz) kullanarak erişiyorsanız bu durumda söz konusu
              anlaşmanın üçüncü taraf lehtarı sırasıyla Apple Inc., Google, Inc.
              veya Microsoft Corporation ya da söz konusu üçüncü taraf servisi
              veya cihazı sunan diğer şirket olacaktır. Ancak bu üçüncü taraf
              lehtarlar işbu Disney+ Üyelik Sözleşmesi’nin tarafı değildir.
              Disney+ Servisi’ne bu cihazlar üzerinden erişiminizin ilgili
              üçüncü taraf lehtarın hizmet şartlarında belirtilen kullanım
              şartlarına tabi olacağınızı kabul etmektesiniz.
              <br />
              f. Mobil Ağlar. Disney+ Servisi’ne bir mobil ağ üzerinden
              eriştiğinizde ağ veya dolaşım sağlayıcınızın mesajlaşma ücretleri,
              veri ücretleri ve diğer fiyatları ve ücretleri geçerli olacaktır.
              Disney+ Servisi’ni indirmeniz, yüklemeniz ya da kullanmanız ağ
              sağlayıcınız tarafından engellenebilir veya kısıtlanabilir ve
              Disney+ Servisi ağ sağlayıcınızla veya cihazınızla çalışmayabilir.
              <br />
              g. Gönderiler ve Talep Edilmeyen Fikirler Politikası. Politikamız,
              talep edilmeyen yaratıcı fikirleri, önerileri veya materyalleri
              kabul etmemize ya da değerlendirmemize izin vermemektedir.
              Tarafımızca talep edilmiş olsun veya olmasın, bize
              gönderdiklerinizle bağlantılı olarak gönderdiğiniz yaratıcı
              fikirlerin, önerilerin veya diğer materyallerin gizli ya da
              güvende olmadığını ve sizinle bizim aramızda herhangi bir şekilde
              gizlilik ya da emanet ilişkisi amaçlanmadığını veya kurulmadığını
              ve herhangi bir inceleme, ödeme ya da değerlendirme beklentiniz
              olmadığını kabul etmektesiniz. Disney+, gönderilen fikirler,
              öneriler veya diğer materyaller üzerinde mülkiyet hakkı talep
              etmez.
              <br />
              h. İletişim Bilgileri. Disney+ web sitesinde yer alan iletişim
              bilgilerini kullanarak müşteri hizmetleriyle ilgili her türlü
              neden için Disney+’a ulaşabilirsiniz.
              <br />
              i. Sorumluluk Reddi; Sorumluluk Sınırlaması. Disney+ Servisi ile
              ilgili olarak belirli yasal haklara sahipsiniz ve işbu Disney+
              Üyelik Sözleşmesi kapsamındaki hiçbir şey bu haklarınızı
              etkilemez. Disney, onun iştirakleri, lisans sahipleri,
              temsilcileri ve servis sağlayıcıları (hep birlikte “Disney+
              Tarafları”), yasalarca gerekli görülen veya Disney+ tarafından
              açıkça ifade edilen durumlar hariç olmak üzere Disney+ İçerikleri
              ve Disney+ Servisi ile ilgili herhangi bir taahhüt veya garantide
              bulunmamakta ve bunları açıkça reddetmektedir. Size ait bir
              cihazın veya diğer dijital içeriklerin doğrudan Disney+
              İçeriklerinin temin edilmesi nedeniyle hasar gördüğü ve Disney+
              makul özeni ve yetkinliği göstermiş olsa söz konusu hasarın
              önlenebileceği durumlar (bu durumlarda ilgili hasara ilişkin
              olarak aşağıdaki kısıtlama geçerli olacaktır) hariç olmak üzere
              Disney+ İçeriklerine ve Disney+ Servisi’ne erişmek için kullanılan
              cihazların gerekli servis, onarım veya bakımıyla ilgili tüm
              masraflar Disney+ Taraflarına değil size aittir. Disney+
              Tarafları, geçerli yasaların müsaade ettiği ölçüde, her ne şekilde
              ortaya çıkmış olursa olsun ve bu tür bir zararın ortaya çıkma
              ihtimali tarafımıza bildirilmiş olsa dahi Disney+ İçeriklerinin
              veya Disney+ Servisi’nin kullanılmasından ya da
              kullanılamamasından kaynaklanan herhangi bir fiziksel yaralanma
              veya kâr kaybı ve mala yönelik zarar dahil olmak üzere herhangi
              bir dolaylı, özel, arızi veya nihai zarardan hiçbir koşulda
              yükümlü olmayacaktır. Ayrıca sorumluluklarımızın yerine
              getirilmesinde makul kontrolümüz dışındaki sebeplerden kaynaklanan
              gecikmelerden veya aksamalardan da sorumlu tutulmayacağız. Tüm
              zararlar, kayıplar ve hukuki sebepler sonucunda tarafınıza olan
              toplam yükümlülüğümüz hiçbir durumda bin sterlini (£1.000)
              geçmeyecektir. Bu bölümdeki sorumluluk sınırlamaları, her türlü
              hukuk teorisi kapsamında (haksız fiil, sözleşme, garanti ihlali,
              kusursuz sorumluluk ve diğerleri) ve Disney+ Tarafları bu tür
              zararların ortaya çıkma ihtimalinden haberdar edilmiş olsa dahi
              geçerli olacaktır. Bazı yargı merciileri sorumluluğun olmamasına
              veya sınırlandırılmasına izin vermediğinden yukarıdaki
              sınırlandırma sizin için geçerli olmayabilir.
              <br />
              j. Yargı Mercii. Siz ve Walt Disney Company veya iştirakleri
              arasındaki her türlü ihtilaf, ilgili kurallarda belirtilen yetkili
              Mahkeme tarafından çözüme kavuşturulacaktır.
              <br />
              j. Hukuk Seçimi. İşbu Disney+ Üyelik Sözleşmesi ve işbu Disney+
              Üyelik Sözleşmesi’nden doğan veya onunla bağlantılı olarak ortaya
              çıkan her türlü ihtilaf veya hak talebi, ikamet ettiğiniz ülkedeki
              zorunlu kurallara halel getirmeksizin İngiltere ve Galler
              yasalarına göre yönetilecek ve yorumlanacaktır.
              <br />
              k. Ayrılabilirlik. İşbu Disney+ Üyelik Sözleşmesi’nin herhangi bir
              hükmünün yasa dışı, geçersiz veya herhangi bir sebeple uygulanamaz
              olması halinde ilgili hüküm işbu şartlardan ayrılabilir olarak
              değerlendirilecek ve kalan hükümlerin geçerliliğini ve
              uygulanabilirliğini etkilemeyecektir. Siz ve Disney+; yasa dışı,
              geçersiz veya uygulanamaz olan kısmı geçerli ve bağlayıcı olan ve
              Disney+ Üyelik Sözleşmesi’nin içeriği ve amacı doğrultusunda yasa
              dışı, geçersiz veya uygulanamaz kısımla mümkün olduğunca aynı
              etkiye sahip hükümlerle değiştireceksiniz.
              <br />
              l. Geçerliliğini Sürdürme. Mahiyetleri gereği işbu Disney+ Üyelik
              Sözleşmesi’nin feshedilmesinden sonra geçerliliklerini sürdürmesi
              gereken hükümler, işbu Disney+ Üyelik Sözleşmesi’nin
              feshedilmesinden sonra da geçerliliklerini sürdürecektir.
              <br />
              m. İhtilafların Çözümü. Şu anda müşteri şikayetlerini çözme
              yöntemi olarak alternatif uyuşmazlık çözümünü (ADR)
              kullanmamaktayız. Herhangi bir şikayetiniz varsa lütfen Yardım
              Merkezi aracılığıyla doğrudan bize ulaşın.
              <br />
              n. Geçerli Dil. Gelecekteki herhangi bir değişikliğin veya
              iletişimin Disney+ Servisi tarafından seçtiğiniz dilden farklı bir
              dilde gönderilmesi halinde gelecekteki bu değişikliklerin ve
              iletişimlerin geçerli olacağını ve değişiklikler söz konusu
              olduğunda yasalar nezdinde yürürlükte olacağını kabul etmekte ve
              onaylamaktasınız.
              <br />
              o. Hakların Devri. İşbu Sözleşme kapsamındaki haklarımızı ve
              yükümlülüklerimizi sizden izin alma gereği olmadan herhangi bir
              şirkete, firmaya veya kişiye devredebiliriz.
            </div>
          </div>
        </div>
        <div>
          <span className='text-[11px] font-medium flex items-center justify-center leading-[1.5] text-[#f9f9f9] px-5'>
            {' '}
            By clicking &quot;Agree & Continue&quot;, you agree to our
            Subscriber Agreement.
          </span>
        </div>
        <div className='block px-16'>
          <button
            type='submit'
            onClick={handleSubmit(onSubmit)}
            className='mt-3 h-12 inline-flex items-center justify-center w-full bg-[#0072d2] text-[#f9f9f9] text-[15px] font-medium uppercase border-none rounded hover:bg-[#0682f0] active:bg-[#183966] transition-[background-color_.2s_ease-in-out]'
          >
            Agree & Continue
          </button>
        </div>
      </div>
    );
  }

  if (step === STEPS.PASSWORD) {
    formContent = (
      <div className=' text-[#fff] mx-auto my-8 max-w-[374px] overflow-visible w-full '>
        <p className='text-[#cacaca] m-0 pb-1 text-[9.7px] leading-[1.5] font-medium tracking-[1.2px] uppercase'>
          Step 3 of 3
        </p>
        <form
          className='block animate-slide-in'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className='text-[24px] leading-[1.2] tracking-[.11px] pb-2 font-medium select-none'>
            Create a password
          </h3>
          <div className='pb-6'>
            <span>
              <p className='text-left m-0 text-[14px] leading-[1.6] tracking-tight select-none'>
                You will use this email and password to log into your Disney+
                account to watch your favourite shows and movies.
              </p>
            </span>
          </div>
          <fieldset className='mb-6'>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                placeholder='Password'
                {...register('password', { required: true })}
                onChange={handleChange}
                className='placeholder:text-sm text-[16.4px] backdrop-filter h-12 m-0 outline-none px-3 py-[10px] w-full rounded-[4px] bg-[#31343e]'
              />
              <button
                onClick={handleShowPassword}
                className='absolute right-4 top-[13px] inline-block cursor-pointer bg-transparent'
              >
                {showPassword ? (
                  <div className='fill-[#CCCCCC] hover:fill-[#fff]'>
                    <HidePassword />
                  </div>
                ) : (
                  <div className='fill-[#CCCCCC] hover:fill-[#fff]'>
                    <ShowPassword />
                  </div>
                )}
              </button>
            </div>
            {password.length > 0 && (
              <div className='flex items-center mt-2'>
                <div
                  className={`w-1/2 h-[3px] bg-[#434754]  ml-[6px] mr-[1.5px] rounded-full `}
                >
                  <div
                    className={`h-[3px] rounded-full ${getProgressBarColor()} ${getProgressBarWidth()}`}
                  ></div>
                </div>
                <div className='ml-2 -mt-1'>
                  <span
                    className={`font-semibold text-[10.6px] ${getPasswordStrengthText()}`}
                  >
                    {passwordStrength}
                  </span>
                </div>
              </div>
            )}
            <div className='text-[11px] leading-[1.8] font-medium text-[#cacaca] m-1'>
              Use a minimum of 6 characters (case sensitive) with at least one
              number or special character.
            </div>
          </fieldset>
          <div className='border-l-2 border-[#a8a9ad] pl-3 mt-[14px] ml-0 mb-9 text-[#fff]'>
            <p className='text-[#a8a9ad] text-[15px]'>
              You&apos;ll be using this email address to log in:
            </p>
            <p className='text-[18px] text-[#f9f9f9] m-0 leading-[1.6]'>
              {email}
            </p>
          </div>

          <div className='block'>
            <button
              type='submit'
              onSubmit={handleSubmit(onSubmit)}
              className='h-12 inline-flex items-center justify-center w-full bg-[#0072d2] text-[#f9f9f9] font-medium uppercase border-none rounded hover:bg-[#0682f0] active:bg-[#183966] transition-[background-color_.2s_ease-in-out]'
            >
              {loading ? (
                <div className='w-7 h-7'>
                  <Loader />
                </div>
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      <nav className='flex justify-between items-center z-10 md:h-[72px] px-[38px] bg-[#1a1d29] border-b border-b-[#31343e]'>
        <div>
          <Link href='/auth'>
            <Image
              className=' w-auto h-[40px] inline-block'
              priority
              unoptimized
              alt='Disney+'
              width={100}
              height={100}
              src='https://cnbl-cdn.bamgrid.com/assets/7ecc8bcb60ad77193058d63e321bd21cbac2fc67281dbd9927676ea4a4c83594/original'
            />
          </Link>
        </div>
        <Link href='/login' className='font-medium text-[15px]'>
          Log In
        </Link>
      </nav>
      <main className='block min-h-[calc(100vh-170px)] px-[calc(3.5vw+24px)] overflow-x-auto  bg-[#1a1d29]'>
        {formContent}
      </main>
      <Footer />
    </>
  );
};

export default SignupClient;
