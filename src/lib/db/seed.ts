import { db } from './index';
import { projects, projectMilestones, projectUpdates, impactMetrics } from './schema';

export const sampleProjects = [
  {
    title: "AI-Powered Maternal Health System",
    slug: "maternal-health-ai",
    description: `A revolutionary voice-first AI system designed to reduce maternal mortality rates by providing real-time health guidance in native languages. The system works offline on edge devices, ensuring access even in remote areas without internet connectivity.

Key Features:
• Voice-first interface supporting multiple African languages
• Offline capability with quantized AI models
• Emergency detection and routing to medical professionals
• Cultural sensitivity and local health practices integration
• Real-time vital signs monitoring and risk assessment

Technology Stack:
• Quantized Language Models (Gemma 3 architecture)
• Automatic Speech Recognition (ASR) fine-tuned for local dialects
• Text-to-Speech (TTS) with natural voice synthesis
• Edge computing deployment on smartphones and feature phones
• Blockchain integration for transparent impact tracking

The system addresses the critical problem of 412 maternal deaths per 100,000 births in underserved regions by providing immediate access to life-saving health information and emergency guidance.`,
    shortDescription: "Voice-first AI system reducing maternal mortality through real-time health guidance in native languages, deployable offline on edge devices.",
    category: "health",
    technologyStack: ["AI/ML", "Edge Computing", "Speech Recognition", "Blockchain", "Mobile Development"],
    fundingGoal: "3000000.00",
    tokenAllocation: 1500000,
    status: "active",
    imageUrl: "/images/maternal-health-ai.jpg",
    impactGoals: {
      primary: "Reduce maternal mortality by 35%",
      users: "500,000 women reached in first 2 years",
      regions: "Deploy across 5 underserved regions",
      languages: "Support for 5+ African languages",
      response_time: "Reduce emergency response time to under 2 minutes"
    },
    partnerships: ["Ministry of Health", "Local NGOs", "Regional Universities", "Telecom Partners"],
    isPublished: true
  },
  {
    title: "Smart Agricultural Advisory Network",
    slug: "smart-agriculture",
    description: `An AI-powered platform that revolutionizes agricultural extension services by providing real-time, personalized farming advice to smallholder farmers. The system combines computer vision, predictive analytics, and local knowledge to deliver climate-smart agricultural practices.

Key Features:
• Real-time crop disease identification using computer vision
• Weather prediction and climate adaptation recommendations
• Pest management with eco-friendly solutions
• Market price forecasting and optimal selling times
• Soil health analysis and fertilizer recommendations
• Water management and irrigation optimization

Technology Innovation:
• Offline-capable mobile app with edge AI models
• Drone and satellite imagery integration
• IoT sensors for soil and weather monitoring
• Machine learning models trained on local agricultural data
• Blockchain supply chain tracking

The platform addresses the critical challenge where farmers currently wait 5-7 days for extension advice, during which crops can be lost to pests, disease, or weather events. Our AI provides instant, accurate guidance tailored to local conditions.`,
    shortDescription: "AI-powered platform providing instant agricultural advice to smallholder farmers, combining computer vision, weather prediction, and local knowledge.",
    category: "agriculture",
    technologyStack: ["Computer Vision", "Predictive Analytics", "IoT", "Blockchain", "Mobile AI"],
    fundingGoal: "2500000.00",
    tokenAllocation: 1250000,
    status: "proposed",
    imageUrl: "/images/smart-agriculture.jpg",
    impactGoals: {
      primary: "Increase crop yields by 40%",
      farmers: "100,000 smallholder farmers supported",
      adoption: "80% adoption rate of climate-smart practices",
      income: "30% increase in farmer income",
      sustainability: "50% reduction in chemical pesticide use"
    },
    partnerships: ["Ministry of Agriculture", "Agricultural Research Institutes", "Farmer Cooperatives", "Climate Organizations"],
    isPublished: true
  },
  {
    title: "Digital Inclusion AI Platform",
    slug: "digital-inclusion-ai",
    description: `A comprehensive AI platform designed to bridge the digital divide by providing culturally-aware, multilingual AI services to underserved communities. The platform focuses on health, education, and economic empowerment through accessible technology.

Core Components:
• Multilingual Natural Language Processing supporting indigenous languages
• Voice-first interface optimized for low-literacy populations
• Educational content delivery in local languages
• Financial literacy and microfinance integration
• Community health worker training and support
• Skills development and vocational training modules

Technical Innovation:
• Advanced tokenization for low-resource languages
• Federated learning to protect community data privacy
• Edge deployment for offline functionality
• Cultural context awareness in AI responses
• Community feedback loops for continuous improvement

The platform serves as a digital bridge, ensuring that technological advancement doesn't leave behind vulnerable populations, particularly women and rural communities who face multiple barriers to digital access.`,
    shortDescription: "Multilingual AI platform bridging the digital divide through culturally-aware services in health, education, and economic empowerment.",
    category: "education",
    technologyStack: ["NLP", "Federated Learning", "Edge AI", "Mobile Development", "Blockchain"],
    fundingGoal: "1800000.00",
    tokenAllocation: 900000,
    status: "proposed",
    imageUrl: "/images/digital-inclusion.jpg",
    impactGoals: {
      primary: "Bridge digital divide for 5M+ users",
      languages: "Support 10+ indigenous languages",
      literacy: "Improve digital literacy by 60%",
      access: "Provide 24/7 AI services offline",
      empowerment: "Enable economic opportunities for 100K women"
    },
    partnerships: ["UNESCO", "Local Language Institutes", "Community Organizations", "Educational NGOs"],
    isPublished: true
  },
  {
    title: "Advanced Reconstruction Technology",
    slug: "reconstruction-technology",
    description: `Revolutionary radio frequency-based medical technology for the physical and psychological reconstruction of FGM survivors. This project combines cutting-edge medical technology with holistic support services to restore dignity and well-being.

Medical Innovation:
• Advanced radio frequency reconstruction techniques
• Customized procedures based on age and individual needs
• Non-invasive treatment options with minimal recovery time
• Psychological support integration throughout treatment
• Telemedicine follow-up and monitoring

Technology Integration:
• AI-assisted treatment planning and optimization
• Blockchain-secured medical records and patient privacy
• Virtual reality therapy for psychological healing
• Mobile health monitoring applications
• Secure telemedicine platform for follow-up care

This project represents WAM's core mission evolved through technology, providing not just immediate medical solutions but comprehensive healing that addresses the full scope of harm caused by FGM.`,
    shortDescription: "Advanced radio frequency technology for FGM survivor reconstruction, combining medical innovation with holistic psychological support.",
    category: "health",
    technologyStack: ["Medical Devices", "Radio Frequency", "AI", "Blockchain", "Telemedicine"],
    fundingGoal: "4000000.00",
    tokenAllocation: 2000000,
    status: "active",
    imageUrl: "/images/reconstruction-tech.jpg",
    impactGoals: {
      primary: "Provide reconstruction services to 10K survivors",
      success_rate: "95% successful reconstruction procedures",
      psychological: "80% improvement in psychological well-being scores",
      accessibility: "Establish 20 treatment centers globally",
      training: "Train 200 medical professionals in the technique"
    },
    partnerships: ["Medical Universities", "Specialized Clinics", "Psychological Support Organizations", "Women's Health NGOs"],
    isPublished: true
  }
];

export async function seedDatabase() {
  try {
    console.log('🌱 Seeding database with sample projects...');
    
    // Insert sample projects
    const insertedProjects = await db.insert(projects).values(sampleProjects).returning();
    
    console.log(`✅ Inserted ${insertedProjects.length} projects`);
    
    // Add sample milestones for each project
    const milestones = [
      {
        projectId: insertedProjects[0].id,
        title: "AI Model Development",
        description: "Complete development and testing of voice-first AI models",
        targetDate: new Date('2025-06-30'),
        fundingRequired: "800000.00",
        status: "in_progress"
      },
      {
        projectId: insertedProjects[0].id,
        title: "Pilot Deployment",
        description: "Deploy system in 2 pilot regions for testing",
        targetDate: new Date('2025-09-30'),
        fundingRequired: "500000.00",
        status: "pending"
      },
      {
        projectId: insertedProjects[1].id,
        title: "Computer Vision Training",
        description: "Train crop disease identification models",
        targetDate: new Date('2025-08-15'),
        fundingRequired: "600000.00",
        status: "pending"
      }
    ];
    
    await db.insert(projectMilestones).values(milestones);
    console.log('✅ Inserted project milestones');
    
    // Add sample impact metrics
    const metrics = [
      {
        projectId: insertedProjects[0].id,
        metricName: "Women Reached",
        currentValue: "25000.00",
        targetValue: "500000.00",
        unit: "users",
        category: "health"
      },
      {
        projectId: insertedProjects[0].id,
        metricName: "Emergency Response Time",
        currentValue: "8.50",
        targetValue: "2.00",
        unit: "minutes",
        category: "health"
      },
      {
        projectId: insertedProjects[1].id,
        metricName: "Farmers Supported",
        currentValue: "5000.00",
        targetValue: "100000.00",
        unit: "farmers",
        category: "economic"
      }
    ];
    
    await db.insert(impactMetrics).values(metrics);
    console.log('✅ Inserted impact metrics');
    
    console.log('🎉 Database seeding completed successfully!');
    return insertedProjects;
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
