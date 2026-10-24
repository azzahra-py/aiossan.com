import React from 'react';
import { WhiteboardSceneSvg, WhiteboardScene } from './WhiteboardSceneSvg';

export type MascotCharacter = 'capybara' | 'otter' | 'owl' | 'redpanda' | 'tortoise';

interface WoodlandMascotSvgProps {
  character: MascotCharacter;
  className?: string;
  badgeText?: string;
}

/**
 * @deprecated WoodlandMascotSvg is deprecated as part of the War-Room Whiteboard Re-branding.
 * All characters have been transformed into WhiteboardSceneSvg human team scenarios.
 * This proxy maps legacy character props to corresponding whiteboard scenes.
 */
export function WoodlandMascotSvg({
  character,
  className = 'w-20 h-20',
}: WoodlandMascotSvgProps) {
  const sceneMap: Record<MascotCharacter, WhiteboardScene> = {
    capybara: 'one-on-one',
    tortoise: 'sprint-board',
    owl: 'strategy-meeting',
    otter: 'active-listener',
    redpanda: 'solo-architect',
  };

  const scene = sceneMap[character] || 'one-on-one';

  return <WhiteboardSceneSvg scene={scene} className={className} />;
}
