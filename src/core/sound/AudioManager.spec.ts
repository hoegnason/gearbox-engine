import { string } from "prop-types";
import { AudioManager } from "./AudioManager";
import { SoundEffect } from "./SoundEffect";

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const loadSomeSounds = () => {
  AudioManager.loadSoundFile("ping", "assets/sound/ping.ogg", false);
  AudioManager.loadSoundFile("pong", "assets/sound/ping.ogg", false);
  AudioManager.loadSoundFile("ding", "assets/sound/ping.ogg", false);
  AudioManager.loadSoundFile("dong", "assets/sound/ping.ogg", false);
};

describe("AudioManager", () => {
  // TODO: check if it is better to use https://stackoverflow.com/questions/47426434/cannot-mock-react-native-sound-with-jest

  const mgr = AudioManager as any;

  beforeEach(() => {
    mgr._soundEffects.clear();
  });

  test("Test that name value is of type string", () => {
    AudioManager.loadSoundFile("ping", "assets/sound/ping.ogg", false);
    // AudioManager.playSound("ping");

    const value = mgr._soundEffects.get("ping");

    //expect(value).toBeInstanceOf(string);
    expect(typeof value).toBeInstanceOf(string);
    //expect(value).toEqual(string);
  });

  test("Load a sound and play it", async () => {
    AudioManager.loadSoundFile("ping", "assets/sound/ping.ogg", false);
    AudioManager.playSound("ping");

    const ping = mgr._soundEffects.get("ping");
    expect(ping._player.paused).toBe(false);

    await timeout(250);

    AudioManager.pauseSound("ping");

    expect(ping._player.paused).toBe(true);
  });

  test("Pause all sounds", async () => {
    loadSomeSounds();

    mgr._soundEffects.forEach((soundEffect: SoundEffect) => {
      soundEffect.play();
    });

    await timeout(250);

    mgr._soundEffects.forEach((soundEffect: SoundEffect) => {
      const audio = soundEffect as any;
      expect(audio._player.paused).toBe(false);
    });

    AudioManager.pauseAll();

    await timeout(250);

    mgr._soundEffects.forEach((soundEffect: SoundEffect) => {
      const audio = soundEffect as any;
      expect(audio._player.paused).toBe(true);
    });
  });

  test("Stop a sound", async () => {
    AudioManager.loadSoundFile("ping", "assets/sound/ping.ogg", false);
    AudioManager.playSound("ping");

    const ping = mgr._soundEffects.get("ping");
    expect(ping._player.paused).toBe(false);
    expect(ping._player.currentTime).toBeGreaterThan(0);

    await timeout(250);

    AudioManager.stopSound("ping");

    expect(ping._player.paused).toBe(true);
    expect(ping._player.currentTime).toBe(0);
  });

  test("Stop all sounds", async () => {
    loadSomeSounds();

    mgr._soundEffects.forEach((soundEffect: SoundEffect) => {
      soundEffect.play();
    });

    await timeout(250);

    mgr._soundEffects.forEach((soundEffect: SoundEffect) => {
      const audio = soundEffect as any;
      expect(audio._player.paused).toBe(false);
      expect(audio._player.currentTime).toBeGreaterThan(0);
    });

    AudioManager.stopAll();

    await timeout(250);

    mgr._soundEffects.forEach((soundEffect: SoundEffect) => {
      const audio = soundEffect as any;
      expect(audio._player.paused).toBe(true);
      expect(audio._player.currentTime).toBe(0);
    });
  });
});
