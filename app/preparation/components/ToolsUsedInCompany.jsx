"use client";
import { useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";
import { ExternalLink, Users, MessageSquare, GitBranch, Paintbrush, Terminal, Cloud, UserCheck } from "lucide-react";
import {
  SiJira,
  SiConfluence,
  SiTrello,
  SiAsana,
  SiSlack,
  SiMicrosoftteams,
  SiDiscord,
  SiZoom,
  SiGithub,
  SiGitlab,
  SiBitbucket,
  SiFigma,
  SiAdobexd,
  SiCanva,
  SiPostman,
  SiSwagger,
  SiSelenium,
  SiAmazonaws,
  SiGooglecloud,
  SiMicrosoftazure,
  SiJenkins,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiWorkday,
  SiZoho,
} from "react-icons/si";

const companyToolsData = {
  "Project Management & Collaboration": [
    { name: "Jira", icon: SiJira, url: "https://www.atlassian.com/software/jira", color: "#0052CC" },
    { name: "Confluence", icon: SiConfluence, url: "https://www.atlassian.com/software/confluence", color: "#172B4D" },
    { name: "Trello", icon: SiTrello, url: "https://trello.com/", color: "#0079BF" },
    { name: "Asana", icon: SiAsana, url: "https://asana.com/", color: "#F06A6A" },
    { name: "Monday.com", icon: Users, url: "https://monday.com/", color: "#FF3D57" },
    { name: "ClickUp", icon: Users, url: "https://clickup.com/", color: "#7B68EE" }
  ],
  "Communication Tools": [
    { name: "Slack", icon: SiSlack, url: "https://slack.com/", color: "#4A154B" },
    { name: "Microsoft Teams", icon: SiMicrosoftteams, url: "https://www.microsoft.com/en-in/microsoft-teams/", color: "#6264A7" },
    { name: "Discord", icon: SiDiscord, url: "https://discord.com/", color: "#5865F2" },
    { name: "Zoom", icon: SiZoom, url: "https://zoom.us/", color: "#2D8CFF" }
  ],
  "Development & Version Control": [
    { name: "GitHub", icon: SiGithub, url: "https://github.com/", color: "#181717" },
    { name: "GitLab", icon: SiGitlab, url: "https://gitlab.com/", color: "#FC6D26" },
    { name: "Bitbucket", icon: SiBitbucket, url: "https://bitbucket.org/", color: "#0052CC" },
    { name: "Azure Repos", icon: SiMicrosoftazure, url: "https://azure.microsoft.com/services/devops/repos/", color: "#0078D4" }
  ],
  "Design & Prototyping": [
    { name: "Figma", icon: SiFigma, url: "https://www.figma.com/", color: "#F24E1E" },
    { name: "Adobe XD", icon: SiAdobexd, url: "https://www.adobe.com/products/xd.html/", color: "#FF61F6" },
    { name: "Canva", icon: SiCanva, url: "https://www.canva.com/", color: "#00C4CC" }
  ],
  "API & Testing Tools": [
    { name: "Postman", icon: SiPostman, url: "https://www.postman.com/", color: "#FF6C37" },
    { name: "Swagger", icon: SiSwagger, url: "https://swagger.io/", color: "#85EA2D" },
    { name: "JMeter", icon: Terminal, url: "https://jmeter.apache.org/", color: "#D22128" },
    { name: "Selenium", icon: SiSelenium, url: "https://www.selenium.dev/", color: "#43B02A" }
  ],
  "DevOps, Cloud & Automation": [
    { name: "AWS Console", icon: SiAmazonaws, url: "https://aws.amazon.com/", color: "#FF9900" },
    { name: "Google Cloud", icon: SiGooglecloud, url: "https://cloud.google.com/", color: "#4285F4" },
    { name: "Azure DevOps", icon: SiMicrosoftazure, url: "https://azure.microsoft.com/", color: "#0078D4" },
    { name: "Jenkins", icon: SiJenkins, url: "https://www.jenkins.io/", color: "#D24939" },
    { name: "Docker", icon: SiDocker, url: "https://www.docker.com/", color: "#2496ED" },
    { name: "Kubernetes", icon: SiKubernetes, url: "https://kubernetes.io/", color: "#326CE5" },
    { name: "Terraform", icon: SiTerraform, url: "https://www.terraform.io/", color: "#7B42BC" }
  ],
  "HR, Hiring & Workflow Systems": [
    { name: "Workday", icon: SiWorkday, url: "https://www.workday.com/", color: "#F26B38" },
    { name: "BambooHR", icon: UserCheck, url: "https://www.bamboohr.com/", color: "#61BC47" },
    { name: "Zoho People", icon: SiZoho, url: "https://www.zoho.com/people/", color: "#C83E2A" },
    { name: "Greenhouse", icon: UserCheck, url: "https://www.greenhouse.io/", color: "#4CAF50" }
  ]
};

export default function ToolsUsedInCompany() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`${isDarkMode ? 'bg-black text-gray-100' : 'bg-white text-gray-800'} min-h-screen`}>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Company Tools A-to-Z</h1>
          <p className="text-lg opacity-80">Essential tools used across Tech, HR, Product, Design, QA, Support & DevOps</p>
        </div>

        {Object.entries(companyToolsData).map(([category, tools], categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <a
                    key={index}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className={`p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                      isDarkMode
                        ? 'bg-gray-900 border-gray-800 hover:border-blue-500'
                        : 'bg-white border-gray-200 hover:border-blue-400 shadow-sm'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                             style={{ color: tool.color }}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <ExternalLink className={`w-4 h-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'} group-hover:text-blue-500`} />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'} truncate`}>
                        {tool.url.replace('https://', '')}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ))}

        <div className={`mt-16 p-8 rounded-2xl text-center ${
          isDarkMode
            ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-gray-800'
            : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200'
        }`}>
          <Terminal className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h3 className="text-xl font-bold mb-2">Ready to Use These Tools?</h3>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Most companies provide training and access to these tools. Focus on learning the fundamentals!
          </p>
        </div>
      </div>
    </div>
  );
}
