import React from 'react';

export type WhiteboardScene =
  | 'one-on-one'
  | 'sprint-board'
  | 'strategy-meeting'
  | 'solo-architect'
  | 'active-listener';

interface WhiteboardSceneSvgProps {
  scene: WhiteboardScene;
  className?: string;
  accentColor?: string;
  badgeText?: string;
}

/**
 * WhiteboardSceneSvg
 *
 * Excalidraw-inspired vector line-art human figures representing
 * real workplace leadership dynamics (1-on-1s, sprint planning, strategy meetings).
 * Replaces playful children's woodland animal mascots.
 */
export function WhiteboardSceneSvg({
  scene,
  className = 'w-24 h-24',
  accentColor,
}: WhiteboardSceneSvgProps) {
  const ink = '#18181B';
  const navy = accentColor || '#1E40AF';
  const amber = '#F59E0B';
  const emerald = '#059669';
  const red = '#DC2626';

  switch (scene) {
    case 'one-on-one':
      // Two colleagues at a meeting table engaged in active listening & feedback (Book 1)
      return (
        <svg
          viewBox="0 0 160 160"
          fill="none"
          className={className}
          aria-label="1-on-1 Feedback & Alignment Session"
        >
          {/* Background whiteboard grid card subtle background */}
          <rect x="12" y="12" width="136" height="136" rx="12" fill="#EFF6FF" stroke={navy} strokeWidth="2" strokeDasharray="4 4" />
          
          {/* Table Surface */}
          <path d="M30 114 H130" stroke={ink} strokeWidth="3" strokeLinecap="round" />
          <path d="M50 114 V138 M110 114 V138" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />

          {/* Left Person (Leader) */}
          {/* Head */}
          <circle cx="48" cy="58" r="14" fill="#FFFFFF" stroke={ink} strokeWidth="2.5" />
          {/* Body */}
          <path d="M48 72 C40 82 34 94 34 114 H62 C62 94 56 82 48 72 Z" fill="#DBEAFE" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
          {/* Arm gesturing forward */}
          <path d="M56 88 L70 96 L76 92" stroke={ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Coffee mug */}
          <rect x="68" y="102" width="10" height="12" rx="2" fill="#FFFFFF" stroke={ink} strokeWidth="2" />
          <path d="M78 105 C81 105 81 111 78 111" stroke={ink} strokeWidth="1.5" />
          {/* Steam */}
          <path d="M72 98 Q74 94 71 91" stroke={navy} strokeWidth="1.5" strokeLinecap="round" />

          {/* Right Person (Team Member) */}
          {/* Head */}
          <circle cx="112" cy="58" r="14" fill="#FFFFFF" stroke={ink} strokeWidth="2.5" />
          {/* Body */}
          <path d="M112 72 C120 82 126 94 126 114 H98 C98 94 104 82 112 72 Z" fill="#FEF3C7" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
          {/* Arm holding notepad */}
          <path d="M104 88 L90 98" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
          {/* Notepad */}
          <rect x="84" y="96" width="14" height="18" rx="2" fill="#FFFFFF" stroke={ink} strokeWidth="2" transform="rotate(-6 84 96)" />
          <line x1="88" y1="102" x2="94" y2="101" stroke={navy} strokeWidth="1.5" />
          <line x1="87" y1="106" x2="93" y2="105" stroke={navy} strokeWidth="1.5" />

          {/* Dialogue / Alignment Arrow Loop in Sky */}
          <path d="M64 42 C72 34 88 34 96 42" stroke={navy} strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
          <path d="M96 38 L98 44 L92 44" stroke={navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'sprint-board':
      // Team lead organizing sprint capacity and workload on whiteboard (Book 2)
      return (
        <svg
          viewBox="0 0 160 160"
          fill="none"
          className={className}
          aria-label="Sprint Load & Capacity Whiteboard"
        >
          {/* Whiteboard Background */}
          <rect x="14" y="16" width="132" height="128" rx="6" fill="#FFFBEB" stroke={ink} strokeWidth="2.5" />
          {/* Whiteboard Stand Pegs */}
          <line x1="28" y1="144" x2="18" y2="154" stroke={ink} strokeWidth="3" strokeLinecap="round" />
          <line x1="132" y1="144" x2="142" y2="154" stroke={ink} strokeWidth="3" strokeLinecap="round" />
          <line x1="14" y1="144" x2="146" y2="144" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />

          {/* Board Grid Columns (Todo, In-Progress, Done) */}
          <line x1="56" y1="26" x2="56" y2="134" stroke={ink} strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="98" y1="26" x2="98" y2="134" stroke={ink} strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Column Sticky Notes */}
          {/* Todo stickies */}
          <rect x="22" y="34" width="26" height="18" rx="2" fill="#FED7AA" stroke={ink} strokeWidth="1.5" />
          <rect x="22" y="58" width="26" height="18" rx="2" fill="#FED7AA" stroke={ink} strokeWidth="1.5" />
          
          {/* Progress stickies */}
          <rect x="64" y="34" width="26" height="18" rx="2" fill="#FEF08A" stroke={ink} strokeWidth="1.5" />
          <rect x="64" y="72" width="26" height="18" rx="2" fill="#FEF08A" stroke={ink} strokeWidth="1.5" />

          {/* Done stickies with checks */}
          <rect x="106" y="34" width="26" height="18" rx="2" fill="#BBF7D0" stroke={ink} strokeWidth="1.5" />
          <path d="M114 43 L118 47 L126 39" stroke={emerald} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Lead Figure in Foreground manipulating board */}
          {/* Head */}
          <circle cx="92" cy="98" r="13" fill="#FFFFFF" stroke={ink} strokeWidth="2.5" />
          {/* Body */}
          <path d="M92 111 C82 119 76 130 76 144 H108 C108 130 102 119 92 111 Z" fill="#FED7AA" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
          {/* Raised Arm placing sticky */}
          <path d="M98 120 L110 108 L114 96" stroke={ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="110" y="88" width="14" height="12" rx="1.5" fill={amber} stroke={ink} strokeWidth="1.5" />
        </svg>
      );

    case 'strategy-meeting':
      // Lead of Leads presenting roadmap & system architecture in war-room (Book 3)
      return (
        <svg
          viewBox="0 0 160 160"
          fill="none"
          className={className}
          aria-label="Executive Strategy & Architecture Whiteboard"
        >
          {/* Whiteboard Wall Frame */}
          <rect x="16" y="16" width="128" height="96" rx="6" fill="#F0FDF4" stroke={ink} strokeWidth="2.5" />

          {/* Whiteboard System Hierarchy Tree */}
          {/* Root node */}
          <rect x="66" y="26" width="28" height="14" rx="2" fill="#DCFCE7" stroke={emerald} strokeWidth="2" />
          {/* Branch Lines */}
          <path d="M80 40 V50 M80 50 H46 V58 M80 50 H114 V58" stroke={ink} strokeWidth="1.5" strokeLinecap="round" />
          {/* Leaf nodes */}
          <rect x="32" y="58" width="28" height="14" rx="2" fill="#FFFFFF" stroke={ink} strokeWidth="1.5" />
          <rect x="100" y="58" width="28" height="14" rx="2" fill="#FFFFFF" stroke={ink} strokeWidth="1.5" />

          {/* Presenter (Director / Lead of Leads) */}
          <circle cx="38" cy="88" r="11" fill="#FFFFFF" stroke={ink} strokeWidth="2.5" />
          <path d="M38 99 C30 106 26 116 26 138 H50 C50 116 46 106 38 99 Z" fill="#DCFCE7" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
          {/* Arm pointing with marker */}
          <path d="M44 108 L58 96 L76 74" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="78" cy="72" r="3" fill={emerald} />

          {/* Audience Silhouettes (Seated in Foreground) */}
          <ellipse cx="94" cy="144" rx="14" ry="12" fill="#18181B" opacity="0.9" />
          <circle cx="94" cy="124" r="8" fill="#18181B" opacity="0.9" />

          <ellipse cx="126" cy="144" rx="14" ry="12" fill="#18181B" opacity="0.9" />
          <circle cx="126" cy="124" r="8" fill="#18181B" opacity="0.9" />
        </svg>
      );

    case 'solo-architect':
      // Single engineer sketching solutions on architectural canvas
      return (
        <svg
          viewBox="0 0 160 160"
          fill="none"
          className={className}
          aria-label="Tactical Engineer Drafting Solutions"
        >
          <rect x="20" y="20" width="120" height="120" rx="10" fill="#FAFAFA" stroke={ink} strokeWidth="2" strokeDasharray="3 3" />
          
          {/* Desk */}
          <line x1="28" y1="120" x2="132" y2="120" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Figure */}
          <circle cx="80" cy="58" r="16" fill="#FFFFFF" stroke={ink} strokeWidth="2.5" />
          <path d="M80 74 C66 84 60 98 60 120 H100 C100 98 94 84 80 74 Z" fill="#E0E7FF" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
          
          {/* Tablet / Blueprint on desk */}
          <rect x="62" y="108" width="36" height="22" rx="3" fill="#FFFFFF" stroke={navy} strokeWidth="2" />
          <line x1="68" y1="114" x2="84" y2="114" stroke={navy} strokeWidth="1.5" />
          <line x1="68" y1="120" x2="90" y2="120" stroke={navy} strokeWidth="1.5" />

          {/* Lightbulb / Idea stroke above */}
          <path d="M74 30 Q80 22 86 30" stroke={amber} strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="20" x2="80" y2="24" stroke={amber} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'active-listener':
    default:
      // Single professional taking notes and listening intently (used for quiz/evaluation)
      return (
        <svg
          viewBox="0 0 160 160"
          fill="none"
          className={className}
          aria-label="Active Listener & Feedback Evaluator"
        >
          <rect x="24" y="24" width="112" height="112" rx="8" fill="#F8FAFC" stroke={ink} strokeWidth="2" strokeDasharray="3 3" />
          
          {/* Figure */}
          <circle cx="80" cy="54" r="15" fill="#FFFFFF" stroke={ink} strokeWidth="2.5" />
          <path d="M80 69 C68 78 62 90 62 116 H98 C98 90 92 78 80 69 Z" fill="#F1F5F9" stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
          
          {/* Clipboard in hand */}
          <rect x="84" y="82" width="28" height="38" rx="3" fill="#FFFFFF" stroke={ink} strokeWidth="2" transform="rotate(-8 84 82)" />
          <rect x="92" y="78" width="12" height="6" rx="1.5" fill={navy} />
          {/* Checkmark on clipboard */}
          <path d="M92 96 L96 100 L104 92" stroke={emerald} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Active listening resonance waves */}
          <path d="M54 50 C50 54 50 60 54 64" stroke={navy} strokeWidth="2" strokeLinecap="round" />
          <path d="M48 44 C42 50 42 64 48 70" stroke={navy} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
  }
}
