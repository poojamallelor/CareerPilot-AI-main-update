"use client";
import { useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { ExternalLink, Building2 } from "lucide-react";
import { 
  SiAmazon, SiGoogle, SiMeta, SiInfosys, 
  SiTcs, SiAccenture, SiWipro, SiCisco, SiSap,
  SiOracle, SiAdobe, SiSalesforce, SiIntel, SiNvidia, SiQualcomm,
  SiApple, SiNetflix, SiUber, SiAirbnb, SiSpotify, SiLinkedin,
  SiTesla, SiPaypal, SiVisa, SiCognizant,
  SiHcl
} from "react-icons/si";

const mncList = [
  // Tech Giants
  { name: "Amazon", icon: SiAmazon, url: "https://amazon.jobs", color: "#FF9900", category: "Tech Giants", emoji: "🧡" },
  { name: "Google", icon: SiGoogle, url: "https://careers.google.com", color: "#4285F4", category: "Tech Giants", emoji: "💙" },
  { name: "Microsoft", icon: Building2, url: "https://careers.microsoft.com", color: "#00A4EF", category: "Tech Giants", emoji: "🟦" },
  { name: "Meta", icon: SiMeta, url: "https://metacareers.com", color: "#0668E1", category: "Tech Giants", emoji: "🟣" },
  { name: "Apple", icon: SiApple, url: "https://apple.com/careers", color: "#000000", category: "Tech Giants", emoji: "🖤" },
  { name: "Netflix", icon: SiNetflix, url: "https://jobs.netflix.com", color: "#E50914", category: "Tech Giants", emoji: "❤️" },
  
  // Enterprise Tech
  { name: "IBM", icon: Building2, url: "https://ibm.com/careers", color: "#0F62FE", category: "Enterprise Tech", emoji: "🔵" },
  { name: "Oracle", icon: SiOracle, url: "https://oracle.com/careers", color: "#F80000", category: "Enterprise Tech", emoji: "🔴" },
  { name: "SAP", icon: SiSap, url: "https://jobs.sap.com", color: "#0FAAFF", category: "Enterprise Tech", emoji: "🔵" },
  { name: "Cisco", icon: SiCisco, url: "https://jobs.cisco.com", color: "#1BA0D7", category: "Enterprise Tech", emoji: "🔷" },
  { name: "Adobe", icon: SiAdobe, url: "https://adobe.com/careers", color: "#FF0000", category: "Enterprise Tech", emoji: "🔴" },
  { name: "Salesforce", icon: SiSalesforce, url: "https://salesforce.com/careers", color: "#00A1E0", category: "Enterprise Tech", emoji: "💙" },
  
  // Hardware/Semiconductors
  { name: "Intel", icon: SiIntel, url: "https://intel.com/jobs", color: "#0071C5", category: "Hardware", emoji: "🔵" },
  { name: "NVIDIA", icon: SiNvidia, url: "https://nvidia.com/careers", color: "#76B900", category: "Hardware", emoji: "🟢" },
  { name: "Qualcomm", icon: SiQualcomm, url: "https://qualcomm.com/careers", color: "#3253DC", category: "Hardware", emoji: "🔵" },
  
  // Ride-sharing/Travel
  { name: "Uber", icon: SiUber, url: "https://uber.com/careers", color: "#000000", category: "Mobility", emoji: "🖤" },
  { name: "Airbnb", icon: SiAirbnb, url: "https://careers.airbnb.com", color: "#FF5A5F", category: "Mobility", emoji: "❤️" },
  { name: "Tesla", icon: SiTesla, url: "https://tesla.com/careers", color: "#CC0000", category: "Mobility", emoji: "🔴" },
  
  // Professional Services
  { name: "Spotify", icon: SiSpotify, url: "https://spotify.com/careers", color: "#1DB954", category: "Media", emoji: "🟢" },
  { name: "LinkedIn", icon: SiLinkedin, url: "https://careers.linkedin.com", color: "#0A66C2", category: "Media", emoji: "🔵" },
  
  // IT Services India
  { name: "Infosys", icon: SiInfosys, url: "https://career.infosys.com", color: "#007CC3", category: "IT Services", emoji: "🟧" },
  { name: "TCS", icon: SiTcs, url: "https://tcs.com/careers", color: "#0F62FE", category: "IT Services", emoji: "🟩" },
  { name: "Wipro", icon: SiWipro, url: "https://careers.wipro.com", color: "#6F2DA8", category: "IT Services", emoji: "🟪" },
  { name: "HCL Technologies", icon: SiHcl, url: "https://hcltech.com/careers", color: "#0033A0", category: "IT Services", emoji: "🔵" },
  { name: "Cognizant", icon: SiCognizant, url: "https://careers.cognizant.com", color: "#0033A0", category: "IT Services", emoji: "🔵" },
  
  // Consulting
  { name: "Accenture", icon: SiAccenture, url: "https://accenture.com/careers", color: "#A100FF", category: "Consulting", emoji: "🟦" },
  { name: "Deloitte", icon: Building2, url: "https://jobs2.deloitte.com", color: "#86BC25", category: "Consulting", emoji: "🟨" },
  { name: "Capgemini", icon: Building2, url: "https://capgemini.com/careers", color: "#0070AD", category: "Consulting", emoji: "🔵" },
  
  // Finance
  { name: "PayPal", icon: SiPaypal, url: "https://paypal.com/careers", color: "#00457C", category: "Fintech", emoji: "🔵" },
  { name: "Visa", icon: SiVisa, url: "https://visa.com/careers", color: "#1A1F71", category: "Fintech", emoji: "🔵" },
  { name: "Mastercard", icon: Building2, url: "https://mastercard.com/careers", color: "#EB001B", category: "Fintech", emoji: "🔴" },
  { name: "JPMorgan Chase", icon: Building2, url: "https://careers.jpmorgan.com", color: "#117ACA", category: "Finance", emoji: "🔵" },
  { name: "Goldman Sachs", icon: Building2, url: "https://goldmansachs.com/careers", color: "#0033A0", category: "Finance", emoji: "🔵" },
  { name: "Morgan Stanley", icon: Building2, url: "https://morganstanley.com/careers", color: "#00AEEF", category: "Finance", emoji: "🔵" },
  { name: "Citigroup", icon: Building2, url: "https://citi.com/careers", color: "#003B71", category: "Finance", emoji: "🔵" },
  { name: "American Express", icon: Building2, url: "https://americanexpress.com/careers", color: "#006FCF", category: "Finance", emoji: "🔵" },
  
  // Aerospace & Defense
  { name: "Boeing", icon: Building2, url: "https://boeing.com/careers", color: "#0033A0", category: "Aerospace", emoji: "🔵" },
  { name: "Lockheed Martin", icon: Building2, url: "https://lockheedmartin.com/careers", color: "#000080", category: "Aerospace", emoji: "🔵" },
  { name: "Raytheon", icon: Building2, url: "https://rtx.com/careers", color: "#003087", category: "Aerospace", emoji: "🔵" }
];

// Group by category
const groupedMNCs = mncList.reduce((acc, mnc) => {
  if (!acc[mnc.category]) acc[mnc.category] = [];
  acc[mnc.category].push(mnc);
  return acc;
}, {});

export default function MNCCareers() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? "bg-[#0a0614] text-white" 
        : "bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/50 text-stone-900"
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">MNC Career Portals</h1>
          <p className={`text-lg ${isDarkMode ? 'text-purple-300/80' : 'text-stone-600'}`}>
            Direct career links to 40+ top multinational companies across tech, finance, consulting & more
          </p>
        </div>

        {/* MNC Categories */}
        {Object.entries(groupedMNCs).map(([category, mncs], catIndex) => (
          <div key={catIndex} className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mncs.map((mnc, index) => {
                const Icon = mnc.icon;
                return (
                  <a
                    key={index}
                    href={mnc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <Card className={`h-full transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                      isDarkMode 
                        ? 'bg-[#130c24] border-[#2c1c4d] hover:border-purple-500' 
                        : 'bg-white border-purple-100 hover:border-purple-400'
                    }`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                                 style={{ color: isDarkMode ? mnc.color : mnc.color }}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-lg">{mnc.emoji}</span>
                          </div>
                          <ExternalLink className={`w-3 h-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'} group-hover:text-purple-500`} />
                        </div>
                        <CardTitle className="text-base mt-2 line-clamp-2">{mnc.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className={`text-xs ${isDarkMode ? 'text-purple-300/70' : 'text-stone-600'} truncate`}>
                          {mnc.url.replace('https://', '')}
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                );
              })}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className={`mt-12 p-6 rounded-xl text-center ${
          isDarkMode ? 'bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-[#2c1c4d]' : 'bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200'
        }`}>
          <Building2 className={`w-12 h-12 mx-auto mb-3 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <h3 className="text-xl font-bold mb-2">Can't find your target company?</h3>
          <p className={`text-sm ${isDarkMode ? 'text-purple-300/80' : 'text-stone-600'}`}>
            Most companies have a "careers" or "jobs" page. Try: company.com/careers
          </p>
        </div>
      </div>
    </div>
  );
}
