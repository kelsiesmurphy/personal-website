"use client";

import { Tabs } from "@repo/ui/components/ui/tabs";

export function FileCabinet() {
  const tabs = [
    {
      title: "Surveyflow",
      value: "surveyflow",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-xl p-10 text-xl md:text-4xl font-bold text-white bg-[url(/folder-textures/texture_1.jpg)] bg-cover shadow-2xl">
          <p className="font-citrusShore text-slate-900 rotate-6">SurveyFlow</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Try Something New Club",
      value: "trysomethingnewclub",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-xl p-10 text-xl md:text-4xl font-bold text-white bg-[url(/folder-textures/texture_2.jpg)] bg-cover shadow-2xl">
          <p className="font-citrusShore text-slate-900 -rotate-3">Try Something New Club</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "FreshIcons",
      value: "freshicons",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-xl p-10 text-xl md:text-4xl font-bold text-white bg-[url(/folder-textures/texture_3.jpg)] bg-cover shadow-2xl">
          <p className="font-citrusShore text-slate-900 -rotate-6">Fresh Icons</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "GreenCheck",
      value: "greencheck",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-xl p-10 text-xl md:text-4xl font-bold text-white bg-[url(/folder-textures/texture_4.jpg)] bg-cover shadow-2xl">
          <p className="font-citrusShore text-slate-900 rotate-3">GreenCheck</p>
          <DummyContent />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mb-40">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <img
      src="/linear.webp"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
