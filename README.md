# 🌍 WAM - Women Against Mutilations
### A DeFi-Powered NGO Platform for Women's Rights

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Web3](https://img.shields.io/badge/Web3-Enabled-9333EA?style=flat-square)](https://web3js.org/)

**WAM** is a revolutionary NGO platform that combines traditional humanitarian work with decentralized finance (DeFi) to create sustainable funding mechanisms for women's rights projects worldwide. Our blockchain-powered governance system enables transparent, community-driven funding decisions while maintaining the core mission of fighting female genital mutilation and supporting affected women.

---

## 🚀 **Platform Overview**

### **Mission-Driven DeFi Innovation**
- **NGO Purpose**: Combat female genital mutilation and empower women globally
- **DeFi Integration**: Sustainable funding through tokenized governance
- **Community Power**: Decentralized decision-making for project funding
- **Transparent Impact**: Blockchain-verified fund allocation and results

### **Core Features**
- 🪙 **WAMToken (WAM)**: Community governance and funding mechanism
- 🗳️ **DAO Governance**: Decentralized project funding decisions
- 🎓 **Community Rewards**: Educational benefits instead of financial returns
- 📊 **Transparent Treasury**: Real-time tracking of fund allocation
- 🌍 **Global Impact**: AI-powered projects for women's health, education, and empowerment

---

## 💰 **Token Economics**

### **WAMToken (WAM) Overview**
- **Total Supply**: 1,000,000,000 WAM (1 Billion tokens)
- **Token Price**: $0.10 USD per WAM
- **Funding Goal**: $12 Million (current phase)
- **Fixed Supply**: No inflation, capped at 1B tokens

### **Token Allocation**
```
📊 Tokenomics Breakdown:
├── 🎯 Project Funding (45% - 450M WAM)
│   └── Direct funding for women's rights initiatives
├── 👥 Public Sale (20% - 200M WAM)
│   └── Community participation and platform funding
├── 🎁 Community Rewards (15% - 150M WAM)
│   └── Educational benefits, bootcamps, scholarships
├── ⚙️ Operations & Development (10% - 100M WAM)
│   └── Platform development and sustainability
├── 👨‍💼 Team & Foundation (7% - 70M WAM)
│   └── Core team with long-term vesting
└── 🚨 Emergency Reserve (3% - 30M WAM)
    └── Crisis response and emergency funding
```

### **Community Benefits System**
- **500 Points**: Bootcamp access and educational programs
- **750 Points**: Volunteer camp participation
- **1000 Points**: Educational scholarships for women
- **1200 Points**: Web3 and women's rights conference tickets

---

## 🏗️ **Technical Architecture**

### **Frontend Stack**
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS v4 with custom WAM theme
- **UI Components**: shadcn/ui with custom components
- **Animations**: Framer Motion for smooth interactions

### **Web3 Integration**
- **Wallet Connection**: RainbowKit for multi-wallet support
- **Blockchain Interaction**: Wagmi v2 + Viem for Ethereum
- **Network Support**: Base, Ethereum mainnet, and testnets
- **State Management**: TanStack Query for Web3 data

### **Key Features**
```typescript
// Core Platform Components
├── 🏠 Landing Page - Mission overview and token sale info
├── 🗳️ DAO Governance - Project voting and proposal creation
├── 💰 Token Sale - WAM token purchase interface
├── 📊 Dashboard - User portfolio and staking management
├── 🔗 Web3 Integration - Wallet connection and blockchain interaction
└── 🎯 Project Showcase - Impact tracking and results
```

---

## 🌍 **Funded Projects Pipeline**

### **Ready for Community Funding ($11.3M Total)**
1. **AI-Powered Maternal Health System** - $3.0M
   - Voice-first AI for real-time health guidance
   - Deployable offline in rural communities
   - Multi-language support for accessibility

2. **Smart Agricultural Advisory Network** - $2.5M
   - AI-powered farming advice for women farmers
   - 40% crop yield increase target
   - Weather prediction and local knowledge integration

3. **Digital Inclusion AI Platform** - $1.8M
   - Multilingual platform bridging digital divide
   - Health, education, and economic empowerment services
   - Targeting 5M+ underserved users

4. **Advanced Reconstruction Technology** - $4.0M
   - Radio frequency technology for FGM survivor reconstruction
   - Scale from pilot to 10,000 reconstructions
   - 20 treatment centers across multiple countries

---

## �️ **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Web3 wallet (MetaMask recommended)

### **Installation**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/manu-acho/wamngo.git
   cd wam
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Add your WalletConnect Project ID and other configurations
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

### **Build for Production**
```bash
npm run build
npm start
```

---

## � **Platform Pages**

| Page | Purpose | Features |
|------|---------|----------|
| **Home** (`/`) | Mission overview and token sale | Hero section, project showcase |
| **Token Sale** (`/token-sale`) | WAM token purchase | Web3 integration, tokenomics |
| **DAO Governance** (`/governance`) | Community voting | Proposal creation, voting interface |
| **Dashboard** (`/dashboard`) | User portfolio | Staking, rewards, voting history |
| **About** (`/about`) | Organization details | Mission, founder story, team |
| **Projects** (`/projects`) | Impact showcase | Funded projects and results |
| **Contact** (`/contact`) | Community support | Contact form and information |

---

## 🔧 **Development**

### **Project Structure**
```
src/
├── app/                    # Next.js 16 App Router pages
├── components/             # Reusable UI components
│   ├── ui/                # shadcn/ui base components
│   ├── governance/        # DAO and voting components
│   ├── token-sale/        # Token purchase interface
│   ├── dashboard/         # User portfolio components
│   └── layout/            # Navigation and layout components
├── hooks/                 # Custom React hooks (Web3, etc.)
├── lib/                   # Utilities and configurations
└── styles/                # Global styles and Tailwind config
```

### **Key Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

---

## � **Web3 Integration**

### **Supported Networks**
- **Ethereum Mainnet** - Primary deployment
- **Base** - L2 for lower transaction costs
- **Polygon** - Alternative L2 support
- **Testnets** - Sepolia, Base Sepolia for development

### **Smart Contract Features** (Planned)
- **ERC-20 Token**: WAM token implementation
- **Governance Contract**: DAO voting and proposal management
- **Staking Contract**: Community benefits and rewards
- **Treasury Contract**: Multi-signature fund management

---

## 🤝 **Contributing**

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### **Development Setup**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## � **Contact & Community**

- **Website**: [wam-ngo.org](https://wam-ngo.org)
- **Email**: info@ngowam.org
- **Phone**: +41 (0)78 805 05 01
- **Address**: Avenue Louis Casaï 71, CH-1216 Genève - Cointrin, Switzerland
- **Discord**: [Join our community](https://discord.gg/wam-ngo) *(coming soon)*
- **Twitter**: [@WAM_NGO](https://twitter.com/WAM_NGO) *(coming soon)*

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **Founder**: Manu Acho - Visionary leader combining humanitarian work with Web3 innovation
- **Community**: All WAM token holders and governance participants
- **Technology Partners**: Next.js, Tailwind CSS, RainbowKit, and the broader Web3 ecosystem
- **Mission Partners**: Organizations worldwide fighting for women's rights

---

**Built with ❤️ and 🔗 for women's rights worldwide**

*WAM - Where DeFi meets humanitarian impact*
