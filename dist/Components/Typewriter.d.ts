import React from 'react';
import { TypewriterProps } from '../Hooks/useTypewriter';
export interface ComponentProps extends TypewriterProps {
    cursor?: boolean;
    cursorStyle?: string;
    countRef: React.MutableRefObject<number>;
}
export declare const Typewriter: ({ words, loop, cursor, cursorStyle, typeSpeed, delaySpeed, deleteSpeed, onLoopDone, onType, countRef: ref }: ComponentProps) => JSX.Element;
