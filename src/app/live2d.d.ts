declare module 'pixi-live2d-display' {
  import * as PIXI from 'pixi.js';

  export class Live2DModel extends PIXI.Container {
    static from(source: string, options?: any): Promise<Live2DModel>;
    
    internalModel: {
      coreModel: {
        setParameterValueById(id: string, value: number): void;
        getParameterValueById(id: string): number;
      };
    };
    
    motion(group: string, index?: number, priority?: number): void;
    expression(index: number): void;
    
    width: number;
    height: number;
    scale: PIXI.Point;
    anchor: PIXI.ObservablePoint;
  }

  export function registerTicker(ticker: PIXI.Ticker): void;
}

interface Window {
  PIXI: typeof import('pixi.js');
  Live2DCubismCore: any;
}
