import { BookId } from '@/types/books';

export type DoodleIconType =
  | 'compass'
  | 'gears'
  | 'blueprint'
  | 'listen'
  | 'key'
  | 'magnifier'
  | 'battery'
  | 'target'
  | 'spotlight'
  | 'map'
  | 'telescope'
  | 'trophy'
  | 'bicycle'
  | 'journal'
  | 'toolbox'
  | 'shield'
  | 'fire'
  | 'scale'
  | 'switch'
  | 'calendar'
  | 'torch'
  | 'gate'
  | 'easel'
  | 'tea'
  | 'thermometer'
  | 'marathon'
  | 'lighthouse'
  | 'bridge';

export interface ChapterIllustrationMeta {
  bookId: BookId;
  chapterIndex: number;
  slug: string;
  imagePath: string;
  captionId: string;
  captionEn: string;
  iconType: DoodleIconType;
}

export const CHAPTER_ILLUSTRATIONS: Record<string, ChapterIllustrationMeta> = {
  // BUKU 1
  'book-1:ch-0': {
    bookId: 'book-1',
    chapterIndex: 0,
    slug: 'ch-0',
    imagePath: '/illustrations/book-1/ch-0.webp',
    captionId: 'Lencana kapten tim pertama: Masih sedikit canggung di hari perdana, tapi siap belajar memimpin dengan empati dan ketegasan taktis.',
    captionEn: 'First-time team lead milestone: Stepping up to leadership, ready to align with empathy and tactical clarity.',
    iconType: 'compass',
  },
  'book-1:ch-1': {
    bookId: 'book-1',
    chapterIndex: 1,
    slug: 'ch-1',
    imagePath: '/illustrations/book-1/ch-1.webp',
    captionId: 'Beralih dari juggling semua gir sendirian menjadi konduktor orkestra yang menjaga ritme tim tetap harmonis.',
    captionEn: 'Transitioning from frantic solo gear-juggling to conducting an orchestra where everyone turns gears in harmony.',
    iconType: 'gears',
  },
  'book-1:ch-2': {
    bookId: 'book-1',
    chapterIndex: 2,
    slug: 'ch-2',
    imagePath: '/illustrations/book-1/ch-2.webp',
    captionId: 'Cetak biru 4 Obrolan Inti dan 4 Skill Komunikasi di atas meja kerja sketsa.',
    captionEn: 'The 4x4 Framework: Blueprint of 4 Core Conversations paired with 4 Communication Skills.',
    iconType: 'blueprint',
  },
  'book-1:ch-3': {
    bookId: 'book-1',
    chapterIndex: 3,
    slug: 'ch-3',
    imagePath: '/illustrations/book-1/ch-3.webp',
    captionId: 'Menutup laptop setengah dan menaruh ponsel terbalik: menyimak sampai memahami benang kusut yang diceritakan.',
    captionEn: 'Laptops half-closed, phones face down: listening attentively until the tangled thread unspools into clarity.',
    iconType: 'listen',
  },
  'book-1:ch-4': {
    bookId: 'book-1',
    chapterIndex: 4,
    slug: 'ch-4',
    imagePath: '/illustrations/book-1/ch-4.webp',
    captionId: 'Memberikan kunci tanda tanya agar anggota tim membuka pintu solusinya sendiri.',
    captionEn: 'Handing over the question-mark key that unlocks self-discovered solutions.',
    iconType: 'key',
  },
  'book-1:ch-5': {
    bookId: 'book-1',
    chapterIndex: 5,
    slug: 'ch-5',
    imagePath: '/illustrations/book-1/ch-5.webp',
    captionId: 'Meneliti grafik bersama lewat kaca pembesar objektif, bukan saling tunjuk telunjuk.',
    captionEn: 'Examining the problem together through an objective lens instead of pointing fingers.',
    iconType: 'magnifier',
  },
  'book-1:ch-6': {
    bookId: 'book-1',
    chapterIndex: 6,
    slug: 'ch-6',
    imagePath: '/illustrations/book-1/ch-6.webp',
    captionId: 'Memasang baterai keyakinan mandiri agar tim berani melangkah naik ke tangga berikutnya.',
    captionEn: 'Slotting in the battery of quiet confidence so teammates take the next step boldly.',
    iconType: 'battery',
  },
  'book-1:ch-7': {
    bookId: 'book-1',
    chapterIndex: 7,
    slug: 'ch-7',
    imagePath: '/illustrations/book-1/ch-7.webp',
    captionId: 'Membidik papan sasaran dengan rumus 3K: Kongkret, Kriteria selesai, dan Kapan batas waktunya.',
    captionEn: 'Aligning focus toward clear targets: Concrete outcomes, Clear criteria, and Confirmed timelines.',
    iconType: 'target',
  },
  'book-1:ch-8': {
    bookId: 'book-1',
    chapterIndex: 8,
    slug: 'ch-8',
    imagePath: '/illustrations/book-1/ch-8.webp',
    captionId: 'Menyalakan lampu sorot spontan tepat pada kepingan puzzle kontribusi yang baru dipasang.',
    captionEn: 'Shining a timely spotlight on the specific puzzle piece just completed with excellence.',
    iconType: 'spotlight',
  },
  'book-1:ch-9': {
    bookId: 'book-1',
    chapterIndex: 9,
    slug: 'ch-9',
    imagePath: '/illustrations/book-1/ch-9.webp',
    captionId: 'Memandu putar balik secara ramah dan empat mata saat kerjaan sempat melenceng dari peta.',
    captionEn: 'Gently guiding course corrections behind closed doors without embarrassment or drama.',
    iconType: 'map',
  },
  'book-1:ch-10': {
    bookId: 'book-1',
    chapterIndex: 10,
    slug: 'ch-10',
    imagePath: '/illustrations/book-1/ch-10.webp',
    captionId: 'Teropong masa depan 70% vs spion kecil 30%: evaluasi berkala yang tidak pernah memunculkan kejutan buruk.',
    captionEn: '70% forward telescope vs 30% rearview mirror: reviews that never spring unpleasant surprises.',
    iconType: 'telescope',
  },
  'book-1:ch-11': {
    bookId: 'book-1',
    chapterIndex: 11,
    slug: 'ch-11',
    imagePath: '/illustrations/book-1/ch-11.webp',
    captionId: 'Papan simulasi 4 pekan: latihan pendampingan bertahap dari minggu pertama hingga tim meluncur mandiri.',
    captionEn: 'A 4-week simulation path: practicing week-by-week coaching until independence is unlocked.',
    iconType: 'trophy',
  },
  'book-1:ch-12': {
    bookId: 'book-1',
    chapterIndex: 12,
    slug: 'ch-12',
    imagePath: '/illustrations/book-1/ch-12.webp',
    captionId: 'Dari sepeda beroda bantu sampai melaju kencang sendirian: kalibrasi gaya pendampingan L1–L4 ke G1–G4.',
    captionEn: 'From training wheels to solo riding: adapting leadership styles (S1–S4) to readiness levels (D1–D4).',
    iconType: 'bicycle',
  },
  'book-1:ch-13': {
    bookId: 'book-1',
    chapterIndex: 13,
    slug: 'ch-13',
    imagePath: '/illustrations/book-1/ch-13.webp',
    captionId: 'Mencentang jurnal spiral 30 hari ditemani secangkir teh hangat di meja kerja kantor.',
    captionEn: 'Logging 30 days of daily leadership habits in a spiral notebook over warm desk tea.',
    iconType: 'journal',
  },
  'book-1:ch-14': {
    bookId: 'book-1',
    chapterIndex: 14,
    slug: 'ch-14',
    imagePath: '/illustrations/book-1/ch-14.webp',
    captionId: 'Kotak perkakas taktis meja kerja: contekan skrip komunikasi, template rapat, dan rujukan riset primer.',
    captionEn: 'The Desk Reference Toolbox: conversation scripts, meeting templates, and primary research citations.',
    iconType: 'toolbox',
  },

  // BUKU 2
  'book-2:ch-0': {
    bookId: 'book-2',
    chapterIndex: 0,
    slug: 'ch-0',
    imagePath: '/illustrations/book-2/ch-0.webp',
    captionId: 'Kelelahan menopang tumpukan map yang goyah—saatnya beralih dari memadamkan api ke membangun sistem kerja otomatis.',
    captionEn: 'Carrying a precarious stack of folders on low battery—time to transition from burnout firefighting to system architecture.',
    iconType: 'fire',
  },
  'book-2:ch-1': {
    bookId: 'book-2',
    chapterIndex: 1,
    slug: 'ch-1',
    imagePath: '/illustrations/book-2/ch-1.webp',
    captionId: 'Meninggalkan semprotan pemadam kebakaran darurat untuk merancang ban berjalan otomatis yang mandiri.',
    captionEn: 'Retiring the emergency firehose to design a self-running conveyor belt system.',
    iconType: 'blueprint',
  },
  'book-2:ch-2': {
    bookId: 'book-2',
    chapterIndex: 2,
    slug: 'ch-2',
    imagePath: '/illustrations/book-2/ch-2.webp',
    captionId: 'Perisai energi perlindungan diri di tengah putaran 4 roda gigi ketahanan jangka panjang.',
    captionEn: 'The Protective Shield: guarding mental stamina amidst the 4 gears of organizational resilience.',
    iconType: 'shield',
  },
  'book-2:ch-3': {
    bookId: 'book-2',
    chapterIndex: 3,
    slug: 'ch-3',
    imagePath: '/illustrations/book-2/ch-3.webp',
    captionId: 'Kaca pelindung transparan yang menyaring awan badai emosional menjadi tiga kubus masalah objektif.',
    captionEn: 'The Clear Shield: transforming dark emotional storm clouds into three workable objective cubes.',
    iconType: 'shield',
  },
  'book-2:ch-4': {
    bookId: 'book-2',
    chapterIndex: 4,
    slug: 'ch-4',
    imagePath: '/illustrations/book-2/ch-4.webp',
    captionId: 'Menolak monyet tugas melompat ke punggung leader: arahkan tim merawat tugas mereka sendiri.',
    captionEn: 'Stopping task monkeys from leaping onto the leader’s back: empower the owner to hold the leash.',
    iconType: 'key',
  },
  'book-2:ch-5': {
    bookId: 'book-2',
    chapterIndex: 5,
    slug: 'ch-5',
    imagePath: '/illustrations/book-2/ch-5.webp',
    captionId: 'Menjaga neraca kapasitas tetap seimbang dengan data dan opsi trade-off yang transparan.',
    captionEn: 'Balancing the capacity scale with transparent data and calm trade-off proposals.',
    iconType: 'scale',
  },
  'book-2:ch-6': {
    bookId: 'book-2',
    chapterIndex: 6,
    slug: 'ch-6',
    imagePath: '/illustrations/book-2/ch-6.webp',
    captionId: 'Mematikan saklar pikiran jam kerja jam 6 sore: laptop ditutup, malam adalah waktu pemulihan sejati.',
    captionEn: 'Flipping the mental power switch off at 6 PM: closed laptops and protected evening recovery.',
    iconType: 'switch',
  },
  'book-2:ch-7': {
    bookId: 'book-2',
    chapterIndex: 7,
    slug: 'ch-7',
    imagePath: '/illustrations/book-2/ch-7.webp',
    captionId: 'Menggunting tali balon rapat yang mubazir untuk menyisakan blok fokus kuning yang terlindungi.',
    captionEn: 'Snipping strings of cluttered meeting balloons to protect high-impact focus blocks.',
    iconType: 'calendar',
  },
  'book-2:ch-8': {
    bookId: 'book-2',
    chapterIndex: 8,
    slug: 'ch-8',
    imagePath: '/illustrations/book-2/ch-8.webp',
    captionId: 'Estafet obor ke andalan tim: mencetak tangan kanan yang siap mengambil alih kendali harian.',
    captionEn: 'Passing the torch: grooming capable deputies ready to run daily operations smoothly.',
    iconType: 'torch',
  },
  'book-2:ch-9': {
    bookId: 'book-2',
    chapterIndex: 9,
    slug: 'ch-9',
    imagePath: '/illustrations/book-2/ch-9.webp',
    captionId: 'Menjaga pintu gerbang kerja agar antrean permintaan masuk secara teratur dan bermartabat.',
    captionEn: 'Guarding the workflow gateway: channeling inbound requests into an orderly single-file queue.',
    iconType: 'gate',
  },
  'book-2:ch-10': {
    bookId: 'book-2',
    chapterIndex: 10,
    slug: 'ch-10',
    imagePath: '/illustrations/book-2/ch-10.webp',
    captionId: 'Otomatisasi 70% kerjaan berulang sambil melukis roket inovasi di 30% ruang yang tersisa.',
    captionEn: 'Job crafting 30/70: automating 70% of routine grind to innovate in the remaining 30%.',
    iconType: 'easel',
  },
  'book-2:ch-11': {
    bookId: 'book-2',
    chapterIndex: 11,
    slug: 'ch-11',
    imagePath: '/illustrations/book-2/ch-11.webp',
    captionId: 'Menikmati teh hangat dengan tenang karena sistem dan kader tim bekerja dengan otonom.',
    captionEn: 'Savoring desk tea in peace because systems run and trusted deputies lead smoothly.',
    iconType: 'tea',
  },
  'book-2:ch-12': {
    bookId: 'book-2',
    chapterIndex: 12,
    slug: 'ch-12',
    imagePath: '/illustrations/book-2/ch-12.webp',
    captionId: 'Termometer energi 4 tingkat dan stasiun pemulihan kapasitas kerja tim secara berkala.',
    captionEn: 'Four-stage energy gauge and tactical recovery stations to maintain steady team velocity.',
    iconType: 'thermometer',
  },
  'book-2:ch-13': {
    bookId: 'book-2',
    chapterIndex: 13,
    slug: 'ch-13',
    imagePath: '/illustrations/book-2/ch-13.webp',
    captionId: 'Berlari maraton dengan ritme napas yang tenang dan stabil, bukan sprint yang mematikan.',
    captionEn: 'A steady marathon pace built on sustainable stamina, leaving burnout behind.',
    iconType: 'marathon',
  },
  'book-2:ch-14': {
    bookId: 'book-2',
    chapterIndex: 14,
    slug: 'ch-14',
    imagePath: '/illustrations/book-2/ch-14.webp',
    captionId: 'Kotak P3K ketahanan kerja: protokol darurat saat beban kerja mulai melampaui batas wajar.',
    captionEn: 'Workplace Resilience First-Aid Kit: fast protocols for whenever capacity redlines.',
    iconType: 'toolbox',
  },

  // BUKU 3
  'book-3:ch-0': {
    bookId: 'book-3',
    chapterIndex: 0,
    slug: 'ch-0',
    imagePath: '/illustrations/book-3/ch-0.webp',
    captionId: 'Mercusuar di tengah perairan: memandu formasi tiga kapal yang dikemudikan para kapten binatang.',
    captionEn: 'The central lighthouse: coordinating a fleet of ships steered by capable animal captains.',
    iconType: 'lighthouse',
  },
  'book-3:ch-1': {
    bookId: 'book-3',
    chapterIndex: 1,
    slug: 'ch-1',
    imagePath: '/illustrations/book-3/ch-1.webp',
    captionId: 'Berhenti menarik 15 benang boneka sendirian; saatnya memandu para kapten di meja peta strategi.',
    captionEn: 'No longer pulling strings on fifteen marionettes; coaching team leads around the strategy table.',
    iconType: 'compass',
  },
  'book-3:ch-2': {
    bookId: 'book-3',
    chapterIndex: 2,
    slug: 'ch-2',
    imagePath: '/illustrations/book-3/ch-2.webp',
    captionId: 'Jembatan kokoh yang menghubungkan tiga menara divisi agar tidak ada sekat silo.',
    captionEn: 'The Golden Bridge: connecting independent division towers without organizational silos.',
    iconType: 'bridge',
  },
  'book-3:ch-3': {
    bookId: 'book-3',
    chapterIndex: 3,
    slug: 'ch-3',
    imagePath: '/illustrations/book-3/ch-3.webp',
    captionId: 'Menjaga otonomi para leader: membiarkan kapten mengemudi tanpa merebut kemudi kapal mereka.',
    captionEn: 'Protecting leader autonomy: trusting captains to steer their vessels without grabbing the wheel.',
    iconType: 'compass',
  },
  'book-3:ch-4': {
    bookId: 'book-3',
    chapterIndex: 4,
    slug: 'ch-4',
    imagePath: '/illustrations/book-3/ch-4.webp',
    captionId: 'Melerai konflik antar-tim dan menyatukan energi ke satu muara kesuksesan bersama.',
    captionEn: 'De-escalating inter-team friction and channeling divided energies toward one shared port.',
    iconType: 'target',
  },
  'book-3:ch-5': {
    bookId: 'book-3',
    chapterIndex: 5,
    slug: 'ch-5',
    imagePath: '/illustrations/book-3/ch-5.webp',
    captionId: 'Menerjemahkan visi ruang rapat direksi menjadi langkah praktis yang menggerakkan para leader di lapangan.',
    captionEn: 'Translating boardroom strategy into clear, executable mission maps for front-line leaders.',
    iconType: 'telescope',
  },
  'book-3:ch-6': {
    bookId: 'book-3',
    chapterIndex: 6,
    slug: 'ch-6',
    imagePath: '/illustrations/book-3/ch-6.webp',
    captionId: 'Mencetak kader pemimpin baru: tolok ukur kesuksesan manajer divisi adalah seberapa banyak leader baru yang mekar.',
    captionEn: 'Multiplying leadership: the true metric of senior managers is how many new leaders flourish.',
    iconType: 'battery',
  },
  'book-3:ch-7': {
    bookId: 'book-3',
    chapterIndex: 7,
    slug: 'ch-7',
    imagePath: '/illustrations/book-3/ch-7.webp',
    captionId: 'Rapat koordinasi lintas divisi: menyelaraskan kompas tanpa rapat bertele-tele.',
    captionEn: 'Cross-divisional alignment: syncing compasses without dragging out endless sync meetings.',
    iconType: 'calendar',
  },
  'book-3:ch-8': {
    bookId: 'book-3',
    chapterIndex: 8,
    slug: 'ch-8',
    imagePath: '/illustrations/book-3/ch-8.webp',
    captionId: 'Membimbing leader yang sempat underperform dengan empati dan metrik yang terukur jelas.',
    captionEn: 'Coaching underperforming leaders back to peak competence with structured recovery plans.',
    iconType: 'map',
  },
  'book-3:ch-9': {
    bookId: 'book-3',
    chapterIndex: 9,
    slug: 'ch-9',
    imagePath: '/illustrations/book-3/ch-9.webp',
    captionId: 'Membangun kohesi budaya divisi: pilar nilai bersama yang menjaga tim tetap kokoh saat badai menerpa.',
    captionEn: 'Fostering divisional culture: shared core values that keep departments grounded during turbulence.',
    iconType: 'shield',
  },
  'book-3:ch-10': {
    bookId: 'book-3',
    chapterIndex: 10,
    slug: 'ch-10',
    imagePath: '/illustrations/book-3/ch-10.webp',
    captionId: 'Menavigasi portofolio inisiatif divisi: alokasi sumber daya yang cerdas di perairan kompetitif.',
    captionEn: 'Navigating initiative portfolios: smart resource balancing across multiple operational waters.',
    iconType: 'scale',
  },
  'book-3:ch-11': {
    bookId: 'book-3',
    chapterIndex: 11,
    slug: 'ch-11',
    imagePath: '/illustrations/book-3/ch-11.webp',
    captionId: 'Pusat komando terpadu krisis: ketenangan sang manajer divisi menjadi jangkar kepastian seluruh tim.',
    captionEn: 'Crisis command center: senior leader composure serves as the reassuring anchor for all teams.',
    iconType: 'lighthouse',
  },
  'book-3:ch-12': {
    bookId: 'book-3',
    chapterIndex: 12,
    slug: 'ch-12',
    imagePath: '/illustrations/book-3/ch-12.webp',
    captionId: 'Mengalibrasi tingkat kedewasaan para leader: membedakan siapa yang butuh bimbingan strategis vs otonomi total.',
    captionEn: 'Calibrating leader maturity: distinguishing who needs strategic sparring vs total autonomy.',
    iconType: 'bicycle',
  },
  'book-3:ch-13': {
    bookId: 'book-3',
    chapterIndex: 13,
    slug: 'ch-13',
    imagePath: '/illustrations/book-3/ch-13.webp',
    captionId: 'Cetak biru 90 hari divisi: transisi bertahap dari pemegang komando taktis ke penggerak arah jangka panjang.',
    captionEn: '90-Day Divisional Blueprint: methodical transition from tactical oversight to strategic acceleration.',
    iconType: 'journal',
  },
  'book-3:ch-14': {
    bookId: 'book-3',
    chapterIndex: 14,
    slug: 'ch-14',
    imagePath: '/illustrations/book-3/ch-14.webp',
    captionId: 'Playbook Eksekutif: kumpulan lembar audit divisi, panduan suksesi, dan kompas kepemimpinan tingkat lanjut.',
    captionEn: 'The Executive Playbook: divisional audit sheets, succession trackers, and advanced leadership compasses.',
    iconType: 'toolbox',
  },
};

export function getChapterIllustration(bookId: BookId, chapterSlug: string): ChapterIllustrationMeta | undefined {
  return CHAPTER_ILLUSTRATIONS[`${bookId}:${chapterSlug}`];
}
