'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { HandDrawnMermaid } from '@/components/doodle/HandDrawnMermaid';
import { DoodleCheckbox } from '@/components/doodle/DoodleCheckbox';
import { BookLang } from '@/types/books';
import {
  Info,
  Lightbulb,
  Flame,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Copy,
  Check,
  UserPen,
  Sparkles,
  MessageSquareQuote,
} from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  bookId?: string;
  chapterSlug?: string;
  storagePrefix?: string;
  lang?: BookLang;
  onSelectQuote?: (quoteText: string) => void;
}

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join('');
  }
  if (React.isValidElement(node) && node.props) {
    return extractText((node.props as any).children);
  }
  return '';
}

const CALLOUT_STYLES: Record<
  'note' | 'tip' | 'important' | 'warning' | 'caution',
  {
    bg: string;
    border: string;
    badgeBg: string;
    textColor: string;
    defaultTitle: { id: string; en: string };
    icon: React.ReactNode;
  }
> = {
  note: {
    bg: 'bg-[#EFF6FF]',
    border: 'border-[#2563EB]',
    badgeBg: 'bg-[#DBEAFE] text-[#1E3A8A] border-[#2563EB]',
    textColor: 'text-[#1E3A8A]',
    defaultTitle: { id: 'Catatan Taktis', en: 'Tactical Note' },
    icon: <Info className="w-4 h-4 text-[#2563EB]" />,
  },
  tip: {
    bg: 'bg-[#ECFDF5]',
    border: 'border-[#059669]',
    badgeBg: 'bg-[#D1FAE5] text-[#065F46] border-[#059669]',
    textColor: 'text-[#065F46]',
    defaultTitle: { id: 'Tips Praktis Lapangan', en: 'Field Tip' },
    icon: <Lightbulb className="w-4 h-4 text-[#059669]" />,
  },
  important: {
    bg: 'bg-[#F5F3FF]',
    border: 'border-[#7C3AED]',
    badgeBg: 'bg-[#EDE9FE] text-[#4C1D95] border-[#7C3AED]',
    textColor: 'text-[#4C1D95]',
    defaultTitle: { id: 'Prinsip Kunci Leader', en: 'Core Leader Principle' },
    icon: <Flame className="w-4 h-4 text-[#7C3AED]" />,
  },
  warning: {
    bg: 'bg-[#FFFBEB]',
    border: 'border-[#D97706]',
    badgeBg: 'bg-[#FEF3C7] text-[#92400E] border-[#D97706]',
    textColor: 'text-[#92400E]',
    defaultTitle: { id: 'Perhatian & Rambu', en: 'Heads-Up & Signpost' },
    icon: <AlertTriangle className="w-4 h-4 text-[#D97706]" />,
  },
  caution: {
    bg: 'bg-[#FFF1F2]',
    border: 'border-[#E11D48]',
    badgeBg: 'bg-[#FFE4E6] text-[#881337] border-[#E11D48]',
    textColor: 'text-[#881337]',
    defaultTitle: { id: 'Jangan Lakukan Ini!', en: "Don't Do This!" },
    icon: <ShieldAlert className="w-4 h-4 text-[#E11D48]" />,
  },
};

function CalloutBlockquote({
  children,
  onSelectQuote,
  lang = 'id-kasual',
}: {
  children: React.ReactNode;
  onSelectQuote?: (q: string) => void;
  lang?: BookLang;
}) {
  const validElements = React.Children.toArray(children).filter(
    React.isValidElement
  );
  const firstParagraph = validElements[0] as React.ReactElement | undefined;

  let calloutType: 'note' | 'tip' | 'important' | 'warning' | 'caution' | null =
    null;
  let titleText = '';
  let cleanedBodyChildren: React.ReactNode = children;

  if (firstParagraph && (firstParagraph.props as any)?.children) {
    const rawText = extractText((firstParagraph.props as any).children).trim();
    const match = rawText.match(
      /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*([^\n]*)(?:\n([\s\S]*))?$/i
    );
    if (match) {
      calloutType = match[1].toLowerCase() as any;
      titleText = match[2]?.trim() || '';

      const pChildren = React.Children.toArray(
        (firstParagraph.props as any).children
      );
      if (typeof pChildren[0] === 'string') {
        const strippedFirst = pChildren[0].replace(
          /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*[^\n]*\n?/i,
          ''
        );
        const newPChildren = [strippedFirst, ...pChildren.slice(1)];
        const clonedFirstP = React.cloneElement(firstParagraph, {
          ...(firstParagraph.props as any),
          children: newPChildren,
        });
        cleanedBodyChildren = [clonedFirstP, ...validElements.slice(1)];
      }
    }
  }

  if (calloutType) {
    const style = CALLOUT_STYLES[calloutType];
    return (
      <div
        className={`callout-box my-6 rounded-2xl border border-zinc-200/90 ${style.bg} p-5 shadow-sm`}
      >
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-xs font-extrabold uppercase tracking-wide ${style.badgeBg}`}
          >
            {style.icon}
            {titleText || (lang === 'en' ? style.defaultTitle.en : style.defaultTitle.id)}
          </span>
          {onSelectQuote && (
            <button
              type="button"
              onClick={() => onSelectQuote(extractText(cleanedBodyChildren).trim())}
              className="no-print inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-[#18181B] shadow-2xs hover:bg-[#FFE66D]"
              title={lang === 'en' ? 'Make a Quote Card' : 'Jadikan Kartu Kutipan Story'}
            >
              <Sparkles className="w-3 h-3" />
              {lang === 'en' ? 'Share Quote' : 'Bagikan Kutipan'}
            </button>
          )}
        </div>
        <div className="callout-body text-sm sm:text-base leading-relaxed text-[#18181B] space-y-2">
          {cleanedBodyChildren}
        </div>
      </div>
    );
  }

  const quoteRaw = extractText(children).trim();
  return (
    <blockquote className="quote-box group relative my-5 rounded-r-2xl border-l-4 border-y border-r border-l-[#2563EB] border-y-zinc-200/90 border-r-zinc-200/90 bg-gradient-to-r from-[#EFF6FF] to-[#FFFDF9] p-4 sm:p-5 shadow-xs">
      <div className="flex items-start gap-3">
        <MessageSquareQuote className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
        <div className="flex-1 text-sm sm:text-base italic text-[#18181B] leading-relaxed">
          {children}
        </div>
      </div>
      {onSelectQuote && quoteRaw.length > 20 && (
        <button
          type="button"
          onClick={() => onSelectQuote(quoteRaw)}
          className="no-print mt-2 inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#2563EB] shadow-2xs hover:bg-[#FFE66D]"
        >
          📸 {lang === 'en' ? 'Make Story Image' : 'Jadikan Gambar Story'}
        </button>
      )}
    </blockquote>
  );
}

function CopyableScriptDetails({ children, lang = 'id-kasual' }: { children: React.ReactNode; lang?: BookLang }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!detailsRef.current) return;
    const clone = detailsRef.current.cloneNode(true) as HTMLElement;
    const summaryEl = clone.querySelector('summary');
    if (summaryEl) summaryEl.remove();
    const buttonEls = clone.querySelectorAll('button');
    buttonEls.forEach((b) => b.remove());
    const textToCopy = clone.innerText.trim();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <details
      ref={detailsRef}
      className="group my-6 rounded-2xl border border-zinc-200/90 bg-[#FFFDF5] open:bg-white shadow-xs open:shadow-sm transition-all overflow-hidden"
    >
      {children}
      <div className="no-print flex items-center justify-between border-t border-dashed border-[#E4E4E7] bg-[#FEFCE8] px-4 py-2.5">
        <span className="font-hand text-sm text-[#52525B]">
          {lang === 'en'
            ? '🐾 Ready-to-use script — copy straight to WhatsApp / Slack / 1-on-1 doc'
            : '🐾 Skrip siap pakai — langsung salin ke WhatsApp / Slack / 1-on-1 doc'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="doodle-button inline-flex items-center gap-1.5 bg-[#FFE66D] px-3 py-1 text-xs font-extrabold text-[#18181B]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#065F46]" />
              <span>{lang === 'en' ? 'Copied! Ready to Paste' : 'Tersalin! Siap Paste'}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Copy Script' : 'Salin Skrip'}</span>
            </>
          )}
        </button>
      </div>
    </details>
  );
}

export function MarkdownRenderer({
  content,
  bookId = 'book-1',
  chapterSlug = 'ch-0',
  storagePrefix,
  lang = 'id-kasual',
  onSelectQuote,
}: MarkdownRendererProps) {
  const [teammateName, setTeammateName] = useState<string>('');
  const [checklistStats, setChecklistStats] = useState({ done: 0, total: 0 });

  useEffect(() => {
    try {
      const savedName = localStorage.getItem('aiossan:teammate-name');
      if (savedName) setTeammateName(savedName);
    } catch {
      // Ignore
    }
  }, []);

  const handleNameChange = (val: string) => {
    setTeammateName(val);
    try {
      localStorage.setItem('aiossan:teammate-name', val);
    } catch {
      // Ignore
    }
  };

  const personalizedContent = useMemo(() => {
    const clean = teammateName.trim();
    if (!clean) return content;
    return content.replace(
      /\[(Nama|Nama Staf|Nama Anggota Tim|Nama Bawahan|Nama Rekan|Name|Teammate Name)\]/gi,
      clean
    );
  }, [content, teammateName]);

  const totalCheckboxes = useMemo(() => {
    const matches = content.match(/^(\s*)-\s+\[([ xX])\]/gm);
    return matches ? matches.length : 0;
  }, [content]);

  const effectivePrefix = storagePrefix || `chk:${bookId}:${chapterSlug}`;

  useEffect(() => {
    const computeProgress = () => {
      if (totalCheckboxes === 0) return;
      let completed = 0;
      for (let i = 0; i < totalCheckboxes; i++) {
        const key = `${effectivePrefix}:${i}`;
        if (localStorage.getItem(key) === 'true') completed++;
      }
      setChecklistStats({ done: completed, total: totalCheckboxes });
      if (completed === totalCheckboxes && totalCheckboxes > 0) {
        window.dispatchEvent(
          new CustomEvent('aiossan:chapter-completed', {
            detail: { bookId, chapterSlug },
          })
        );
      }
    };

    computeProgress();
    window.addEventListener('aiossan:checklist-updated', computeProgress);
    return () =>
      window.removeEventListener('aiossan:checklist-updated', computeProgress);
  }, [effectivePrefix, bookId, chapterSlug, totalCheckboxes]);

  const hasScripts = content.includes('<details');
  let checkboxCounter = 0;

  return (
    <div className="space-y-4">
      {hasScripts && (
        <div className="no-print mb-6 rounded-2xl border border-amber-200/90 bg-gradient-to-r from-[#FEF9C3] via-[#FFFDF9] to-[#DBEAFE] p-3.5 sm:p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-300 bg-[#FFE66D] shadow-2xs">
              <UserPen className="h-4 w-4 text-[#18181B]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-[#18181B]">
                {lang === 'en' ? 'Auto-Personalize Chat Scripts' : 'Personalisasi Skrip Obrolan Otomatis'}
              </p>
              <p className="font-hand text-xs sm:text-sm text-[#52525B]">
                {lang === 'en'
                  ? "Type your teammate's name so every script in this chapter is instantly ready to send:"
                  : 'Ketik nama anggota tim lo supaya seluruh skrip di bab ini langsung siap dikirim:'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:auto">
            <input
              type="text"
              value={teammateName}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder={lang === 'en' ? 'e.g. Dani / Siska...' : 'Misal: Dani / Siska...'}
              className="w-full sm:w-44 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs sm:text-sm font-bold text-[#18181B] placeholder:font-normal placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 shadow-2xs"
            />
            {teammateName && (
              <button
                type="button"
                onClick={() => handleNameChange('')}
                className="rounded-lg border border-zinc-200 bg-white px-2 py-1 font-mono text-[10px] font-bold text-[#52525B] shadow-2xs hover:bg-[#FEE2E2]"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      )}

      <div className="prose prose-zinc max-w-none text-[#18181B] leading-relaxed break-words [overflow-wrap:anywhere]">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            section: ({ children, className, ...props }) => {
              const isFootnotes =
                Boolean((props as any)['data-footnotes']) ||
                Boolean(className?.includes('footnotes'));
              if (isFootnotes) {
                return (
                  <section
                    className="mt-12 pt-6 border-t-2 border-dashed border-[#CBD5E1]"
                    {...props}
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <span className="font-mono text-xs font-black uppercase tracking-wider text-[#1E3A8A] bg-[#EFF6FF] px-2.5 py-1 rounded border border-[#BFDBFE]">
                        {lang === 'en' ? '📚 Footnotes & Research References' : '📚 Catatan Kaki & Rujukan Riset'}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                      {children}
                    </div>
                  </section>
                );
              }
              return (
                <section className={className} {...props}>
                  {children}
                </section>
              );
            },
            a: ({ href, children, className, ...props }) => {
              const isFootnoteRef =
                'data-footnote-ref' in props ||
                Boolean(className?.includes('data-footnote-ref'));
              const isFootnoteBackref =
                'data-footnote-backref' in props ||
                Boolean(className?.includes('data-footnote-backref'));

              if (isFootnoteRef) {
                return (
                  <a
                    href={href}
                    className="inline-flex items-center justify-center font-mono text-[11px] font-extrabold text-[#2563EB] bg-[#DBEAFE] hover:bg-[#FFE66D] hover:text-[#18181B] px-1.5 py-0 rounded border border-[#2563EB]/40 no-underline align-super mx-0.5 transition-colors shadow-2xs"
                    {...props}
                  >
                    {children}
                  </a>
                );
              }

              if (isFootnoteBackref) {
                let refNum = '';
                if (Array.isArray(children)) {
                  const supChild = children.find(
                    (c) => React.isValidElement(c) && c.type === 'sup'
                  );
                  if (supChild && React.isValidElement(supChild)) {
                    refNum = ` #${(supChild.props as any).children}`;
                  }
                }
                return (
                  <a
                    href={href}
                    className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#1E3A8A] hover:text-[#18181B] bg-[#EFF6FF] hover:bg-[#FFE66D] px-2 py-0.5 rounded-md border border-[#93C5FD] no-underline transition-colors shadow-2xs ml-1.5 align-middle"
                    aria-label={`${lang === 'en' ? 'Back to citation' : 'Kembali ke kutipan'}${refNum}`}
                    title={`${lang === 'en' ? 'Back to citation' : 'Kembali ke kutipan'}${refNum}`}
                    {...props}
                  >
                    <span>{lang === 'en' ? 'Back' : 'Kembali'}{refNum} ↑</span>
                  </a>
                );
              }

              const isExternal = href?.startsWith('http') || href?.startsWith('//');

              return (
                <a
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="inline text-[#2563EB] hover:text-[#1D4ED8] underline underline-offset-4 decoration-[#2563EB]/40 hover:decoration-[#2563EB] font-medium [overflow-wrap:anywhere] [word-break:break-word]"
                  {...props}
                >
                  {children}
                </a>
              );
            },
            h2: ({ children, className, ...props }) => {
              if (className?.includes('sr-only') || (props as any)?.id === 'footnote-label') {
                return (
                  <h2 className="sr-only" {...props}>
                    {children}
                  </h2>
                );
              }
              return (
                <div className="mt-10 mb-5">
                  <h2
                    className="inline-block text-xl sm:text-2xl font-extrabold tracking-tight text-[#18181B] bg-gradient-to-r from-[#FFE66D]/60 via-[#DBEAFE]/50 to-transparent px-3 py-1.5 rounded-xl border-l-4 border-[#2563EB]"
                    {...props}
                  >
                    {children}
                  </h2>
                </div>
              );
            },
            h3: ({ children }) => (
              <h3 className="mt-8 mb-3 flex items-center gap-2 text-lg sm:text-xl font-extrabold text-[#1E3A8A] border-l-4 border-[#2563EB] bg-[#EFF6FF]/70 pl-3 py-1 rounded-r-lg">
                <span>{children}</span>
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="mt-6 mb-2 text-base sm:text-lg font-extrabold text-[#9A3412] underline decoration-[#FFE66D] decoration-4 underline-offset-4">
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p className="my-4 text-[16px] sm:text-[17px] leading-[1.8] text-[#18181B]">
                {children}
              </p>
            ),
            strong: ({ children }) => {
              const txt = extractText(children).trim();
              if (/^(Rumus 3K|3K|Rumus 3P|3P|Rumus 3S|3S|Agenda 4P|4P)$/i.test(txt)) {
                return <span className="editorial-pill-blue">{children}</span>;
              }
              if (/^(L1|L2|L3|L4|Level 1|Level 2|Level 3|Level 4)$/i.test(txt)) {
                return <span className="editorial-pill-amber">{children}</span>;
              }
              if (/^(G1|G2|G3|G4|Gaya 1|Gaya 2|Gaya 3|Gaya 4|30\/70|70\/30)$/i.test(txt)) {
                return <span className="editorial-pill-teal">{children}</span>;
              }
              if (/^(Skill 1|Skill 2|Skill 3|Skill 4)$/i.test(txt)) {
                return <span className="editorial-pill-violet">{children}</span>;
              }
              return (
                <strong className="font-extrabold text-[#1E3A8A] decoration-[#FFE66D] decoration-2 underline-offset-2">
                  {children}
                </strong>
              );
            },
            em: ({ children }) => (
              <em className="font-semibold italic text-[#0F766E]">
                {children}
              </em>
            ),
            blockquote: ({ children }) => (
              <CalloutBlockquote onSelectQuote={onSelectQuote} lang={lang}>
                {children}
              </CalloutBlockquote>
            ),
            details: ({ children }) => (
              <CopyableScriptDetails lang={lang}>{children}</CopyableScriptDetails>
            ),
            summary: ({ children }) => (
              <summary className="cursor-pointer select-none list-none bg-[#FFE66D]/75 hover:bg-[#FFE66D] px-4 py-3 font-extrabold text-sm sm:text-base text-[#18181B] flex items-center justify-between border-b border-amber-300">
                <span className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-amber-300/80 bg-white font-mono text-xs font-black shadow-2xs">
                    💬
                  </span>
                  <span>{children}</span>
                </span>
                <span className="font-mono text-xs font-bold text-[#1E3A8A] bg-white px-2.5 py-0.5 rounded-md border border-blue-200 shadow-2xs">
                  {lang === 'en' ? 'Click to Open / Close ▾' : 'Klik Buka / Tutup ▾'}
                </span>
              </summary>
            ),
            code: ({ className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '');
              const rawCode = String(children).replace(/\n$/, '');
              if (match && match[1] === 'mermaid') {
                return <HandDrawnMermaid chart={rawCode} lang={lang} />;
              }
              if (className && className.includes('language-')) {
                return (
                  <pre className="my-5 overflow-x-auto rounded-2xl border border-zinc-800 bg-[#18181B] p-4 font-mono text-xs sm:text-sm text-[#FAF7F2] shadow-md">
                    <code>{rawCode}</code>
                  </pre>
                );
              }
              return (
                <code
                  className="rounded-md border border-[#CBD5E1] bg-[#EFF6FF] px-1.5 py-0.5 font-mono text-[0.88em] font-bold text-[#1E3A8A]"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            table: ({ children }) => (
              <div className="my-6 overflow-x-auto rounded-2xl border border-zinc-200/90 bg-white shadow-sm">
                <table className="w-full border-collapse text-left text-sm">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-[#1E3A8A] text-white border-b border-blue-900">
                {children}
              </thead>
            ),
            th: ({ children }) => (
              <th className="px-4 py-3 font-extrabold text-xs sm:text-sm uppercase tracking-wider border-r border-[#3B82F6]/40 last:border-r-0">
                {children}
              </th>
            ),
            tr: ({ children }) => (
              <tr className="border-b border-[#E4E4E7] even:bg-[#FFFDF5] hover:bg-[#FEF9C3]/40 transition-colors">
                {children}
              </tr>
            ),
            td: ({ children }) => (
              <td className="px-4 py-3 align-top text-xs sm:text-sm text-[#18181B] border-r border-[#E4E4E7] last:border-r-0">
                {children}
              </td>
            ),
            ul: ({ children, className, ...props }) => (
              <ul
                className={`my-4 space-y-1.5 pl-6 list-disc marker:text-[#2563EB] marker:font-bold ${className || ''}`}
                {...props}
              >
                {children}
              </ul>
            ),
            ol: ({ children, className, ...props }) => (
              <ol
                className={`my-4 space-y-1.5 pl-6 list-decimal marker:text-[#1E3A8A] marker:font-bold ${className || ''}`}
                {...props}
              >
                {children}
              </ol>
            ),
            li: ({ children, className, ...props }) => {
              const childArray = React.Children.toArray(children);
              const firstChild = childArray[0];
              const isTaskItem =
                (className && className.includes('task-list-item')) ||
                (React.isValidElement(firstChild) &&
                  (firstChild.props as any)?.type === 'checkbox');

              if (isTaskItem) {
                const idx = checkboxCounter++;
                const storageKey = `${effectivePrefix}:${idx}`;
                const filteredChildren = childArray.filter(
                  (c) =>
                    !(
                      React.isValidElement(c) &&
                      (c.props as any)?.type === 'checkbox'
                    )
                );
                return (
                  <DoodleCheckbox storageKey={storageKey} lang={lang}>
                    {filteredChildren}
                  </DoodleCheckbox>
                );
              }

              const isFootnoteItem = Boolean(
                (props as any)?.id?.startsWith('user-content-fn-')
              );
              if (isFootnoteItem) {
                return (
                  <li
                    className="my-3 pb-3 border-b border-[#E4E4E7] last:border-b-0 text-xs sm:text-sm text-[#3F3F46] leading-relaxed break-words [overflow-wrap:anywhere]"
                    {...props}
                  >
                    {children}
                  </li>
                );
              }

              return (
                <li
                  className="my-1 text-[15.5px] sm:text-[16.5px] leading-relaxed text-[#18181B]"
                  {...props}
                >
                  {children}
                </li>
              );
            },
          }}
        >
          {personalizedContent}
        </ReactMarkdown>
      </div>

      {checklistStats.total > 0 && (
        <div className="no-print mt-8 rounded-2xl border border-teal-200/90 bg-[#ECFDF5] p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-300 bg-[#FFE66D] shadow-2xs">
              <CheckCircle2 className="h-5 w-5 text-[#18181B]" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-[#18181B]">
                {lang === 'en' ? 'Chapter Exercise Checklist Progress: ' : 'Progres Checklist Latihan Bab Ini: '}
                {checklistStats.done} /{' '}
                {checklistStats.total} {lang === 'en' ? 'Done' : 'Selesai'}
              </p>
              <p className="font-hand text-sm text-[#065F46]">
                {checklistStats.done === checklistStats.total
                  ? lang === 'en'
                    ? '🎉 Amazing! All tactical practice exercises in this chapter completed!'
                    : '🎉 Luar biasa! Seluruh checklist latihan taktis bab ini tuntas lo selesaikan!'
                  : lang === 'en'
                  ? 'Check the exercise boxes above each time you finish practicing at work.'
                  : 'Klik kotak latihan di atas setiap kali lo selesai mempraktikkannya di kantor.'}
              </p>
            </div>
          </div>
          <div className="w-full sm:w-44 h-3 rounded-full border border-teal-300/80 bg-white overflow-hidden">
            <div
              className="h-full bg-[#0D9488] transition-all duration-300"
              style={{
                width: `${Math.round(
                  (checklistStats.done / checklistStats.total) * 100
                )}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
