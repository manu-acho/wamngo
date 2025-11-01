#!/usr/bin/env node

import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function seedAddisAIPartner() {
  try {
    console.log('🤖 Creating Addis AI partner entry...');
    
    const addisAIData = {
      id: 'gen_random_uuid()',
      name: 'Addis AI',
      description: `Addis AI is Ethiopia's leading AI technology company and WAM's strategic technology partner. As a recognized NVIDIA Inception Program partner, Addis AI specializes in developing culture-aware, multimodal AI platforms that deliver voice-first, multilingual solutions running on edge devices without internet connectivity.

The company currently supports 75,000-80,000 users with 10,000 weekly active users and boasts a developer ecosystem of 200+ contributors generating 5M+ API calls per month. Their enterprise deployments span agriculture, telecom, and NGO sectors across Ethiopia.

In partnership with WAM, Addis AI is transforming Ethiopia's digital divide into an opportunity by providing verified maternal health, agricultural, and educational advisory services to millions of underserved people in their native languages. This direct collaboration positions Addis AI as a critical technology partner in scaling responsible AI solutions that combat all forms of mutilations affecting women - from healthcare barriers to educational exclusion.`,
      shortDescription: 'Leading AI innovation for Ethiopia\'s digital transformation through culture-aware, voice-first technology solutions.',
      capabilities: `• Culture-aware, multimodal AI platform development
• Voice-first, offline AI solutions for edge devices
• Multilingual support (Amharic, Afan Oromo, Tigrinya, Somali, Sidama)
• Quantized language models optimized for mobile and IVR deployment
• ASR (Automatic Speech Recognition) and TTS (Text-to-Speech) pipeline development
• Offline smartphone applications and IVR system architecture
• Developer ecosystem management with 200+ contributors
• Enterprise AI deployment in agriculture, telecom, and NGO sectors
• NVIDIA Inception Program partnership and validation
• Technical training and capacity building for local developers`,
      logoUrl: null,
      websiteUrl: 'https://platform.addisassistant.com/',
      contactEmail: 'partnerships@addisai.com',
      partnerType: 'technology',
      status: 'active',
      location: 'Addis Ababa, Ethiopia',
      establishedYear: 2019,
      teamSize: '51-200',
      specialization: JSON.stringify([
        'Artificial Intelligence',
        'Natural Language Processing',
        'Automatic Speech Recognition',
        'Text-to-Speech',
        'Edge Computing',
        'Multilingual AI',
        'Offline Mobile Applications',
        'IVR Systems',
        'Agricultural Technology',
        'Health Technology'
      ]),
      achievements: JSON.stringify([
        'NVIDIA Inception Program Partner',
        '75,000-80,000 active users',
        '10,000 weekly active users',
        '200+ developer community contributors',
        '5M+ API calls per month',
        'Enterprise deployments across agriculture, telecom, NGO sectors',
        'First comprehensive offline AI system for Ethiopia',
        'Multilingual support for 5 Ethiopian languages',
        'Voice-first AI technology for rural communities'
      ]),
      projects: JSON.stringify([
        {
          name: 'WAM-Addis AI Technology Partnership',
          description: 'Direct collaboration to deliver AI-powered maternal health, agricultural advisory, and educational services that break down barriers for Ethiopian women',
          status: 'active',
          impact: 'Targeting 500,000 direct users in Year 2, scaling to 5M+ over 5 years'
        },
        {
          name: 'Offline Voice AI Platform',
          description: 'Culture-aware AI platform delivering services via offline smartphone apps and toll-free IVR',
          status: 'active',
          impact: 'Serving 75,000+ users with voice-first, multilingual AI'
        },
        {
          name: 'Agricultural AI Advisory',
          description: 'AI-powered farming advice for smallholder farmers in local languages',
          status: 'active',
          impact: 'Targeting 40% crop yield increase and adoption of climate-smart practices'
        },
        {
          name: 'Maternal Health AI',
          description: 'Voice-first AI providing real-time maternal health guidance and emergency response',
          status: 'active',
          impact: 'Aiming for 35% increase in antenatal care attendance'
        }
      ]),
      createdAt: 'NOW()',
      updatedAt: 'NOW()',
      deletedAt: null,
      deletedBy: null,
      deleteReason: null
    };
    
    const insertQuery = `
      INSERT INTO partners (
        name, description, "shortDescription", capabilities, "logoUrl", "websiteUrl", 
        "contactEmail", "partnerType", status, location, "establishedYear", "teamSize",
        specialization, achievements, projects, "createdAt", "updatedAt"
      ) VALUES (
        '${addisAIData.name}',
        $1,
        '${addisAIData.shortDescription}',
        $2,
        ${addisAIData.logoUrl},
        '${addisAIData.websiteUrl}',
        '${addisAIData.contactEmail}',
        '${addisAIData.partnerType}',
        '${addisAIData.status}',
        '${addisAIData.location}',
        ${addisAIData.establishedYear},
        '${addisAIData.teamSize}',
        '${addisAIData.specialization}',
        '${addisAIData.achievements}',
        '${addisAIData.projects}',
        NOW(),
        NOW()
      )
    `;
    
    await sql(insertQuery, [addisAIData.description, addisAIData.capabilities]);
    
    console.log('✅ Addis AI partner created successfully!');
    console.log('📊 Partner details:');
    console.log(`   Name: ${addisAIData.name}`);
    console.log(`   Type: ${addisAIData.partnerType}`);
    console.log(`   Location: ${addisAIData.location}`);
    console.log(`   Website: ${addisAIData.websiteUrl}`);
    console.log(`   Specializations: ${JSON.parse(addisAIData.specialization).length} areas`);
    console.log(`   Key Projects: ${JSON.parse(addisAIData.projects).length} active projects`);
    
  } catch (error) {
    if (error.message && error.message.includes('duplicate key')) {
      console.log('ℹ️ Addis AI partner already exists');
    } else {
      console.error('❌ Failed to create Addis AI partner:', error.message);
    }
  }
}

seedAddisAIPartner();
