"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, Shield, Users, Zap } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

function AnimatedTitle() {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    { primary: "Women Against", secondary: "Mutilations" },
    { primary: "Safe Guarding Women", secondary: "Against Violence" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % texts.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
      <span className="wam-text-gradient transition-all duration-1000 ease-in-out">
        {texts[currentText].primary}
      </span>
      <br />
      <span className="text-white transition-all duration-1000 ease-in-out">
        {texts[currentText].secondary}
      </span>
    </h1>
  );
}

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-pink-800 to-teal-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl wam-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl wam-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl wam-float" style={{animationDelay: '2s'}}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="text-center relative z-10">
          <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90">
            <Heart className="w-4 h-4 mr-2 text-pink-300" />
            Empowering Women Through Technology
          </div>
          
          <AnimatedTitle />
          
          <p className="text-xl md:text-2xl mb-10 text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Leveraging Blockchain Technology and AI to Empower Women
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/projects">
              <Button size="lg" className="wam-btn-primary text-white font-semibold px-8 py-4 text-lg">
                <Zap className="mr-2 h-5 w-5" />
                Explore Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" className="wam-btn-glass text-white font-semibold px-8 py-4 text-lg hover:text-purple-200">
                Learn More About WAM
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MissionSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Empower. Protect. Act.
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            With over two decades of dedication and UN ECOSOC status, WAM provides comprehensive 
            support through awareness, medical care, and community action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="wam-card text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 wam-float">
              <Heart className="h-8 w-8 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 wam-text-gradient">Our Goals</h3>
            <p className="text-gray-600">
              To promote women's health, dignity and wellbeing, and committed to 
              fighting Female Genital Mutilation (FGM).
            </p>
          </div>

          <div className="wam-card text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 wam-float" style={{animationDelay: '0.5s'}}>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 wam-text-gradient">Our Values</h3>
            <p className="text-gray-600">
              Honesty, Trust, Creativity, Love, Authenticity, Autonomy, 
              Social Cohesion, Solidarity, and Selflessness.
            </p>
          </div>

          <div className="wam-card text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 wam-float" style={{animationDelay: '1s'}}>
              <Users className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 wam-text-gradient">Our Impact</h3>
            <p className="text-gray-600">
              Around 200 million girls and women worldwide are affected. 
              We provide support through our multidisciplinary network.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-900 via-pink-800 to-teal-900 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl wam-pulse"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-pink-400/20 rounded-full blur-xl wam-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="wam-card bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <div className="text-4xl font-bold mb-2 wam-text-gradient bg-white text-transparent bg-clip-text">UN Member</div>
            <p className="text-purple-100">Special ECOSOC Status</p>
          </div>
          <div className="wam-card bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <div className="text-4xl font-bold mb-2 wam-text-gradient bg-white text-transparent bg-clip-text">20+</div>
            <p className="text-purple-100">Years of Dedication</p>
          </div>
          <div className="wam-card bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <div className="text-4xl font-bold mb-2 wam-text-gradient bg-white text-transparent bg-clip-text">200M+</div>
            <p className="text-purple-100">Women Affected Worldwide</p>
          </div>
        </div>
      </div>
    </section>
  );
}
