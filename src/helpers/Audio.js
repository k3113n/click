import { Audio } from 'expo-av';

export const Sounds = []

export const preloadAudio = async () => {
    try {
        const redDown = new Audio.Sound();
        await redDown.loadAsync(require('../../assets/audio/down/red.wav'));
        const blueDown = new Audio.Sound();
        await blueDown.loadAsync(require('../../assets/audio/down/blue.wav'));
        const redUp = new Audio.Sound();
        await redUp.loadAsync(require('../../assets/audio/up/red.wav'));
        const blueUp = new Audio.Sound();
        await blueUp.loadAsync(require('../../assets/audio/up/blue.wav'));

        Sounds['redDown'] = redDown;
        Sounds['blueDown'] = blueDown;
        Sounds['redUp'] = redUp;
        Sounds['blueUp'] = blueUp;
    } catch (error) {
        console.log('Failed to preload: ', error);
    }
};
