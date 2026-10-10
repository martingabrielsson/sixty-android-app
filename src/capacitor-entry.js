import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { LocalNotifications } from '@capacitor/local-notifications';

window.CapFilesystem = Filesystem;
window.CapDirectory = Directory;
window.CapEncoding = Encoding;
window.CapShare = Share;
window.CapHaptics = Haptics;
window.CapImpactStyle = ImpactStyle;
window.CapLocalNotifications = LocalNotifications;
