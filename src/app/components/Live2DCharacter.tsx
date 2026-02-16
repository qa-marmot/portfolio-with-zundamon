'use client';

import { useEffect, useRef, useState } from 'react';

interface Live2DCharacterProps {
  onReady?: (model: any) => void;
  currentSection?: string;
}

export default function Live2DCharacter({ onReady, currentSection }: Live2DCharacterProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<any>(null);
  const modelRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let app: any = null;
    let model: any = null;
    let mounted = true;

    const initLive2D = async () => {
      if (!canvasRef.current) return;

      try {
        // 1. PIXIの動的インポート
        const PIXI = await import('pixi.js');
        
        // 2. PIXIをグローバルに設定（pixi-live2d-displayが必要とする）
        if (typeof window !== 'undefined') {
          (window as any).PIXI = PIXI;
        }

        // 3. Cubism Coreの読み込み確認と待機
        if (typeof window !== 'undefined') {
          // 既に読み込まれているか確認
          if (!(window as any).Live2DCubismCore) {
            console.log('Waiting for Cubism Core...');
            // layout.tsxでロード中の可能性があるので待機
            let attempts = 0;
            while (!(window as any).Live2DCubismCore && attempts < 50) {
              await new Promise(resolve => setTimeout(resolve, 100));
              attempts++;
            }
            
            if (!(window as any).Live2DCubismCore) {
              throw new Error('Cubism Core failed to load. Please refresh the page.');
            }
          }
          console.log('Cubism Core is ready');
        }

        // 4. pixi-live2d-displayの動的インポート
        const { Live2DModel } = await import('pixi-live2d-display/cubism4');

        if (!mounted) return;

        // 5. PIXIアプリケーションの初期化
        app = new PIXI.Application({
          width: 300,
          height: 400,
          backgroundColor: 0x000000,
          backgroundAlpha: 0,
          antialias: true,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
        });

        if (!mounted || !canvasRef.current) return;

        canvasRef.current.appendChild(app.view as HTMLCanvasElement);
        appRef.current = app;

        // 6. Live2Dモデルの読み込み
        console.log('Loading Live2D model...');
        model = await Live2DModel.from('/models/zunda_model.model3.json', {
          autoInteract: false, // 誤動作防止のため一旦false
        });

        if (!mounted) return;

        // PixiJS v7のイベントシステムに対応させる
        model.eventMode = 'none'; 
        
        // 内部で古いメソッドを呼ぼうとしてエラーになるのを防ぐためのダミー関数
        if (typeof (model as any).isInteractive !== 'function') {
          (model as any).isInteractive = () => false;
        }
        // -------------------------

        console.log('Live2D model loaded successfully');
        modelRef.current = model;

        // 7. モデルのスケールと位置調整
        const scale = 0.15;
        model.scale.set(scale, scale);
        model.x = app.screen.width / 2;
        model.y = app.screen.height * 0.95;
        
        if (model.anchor) {
          model.anchor.set(0.5, 1);
        }

        app.stage.addChild(model);

        // 8. 初期パラメータ設定
        if (model.internalModel?.coreModel) {
          try {
            model.internalModel.coreModel.setParameterValueById('ParamEyeOpen', 1.0);
            model.internalModel.coreModel.setParameterValueById('ParamMouthOpen', 0.0);
            model.internalModel.coreModel.setParameterValueById('ParamArmR', 0.0);
            console.log('Parameters set successfully');
          } catch (e) {
            console.warn('Failed to set parameters:', e);
          }
        }

        setIsLoading(false);
        if (onReady) {
          onReady(model);
        }
      } catch (err) {
        console.error('Live2D initialization error:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load Live2D model');
          setIsLoading(false);
        }
      }
    };

    initLive2D();

    // クリーンアップ
    return () => {
      mounted = false;
      if (model) {
        try {
          model.destroy();
        } catch (e) {
          console.warn('Model cleanup error:', e);
        }
      }
      if (app) {
        try {
          app.destroy(true, { children: true, texture: true, baseTexture: true });
        } catch (e) {
          console.warn('App cleanup error:', e);
        }
      }
    };
  }, [onReady]);

  return (
    <div className="hidden lg:block fixed bottom-4 right-4 z-50">
      <div ref={canvasRef} className="relative">
        {isLoading && (
          <div className="w-[300px] h-[400px] flex items-center justify-center bg-zunda-primary/20 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zunda-primary mx-auto mb-4"></div>
              <p className="text-zunda-dark text-sm">ずんだもん読み込み中...</p>
            </div>
          </div>
        )}
        {error && (
          <div className="w-[300px] h-[400px] flex items-center justify-center bg-red-500/20 rounded-lg p-4">
            <div className="text-center">
              <p className="text-red-700 text-sm mb-2">⚠️ エラー</p>
              <p className="text-red-600 text-xs">{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
