import { E_note, G_note, A_note, B_note, C5_note, D5_note, E5_note } from './Music';

// A simple, upbeat, 16-note pixel music loop
const pixelMelody = [
    // Measure 1
    C5_note, E5_note, G_note, E5_note,
    // Measure 2
    A_note, D5_note, B_note, D5_note,
    // Measure 3
    G_note, C5_note, A_note, C5_note,
    // Measure 4
    B_note, E5_note, G_note, E_note,
];

export class SoundManager {
    private audioContext: AudioContext | null = null;
    private oscillator: OscillatorNode | null = null;
    private gainNode: GainNode | null = null;
    private isInitialized = false;
    private noteIndex = 0;
    private intervalId: number | null = null;
    private volume = 0.05; // Default volume for background music
    private isMuted = true;

    // This MUST be called from a user gesture event handler
    public init() {
        if (this.isInitialized || typeof window === 'undefined') return;

        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.audioContext.resume();

        // Play a one-time interaction sound to confirm audio context is active
        const interactionOscillator = this.audioContext.createOscillator();
        const interactionGain = this.audioContext.createGain();
        interactionOscillator.type = 'triangle';
        interactionOscillator.frequency.setValueAtTime(880, this.audioContext.currentTime); // A5 note
        interactionGain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        interactionOscillator.connect(interactionGain);
        interactionGain.connect(this.audioContext.destination);
        interactionOscillator.start(this.audioContext.currentTime);
        interactionGain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 0.2);
        interactionOscillator.stop(this.audioContext.currentTime + 0.2);

        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);

        this.oscillator = this.audioContext.createOscillator();
        this.oscillator.type = 'square';
        this.oscillator.connect(this.gainNode);

        this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        
        this.oscillator.start();

        this.playNextNote();
        this.intervalId = window.setInterval(() => this.playNextNote(), 200);
        
        this.isInitialized = true;
    }

    private playNextNote() {
        if (!this.isInitialized || !this.oscillator || !this.audioContext) return;
        const noteFrequency = pixelMelody[this.noteIndex % pixelMelody.length];
        this.oscillator.frequency.setValueAtTime(noteFrequency, this.audioContext.currentTime);
        this.noteIndex++;
    }

    public setVolume(newVolume: number) {
        if (newVolume < 0) newVolume = 0;
        if (newVolume > 1) newVolume = 1;
        this.volume = newVolume;
        if (!this.isMuted) {
            this.gainNode?.gain.linearRampToValueAtTime(this.volume, this.audioContext!.currentTime + 0.1);
        }
    }

    public setMuted(isMuted: boolean) {
        this.isMuted = isMuted;
        if (!this.isInitialized || !this.gainNode || !this.audioContext) return;
        
        const targetVolume = this.isMuted ? 0 : this.volume;
        this.gainNode.gain.linearRampToValueAtTime(targetVolume, this.audioContext.currentTime + 0.5);
    }
}