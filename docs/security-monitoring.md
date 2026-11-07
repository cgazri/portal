# Pemantauan portal

## Semakan harian

GitHub Actions menjalankan Gitleaks pada sejarah Git dan ClamAV pada fail
repositori semasa setiap hari, apabila `main` dikemas kini, atau secara manual.
Semak keputusan dalam Dashboard Guru atau pada tab Actions. Jika pemasangan
alat, muat turun tandatangan, atau imbasan gagal, workflow ditandakan gagal;
ini tidak semestinya bermaksud malware telah ditemui.

Imbasan ini hanya meliputi rahsia yang sepadan dengan peraturan dan malware
yang diketahui. Ia tidak mengesahkan fail bebas bahaya, menyemak konfigurasi
RLS Supabase, atau mengesan semua serangan dan kebocoran. Semak log Supabase,
notifikasi keselamatan GitHub dan e-mel amaran secara berasingan. Hasil dan
log GitHub Actions untuk repositori awam boleh dilihat orang lain; jangan
letakkan data peribadi atau rahsia dalam output workflow.
`.gitleaksignore` mengecualikan satu penemuan sejarah yang dikenal pasti
sebagai kunci Supabase jenis publishable, bukan kunci rahsia.

## Aktiviti Supabase

1. Dalam Supabase Dashboard projek ini, buka SQL Editor.
2. Jalankan kandungan `supabase/portal-activity-ping.sql` sekali. Fungsi ini
   hanya mengembalikan boolean dan tidak membaca rekod pelajar.
3. Pada GitHub Actions, buka **Supabase activity** dan pilih **Run workflow**.
   Semak bahawa ia berjaya dan status muncul pada Dashboard Guru.

Workflow menghantar satu permintaan setiap Selasa 10:23 pagi waktu Malaysia.
Panggilan ini tidak menjamin projek percuma tidak akan dijeda: Supabase
menilai aktiviti dalam tempoh tujuh hari, dan jadual GitHub boleh terlewat
atau dilumpuhkan. Semak e-mel dan status; pelan berbayar adalah pilihan
Supabase untuk mengelakkan penjedaan kerana tidak aktif.

Jika fungsi belum dipasang, atau panggilan gagal atas sebab lain, workflow
akan gagal dan Dashboard Guru akan menunjukkan kegagalan. Jangan berikan
akses tanpa nama kepada jadual pelajar untuk tujuan ini.

## Fail peribadi

`.gitignore` membenarkan laluan projek tertentu sahaja secara lalai kerana
workspace ini turut mengandungi dokumen peribadi. Jika menambah laluan projek
baharu, semak kandungannya sebelum mengubah senarai tersebut. Jangan gunakan
`git add -f` untuk memaksa fail peribadi masuk ke repositori.
