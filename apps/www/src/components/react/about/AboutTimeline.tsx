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
      date: "June 2019 - November 2021",
      title: "Apple",
      description:
        "Worked at an Apple Store as a Specialist, Creative and Training Lead, where I sold Apple technology, taught customers how to use the technology, and trained the store team during the lockdown period of the pandemic.",
    },
    {
      sortOrder: 2,
      date: "November 2021 - November 2022",
      title: "Momentum Group",
      description:
        "Joined a small Australian agency building low-code applications using Bubble.io. I worked in a small agile team, where we built and shipped many applications to clients.",
    },
    {
      sortOrder: 3,
      date: "November 2022 - March 2023",
      title: "CodeClan",
      description:
        "Completed CodeClan, a 16-week Software Development course with over 800 hours of hand-on development experience using Python, Java, JavaScript & React. Discovered my passion for CSS and frontend development!",
    },
    {
      sortOrder: 4,
      date: "May 2023 - onwards",
      title: "BJSS",
      description:
        "Joined BJSS, a technology consultancy with enterprise clients including Specsavers, NHS and DVSA. I went through the 7 week BJSS Academy where I learned about cybersecurity, Agile software development and the Go programming language. I am currently on a client within their web development team.",
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
                <p className="mb-4 text-base font-normal text-secondary-foreground">
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
