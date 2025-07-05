import { describe, test, expect } from 'vitest';
import { colors } from '../../../config/colors';
import { ICON_REGISTRY as icons } from '../../../config/icons';

describe('Colors Config', () => {
  test('should export colors object', () => {
    expect(colors).toBeDefined();
    expect(typeof colors).toBe('object');
  });

  test('should have primary color defined', () => {
    expect(colors.success).toBeDefined();
    expect(typeof colors.success).toBe('string');
  });

  test('should have secondary color defined', () => {
    expect(colors.error).toBeDefined();
    expect(typeof colors.error).toBe('string');
  });

  test('should have success color defined', () => {
    expect(colors.darkSuccess).toBeDefined();
    expect(typeof colors.darkSuccess).toBe('string');
  });

  test('should have error color defined', () => {
    expect(colors.danger).toBeDefined();
    expect(typeof colors.danger).toBe('string');
  });

  test('should have warning color defined', () => {
    expect(colors.dangerLight).toBeDefined();
    expect(typeof colors.dangerLight).toBe('string');
  });

  test('should have text color defined', () => {
    expect(colors.dangerDark).toBeDefined();
    expect(typeof colors.dangerDark).toBe('string');
  });

  test('should have background color defined', () => {
    expect(colors.dangerDarker).toBeDefined();
    expect(typeof colors.dangerDarker).toBe('string');
  });

  test('should have background color defined', () => {
    expect(colors.gray).toBeDefined();
    expect(typeof colors.gray).toBe('string');
  });

  test('should have background color defined', () => {
    expect(colors.lightGray).toBeDefined();
    expect(typeof colors.lightGray).toBe('string');
  });

  test('should have background color defined', () => {
    expect(colors.darkGray).toBeDefined();
    expect(typeof colors.darkGray).toBe('string');
  });

  test('should have background color defined', () => {
    expect(colors.darkerGray).toBeDefined();
    expect(typeof colors.darkerGray).toBe('string');
  });

  test('should have carbon color defined', () => {
    expect(colors.carbon).toBeDefined();
    expect(typeof colors.carbon).toBe('string');
  });

  test('should have info color defined', () => {
    expect(colors.info).toBeDefined();
    expect(typeof colors.info).toBe('string');
  });

  test('should have clear color defined', () => {
    expect(colors.clear).toBeDefined();
    expect(typeof colors.clear).toBe('string');
  });

  test('should have clearer color defined', () => {
    expect(colors.clearer).toBeDefined();
    expect(typeof colors.clearer).toBe('string');
  });

  test('should have info light color defined', () => {
    expect(colors.info_light).toBeDefined();
    expect(typeof colors.info_light).toBe('string');
  });

  test('should have google color defined', () => {
    expect(colors.google).toBeDefined();
    expect(typeof colors.google).toBe('string');
  });

  test('should have facebook color defined', () => {
    expect(colors.facebook).toBeDefined();
    expect(typeof colors.facebook).toBe('string');
  });

  test('should have apple color defined', () => {
    expect(colors.apple).toBeDefined();
    expect(typeof colors.apple).toBe('string');
  });

  test('should have transparent light color defined', () => {
    expect(colors.transparentLight).toBeDefined();
    expect(typeof colors.transparentLight).toBe('string');
  });

  test('should have background color defined', () => {
    expect(colors.backgroundColor).toBeDefined();
    expect(typeof colors.backgroundColor).toBe('string');
  });

  test('should have background dark color defined', () => {
    expect(colors.backgroundColorDark).toBeDefined();
    expect(typeof colors.backgroundColorDark).toBe('string');
  });

  test('should have warning color defined', () => {
    expect(colors.warning).toBeDefined();
    expect(typeof colors.warning).toBe('string');
  });

  test('should have label color defined', () => {
    expect(colors.label).toBeDefined();
    expect(typeof colors.label).toBe('string');
  });

  test('should have blue color defined', () => {
    expect(colors.blue).toBeDefined();
    expect(typeof colors.blue).toBe('string');
  });

  test('should have white color defined', () => {
    expect(colors.white).toBeDefined();
    expect(typeof colors.white).toBe('string');
  });

  test('should have purple color defined', () => {
    expect(colors.purple).toBeDefined();
    expect(typeof colors.purple).toBe('string');
  });

  test('should have red color defined', () => {
    expect(colors.red).toBeDefined();
    expect(typeof colors.red).toBe('string');
  });

  test('should have light purple color defined', () => {
    expect(colors.lightPurple).toBeDefined();
    expect(typeof colors.lightPurple).toBe('string');
  });

  test('should have background available color defined', () => {
    expect(colors.backgroundAvaible).toBeDefined();
    expect(typeof colors.backgroundAvaible).toBe('string');
  });

  test('should have font color available defined', () => {
    expect(colors.fontColorAvaible).toBeDefined();
    expect(typeof colors.fontColorAvaible).toBe('string');
  });

  test('should have background occupied color defined', () => {
    expect(colors.backgroundOcuppied).toBeDefined();
    expect(typeof colors.backgroundOcuppied).toBe('string');
  });

  test('should have font color occupied defined', () => {
    expect(colors.fontColorOccupied).toBeDefined();
    expect(typeof colors.fontColorOccupied).toBe('string');
  });

  test('should have background gray color defined', () => {
    expect(colors.backgroundGray).toBeDefined();
    expect(typeof colors.backgroundGray).toBe('string');
  });

  test('should have dark text color defined', () => {
    expect(colors.darkText).toBeDefined();
    expect(typeof colors.darkText).toBe('string');
  });
});

describe('Icons Config', () => {
  test('should export icons object', () => {
    expect(icons).toBeDefined();
    expect(typeof icons).toBe('object');
  });

  test('should have user icon defined', () => {
    expect(icons.user).toBeDefined();
  });

  test('should have home icon defined', () => {
    expect(icons.home).toBeDefined();
  });

  test('should have beer icon defined', () => {
    expect(icons.beer).toBeDefined();
  });

  test('should have eyeInvisible icon defined', () => {
    expect(icons.eyeInvisible).toBeDefined();
  });

  test('should have eyeTwoTone icon defined', () => {
    expect(icons.eyeTwoTone).toBeDefined();
  });

  test('should have heart icon defined', () => {
    expect(icons.heart).toBeDefined();
  });

  test('should have home icon defined', () => {
    expect(icons.home).toBeDefined();
  });

  test('should have infoCircle icon defined', () => {
    expect(icons.infoCircle).toBeDefined();
  });

  test('should have lock icon defined', () => {
    expect(icons.lock).toBeDefined();
  });

  test('should have rocket icon defined', () => {
    expect(icons.rocket).toBeDefined();
  });

  test('should have rocket icon defined', () => {
    expect(icons.setting).toBeDefined();
  });

  test('should have rocket icon defined', () => {
    expect(icons.user).toBeDefined();
  });
});
