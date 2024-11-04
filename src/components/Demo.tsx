import React, { useState } from 'react';
import { PaintBucket, ZoomIn, Download, Undo } from 'lucide-react';
import { ImageUploader } from './ImageUploader';
import { StyleSelector } from './StyleSelector';
import { Pricing } from './Pricing';
import { useSubscription } from '../hooks/useSubscription';

interface GeneratedDesign {
  id: string;
  imageUrl: string;
  style: string;
  before: string;
}

export function Demo() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDesigns, setGeneratedDesigns] = useState<GeneratedDesign[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeDesign, setActiveDesign] = useState<GeneratedDesign | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const { subscription, useDesign, subscribe } = useSubscription();

  const handleImageSelect = async (file: File) => {
    try {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      
      img.onload = () => {
        if (img.width < 512 || img.height < 512) {
          setError('Image must be at least 512x512 pixels');
          URL.revokeObjectURL(objectUrl);
          return;
        }
        
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result as string);
          setGeneratedDesigns([]);
          setError(null);
        };
        reader.readAsDataURL(file);
      };
      
      img.src = objectUrl;
    } catch (err) {
      setError('Error processing image. Please try again.');
    }
  };

  const generateDesigns = async () => {
    if (!selectedImage) return;
    
    if (!useDesign()) {
      setShowPricing(true);
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockDesigns: GeneratedDesign[] = [
        {
          id: '1',
          imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3',
          style: selectedStyle,
          before: selectedImage,
        },
        {
          id: '2',
          imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
          style: selectedStyle,
          before: selectedImage,
        },
        {
          id: '3',
          imageUrl: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4',
          style: selectedStyle,
          before: selectedImage,
        },
      ];
      
      setGeneratedDesigns(mockDesigns);
    } catch (err) {
      setError('Failed to generate designs. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDesignClick = (design: GeneratedDesign) => {
    setActiveDesign(design);
  };

  const downloadDesign = async (design: GeneratedDesign) => {
    try {
      setIsDownloading(true);
      
      const response = await fetch(design.imageUrl);
      const blob = await response.blob();
      
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `interior-design-${design.style}-${design.id}.jpg`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      setError('Failed to download design. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSubscribe = (plan: string) => {
    subscribe(plan);
    setShowPricing(false);
  };

  return (
    <>
      <section id="demo" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Try It Yourself</h2>
          {!subscription.isPro && (
            <div className="max-w-5xl mx-auto mb-8">
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 text-center">
                <p className="text-indigo-800">
                  {subscription.remainingFreeUses} free designs remaining.{' '}
                  {subscription.remainingFreeUses > 0 && 'Subscribe for unlimited access.'}
                </p>
              </div>
            </div>
          )}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}

              {!selectedImage ? (
                <ImageUploader onImageSelect={handleImageSelect} />
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Original Room</h3>
                      <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={selectedImage}
                          alt="Original room"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Style Selection</h3>
                      <StyleSelector 
                        selectedStyle={selectedStyle}
                        onStyleSelect={setSelectedStyle}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={generateDesigns}
                      disabled={isGenerating}
                      className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing Room Design...
                        </>
                      ) : (
                        <>
                          <PaintBucket className="w-5 h-5" />
                          Generate Interior Designs
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setGeneratedDesigns([]);
                        setActiveDesign(null);
                      }}
                      className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <Undo className="w-5 h-5" />
                      Start Over
                    </button>
                  </div>

                  {generatedDesigns.length > 0 && (
                    <div className="space-y-6">
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-xl font-semibold mb-4">Generated Designs</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {generatedDesigns.map((design) => (
                            <div
                              key={design.id}
                              onClick={() => handleDesignClick(design)}
                              className="cursor-pointer group relative"
                            >
                              <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
                                <img
                                  src={design.imageUrl}
                                  alt={`${selectedStyle} design`}
                                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {activeDesign && (
                        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
                          <div className="bg-white rounded-xl max-w-4xl w-full p-6">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-xl font-semibold">Design Preview</h3>
                              <button
                                onClick={() => setActiveDesign(null)}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                ✕
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500 mb-2">Before</p>
                                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                                  <img
                                    src={activeDesign.before}
                                    alt="Original room"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-2">After</p>
                                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                                  <img
                                    src={activeDesign.imageUrl}
                                    alt="Transformed room"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <button
                                onClick={() => downloadDesign(activeDesign)}
                                disabled={isDownloading}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isDownloading ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Downloading...
                                  </>
                                ) : (
                                  <>
                                    <Download className="w-4 h-4" />
                                    Download Design
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {showPricing && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Upgrade to Continue</h3>
              <button
                onClick={() => setShowPricing(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <Pricing onSubscribe={handleSubscribe} />
          </div>
        </div>
      )}
    </>
  );
}