import {Platform, NativeModules, NativeEventEmitter, EmitterSubscription} from 'react-native';

const TVNavigationEventEmitter = NativeModules.TVNavigationEventEmitter;

export class TVEventHandler {
  private __nativeTVNavigationEventListener: EmitterSubscription | null = null;
  private __nativeTVNavigationEventEmitter: NativeEventEmitter | null = null;
  public static eventType = 'onHWKeyEvent';

  enable = (component: any, callback: (component: any, data: any) => void) => {
    if (Platform.OS === 'ios' && !TVNavigationEventEmitter) {
      return;
    }

    this.__nativeTVNavigationEventEmitter = new NativeEventEmitter(
      TVNavigationEventEmitter
    );
    this.__nativeTVNavigationEventListener = this.__nativeTVNavigationEventEmitter.addListener(
      TVEventHandler.eventType,
      data => {
        if (callback) {
          callback(component, data);
        }
      }
    );
  };

  disable = () => {
    if (this.__nativeTVNavigationEventListener) {
      this.__nativeTVNavigationEventListener.remove();
      delete this.__nativeTVNavigationEventListener;
    }
    if (this.__nativeTVNavigationEventEmitter) {
      delete this.__nativeTVNavigationEventEmitter;
    }
  };
}
