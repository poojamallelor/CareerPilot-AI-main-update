// app/api/scrape/route.js
import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(request) {
  console.log("Scrape API: Request received");
  
  // Get URL from query parameter
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get("url") || "https://remoteok.com/remote-jobs";
  
  console.log(`Scrape API: Target URL - ${targetUrl}`);

  try {
    // Add a user agent to avoid being blocked
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://www.google.com/',
      'DNT': '1',
    };

    // Fetch HTML from the page with timeout
    console.log("Scrape API: Fetching HTML content");
    const { data } = await axios.get(targetUrl, { 
      headers,
      timeout: 10000, // 10 second timeout
      maxRedirects: 5
    });

    // Load HTML into cheerio for parsing
    const $ = cheerio.load(data);
    console.log("Scrape API: HTML loaded successfully");

    // Mock job data in case scraping fails or gets blocked
    const mockJobs = [
      {
        title: "Senior Frontend Developer",
        company: "TechCorp",
        location: "Remote",
        salary: "$120k - $150k",
        description: "Looking for an experienced frontend developer with React expertise.",
        url: "https://example.com/job1"
      },
      {
        title: "Backend Engineer",
        company: "DataSystems Inc",
        location: "Hybrid - Bangalore",
        salary: "$90k - $120k",
        description: "Join our backend team working on scalable microservices.",
        url: "https://example.com/job2"
      },
      {
        title: "DevOps Engineer",
        company: "CloudNative",
        location: "Remote - India",
        salary: "$100k - $130k",
        description: "Help us automate and optimize our CI/CD pipelines.",
        url: "https://example.com/job3"
      },
      {
        title: "AI/ML Engineer",
        company: "DataMinds",
        location: "Remote - Global",
        salary: "$130k - $180k",
        description: "Work on cutting-edge machine learning models and AI applications.",
        url: "https://example.com/job4"
      },
      {
        title: "Mobile App Developer",
        company: "AppWorks",
        location: "Remote - India",
        salary: "$80k - $120k",
        description: "Develop cross-platform mobile applications using React Native.",
        url: "https://example.com/job5"
      }
    ];

    // Try to scrape actual job listings with multiple selector patterns for different sites
    const jobs = [];
    try {
      console.log("Scrape API: Attempting to extract job data");
      
      // Different selector patterns for different job sites
      const selectors = [
        'div.job, div.job-listing, .job-card, article.job',
        '.job-posting, .vacancy, .position-listing',
        '.careers-position, .opening, .job-opportunity',
        'li.job-result, div.search-result, .job-item'
      ];
      
      // Try each selector pattern
      for (const selector of selectors) {
        $(selector).each((i, el) => {
          if (i >= 15) return; // Limit to 15 jobs
          
          // Try different selector patterns for job details
          const jobTitle = $(el).find('h2, h3, .title, .position-title, .job-title').first().text().trim();
          const company = $(el).find('.company, .employer, .organization, .company-name').first().text().trim();
          const location = $(el).find('.location, .job-location, .region, .place').first().text().trim();
          const salary = $(el).find('.salary, .compensation, .pay-range').first().text().trim();
          const description = $(el).find('.description, .summary, .details, .job-description').first().text().trim();
          const url = $(el).find('a').attr('href');
          
          if (jobTitle) {
            jobs.push({
              title: jobTitle || "Job Title Not Found",
              company: company || "Company Not Found",
              location: location || "Location Not Found",
              salary: salary || "Not specified",
              description: description || "No description available",
              url: url ? (url.startsWith('http') ? url : `${new URL(targetUrl).origin}${url}`) : "#"
            });
          }
        });
        
        // If we found jobs with this selector, no need to try others
        if (jobs.length > 0) {
          console.log(`Scrape API: Found ${jobs.length} jobs using selector: ${selector}`);
          break;
        }
      }
    } catch (scrapeError) {
      console.error("Scrape API: Error extracting job data:", scrapeError);
    }

    // Return either the scraped jobs or mock data if scraping failed
    const responseData = jobs.length > 0 ? 
      { 
        success: true,
        source: targetUrl, 
        jobs,
        count: jobs.length
      } : 
      { 
        success: true,
        source: "Mock Data", 
        jobs: mockJobs,
        count: mockJobs.length,
        note: "Using mock data as scraping was unsuccessful"
      };
    
    console.log(`Scrape API: Returning ${responseData.count} jobs`);
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Scrape API: Error fetching data:", error);
    
    // Return mock data on error with appropriate status
    return NextResponse.json(
      { 
        success: false,
        error: "Error scraping data", 
        message: error.message,
        source: "Mock Data (Error Fallback)",
        jobs: [
          {
            title: "Software Developer",
            company: "TechStartup",
            location: "Remote",
            salary: "$80k - $110k",
            description: "Join our growing team as a software developer.",
            url: "https://example.com/job4"
          },
          {
            title: "UX/UI Designer",
            company: "DesignHub",
            location: "Remote - India",
            salary: "$70k - $100k",
            description: "Create beautiful user experiences for our products.",
            url: "https://example.com/job5"
          }
        ],
        count: 2
      }, 
      { status: 200 } // Return 200 with mock data instead of 500
    );
  }
}
