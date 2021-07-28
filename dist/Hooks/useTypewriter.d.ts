export interface TypewriterProps {
    words: string[];
    loop?: number | boolean;
    typeSpeed?: number;
    deleteSpeed?: number;
    delaySpeed?: number;
    onLoopDone?: () => void;
    onType?: () => void;
}
export interface typeWriterResponse {
    text: string;
    count: number;
}
export declare const useTypewriter: ({ words, loop, typeSpeed, deleteSpeed, delaySpeed, onLoopDone, onType }: TypewriterProps) => typeWriterResponse;
