import { BookId } from '@/types/books';

export type SchematicMotif =
  | 'compass'
  | 'gears'
  | 'matrix'
  | 'waveform'
  | 'key'
  | 'lens'
  | 'battery'
  | 'target'
  | 'spotlight'
  | 'trajectory'
  | 'telescope'
  | 'podium'
  | 'calibration'
  | 'cadence'
  | 'toolbox'
  | 'shield'
  | 'fire'
  | 'balance'
  | 'switch'
  | 'calendar'
  | 'relay'
  | 'gateway'
  | 'blueprint'
  | 'equilibrium'
  | 'gauge'
  | 'pacemaker'
  | 'lighthouse'
  | 'bridge';

export interface ChapterIllustrationMeta {
  bookId: BookId;
  chapterIndex: number;
  slug: string;
  figCode: string;
  svgPath: string;
  webpPath: string;
  motif: SchematicMotif;
  captionId: string;
  captionEn: string;
  aiPrompt: string;
}

const STYLE_PREFIX =
  'Swiss editorial technical illustration in the style of Monocle Magazine and Stripe Press, clean architectural vector lines, isometric diagramming, warm alabaster paper background (#FBF9F5), deep carbon ink (#111113) linework, minimal geometric focal subject, no clutter, no random text: ';

function makeChapters(
  bookId: BookId,
  volNum: number,
  accentName: string,
  items: {
    motif: SchematicMotif;
    captionId: string;
    captionEn: string;
    scenePrompt: string;
  }[]
): Record<string, ChapterIllustrationMeta> {
  const out: Record<string, ChapterIllustrationMeta> = {};
  items.forEach((item, idx) => {
    const slug = `ch-${idx}`;
    const figCode = `FIG. 0${volNum}.${idx < 10 ? `0${idx}` : idx}`;
    out[`${bookId}:${slug}`] = {
      bookId,
      chapterIndex: idx,
      slug,
      figCode,
      svgPath: `/illustrations/${bookId}/${slug}.svg`,
      webpPath: `/illustrations/${bookId}/${slug}.webp`,
      motif: item.motif,
      captionId: item.captionId,
      captionEn: item.captionEn,
      aiPrompt: `${STYLE_PREFIX} ${item.scenePrompt}. Accent color: ${accentName}.`,
    };
  });
  return out;
}

export const CHAPTER_ILLUSTRATIONS: Record<string, ChapterIllustrationMeta> = {
  ...makeChapters('book-1', 1, 'Editorial Cobalt Blue (#1D4ED8)', [
    {
      motif: 'compass',
      captionId: 'Kompas kepemimpinan pertama: beralih dari keraguan menuju arah yang terukur dan penuh empati.',
      captionEn: 'The first leadership compass: moving from early hesitation to calibrated, empathetic direction.',
      scenePrompt: 'A precision brass-and-cobalt architectural compass resting on an isometric grid desk next to a star badge',
    },
    {
      motif: 'gears',
      captionId: 'Beralih dari memutar semua roda gigi sendirian menjadi konduktor yang menjaga sinkronisasi sistem tim.',
      captionEn: 'Transitioning from frantic solo gear-turning to orchestrating a synchronized multi-gear system.',
      scenePrompt: 'An isometric mechanical diagram showing one master gear smoothly driving four synchronized smaller gears',
    },
    {
      motif: 'matrix',
      captionId: 'Cetak biru Kerangka Kerja 4x4: empat momen percakapan inti berpadu dengan empat keterampilan komunikasi.',
      captionEn: 'The 4x4 Framework Blueprint: four core conversation cadences intersecting with four communication skills.',
      scenePrompt: 'A clean 4x4 architectural matrix grid with glowing cobalt intersection nodes and technical callout lines',
    },
    {
      motif: 'waveform',
      captionId: 'Menyimak aktif: menyaring kebisingan asumsi menjadi gelombang masalah yang jernih dan utuh.',
      captionEn: 'Active listening: filtering noisy assumptions into a clear, focused signal wave.',
      scenePrompt: 'Tangled chaotic lines entering a precision acoustic lens and emerging as a clean harmonic sine wave',
    },
    {
      motif: 'key',
      captionId: 'Pertanyaan pemantik solusi: menyerahkan kunci agar anggota tim membuka pintu pemecahan masalahnya sendiri.',
      captionEn: 'Solution-focused questions: handing over the architectural key so teammates unlock their own solutions.',
      scenePrompt: 'A geometric minimal key shaped like a question mark unlocking an isometric structural mechanism',
    },
    {
      motif: 'lens',
      captionId: 'Kaca pembesar objektif: membedah fakta dan dampak pekerjaan di atas meja tanpa menyerang pribadi.',
      captionEn: 'The objective lens: examining workflow facts and impact on the table without personal blame.',
      scenePrompt: 'An optical precision loupe magnifying a data chart on a blueprint grid, crisp geometric shadows',
    },
    {
      motif: 'battery',
      captionId: 'Menanamkan keyakinan terukur agar anggota tim berani mengambil keputusan mandiri di level berikutnya.',
      captionEn: 'Instilling calibrated confidence so teammates step up to autonomous decision-making.',
      scenePrompt: 'Four ascending architectural steps with an energy core charging the top platform',
    },
    {
      motif: 'target',
      captionId: 'Rumus Delegasi 3K: menyamakan bidikan pada wujud hasil yang Kongkret, Kriteria selesai, dan Kapan waktunya.',
      captionEn: 'The 3C Delegation Brief: aligning three concentric rings—Concrete outcome, Clear criteria, and Clock.',
      scenePrompt: 'Three concentric alignment rings locking into a single crisp bullseye vector on an engineering drafting table',
    },
    {
      motif: 'spotlight',
      captionId: 'Apresiasi tepat sasaran: menyalakan sorot pengakuan spesifik saat kontribusi tim masih hangat.',
      captionEn: 'Timely recognition: casting a focused beam on the exact puzzle piece completed with excellence.',
      scenePrompt: 'An architectural desk lamp casting a sharp geometric spotlight onto a newly fitted keystone block',
    },
    {
      motif: 'trajectory',
      captionId: 'Koreksi empat mata: meluruskan lintasan kerja yang melenceng secara privat, tenang, dan bermartabat.',
      captionEn: 'Private course correction: recalibrating an off-track trajectory behind closed doors with zero drama.',
      scenePrompt: 'A flight trajectory diagram showing a dotted deviation line smoothly guided back onto the main vector',
    },
    {
      motif: 'telescope',
      captionId: 'Evaluasi tanpa kejutan: 30% meninjau cermin spion masa lalu, 70% meneropong pertumbuhan ke depan.',
      captionEn: 'No-surprise reviews: 30% rearview reflection paired with 70% forward-looking growth.',
      scenePrompt: 'Split-ratio 30/70 horizon diagram with a precision telescope pointing toward an ascending grid',
    },
    {
      motif: 'podium',
      captionId: 'Simulasi 4 pekan: peta latihan bertahap dari minggu pertama hingga ritme kepemimpinan terbentuk otomatis.',
      captionEn: 'The 4-week simulation track: week-by-week tactical milestones from orientation to team flow.',
      scenePrompt: 'Four sequential milestone checkpoints connected by a crisp isometric track on a drafting board',
    },
    {
      motif: 'calibration',
      captionId: 'Kalibrasi L1–L4 ke G1–G4: menyesuaikan porsi arahan dan otonomi sesuai kesiapan spesifik tiap tugas.',
      captionEn: 'Situational calibration (L1–L4 to G1–G4): matching leadership support to task-specific readiness.',
      scenePrompt: 'A four-quadrant dial and slider instrument calibrating guidance vs autonomy levels',
    },
    {
      motif: 'cadence',
      captionId: 'Ritme kebiasaan 30 hari: membangun konsistensi pemimpin lewat langkah kecil yang terukur setiap pekan.',
      captionEn: 'The 30-day habit cadence: building leadership consistency through small, repeatable weekly rituals.',
      scenePrompt: 'A modular 30-day perforated habit grid card beside a fountain pen and espresso cup',
    },
    {
      motif: 'toolbox',
      captionId: 'Kotak perkakas meja kerja: kumpulan skrip komunikasi, lembar persiapan 1-on-1, dan rujukan riset primer.',
      captionEn: 'The Desk Reference Toolbox: conversation scripts, 1-on-1 prep sheets, and primary research citations.',
      scenePrompt: 'An open multi-compartment Swiss modular organizer case holding neatly indexed reference cards',
    },
  ]),

  ...makeChapters('book-2', 2, 'International Terracotta Orange (#EA580C)', [
    {
      motif: 'fire',
      captionId: 'Titik balik kejenuhan: berhenti menjadi pemadam kebakaran harian dan mulai menata ulang arsitektur kerja.',
      captionEn: 'The burnout inflection point: retiring the daily firehose to rebuild sustainable workflow architecture.',
      scenePrompt: 'An overloaded stack of folders transforming into a clean, self-running isometric conveyor system',
    },
    {
      motif: 'blueprint',
      captionId: 'Dari penyelamat darurat menjadi perancang sistem: membangun alur yang tetap berjalan tenang tanpa intervensi konstan.',
      captionEn: 'From emergency rescuer to system architect: designing workflows that run smoothly without constant intervention.',
      scenePrompt: 'Architectural blueprint comparing a chaotic tangled knot with a clean parallel pipeline',
    },
    {
      motif: 'shield',
      captionId: '4 Penataan Struktural & 4 Keterampilan Energi: perisai ganda untuk menjaga stamina kepemimpinan jangka panjang.',
      captionEn: '4 Structural Resets & 4 Energy Skills: a dual shield protecting long-term leadership stamina.',
      scenePrompt: 'Four interlocking structural rings surrounding a protected central core on a technical grid',
    },
    {
      motif: 'lens',
      captionId: 'Memisahkan masalah kerja dari beban emosi: menyaring badai kepanikan menjadi tiga fakta objektif yang bisa dieksekusi.',
      captionEn: 'Separating work problems from emotional load: filtering storm clouds into three actionable objective blocks.',
      scenePrompt: 'A geometric prism splitting a turbulent dark wave into three neat, structured cubes',
    },
    {
      motif: 'key',
      captionId: 'Anti-Monkey Management: menahan refleks mengambil alih tugas agar tanggung jawab tetap berada di tangan pemiliknya.',
      captionEn: 'Anti-Monkey Management: resisting the rescue reflex so problem ownership stays with the teammate.',
      scenePrompt: 'A directional vector barrier deflecting incoming task arrows back into organized team lanes',
    },
    {
      motif: 'balance',
      captionId: 'Negosiasi kapasitas berbasis data: menyajikan matriks beban kerja dan opsi trade-off secara tenang kepada atasan.',
      captionEn: 'Data-backed capacity negotiation: presenting objective workload trade-offs calmly to stakeholders.',
      scenePrompt: 'A precision architectural balance scale weighing project blocks with a clear capacity threshold line',
    },
    {
      motif: 'switch',
      captionId: 'Protokol Detachment jam 6 sore: mematikan saklar pikiran kerja agar pemulihan mental berlangsung utuh.',
      captionEn: 'The 6 PM Detachment Protocol: flipping the mental breaker switch for complete after-hours recovery.',
      scenePrompt: 'A minimalist Braun-inspired mechanical toggle switch set to OFF at 18:00 with calm horizon lines',
    },
    {
      motif: 'calendar',
      captionId: 'Audit Kalender 3P (Pangkas, Padatkan, Pindahkan): merebut kembali blok waktu fokus strategis dari rapat yang mubazir.',
      captionEn: 'The 3R Calendar Audit: reclaiming deep-focus blocks from fragmented, low-value status meetings.',
      scenePrompt: 'A weekly schedule grid where cluttered small blocks are consolidated into bold protected focus zones',
    },
    {
      motif: 'relay',
      captionId: 'Mencetak tangan kanan (Second-in-Command): menyiapkan pelapis tepercaya agar tim tidak lumpuh saat kamu cuti.',
      captionEn: 'Building bench strength: grooming a capable second-in-command so operations never bottleneck on you.',
      scenePrompt: 'Two synchronized parallel tracks passing a glowing relay baton seamlessly across checkpoints',
    },
    {
      motif: 'gateway',
      captionId: 'Menata ulang batas ekspektasi: mengubah interupsi dadakan menjadi antrean kerja yang tertib dan terukur.',
      captionEn: 'Resetting boundary expectations: channeling chaotic ad-hoc interruptions into an orderly intake gate.',
      scenePrompt: 'An architectural funnel and sluice gate organizing scattered arrows into a single disciplined stream',
    },
    {
      motif: 'blueprint',
      captionId: 'Job Crafting 30/70: mendelegasikan 70% rutinitas operasional demi membuka 30% ruang pertumbuhan strategis.',
      captionEn: '30/70 Job Crafting: delegating routine maintenance to unlock a 30% strategic growth portfolio.',
      scenePrompt: 'A precision architectural proportion block divided into a 70% automated base and 30% elevated tower',
    },
    {
      motif: 'equilibrium',
      captionId: 'Simulasi 4 pekan pemulihan sistem: langkah bertahap keluar dari kemelut lembur menuju ritme kerja berkelanjutan.',
      captionEn: '4-week system recovery simulation: step-by-step progression from chronic overtime to sustainable flow.',
      scenePrompt: 'Four progressive stages showing a tilted structure returning to perfect horizontal equilibrium',
    },
    {
      motif: 'gauge',
      captionId: 'Barometer kelelahan L1–L4: mendeteksi dini gejala letih sesaat, jenuh rutinitas, hingga kelelahan sistemik.',
      captionEn: 'The L1–L4 Fatigue Barometer: early detection from post-sprint tiredness to systemic overload.',
      scenePrompt: 'An analog precision dial gauge with four distinct zones and calibration markers',
    },
    {
      motif: 'pacemaker',
      captionId: 'Ritme kepemimpinan maraton: menjaga konsistensi napas panjang tanpa mengorbankan kesehatan dan keluarga.',
      captionEn: 'Marathon leadership pacing: maintaining high-output longevity without sacrificing health or life.',
      scenePrompt: 'A steady rhythmic pulse wave running across a long-distance architectural elevation chart',
    },
    {
      motif: 'toolbox',
      captionId: 'Kotak P3K ketahanan kerja: template negosiasi prioritas, ceklis tutup kantor, dan rujukan riset psikologi kerja.',
      captionEn: 'Resilience First-Aid Kit: priority trade-off scripts, shutdown checklists, and occupational research citations.',
      scenePrompt: 'A structured emergency field kit with neatly labeled modular cards and brass latches',
    },
  ]),

  ...makeChapters('book-3', 3, 'Deep Alpine Emerald (#0F766E)', [
    {
      motif: 'lighthouse',
      captionId: 'Naik kelas menjadi pemimpin para leader: berhenti menyetir satu perahu, mulai memandu seluruh armada divisi.',
      captionEn: 'Stepping up to manager of managers: stop steering one boat and start guiding the entire fleet.',
      scenePrompt: 'An architectural lighthouse projecting alignment vectors toward three synchronized vessels on a grid sea',
    },
    {
      motif: 'compass',
      captionId: 'Pergeseran ukuran sukses: bukan lagi seberapa cepat kamu turun tangan, melainkan seberapa mandiri para team lead-mu.',
      captionEn: 'The new success metric: measured not by your solo rescues, but by the autonomy of your team leads.',
      scenePrompt: 'A central command table surrounded by three autonomous sub-nodes operating in harmony',
    },
    {
      motif: 'bridge',
      captionId: '4 Forum Penyelarasan & 4 Keterampilan Pembinaan Leader: jembatan kokoh penghubung strategi dan eksekusi lintas tim.',
      captionEn: '4 Alignment Forums & 4 Leader-Coaching Skills: the structural bridge connecting strategy and multi-team execution.',
      scenePrompt: 'An isometric suspension bridge connecting three distinct architectural towers on a blueprint',
    },
    {
      motif: 'key',
      captionId: 'Coaching the Coach: melatih para team lead menyelesaikan masalah anggota timnya sendiri tanpa kamu ambil alih.',
      captionEn: 'Coaching the Coach: equipping team leads to solve their own people challenges without your takeover.',
      scenePrompt: 'A cascading two-tier coaching diagram showing knowledge transfer from node A to node B to node C',
    },
    {
      motif: 'shield',
      captionId: 'Aturan Anti-Skip-Level: menjaga wibawa dan rantai komando para leader di hadapan anggota tim mereka.',
      captionEn: 'Anti-Skip-Level Guardrails: protecting your team leads authority and chain of command.',
      scenePrompt: 'An architectural hierarchy shield reinforcing the structural link between a team lead and their team',
    },
    {
      motif: 'telescope',
      captionId: 'Penerjemah strategi eksekutif: mengubah target abstrak ruang direksi menjadi sasaran kuartalan yang konkret.',
      captionEn: 'Executive strategy translator: converting high-level boardroom goals into concrete quarterly team missions.',
      scenePrompt: 'An optical prism translating a single high-altitude beam into three clear actionable project tracks',
    },
    {
      motif: 'balance',
      captionId: 'Mengelola ke atas dan ke samping (Managing Up & Across): mengamankan dukungan sumber daya lintas departemen.',
      captionEn: 'Managing Up & Across: securing executive buy-in and frictionless peer-department partnerships.',
      scenePrompt: 'A multi-axis organizational compass aligning vertical and horizontal vectors in equilibrium',
    },
    {
      motif: 'matrix',
      captionId: 'Piagam Penyelarasan 3S (Sasaran Bersama, Syarat Serah-Terima, Sinyal Eskalasi): mengakhiri konflik abu-abu antar-tim.',
      captionEn: 'The 3S Alignment Charter:Shared Outcome, Seam SLA, and Escalation Signal across sub-teams.',
      scenePrompt: 'Three interlocking hexagonal modules forming a unified structural seal on an engineering sheet',
    },
    {
      motif: 'lens',
      captionId: 'Bedah 1-on-1 Level Manajer (Kerangka 4P): membedah Progres sistem, People, Proses lintas tim, dan Pertumbuhan leader.',
      captionEn: 'Manager-to-Leader 1-on-1s (The 4P Audit): inspecting Progress, People, Cross-Team Process, and Personal Growth.',
      scenePrompt: 'A four-panel diagnostic dashboard inspecting structural health indicators',
    },
    {
      motif: 'bridge',
      captionId: 'Mediasi gesekan silo 15 menit: menghentikan aksi saling tunjuk dan mengunci perbaikan titik serah-terima.',
      captionEn: '15-Minute Silo Seam Mediation: stopping finger-pointing and locking in concrete handoff upgrades.',
      scenePrompt: 'Two separated structural plates being joined cleanly by a precision interlocking dovetail joint',
    },
    {
      motif: 'gauge',
      captionId: 'Skip-Level & Kalibrasi Budaya: menangkap denyut jujur lapangan tanpa merusak kepercayaan para team lead.',
      captionEn: 'Skip-Level & Culture Calibration: reading the ground-truth pulse while honoring team lead trust.',
      scenePrompt: 'A multi-layer acoustic sonar diagram reading deep organizational signals cleanly',
    },
    {
      motif: 'podium',
      captionId: 'Simulasi 4 pekan penataan divisi: mengubah tiga tim yang berjalan sendiri-sendiri menjadi satu kesatuan yang solid.',
      captionEn: '4-week divisional alignment simulation: turning fragmented sub-teams into a cohesive department.',
      scenePrompt: 'Three diverging arrows progressively aligning into a single powerful forward formation over four stages',
    },
    {
      motif: 'calibration',
      captionId: 'Kalibrasi kematangan para leader (L1–L4): dari leader baru promosi hingga pemimpin strategis pengganda dampak.',
      captionEn: 'Calibrating leader maturity (L1–L4): from newly promoted leads to autonomous multiplier leaders.',
      scenePrompt: 'Four ascending architectural columns showing increasing structural span and autonomy',
    },
    {
      motif: 'cadence',
      captionId: 'Cetak Biru 90 Hari Kepala Divisi: peta jalan 30-60-90 hari dari observasi sistem hingga akselerasi strategis.',
      captionEn: 'The 90-Day Divisional Blueprint: a structured 30-60-90 day roadmap from diagnosis to strategic velocity.',
      scenePrompt: 'A three-phase architectural master timeline (Day 30 / Day 60 / Day 90) with milestone flags',
    },
    {
      motif: 'toolbox',
      captionId: 'Playbook Eksekutif Divisi: piagam 3S siap pakai, ceklis audit 4P, panduan skip-level, dan rujukan riset organisasi.',
      captionEn: 'The Divisional Executive Toolbox: 3S charter templates, 4P audit sheets, skip-level guides, and research citations.',
      scenePrompt: 'An executive architectural portfolio binder open to precision templates and structural charts',
    },
  ]),
};

export function getChapterIllustration(
  bookId: BookId,
  chapterSlug: string
): ChapterIllustrationMeta | undefined {
  return CHAPTER_ILLUSTRATIONS[`${bookId}:${chapterSlug}`];
}
