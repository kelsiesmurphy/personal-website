const AboutTimeline = () => {
  const timelineItems = [
    {
      sortOrder: 0,
      date: "September 2015 - November 2019",
      title: "Music Degree",
      description:
        "Studied music with education at the University of Aberdeen. I play clarinet, saxophone 🎷 and piano! 🎹",
    },
    {
      sortOrder: 1,
      date: "June 2014 - November 2020",
      title: "Business Owner (Close-up Magician)",
      description:
        "For six years I ran a small business alongside my studies, where I was hired by wedding clients and corporate clients as a magician, performing close-up magic.",
    },
    {
      sortOrder: 2,
      date: "June 2019 - November 2021",
      title: "Apple",
      description:
        "Worked at an Apple Store as a Specialist, Creative and Training Lead, where I sold Apple technology, taught customers how to use the technology, and trained the store team during the lockdown period of the pandemic.",
    },
    {
      sortOrder: 3,
      date: "November 2021 - November 2022",
      title: "Momentum Group",
      description:
        "Joined a small Australian agency building low-code applications using Bubble.io. I worked in a small agile team, where we built and shipped many applications to clients.",
    },
    {
      sortOrder: 4,
      date: "November 2022 - March 2023",
      title: "CodeClan",
      description:
        "Completed CodeClan, a 16-week Software Development course with over 800 hours of hand-on development experience using Python, Java, JavaScript & React. This built on my previous experience.",
    },
    {
      sortOrder: 5,
      date: "May 2023 - January 2025",
      title: "BJSS",
      description:
        "Joined BJSS, a technology consultancy with enterprise clients including Specsavers, NHS and DVSA. I went through the 7 week BJSS Academy where I learned about cybersecurity, Agile software development and the Go programming language. Since joining BJSS I worked on bids to win new clients, worked on a short-term Google Cloud project for a major bank and then joined and supported the digital team of a major energy company.",
    },
    {
      sortOrder: 6,
      date: "January 2025 - onwards",
      title: "CGI",
      description:
        "BJSS was acquired by CGI in January 2025. I am continuing my role on the same client, now as a CGI employee, where I continue my work with a major energy company, improving its online presence and customer communications using React, NextJS and other modern web technologies. I also improve, document and maintain their internal scripting language for email development in their communications team, help mentor junior developers and I'm currently moving their email templates from a legacy system to a modern component-based design system.",
    },
  ];

  return (
    <div>
      <h3>Timeline</h3>
      <ul className="relative border-l border-secondary">
        {timelineItems
          .sort((a, b) => b.sortOrder - a.sortOrder)
          .map((item, index) => {
            return (
              <li className="mb-10 ml-4 list-none" key={index}>
                <div className="absolute -left-1.5 h-3 w-3 rounded-full border border-foreground bg-secondary"></div>
                <p className="mb-1 text-sm font-normal leading-none text-muted-foreground">
                  {item.date}
                </p>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mb-4 text-base font-normal">
                  {item.description}
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default AboutTimeline;
