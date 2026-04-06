"use client";

import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { X, Copy, Check, Download } from "lucide-react";
import { useState } from "react";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  queueName: string;
}

export function QRCodeModal({ isOpen, onClose, url, queueName }: QRCodeModalProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass w-full max-w-sm rounded-[40px] p-8 relative z-10 shadow-glow text-center space-y-8"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-foreground/20 hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-2">
              <h3 className="text-xl font-display font-bold tracking-tight">Share Queue</h3>
              <p className="text-xs text-foreground/40 font-medium uppercase tracking-widest">{queueName}</p>
            </div>

            <div className="bg-white p-6 rounded-3xl inline-block shadow-glow">
              <QRCodeSVG 
                value={url} 
                size={200}
                level="H"
                includeMargin={false}
                imageSettings={{
                  src: "/favicon.ico",
                  x: undefined,
                  y: undefined,
                  height: 40,
                  width: 40,
                  excavate: true,
                }}
              />
            </div>

            <div className="space-y-4">
              <div className="bg-surface-low/50 p-4 rounded-2xl flex items-center justify-between gap-4 overflow-hidden">
                <p className="text-[10px] font-mono text-foreground/30 truncate">{url}</p>
                <button 
                  onClick={copyToClipboard}
                  className="bg-surface-high p-2 rounded-xl text-foreground/60 hover:text-tertiary transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-tertiary" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <button className="w-full bg-foreground text-background py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-tertiary hover:text-black transition-all">
                <Download className="w-4 h-4" />
                Download Print Template
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
