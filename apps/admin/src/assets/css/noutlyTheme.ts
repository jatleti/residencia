import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { PrimaryColors } from './primaryColors';

const NoutlyTheme = definePreset(Aura, {
    semantic: {
        primary: PrimaryColors,
    },
});

export default NoutlyTheme;
